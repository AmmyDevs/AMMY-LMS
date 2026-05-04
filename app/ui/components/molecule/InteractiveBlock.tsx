import { useState, useCallback, useRef, useEffect } from 'react'
import { Download, RotateCcw, Loader2, AlertCircle, ImagePlus } from 'lucide-react'
import Image from 'next/image'
import { useLMSStore } from '@/lib/store'
import { EFFECT_REGISTRY } from '@/app/lib/effects'
import { ParameterPanel } from './ParameterPanel'
import { CompareSlider } from './CompareSlider'
import type { InteractiveBlockInternalState } from '@/lib/utils/types'

interface InteractiveBlockProps {
  effectId: string
}

// ─── Client-side Canvas image processing ───────────────────────────────────

function applyEffect(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  effectId: string,
  params: Record<string, unknown>
): ImageData {
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imgData.data

  switch (effectId) {
    case 'sampling-quantization': {
      const scale = Number(params.scale ?? 100) / 100
      const bitDepth = Number(params.bit_depth ?? 8)
      const levels = Math.pow(2, bitDepth)
      const step = 255 / (levels - 1)

      // Downsample by creating a temporary canvas
      const tempCanvas = document.createElement('canvas')
      const tempCtx = tempCanvas.getContext('2d')!
      tempCanvas.width = Math.max(1, Math.floor(canvas.width * scale))
      tempCanvas.height = Math.max(1, Math.floor(canvas.height * scale))
      tempCtx.drawImage(canvas, 0, 0, tempCanvas.width, tempCanvas.height)

      // Scale back up
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.imageSmoothingEnabled = false
      ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height)

      const result = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const r = result.data
      for (let i = 0; i < r.length; i += 4) {
        r[i] = Math.round(r[i] / step) * step
        r[i + 1] = Math.round(r[i + 1] / step) * step
        r[i + 2] = Math.round(r[i + 2] / step) * step
      }
      return result
    }

    case 'gamma-correction': {
      const gamma = Number(params.gamma ?? 1.0)
      const invGamma = 1 / gamma
      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, Math.pow(data[i] / 255, invGamma) * 255)
        data[i + 1] = Math.min(255, Math.pow(data[i + 1] / 255, invGamma) * 255)
        data[i + 2] = Math.min(255, Math.pow(data[i + 2] / 255, invGamma) * 255)
      }
      break
    }

    case 'log-transform': {
      const c = Number(params.c ?? 30)
      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, c * Math.log(1 + data[i]))
        data[i + 1] = Math.min(255, c * Math.log(1 + data[i + 1]))
        data[i + 2] = Math.min(255, c * Math.log(1 + data[i + 2]))
      }
      break
    }

    case 'histogram-equalize': {
      // Build histogram for luminance
      const gray = new Uint8Array(data.length / 4)
      for (let i = 0; i < data.length; i += 4) {
        gray[i / 4] = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2])
      }
      const hist = new Uint32Array(256)
      for (let i = 0; i < gray.length; i++) hist[gray[i]]++
      const cdf = new Uint32Array(256)
      cdf[0] = hist[0]
      for (let i = 1; i < 256; i++) cdf[i] = cdf[i - 1] + hist[i]
      const cdfMin = cdf.find((v) => v > 0) ?? 0
      const scale = 255 / (gray.length - cdfMin)
      const map = new Uint8Array(256)
      for (let i = 0; i < 256; i++) {
        map[i] = Math.round((cdf[i] - cdfMin) * scale)
      }
      for (let i = 0; i < data.length; i += 4) {
        data[i] = map[data[i]]
        data[i + 1] = map[data[i + 1]]
        data[i + 2] = map[data[i + 2]]
      }
      break
    }

    case 'clahe': {
      const clipLimit = Number(params.clip_limit ?? 2)
      const tileSize = Number(params.tile_size ?? 8)
      const tilesX = Math.ceil(canvas.width / tileSize)
      const tilesY = Math.ceil(canvas.height / tileSize)

      // Simple tile-based equalization
      for (let ty = 0; ty < tilesY; ty++) {
        for (let tx = 0; tx < tilesX; tx++) {
          const startX = tx * tileSize
          const startY = ty * tileSize
          const endX = Math.min(startX + tileSize, canvas.width)
          const endY = Math.min(startY + tileSize, canvas.height)

          const hist = new Uint32Array(256)
          let count = 0
          for (let y = startY; y < endY; y++) {
            for (let x = startX; x < endX; x++) {
              const idx = (y * canvas.width + x) * 4
              const lum = Math.round(0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2])
              hist[lum]++
              count++
            }
          }

          // Clip histogram
          const clip = Math.max(1, Math.floor((count / 256) * clipLimit))
          let excess = 0
          for (let i = 0; i < 256; i++) {
            if (hist[i] > clip) {
              excess += hist[i] - clip
              hist[i] = clip
            }
          }
          const add = Math.floor(excess / 256)
          for (let i = 0; i < 256; i++) hist[i] += add

          const cdf = new Uint32Array(256)
          cdf[0] = hist[0]
          for (let i = 1; i < 256; i++) cdf[i] = cdf[i - 1] + hist[i]
          const cdfMin = cdf.find((v) => v > 0) ?? 0
          const scale = 255 / (count - cdfMin)
          const map = new Uint8Array(256)
          for (let i = 0; i < 256; i++) {
            map[i] = Math.round((cdf[i] - cdfMin) * scale)
          }

          for (let y = startY; y < endY; y++) {
            for (let x = startX; x < endX; x++) {
              const idx = (y * canvas.width + x) * 4
              data[idx] = map[data[idx]]
              data[idx + 1] = map[data[idx + 1]]
              data[idx + 2] = map[data[idx + 2]]
            }
          }
        }
      }
      break
    }

    case 'gaussian-blur': {
      const sigma = Number(params.sigma ?? 1)
      const ksize = Number(params.kernel ?? 5)
      const kernel = makeGaussianKernel(ksize, sigma)
      return convolveSeparable(data, canvas.width, canvas.height, kernel)
    }

    case 'median-filter': {
      const k = Number(params.kernel ?? 5)
      return applyMedianFilter(data, canvas.width, canvas.height, k)
    }

    case 'sharpen': {
      const strength = Number(params.strength ?? 1)
      const kernel = [0, -1, 0, -1, 5 + strength, -1, 0, -1, 0]
      return convolve(data, canvas.width, canvas.height, kernel, 3)
    }

    case 'salt-pepper': {
      const density = Number(params.density ?? 0.05)
      const saltRatio = Number(params.salt_ratio ?? 0.5)
      for (let i = 0; i < data.length; i += 4) {
        if (Math.random() < density) {
          const isSalt = Math.random() < saltRatio
          data[i] = data[i + 1] = data[i + 2] = isSalt ? 255 : 0
        }
      }
      break
    }

    case 'gaussian-noise': {
      const mean = Number(params.mean ?? 0)
      const sigma = Number(params.sigma ?? 20)
      for (let i = 0; i < data.length; i += 4) {
        data[i] = clamp(data[i] + randn(mean, sigma))
        data[i + 1] = clamp(data[i + 1] + randn(mean, sigma))
        data[i + 2] = clamp(data[i + 2] + randn(mean, sigma))
      }
      break
    }

    case 'edge-detection': {
      const method = String(params.method ?? 'canny')
      const gray = toGrayscale(data)
      if (method === 'sobel') {
        return applySobel(data, gray, canvas.width, canvas.height)
      } else if (method === 'laplacian') {
        return applyLaplacian(data, gray, canvas.width, canvas.height)
      } else {
        const t1 = Number(params.threshold1 ?? 50)
        const t2 = Number(params.threshold2 ?? 150)
        return applyCanny(data, gray, canvas.width, canvas.height, t1, t2)
      }
    }

    case 'threshold': {
      const method = String(params.method ?? 'global')
      const value = Number(params.value ?? 128)
      let thresh = value
      if (method === 'otsu') {
        thresh = otsuThreshold(data)
      } else if (method === 'adaptive') {
        return applyAdaptiveThreshold(data, canvas.width, canvas.height, value)
      }
      for (let i = 0; i < data.length; i += 4) {
        const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
        const v = lum > thresh ? 255 : 0
        data[i] = data[i + 1] = data[i + 2] = v
      }
      break
    }

    case 'region-growing': {
      const tolerance = Number(params.tolerance ?? 15)
      const connectivity = Number(params.connectivity ?? 4)
      return applyRegionGrowing(data, canvas.width, canvas.height, tolerance, connectivity)
    }

    default:
      break
  }

  return imgData
}

// ─── Helper functions ──────────────────────────────────────────────────────

function clamp(v: number): number {
  return Math.max(0, Math.min(255, Math.round(v)))
}

function randn(mean: number, sigma: number): number {
  // Box-Muller transform
  const u1 = 1 - Math.random()
  const u2 = Math.random()
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
  return mean + sigma * z
}

function makeGaussianKernel(size: number, sigma: number): number[] {
  const kernel: number[] = []
  const half = Math.floor(size / 2)
  let sum = 0
  for (let i = -half; i <= half; i++) {
    const v = Math.exp(-(i * i) / (2 * sigma * sigma))
    kernel.push(v)
    sum += v
  }
  return kernel.map((v) => v / sum)
}

function convolveSeparable(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  kernel: number[]
): ImageData {
  const temp = new Uint8ClampedArray(data.length)
  const half = Math.floor(kernel.length / 2)

  // Horizontal pass
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0, g = 0, b = 0
      for (let k = 0; k < kernel.length; k++) {
        const px = Math.min(width - 1, Math.max(0, x + k - half))
        const idx = (y * width + px) * 4
        r += data[idx] * kernel[k]
        g += data[idx + 1] * kernel[k]
        b += data[idx + 2] * kernel[k]
      }
      const idx = (y * width + x) * 4
      temp[idx] = clamp(r)
      temp[idx + 1] = clamp(g)
      temp[idx + 2] = clamp(b)
      temp[idx + 3] = data[idx + 3]
    }
  }

  // Vertical pass
  const result = new Uint8ClampedArray(data.length)
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let r = 0, g = 0, b = 0
      for (let k = 0; k < kernel.length; k++) {
        const py = Math.min(height - 1, Math.max(0, y + k - half))
        const idx = (py * width + x) * 4
        r += temp[idx] * kernel[k]
        g += temp[idx + 1] * kernel[k]
        b += temp[idx + 2] * kernel[k]
      }
      const idx = (y * width + x) * 4
      result[idx] = clamp(r)
      result[idx + 1] = clamp(g)
      result[idx + 2] = clamp(b)
      result[idx + 3] = temp[idx + 3]
    }
  }

  return new ImageData(result, width, height)
}

function convolve(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  kernel: number[],
  ksize: number
): ImageData {
  const result = new Uint8ClampedArray(data.length)
  const half = Math.floor(ksize / 2)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0, g = 0, b = 0
      for (let ky = 0; ky < ksize; ky++) {
        for (let kx = 0; kx < ksize; kx++) {
          const px = Math.min(width - 1, Math.max(0, x + kx - half))
          const py = Math.min(height - 1, Math.max(0, y + ky - half))
          const idx = (py * width + px) * 4
          const w = kernel[ky * ksize + kx]
          r += data[idx] * w
          g += data[idx + 1] * w
          b += data[idx + 2] * w
        }
      }
      const idx = (y * width + x) * 4
      result[idx] = clamp(r)
      result[idx + 1] = clamp(g)
      result[idx + 2] = clamp(b)
      result[idx + 3] = data[idx + 3]
    }
  }

  return new ImageData(result, width, height)
}

function applyMedianFilter(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  ksize: number
): ImageData {
  const result = new Uint8ClampedArray(data.length)
  const half = Math.floor(ksize / 2)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const r: number[] = [], g: number[] = [], b: number[] = []
      for (let ky = -half; ky <= half; ky++) {
        for (let kx = -half; kx <= half; kx++) {
          const px = Math.min(width - 1, Math.max(0, x + kx))
          const py = Math.min(height - 1, Math.max(0, y + ky))
          const idx = (py * width + px) * 4
          r.push(data[idx])
          g.push(data[idx + 1])
          b.push(data[idx + 2])
        }
      }
      r.sort((a, b) => a - b)
      g.sort((a, b) => a - b)
      b.sort((a, b) => a - b)
      const mid = Math.floor(r.length / 2)
      const idx = (y * width + x) * 4
      result[idx] = r[mid]
      result[idx + 1] = g[mid]
      result[idx + 2] = b[mid]
      result[idx + 3] = data[idx + 3]
    }
  }

  return new ImageData(result, width, height)
}

function toGrayscale(data: Uint8ClampedArray): Uint8Array {
  const gray = new Uint8Array(data.length / 4)
  for (let i = 0; i < data.length; i += 4) {
    gray[i / 4] = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2])
  }
  return gray
}

function applySobel(
  data: Uint8ClampedArray,
  gray: Uint8Array,
  width: number,
  height: number
): ImageData {
  const result = new Uint8ClampedArray(data.length)
  const gx = [-1, 0, 1, -2, 0, 2, -1, 0, 1]
  const gy = [-1, -2, -1, 0, 0, 0, 1, 2, 1]

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let sx = 0, sy = 0
      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          const idx = ((y + ky) * width + (x + kx))
          const w = gx[(ky + 1) * 3 + (kx + 1)]
          sx += gray[idx] * w
          sy += gray[idx] * gy[(ky + 1) * 3 + (kx + 1)]
        }
      }
      const mag = Math.min(255, Math.round(Math.sqrt(sx * sx + sy * sy)))
      const idx = (y * width + x) * 4
      result[idx] = result[idx + 1] = result[idx + 2] = mag
      result[idx + 3] = 255
    }
  }
  return new ImageData(result, width, height)
}

function applyLaplacian(
  data: Uint8ClampedArray,
  gray: Uint8Array,
  width: number,
  height: number
): ImageData {
  const result = new Uint8ClampedArray(data.length)
  const kernel = [0, 1, 0, 1, -4, 1, 0, 1, 0]

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let sum = 0
      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          sum += gray[((y + ky) * width + (x + kx))] * kernel[(ky + 1) * 3 + (kx + 1)]
        }
      }
      const v = clamp(Math.abs(sum))
      const idx = (y * width + x) * 4
      result[idx] = result[idx + 1] = result[idx + 2] = v
      result[idx + 3] = 255
    }
  }
  return new ImageData(result, width, height)
}

function applyCanny(
  data: Uint8ClampedArray,
  gray: Uint8Array,
  width: number,
  height: number,
  t1: number,
  t2: number
): ImageData {
  // Simplified Canny: gaussian -> sobel -> threshold
  const blurred = new Uint8Array(gray)
  // Quick box blur
  for (let i = 0; i < 1; i++) {
    const temp = new Uint8Array(blurred)
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        let sum = 0
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            sum += temp[((y + ky) * width + (x + kx))]
          }
        }
        blurred[y * width + x] = Math.round(sum / 9)
      }
    }
  }

  // Sobel
  const mag = new Uint8Array(width * height)
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let sx = 0, sy = 0
      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          const v = blurred[((y + ky) * width + (x + kx))]
          sx += v * [-1, 0, 1, -2, 0, 2, -1, 0, 1][(ky + 1) * 3 + (kx + 1)]
          sy += v * [-1, -2, -1, 0, 0, 0, 1, 2, 1][(ky + 1) * 3 + (kx + 1)]
        }
      }
      mag[y * width + x] = Math.min(255, Math.round(Math.sqrt(sx * sx + sy * sy)))
    }
  }

  // Hysteresis thresholding
  const result = new Uint8ClampedArray(data.length)
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = y * width + x
      const m = mag[idx]
      let v = 0
      if (m >= t2) {
        v = 255
      } else if (m >= t1) {
        // Check if connected to strong edge
        let connected = false
        for (let ky = -1; ky <= 1 && !connected; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            if (mag[(y + ky) * width + (x + kx)] >= t2) {
              connected = true
              break
            }
          }
        }
        v = connected ? 255 : 0
      }
      const out = (y * width + x) * 4
      result[out] = result[out + 1] = result[out + 2] = v
      result[out + 3] = 255
    }
  }
  return new ImageData(result, width, height)
}

function otsuThreshold(data: Uint8ClampedArray): number {
  const hist = new Uint32Array(256)
  for (let i = 0; i < data.length; i += 4) {
    const lum = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2])
    hist[lum]++
  }

  const total = data.length / 4
  let sum = 0
  for (let i = 0; i < 256; i++) sum += i * hist[i]

  let sumB = 0
  let wB = 0
  let max = 0
  let threshold = 0

  for (let t = 0; t < 256; t++) {
    wB += hist[t]
    if (wB === 0) continue
    const wF = total - wB
    if (wF === 0) break
    sumB += t * hist[t]
    const mB = sumB / wB
    const mF = (sum - sumB) / wF
    const between = wB * wF * (mB - mF) * (mB - mF)
    if (between > max) {
      max = between
      threshold = t
    }
  }

  return threshold
}

function applyAdaptiveThreshold(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  blockSize: number
): ImageData {
  const result = new Uint8ClampedArray(data.length)
  const half = Math.max(1, Math.floor(blockSize / 16))

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let sum = 0, count = 0
      for (let ky = -half; ky <= half; ky++) {
        for (let kx = -half; kx <= half; kx++) {
          const py = Math.min(height - 1, Math.max(0, y + ky))
          const px = Math.min(width - 1, Math.max(0, x + kx))
          const idx = (py * width + px) * 4
          sum += 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2]
          count++
        }
      }
      const mean = sum / count
      const idx = (y * width + x) * 4
      const lum = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2]
      const v = lum > mean - 5 ? 255 : 0
      result[idx] = result[idx + 1] = result[idx + 2] = v
      result[idx + 3] = 255
    }
  }

  return new ImageData(result, width, height)
}

function applyRegionGrowing(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  tolerance: number,
  connectivity: number
): ImageData {
  const result = new Uint8ClampedArray(data.length)
  const mask = new Uint8Array(width * height)
  const seedX = Math.floor(width / 2)
  const seedY = Math.floor(height / 2)
  const seedIdx = (seedY * width + seedX) * 4
  const seedVal = 0.299 * data[seedIdx] + 0.587 * data[seedIdx + 1] + 0.114 * data[seedIdx + 2]

  const stack: [number, number][] = [[seedX, seedY]]
  mask[seedY * width + seedX] = 1

  const dirs = connectivity === 8
    ? [[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]]
    : [[0,-1],[-1,0],[1,0],[0,1]]

  while (stack.length > 0) {
    const [x, y] = stack.pop()!
    for (const [dx, dy] of dirs) {
      const nx = x + dx, ny = y + dy
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue
      const nidx = ny * width + nx
      if (mask[nidx]) continue
      const pidx = nidx * 4
      const val = 0.299 * data[pidx] + 0.587 * data[pidx + 1] + 0.114 * data[pidx + 2]
      if (Math.abs(val - seedVal) <= tolerance) {
        mask[nidx] = 1
        stack.push([nx, ny])
      }
    }
  }

  for (let i = 0; i < mask.length; i++) {
    const v = mask[i] ? 255 : 0
    const idx = i * 4
    result[idx] = result[idx + 1] = result[idx + 2] = v
    result[idx + 3] = 255
  }

  return new ImageData(result, width, height)
}

// ─── InteractiveBlock Component ────────────────────────────────────────────

export function InteractiveBlock({ effectId }: InteractiveBlockProps) {
  const config = EFFECT_REGISTRY[effectId]
  const { setProgress } = useLMSStore()
  const [state, setState] = useState<InteractiveBlockInternalState>({
    blockState: 'idle',
    uploadedFile: null,
    originalUrl: null,
    processedUrl: null,
    currentParams: {},
    errorMessage: null,
    processingTimeMs: null,
  })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const originalCanvasRef = useRef<HTMLCanvasElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Initialize default params
  useEffect(() => {
    if (!config) return
    const defaults: Record<string, unknown> = {}
    config.parameters.forEach((p) => {
      defaults[p.id] = p.default
    })
    setState((s) => ({ ...s, currentParams: defaults }))
  }, [config])

  if (!config) {
    return (
      <div className="p-4 rounded-lg border border-red-200 bg-red-50 text-red-600">
        <AlertCircle className="w-5 h-5 inline mr-2" />
        Unknown effect: {effectId}
      </div>
    )
  }

  const handleFileUpload = useCallback(
    (file: File) => {
      if (file.size > 10 * 1024 * 1024) {
        setState((s) => ({
          ...s,
          errorMessage: 'File exceeds 10 MB limit',
          blockState: 'error',
        }))
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new window.Image()
        img.onload = () => {
          const maxDim = 600
          let w = img.naturalWidth
          let h = img.naturalHeight
          if (w > maxDim || h > maxDim) {
            const scale = maxDim / Math.max(w, h)
            w = Math.round(w * scale)
            h = Math.round(h * scale)
          }

          const canvas = document.createElement('canvas')
          canvas.width = w
          canvas.height = h
          const ctx = canvas.getContext('2d')!
          ctx.drawImage(img, 0, 0, w, h)

          // Store original
          originalCanvasRef.current = canvas

          const originalUrl = canvas.toDataURL('image/png')

          setState((s) => ({
            ...s,
            uploadedFile: file,
            originalUrl,
            processedUrl: null,
            blockState: 'ready',
            errorMessage: null,
          }))

          // Auto-process with defaults
          const paramsToUse = { ...state.currentParams }
          // Ensure defaults are set if empty
          if (Object.keys(paramsToUse).length === 0 && config) {
            config.parameters.forEach((p) => {
              paramsToUse[p.id] = p.default
            })
          }
          processImage(canvas, paramsToUse)
        }
        img.src = e.target!.result as string
      }
      reader.readAsDataURL(file)
    },
    []
  )

  const processImage = useCallback(
    (sourceCanvas: HTMLCanvasElement, params: Record<string, unknown>) => {
      setState((s) => ({ ...s, blockState: 'processing' }))

      const start = performance.now()
      const canvas = document.createElement('canvas')
      canvas.width = sourceCanvas.width
      canvas.height = sourceCanvas.height
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(sourceCanvas, 0, 0)

      try {
        const result = applyEffect(canvas, ctx, effectId, params)
        ctx.putImageData(result, 0, 0)
        const processedUrl = canvas.toDataURL('image/png')
        const elapsed = Math.round(performance.now() - start)

        canvasRef.current = canvas

        setState((s) => ({
          ...s,
          processedUrl,
          blockState: 'done',
          processingTimeMs: elapsed,
          errorMessage: null,
        }))

        // Track progress
        const slug = window.location.pathname.replace('/module/image-processing/', '')
        setProgress(`${slug}/${effectId}`, {
          completed: true,
          lastParams: params,
          timestamp: Date.now(),
        })
      } catch (err) {
        setState((s) => ({
          ...s,
          blockState: 'error',
          errorMessage: err instanceof Error ? err.message : 'Processing failed',
        }))
      }
    },
    [effectId, setProgress]
  )

  const handleParamChange = useCallback(
    (id: string, value: unknown) => {
      setState((s) => {
        const newParams = { ...s.currentParams, [id]: value }

        if (debounceRef.current) clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(() => {
          if (originalCanvasRef.current) {
            processImage(originalCanvasRef.current, newParams)
          }
        }, 400)

        return { ...s, currentParams: newParams, blockState: 'processing' }
      })
    },
    [processImage]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      const file = e.dataTransfer.files[0]
      if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
        handleFileUpload(file)
      }
    },
    [handleFileUpload]
  )

  const handleReset = () => {
    if (state.originalUrl) URL.revokeObjectURL(state.originalUrl)
    if (state.processedUrl && state.processedUrl.startsWith('blob:')) {
      URL.revokeObjectURL(state.processedUrl)
    }

    const defaults: Record<string, unknown> = {}
    config.parameters.forEach((p) => {
      defaults[p.id] = p.default
    })

    setState({
      blockState: 'idle',
      uploadedFile: null,
      originalUrl: null,
      processedUrl: null,
      currentParams: defaults,
      errorMessage: null,
      processingTimeMs: null,
    })
    originalCanvasRef.current = null
  }

  const handleDownload = () => {
    if (!state.processedUrl) return
    const a = document.createElement('a')
    a.href = state.processedUrl
    a.download = `processed-${effectId}.png`
    a.click()
  }

  return (
    <div className="my-8 rounded-xl border border-border bg-surface overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-border">
        <h3 className="text-lg font-semibold text-text mb-1">{config.title}</h3>
        <p className="text-sm text-muted">{config.description}</p>
      </div>

      {/* Upload zone */}
      {state.blockState === 'idle' && (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="m-6 border-2 border-dashed border-border rounded-lg p-10 text-center hover:border-brand/50 hover:bg-navy-fill transition-colors cursor-pointer"
        >
          <input
            type="file"
            accept="image/jpeg,image/png"
            onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
            className="hidden"
            id={`upload-${effectId}`}
          />
          <label htmlFor={`upload-${effectId}`} className="cursor-pointer block">
            <ImagePlus className="w-10 h-10 text-muted mx-auto mb-4" />
            <p className="text-sm font-medium text-text mb-1">
              Drop an image here or click to upload
            </p>
            <p className="text-xs text-muted">
              JPG or PNG, max 10 MB
            </p>
          </label>
        </div>
      )}

      {/* Ready / Processing / Done / Error */}
      {state.blockState !== 'idle' && state.originalUrl && (
        <div className="p-6 space-y-6">
          {/* Compare slider */}
          {state.blockState === 'done' && state.processedUrl ? (
            <CompareSlider
              originalUrl={state.originalUrl}
              processedUrl={state.processedUrl}
            />
          ) : (
            <div className="relative w-full aspect-[4/3] rounded-lg border border-border bg-page flex items-center justify-center">
              <Image
                src={state.originalUrl}
                alt="Original"
                fill
                unoptimized
                className="object-contain opacity-60"
              />
              {state.blockState === 'processing' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface/80">
                  <Loader2 className="w-8 h-8 text-brand animate-spin mb-2" />
                  <span className="text-sm text-muted">Processing...</span>
                </div>
              )}
            </div>
          )}

          {/* Error */}
          {state.blockState === 'error' && state.errorMessage && (
            <div className="flex items-center gap-2 text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {state.errorMessage}
            </div>
          )}

          {/* Parameters */}
          <div className="rounded-lg border border-border bg-page p-5">
            <div className="flex items-center gap-2 mb-4">
              <SlidersHorizontal className="w-4 h-4 text-muted" />
              <span className="text-sm font-semibold text-text">Parameters</span>
            </div>
            <ParameterPanel
              parameters={config.parameters}
              values={state.currentParams}
              onChange={handleParamChange}
              disabled={state.blockState === 'processing'}
            />
          </div>

          {/* Action bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {state.blockState === 'done' && (
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand text-white text-sm font-medium hover:bg-brand/90 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download PNG
                </button>
              )}
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium text-text hover:bg-elevated transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>
            {state.processingTimeMs !== null && state.blockState === 'done' && (
              <span className="text-xs text-muted">
                Processed in {state.processingTimeMs}ms
              </span>
            )}
          </div>

          {/* Hint */}
          {config.hint && (
            <p className="text-xs text-muted italic border-l-2 border-brand pl-3">
              {config.hint}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

function SlidersHorizontal(props: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <line x1="21" x2="14" y1="4" y2="4" />
      <line x1="10" x2="3" y1="4" y2="4" />
      <line x1="21" x2="12" y1="12" y2="12" />
      <line x1="8" x2="3" y1="12" y2="12" />
      <line x1="21" x2="16" y1="20" y2="20" />
      <line x1="12" x2="3" y1="20" y2="20" />
      <line x1="14" x2="14" y1="2" y2="6" />
      <line x1="8" x2="8" y1="10" y2="14" />
      <line x1="16" x2="16" y1="18" y2="22" />
    </svg>
  )
}
