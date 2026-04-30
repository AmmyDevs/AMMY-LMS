export const SLUG_TO_FILE: Record<string, string> = {
  'lecture-1/introduction': 'L1_Introduction_Digital_Fundamentals',
  'lecture-2/intensity-transformations': 'L2_Intensity_Transformations_Spatial_Filtering',
  'lecture-2/spatial-filtering': 'L2_Intensity_Transformations_Spatial_Filtering',
  'lecture-3/image-restoration': 'L3_Image_Restoration_Segmentation',
  'lecture-3/image-segmentation': 'L3_Image_Restoration_Segmentation',
  'self-study/fuzzy-techniques': 'SelfStudy_Fuzzy_Techniques',
  'self-study/seed-points': 'SelfStudy_Seed_Points',
  'further/frequency-domain': 'FurtherStudy_Frequency_Domain',
}

export const CONTENT_NAV = [
  {
    id: 'lecture-1',
    label: 'Lecture 1',
    subtitle: 'Introduction & Digital Fundamentals',
    type: 'lecture' as const,
    children: [
      { id: 'introduction', label: 'Introduction & Digital Fundamentals', slug: 'lecture-1/introduction' },
    ],
  },
  {
    id: 'lecture-2',
    label: 'Lecture 2',
    subtitle: 'Intensity Transformations & Spatial Filtering',
    type: 'lecture' as const,
    children: [
      { id: 'intensity-transformations', label: 'Intensity Transformations', slug: 'lecture-2/intensity-transformations' },
      { id: 'spatial-filtering', label: 'Spatial Filtering', slug: 'lecture-2/spatial-filtering' },
    ],
  },
  {
    id: 'lecture-3',
    label: 'Lecture 3',
    subtitle: 'Image Restoration & Segmentation',
    type: 'lecture' as const,
    children: [
      { id: 'image-restoration', label: 'Image Restoration', slug: 'lecture-3/image-restoration' },
      { id: 'image-segmentation', label: 'Image Segmentation', slug: 'lecture-3/image-segmentation' },
    ],
  },
  {
    id: 'self-study',
    label: 'Self-Study',
    subtitle: 'Extended Topics',
    type: 'self-study' as const,
    children: [
      { id: 'fuzzy-techniques', label: 'Fuzzy Techniques', slug: 'self-study/fuzzy-techniques' },
      { id: 'seed-points', label: 'Seed Points', slug: 'self-study/seed-points' },
    ],
  },
  {
    id: 'further',
    label: 'Further Study',
    subtitle: 'Advanced Reading',
    type: 'further' as const,
    children: [
      { id: 'frequency-domain', label: 'Frequency Domain', slug: 'further/frequency-domain' },
    ],
  },
]

// ─── Lecture 1 ─────────────────────────────────────────────────────────────

export const L1_Introduction_Digital_Fundamentals = `# Lecture 1: Introduction & Digital Image Fundamentals
**Course:** Image, Video and Speech Processing · **Lecturer:** Mr. Ayubu Mbaga

---

## Learning Objectives

By the end of this lecture, you should be able to:

- Define what a digital image is and describe it mathematically
- Explain how a continuous scene is converted into a digital image
- Identify the fundamental steps in a digital image processing pipeline
- List the major components of an image processing system
- Recognise real-world applications of digital image processing

---

## Course Overview

This course covers the full digital image processing pipeline across eight major topics:

| # | Topic |
|---|-------|
| 1 | Introduction & Digital Image Fundamentals *(this lecture)* |
| 2 | Digital Image Representation |
| 3 | Image Enhancement in the Spatial Domain |
| 4 | Image Enhancement in the Frequency Domain |
| 5 | Image Restoration |
| 6 | Image Compression |
| 7 | Image Segmentation |
| 8 | Object Recognition |

Each topic builds on the previous. A firm grasp of the fundamentals here — what an image is, how it is formed, and how it is stored — underpins everything else in the course.

---

## 1. What is an Image?

An image is a **two-dimensional function** \\\\(f(x, y)\\\\) where:

- \\\\(x\\\\) and \\\\(y\\\\) are the **spatial coordinates** (horizontal and vertical position)
- The value \\\\(f(x, y)\\\\) at any point is the **intensity** (brightness) at that location

> In simpler terms: an image is a grid of measurements. Each measurement tells you how bright — or what colour — a particular point in the scene is.

### Key properties

**Intensity and gray level.** For monochrome (black-and-white) images, the value \\\\(f(x, y)\\\\) represents brightness. This is often called the **gray level**. The two terms are interchangeable for monochrome images.

**Colour images.** A colour image is not a single function but a combination of three separate 2D functions — one each for red, green, and blue in the RGB model. Every technique developed for monochrome images can generally be applied to colour images by processing each colour channel individually.

**Continuous vs digital.** A photograph of the real world is continuous — coordinates and intensity can take any value. To process it on a computer, both must be made discrete through **sampling** and **quantization** (covered in Section 3 below).

---

> ### Key Terms
>
> | Term | Definition |
> |------|------------|
> | **Image** | A 2D function \\\\(f(x, y)\\\\) mapping spatial coordinates to intensity values |
> | **Intensity** | The amplitude of \\\\(f\\\\) at a given coordinate — represents brightness |
> | **Gray level** | Another name for intensity in a monochrome (single-channel) image |
> | **Pixel** | A single element of a digital image — short for *picture element* |
> | **Spatial coordinates** | The \\\\(x, y\\\\) position of a pixel within the image grid |
> | **RGB** | Red-Green-Blue colour model — a colour image as three intensity layers |

---

## 2. How a Digital Image is Formed

A digital image does not exist naturally — it must be created by capturing and converting energy from the real world. The process has three stages.

### Stage 1 — Energy and sensing

A source of energy (commonly sunlight, but also X-rays, infrared, or radar) illuminates or passes through a scene. The object reflects or transmits some of that energy. A **sensor array** — a grid of tiny light-sensitive elements — detects the reflected energy and converts it into continuous electrical voltage signals. The stronger the reflected light at a point, the higher the voltage.

### Stage 2 — Sampling (space discretisation)

The continuous voltage signal from the sensor covers a continuous spatial area. Sampling divides that area into a finite grid of locations. Each location becomes one pixel. The density of this grid is the **spatial resolution** of the image.

> **Analogy:** Imagine covering a painting with a net. Each cell of the net captures one colour value. A finer net (more cells) gives a more accurate reproduction; a coarser net loses detail.

### Stage 3 — Quantization (intensity discretisation)

At each sampled location, the continuous voltage must be rounded to one of a finite set of allowed values. This is quantization. The number of allowed values is determined by the **bit depth**:

- **1-bit:** 2 levels (pure black or pure white)
- **8-bit:** 256 levels (standard for grayscale images)
- **24-bit:** 16.7 million colours (standard for RGB images: 8 bits x 3 channels)

The result of sampling and quantization is a **2D matrix of integers** — a digital image.

---

> ### Key Terms
>
> | Term | Definition |
> |------|------------|
> | **Sampling** | Dividing the continuous image area into a finite grid of pixel locations |
> | **Quantization** | Rounding continuous intensity values to discrete integer levels |
> | **Spatial resolution** | The number of pixels per unit area — determines how much fine detail is captured |
> | **Bit depth** | Number of bits used to store each pixel's intensity — determines how many grey/colour levels are possible |
> | **Sensor array** | A grid of energy-sensitive elements used to capture the scene |

---

{{interactive: sampling-quantization}}

---

## 3. Digital Image Processing

**Digital image processing** is the manipulation of digital images using a computer. Because an image is a matrix of numbers, any mathematical operation that can be applied to a matrix can, in principle, be applied to an image.

The field sits at the intersection of signal processing, computer science, and optics. Its outputs fall into two broad categories:

1. **Images as output** — the processed result is another image (e.g., a denoised or sharpened photograph)
2. **Attributes as output** — the processed result is information extracted from the image (e.g., the number of cells in a microscope slide, or the presence of a tumour)

---

## 4. Fundamental Processing Steps

A complete image processing pipeline consists of the following steps, not always all used, and not always in this exact order. Think of them as tools in a toolbox.

### Steps that produce images

| Step | What it does | Example |
|------|-------------|---------|
| **Image Acquisition** | Captures or receives the raw digital image | Camera sensor, MRI scanner, satellite download |
| **Image Enhancement** | Improves subjective appearance — makes detail more visible | Brightening a dark photo, sharpening edges |
| **Image Restoration** | Objectively reconstructs a degraded image using a model | Removing motion blur from a photo |
| **Colour Processing** | Manipulates colour models and colour channels | Converting RGB to HSV for better segmentation |
| **Wavelet Processing** | Represents images at multiple resolutions | JPEG 2000 compression, texture analysis |
| **Compression** | Reduces file size for storage or transmission | JPEG (lossy), PNG (lossless) |
| **Morphological Processing** | Extracts shapes and structural features | Counting cells, measuring grain sizes |

### Steps that produce attributes

| Step | What it does | Example |
|------|-------------|---------|
| **Segmentation** | Partitions the image into meaningful regions | Separating foreground from background |
| **Representation & Description** | Converts regions to numerical features | Boundary length, texture coefficients |
| **Recognition** | Assigns a label to a detected object | "This region is a tumour" / "This digit is a 5" |
| **Knowledge Base** | Domain knowledge used to guide or validate results | A database of known defect types in manufacturing |

> **Important distinction:** Enhancement is *subjective* — it makes an image look better to a human viewer. Restoration is *objective* — it attempts to reverse a known degradation process using a mathematical model.

---

> ### Key Terms
>
> | Term | Definition |
> |------|------------|
> | **Enhancement** | Subjective improvement of image appearance for human viewing |
> | **Restoration** | Objective reconstruction of a degraded image using a degradation model |
> | **Segmentation** | Partitioning an image into regions that share a property (colour, texture, intensity) |
> | **Morphological processing** | Shape-based operations using set theory — extracts structural information |
> | **Knowledge base** | Domain-specific information used to guide processing decisions |

---

## 5. Components of an Image Processing System

A complete system for digital image processing requires several hardware and software components working together.

### Hardware components

**Image sensors** are the input devices. They require two elements: a physical sensor sensitive to the energy being measured (light, X-ray, infrared), and an analogue-to-digital converter to digitise the output.

**Specialised image processing hardware** handles the high-bandwidth operations that general CPUs handle slowly. This includes dedicated digitiser chips and arithmetic logic units that can perform pixel-level operations (addition, subtraction, logical AND/OR) in parallel across an entire image.

**The computer** runs the processing software. The range is wide — a smartphone for consumer apps, a workstation for medical imaging, a supercomputer cluster for satellite data processing.

**Mass storage** is essential because image files are large. A single uncompressed 1024x1024 grayscale image requires 1 MB. Medical datasets and satellite archives can run into terabytes. Storage is organised at three levels:

- *Short-term:* RAM — fast, used during active processing
- *Online:* SSD or HDD — for quick retrieval of working datasets
- *Archival:* Tape or optical storage — for long-term, infrequent-access storage

**Image display** converts the numerical array back to a visible output. Modern displays are colour monitors driven by graphics cards. The display quantization must be sufficient for the task — an 8-bit display is adequate for most photography but insufficient for high-dynamic-range medical imaging.

**Hardcopy devices** produce permanent printed output: laser printers, film recorders, and CD/DVD writers.

**Networking** connects all components. Because images carry large amounts of data, network bandwidth is a key design consideration in any distributed image processing system.

### Software

Software consists of specialised modules performing specific functions (filtering, segmentation, feature extraction). A well-designed package exposes these as composable building blocks so users can chain them into custom pipelines.

The **MATLAB Image Processing Toolbox (IPT)** is the reference environment used in this course. It provides hundreds of ready-made functions and an interactive environment for rapid prototyping.

---

## 6. Applications of Digital Image Processing

Digital image processing appears in virtually every field of science, engineering, and industry.

### Medicine
X-ray enhancement, MRI reconstruction, ultrasound denoising, cell counting in pathology, tumour detection, retinal analysis.

### Remote sensing and Earth observation
Satellite imagery for crop prediction, urban growth mapping, flood and fire monitoring, geological survey, weather forecasting.

### Security and surveillance
CCTV systems, face recognition, automated number plate reading, perimeter intrusion detection.

### Industrial automation
Quality control on production lines (detecting defects in manufactured parts), robotic vision for pick-and-place operations.

### Communications
Image and video compression for broadcast television, video conferencing, and internet streaming. Facsimile transmission.

### Defence and space exploration
Radar (RADAR — Radio Detection and Ranging) and sonar (SONAR — Sound Navigation and Ranging) image processing. Analysis of images from deep-space probes.

### Acoustics
**Acoustic image processing** reconstructs images from sound waves — used in underwater imaging (hydroacoustics) and structural non-destructive testing.

---

## Summary

The key ideas from this lecture:

1. A digital image is a 2D matrix of integer values representing sampled and quantized intensity measurements.
2. Forming a digital image requires three steps: energy sensing, spatial sampling, and intensity quantization.
3. Bit depth and spatial resolution together determine the information content of a digital image.
4. The image processing pipeline has two output types: processed images and extracted attributes.
5. A complete image processing system combines specialised hardware (sensors, processing hardware, storage) with software toolboxes.

---

## Further Reading

- Gonzalez, R. C., & Woods, R. E. *Digital Image Processing*, 4th ed. — Chapters 1 & 2.
- Pratt, W. K. *Digital Image Processing*. Wiley.
- MATLAB Image Processing Toolbox documentation: [mathworks.com/help/images](https://www.mathworks.com/help/images/)
`

// ─── Lecture 2 ─────────────────────────────────────────────────────────────

export const L2_Intensity_Transformations_Spatial_Filtering = `# Lecture 2: Intensity Transformations & Spatial Filtering
**Course:** Image, Video and Speech Processing · **Lecturer:** Mr. Ayubu Mbaga · 10 April 2025

---

## Learning Objectives

By the end of this lecture, you should be able to:

- Explain what the spatial domain is and why it matters
- Apply intensity transformation functions including gamma, log, and contrast stretching
- Describe how image histograms are built and what they reveal
- Perform histogram equalization and explain when CLAHE is preferred
- Distinguish between linear and nonlinear spatial filtering
- Explain the difference between correlation and convolution

---

## Introduction

Processing an image in the **spatial domain** means working directly on the pixel values themselves — no transformation to another mathematical space is required. This makes spatial domain methods intuitive and computationally efficient.

This lecture covers two closely related families of spatial domain techniques:

- **Intensity (gray-level) transformations** — operations applied to individual pixels one at a time, based only on their current value
- **Spatial filtering** — operations applied to each pixel based on the values of its surrounding neighbours

Understanding both is essential before moving to frequency domain techniques in later lectures, because many spatial operations have direct frequency-domain equivalents that become easier to understand once you have seen the spatial version first.

---

## 1. The Spatial Domain Framework

### The operator model

All spatial domain processing can be expressed as:

\\( g(x, y) = T[ f(x, y) ] \\)

Where:
- \\\\(f(x, y)\\\\) — the **input image**
- \\\\(g(x, y)\\\\) — the **output image**
- \\\\(T\\\\) — an **operator** defined over a neighbourhood around point \\\\(x, y\\\\)

### How the neighbourhood works

The operator \\\\(T\\\\) is evaluated at every pixel location in the image. At each location \\\\(x, y\\\\), a small rectangular window (the **neighbourhood**) is centred on that pixel. \\\\(T\\\\) uses the pixel values inside that window to compute the output value at \\\\(x, y\\\\).

The window slides across the image from the top-left corner to the bottom-right, one pixel at a time. This is sometimes called **convolution** or **neighbourhood processing**.

### Two special cases

When the neighbourhood is just **one pixel** (the pixel itself), \\\\(T\\\\) reduces to:

\\( s = T(r) \\)

where \\\\(r\\\\) is the input intensity and \\\\(s\\\\) is the output intensity. This is an **intensity transformation** — the output depends only on the value at that single point, not on any neighbours.

When the neighbourhood is **larger than one pixel**, \\\\(T\\\\) must look at surrounding pixels too. This is **spatial filtering**.

---

> ### Key Terms
>
> | Term | Definition |
> |------|------------|
> | **Spatial domain** | The image plane — working directly on pixel coordinates and values |
> | **Operator T** | A function that maps an input intensity (or neighbourhood) to an output value |
> | **Neighbourhood** | The set of pixels surrounding a central pixel, used in filtering |
> | **Intensity transformation** | A mapping \\\\(s = T(r)\\\\) — output depends only on input pixel value, not neighbours |
> | **Spatial filtering** | Output at each pixel depends on a neighbourhood of surrounding pixels |

---

## 2. Intensity Transformation Functions

### 2.1 The gamma (power-law) transformation

The **gamma transformation** maps input intensity \\\\(r\\\\) to output intensity \\\\(s\\\\) using a power function:

\\( s = c \\cdot r^y \\)

Where \\\\(c\\\\) is a positive constant (usually 1) and \\\\(y\\\\) (gamma) controls the shape of the curve.

| Gamma value | Effect |
|-------------|--------|
| \\\\(y < 1\\\\) | Expands dark tones — brightens the image |
| \\\\(y = 1\\\\) | Linear mapping — image is unchanged |
| \\\\(y > 1\\\\) | Compresses dark tones — darkens the image |

> **Why this matters:** Camera sensors and display monitors do not respond to light linearly. Gamma correction compensates for this non-linearity. When you adjust "brightness" in a photo editor, you are almost always applying a gamma transformation.

In MATLAB's Image Processing Toolbox, gamma is applied via \\\\(imadjust\\\\):

\\( g = imadjust(f, [low_in high_in], [low_out high_out], gamma) \\)

Setting \\\\[low_in high_in]\\\\ to \\\\[0 1]\\\\ and \\\\[low_out high_out]\\\\ to \\\\[0 1]\\\\ applies pure gamma with no range clipping.

---

{{interactive: gamma-correction}}

---

### 2.2 The logarithmic transformation

\\( g = c \\cdot log(1 + f) \\)

The logarithm compresses a very wide range of input values into a narrower output range. It is especially useful when the image has a few very bright pixels that would otherwise dominate the display.

> **Classic use case:** The magnitude spectrum of a Fourier transform has values ranging over many orders of magnitude. Without log compression, the high-frequency components are invisible. Applying the log transform makes the full spectrum visible.

After applying the log transform in MATLAB, the result must be scaled back to the display range:

\\( g  = c * log(1 + double(f)) \\)
\\( gs = im2uint8(mat2gray(g)) \\)

---

{{interactive: log-transform}}

---

### 2.3 Contrast stretching

**Contrast stretching** takes a narrow band of input intensities and maps it to a wider output range. If an image uses only, say, levels 80-120 out of a possible 0-255, contrast stretching redistributes those values across the full 0-255 range, making the image appear much higher in contrast.

\\( stretchlim\\\\) in MATLAB automatically finds the appropriate input limits by analysing the image histogram:

\\( limits = stretchlim(f) \\)
\\( g      = imadjust(f, limits, []) \\)

---

> ### Key Terms
>
> | Term | Definition |
> |------|------------|
> | **Gamma (y)** | The exponent in the power-law transformation — controls tonal curve shape |
> | **Log transformation** | \\\\(g = c\\cdotlog(1+f)\\\\) — compresses high-intensity dynamic range |
> | **Contrast stretching** | Expanding a narrow intensity range to span the full available range |
> | **Dynamic range** | The ratio between the maximum and minimum intensity values in an image |
> | **imadjust** | MATLAB function for intensity transformations including gamma and range mapping |

---

## 3. Image Histograms

### What is a histogram?

An **image histogram** is a bar chart that counts how many pixels in the image have each possible intensity value. For an 8-bit grayscale image, there are 256 possible values (0-255), so the histogram has 256 bars.

Formally, for an image with \\\\(L\\\\) total intensity levels in the range \\\\[0, G]\\\\:

\\( h(r_k) = n_k \\)

Where \\\\(r_k\\\\) is intensity level \\\\(k\\\\) and \\\\(n_k\\\\) is the number of pixels with that intensity.

In MATLAB:

\\( h = imhist(f, b) \\)

### What the histogram tells you

| Histogram shape | What it means |
|----------------|---------------|
| Concentrated toward left | Dark image — underexposed |
| Concentrated toward right | Bright image — overexposed |
| Narrow peak in the middle | Low contrast — limited dynamic range |
| Wide, spread distribution | High contrast — full dynamic range used |
| Multiple distinct peaks | Multiple distinct regions (e.g., background + object) |

The histogram is a powerful diagnostic tool. Before applying any enhancement, inspect the histogram to understand what problem you are solving.

---

## 4. Histogram Equalization

**Histogram equalization** redistributes the pixel intensities so the histogram becomes approximately flat (uniform). The result is a full-contrast image that uses the entire available intensity range.

The transformation is defined using the **cumulative distribution function (CDF)** of the histogram:

\\( s_k = (L - 1) \\cdot \\sum p(r_j) \\)

Where \\\\(p(r_j) = n_j / N\\\\) is the probability of intensity \\\\(r_j\\\\) and \\\\(N\\\\) is the total number of pixels.

In MATLAB:

\\( g = histeq(f, 256) \\)

> **When to use it:** Histogram equalization works best on images with a narrow intensity distribution (low contrast) where the histogram is bunched up toward one end. It does not work well on images that are already high-contrast or that have multimodal histograms (multiple distinct peaks).

---

{{interactive: histogram-equalize}}

---

## 5. CLAHE — Contrast-Limited Adaptive Histogram Equalization

Global histogram equalization applies the same transformation to every pixel. This can cause problems in images where different regions have very different lighting — the dark regions may improve while the already-bright regions become overexposed and washed out.

**CLAHE** (Contrast-Limited Adaptive Histogram Equalization) solves this by:

1. Dividing the image into small rectangular **tiles**
2. Performing histogram equalization **independently** on each tile
3. Recombining tiles using **bilinear interpolation** to avoid sharp boundaries between them
4. Applying a **clip limit** — any histogram bar that exceeds this limit is redistributed, preventing over-amplification of noise

\\( g  = adapthisteq(f) \\)
\\( g2 = adapthisteq(f, 'NumTiles', [25 25]) \\)

A higher clip limit = more aggressive contrast enhancement but more noise amplification. Start with the default and adjust.

---

{{interactive: clahe}}

---

> ### Key Terms
>
> | Term | Definition |
> |------|------------|
> | **Histogram** | A count of how many pixels have each intensity value |
> | **CDF** | Cumulative Distribution Function — the running sum of histogram probabilities |
> | **Histogram equalization** | Remapping intensities so the CDF becomes linear (histogram becomes flat) |
> | **CLAHE** | Adaptive histogram equalization on local tiles with a noise-limiting clip threshold |
> | **Clip limit** | Maximum height of a histogram bar before redistribution — controls CLAHE aggressiveness |
> | **Bilinear interpolation** | Smooth blending between adjacent tile equalization results |

---

## 6. Spatial Filtering

Spatial filtering goes beyond single-pixel transformations. The output at each pixel is computed from the values of the pixel **and its neighbours**. This makes it possible to detect patterns, blur detail, sharpen edges, and remove noise — operations that are fundamentally relational between neighbouring pixels.

### How spatial filtering works

A small matrix called the **kernel** (also called a filter, mask, or window) slides over the image. At each position, the kernel is aligned with a neighbourhood of pixels. An operation is performed between the kernel values and the neighbourhood pixel values to produce the output.

Two categories:

### 6.1 Linear spatial filtering

In **linear spatial filtering**, the output is a weighted sum of neighbourhood pixel values:

\\( g(x, y) = \\sum \\sum w(s, t) \\cdot f(x+s, y+t) \\)

Where \\\\(w(s, t)\\\\) are the kernel coefficients and the sum is over all positions \\\\(s, t\\\\) in the kernel.

This operation is called **correlation** when the kernel slides over the image as-is.

It is called **convolution** when the kernel is rotated 180° before sliding. For symmetric kernels (like a Gaussian), correlation and convolution give identical results.

\\( g = imfilter(f, w, filtering_mode, boundary_options, size_options) \\)

#### Common linear filters

**Averaging (box) filter** — all kernel values equal \\\\(1/(kernel size)\\\\). Smooths the image by replacing each pixel with the average of its neighbourhood. Reduces noise but blurs edges.

**Gaussian filter** — kernel values follow a 2D Gaussian bell curve. Produces smoother blurring than the box filter because nearby pixels contribute more than distant ones.

**Sharpening filter (Laplacian-based)** — emphasises the centre pixel relative to its neighbours. Enhances edges and fine detail.

---

{{interactive: gaussian-blur}}

---

{{interactive: sharpen}}

---

### 6.2 Nonlinear spatial filtering

**Nonlinear spatial filtering** uses the same sliding-window mechanics but replaces the weighted sum with a nonlinear operation — typically sorting or ranking the neighbourhood values.

The most important nonlinear filter for this course is the **median filter**.

**Median filter** — replaces each pixel with the **median** (middle value) of its neighbourhood. To compute it:

1. Collect all pixel values in the neighbourhood into a list
2. Sort the list
3. Take the middle value
4. Write that value as the output pixel

> **Why the median beats the mean for impulse noise:** A single outlier pixel (e.g., a "salt" or "pepper" spike) cannot move the median much, but it can dramatically shift the mean. The median filter is the standard tool for removing salt-and-pepper noise.

\\( g = medfilt2(f, [m n]) \\)

---

{{interactive: median-filter}}

---

> ### Key Terms
>
> | Term | Definition |
> |------|------------|
> | **Kernel** | A small matrix of coefficients that defines how neighbouring pixels are combined |
> | **Correlation** | Sliding a kernel over an image and computing weighted sums at each position |
> | **Convolution** | Same as correlation but the kernel is rotated 180° before sliding |
> | **Linear filter** | Output is a weighted sum of neighbourhood pixel values |
> | **Nonlinear filter** | Output is a nonlinear function of neighbourhood values (e.g., median, min, max) |
> | **Averaging filter** | Replaces each pixel with the mean of its neighbourhood — smooths and blurs |
> | **Gaussian filter** | Distance-weighted averaging using a bell-curve kernel — softer blur than box filter |
> | **Median filter** | Replaces each pixel with the median of its neighbourhood — removes impulse noise |

---

## 7. Choosing the Right Tool

| Goal | Recommended method |
|------|--------------------|
| Brighten a dark image | Gamma correction \\\\(y < 1\\\\) or histogram equalization |
| Compress bright highlights | Logarithmic transformation |
| Improve local contrast in uneven lighting | CLAHE |
| Smooth out random (Gaussian) noise | Gaussian filter or averaging filter |
| Remove salt-and-pepper (impulse) noise | Median filter |
| Sharpen blurry edges | Laplacian-based sharpening filter |

> **Rule of thumb:** If you need to preserve edges while reducing noise, prefer the median filter over any linear filter. Linear filters blur edges because they average across boundaries.

---

## Summary

- The spatial domain operates directly on pixel values.
- Intensity transformations map each pixel's value independently: \\\\(s = T(r)\\\\).
- Gamma correction and log transforms reshape the tonal distribution.
- Image histograms reveal exposure, contrast, and tonal distribution.
- Histogram equalization spreads intensities for full-contrast output; CLAHE does this locally to handle uneven lighting.
- Linear spatial filters use weighted sums — useful for smoothing and sharpening.
- Nonlinear filters (especially the median) use ranking operations — better for impulse noise removal.

---

## Further & Self Reading

- **Self-Study:** Fuzzy Techniques for Intensity Transformations and Spatial Filtering
- Gonzalez, R. C., & Woods, R. E. *Digital Image Processing*, 4th ed. — Chapter 3.
- MATLAB \\\\(imadjust\\\\), \\\\(histeq\\\\), \\\\(adapthisteq\\\\), \\\\(imfilter\\\\), \\\\(medfilt2\\\\) documentation.
`

// ─── Lecture 3 ─────────────────────────────────────────────────────────────

export const L3_Image_Restoration_Segmentation = `# Lecture 3: Image Restoration & Segmentation
**Course:** Image, Video and Speech Processing · **Lecturer:** Mr. Ayubu Mbaga · 22 May 2025

---

## Learning Objectives

By the end of this lecture, you should be able to:

- Distinguish image restoration from image enhancement and explain why the distinction matters
- Describe the degradation model and express it mathematically in both spatial and frequency domains
- Identify and characterise the main noise models: Gaussian, Rayleigh, and impulse
- Apply mean and median filters for noise-only restoration and compare their trade-offs
- Explain edge detection as a segmentation technique and describe the search-based and zero-crossing approaches
- Apply global, adaptive, and Otsu thresholding
- Describe region growing segmentation and evaluate its advantages and limitations

---

## Introduction

This lecture covers two closely related but conceptually distinct topics: **image restoration** and **image segmentation**.

Restoration asks: *the image I have is damaged — how do I recover what it should look like?*
Segmentation asks: *how do I partition this image into meaningful regions?*

Both require understanding the image's content, not just its raw pixel values. They represent the shift from low-level processing (manipulating pixels) to mid-level processing (making sense of image structure).

---

## Part 1 — Image Restoration

### 1.1 What is image restoration?

**Image restoration** is the process of recovering an image that has been degraded — blurred, corrupted by noise, or distorted by the imaging system. Unlike enhancement, which is judged subjectively ("does this look better?"), restoration is an **objective process** guided by a mathematical model.

The goal is to estimate the original image \\\\(f(x, y)\\\\) given:
- The observed degraded image \\\\(g(x, y)\\\\)
- Knowledge (or an estimate) of the degradation process

This is fundamentally different from enhancement. When you sharpen a blurry photo to make it look better for a client, that is enhancement. When a forensic laboratory uses known camera blur parameters to mathematically reverse the blur to recover what was actually in a security camera image, that is restoration.

---

> ### Key Terms
>
> | Term | Definition |
> |------|------------|
> | **Restoration** | Objective recovery of a degraded image using a mathematical degradation model |
> | **Enhancement** | Subjective improvement of image appearance without a degradation model |
> | **Degradation** | Any process that reduces the quality or accuracy of an image |
> | **A priori knowledge** | Information about the degradation known before processing begins |
> | **Degradation function H** | The mathematical operator that models how the original image was corrupted |

---

### 1.2 Sources of degradation

Real-world images are degraded by many physical factors:

| Category | Examples |
|----------|---------|
| **Acquisition** | Sensor noise, lens aberrations, diffraction limits, detector saturation |
| **Motion** | Camera shake during exposure, moving subjects, vibration |
| **Atmospheric** | Turbulence, haze, fog, rain — common in satellite and remote sensing images |
| **Electronic** | Transmission channel errors, quantization noise, compression artefacts |
| **Optical** | Defocus (camera misfocus), lens distortion |

Understanding the source of degradation is essential — the restoration algorithm you choose depends on what caused the degradation.

---

### 1.3 The degradation model

The standard linear model for image degradation is:

**Spatial domain:**
\\( g(x, y) = f(x, y) * h(x, y) + \\eta(x, y) \\)

**Frequency domain:**
\\( G(u, v) = F(u, v) \\cdot H(u, v) + N(u, v) \\)

Where:
- \\\\(f(x, y)\\\\) / \\\\(F(u, v)\\\\) — the original (undegraded) image
- \\\\(h(x, y)\\\\) / \\\\(H(u, v)\\\\) — the **point spread function** (PSF) or degradation function
- \\\\(\\eta(x, y)\\\\) / \\\\(N(u, v)\\\\) — additive noise
- \\\\(g(x, y)\\\\) / \\\\(G(u, v)\\\\) — the observed degraded image
- \\\\(*\\\\) denotes **convolution** in the spatial domain

The frequency domain form uses multiplication instead of convolution because the Fourier transform converts convolution into multiplication. This is why many restoration algorithms work in the frequency domain — it is mathematically simpler.

**The restoration problem** is: given \\\\(g(x, y)\\\\), \\\\(h(x, y)\\\\), and some model of \\\\(\\eta\\\\), estimate \\\\(f(x, y)\\\\).

---

### 1.4 Noise models

Noise is characterised by its **probability density function (PDF)** — the statistical distribution that describes the likelihood of any particular noise value occurring.

#### Gaussian noise

The most commonly modelled noise type. Arises from thermal agitation of electrons in sensor circuitry.

\\( p(z) = 1/(\\sqrt{2\\pi}\\sigma) \\cdot e^{-(z-\\mu)^2/2\\sigma^2} \\)

Where \\\\(z\\\\) is the gray level, \\\\(\\mu\\\\) is the mean, and \\\\(\\sigma\\\\) is the standard deviation.

Gaussian noise is symmetric around the mean and tractable in both spatial and frequency domains — which is why most noise analysis uses it as the default model.

> **Interpretation:** If \\\\(\\mu = 0\\\\), the noise adds zero on average but randomly perturbs each pixel up or down. A larger \\\\(\\sigma\\\\) means bigger random perturbations — noisier image.

---

{{interactive: gaussian-noise}}

---

#### Rayleigh noise

An **asymmetric** noise distribution that models noise in range images and radar systems.

\\( p(z) = (2/b)(z - a) \\cdot e^{-(z-a)^2/b} \\)

The distribution starts at \\\\(a\\\\) and has a right tail. Unlike Gaussian noise, it cannot produce values below the minimum \\\\(a\\\\).

#### Impulse noise (salt-and-pepper)

**Impulse noise** replaces individual pixels with either the maximum intensity value (255 — "salt", white) or the minimum (0 — "pepper", black). Its bipolar PDF is:

\\( p(z) = Pa \\) if \\\\(z = a\\\\) (dark/pepper dot)
\\( p(z) = Pb \\) if \\\\(z = b\\\\) (light/salt dot)
\\( p(z) = 0 \\) otherwise

Where \\\\(b > a\\\\). The density parameter controls what fraction of pixels are corrupted.

> **Why it looks the way it does:** Because individual pixels are set to extreme values, salt-and-pepper noise produces scattered white and black dots on the image — random isolated speckles rather than a uniform graininess.

---

{{interactive: salt-pepper}}

---

> ### Key Terms
>
> | Term | Definition |
> |------|------------|
> | **PDF** | Probability Density Function — describes the likelihood of each noise value occurring |
> | **Gaussian noise** | Symmetric bell-curve noise — models thermal/electronic sensor noise |
> | **Rayleigh noise** | Asymmetric noise — common in radar and range imaging systems |
> | **Impulse noise** | Random pixels set to extreme (min/max) values — produces "salt" and "pepper" dots |
> | **Salt-and-pepper** | Common name for bipolar impulse noise — white dots (salt) and black dots (pepper) |
> | **Noise density** | The fraction of pixels affected by impulse noise |

---

### 1.5 Restoration filters (noise only)

When the degradation is **purely additive noise** — no blur — the model simplifies to:

\\( g(x, y) = f(x, y) + \\eta(x, y) \\)

We cannot subtract the noise directly because \\\\(\\eta(x, y)\\\\) is random and unknown at each pixel. Instead, we use spatial filters that exploit the statistical properties of noise.

#### Arithmetic mean filter

Replaces each pixel with the **average** of all pixels in its neighbourhood \\\\(S_{xy}\\\\):

\\( f\\hat(x, y) = (1/mn) \\cdot \\sum g(s, t) \\)

Where \\\\(m \\times n\\\\) is the neighbourhood size. The averaging process cancels out zero-mean random noise — but it also blurs genuine edges because edges are high-frequency features that averaging suppresses.

#### Geometric mean filter

Replaces each pixel with the **geometric mean** of neighbourhood values:

\\( f\\hat(x, y) = [ \\prod g(s, t) ]^{1/mn} \\)

Produces less blurring than the arithmetic mean while achieving similar noise reduction. However, a single zero-valued pixel in the neighbourhood drives the geometric mean to zero — making it poorly suited for images with true black pixels or severe impulse noise.

#### Median filter

Replaces each pixel with the **median** value from its neighbourhood — the value that falls exactly in the middle when all neighbourhood values are sorted.

The median filter is the best choice for salt-and-pepper noise because:
- Extreme outliers (the 0 and 255 spikes) cannot influence the median as long as they are not the majority
- Edges are preserved better than with any linear filter because the median is insensitive to isolated extremes

---

> ### Key Terms
>
> | Term | Definition |
> |------|------------|
> | **Arithmetic mean filter** | Replaces pixels with neighbourhood average — smooths Gaussian noise but blurs edges |
> | **Geometric mean filter** | Replaces pixels with neighbourhood geometric mean — less blurring than arithmetic |
> | **Median filter** | Replaces pixels with neighbourhood median — excellent for impulse noise, edge-preserving |
> | **Order statistic filter** | Any filter whose output is based on ranking neighbourhood values (median, min, max) |

---

## Part 2 — Image Segmentation

**Segmentation** partitions an image into regions that are meaningfully different from each other. The goal is to change an image from "a grid of pixel values" into "a set of objects and background."

There are three main approaches:
1. **Edge-based** — find the boundaries between regions
2. **Threshold-based** — classify pixels by their intensity value
3. **Region-based** — grow regions from seed pixels outward

---

### 2.1 Edge detection

Edges are locations where image intensity changes abruptly. They correspond to physically meaningful boundaries: depth changes, surface orientation changes, material boundaries, illumination boundaries.

Two important edge properties:

| Property | Description |
|----------|-------------|
| **Viewpoint independent** | Reflects real 3D surface properties (shape, markings) — stable across viewpoints |
| **Viewpoint dependent** | Changes with viewpoint (occlusion boundaries, silhouettes) |

#### Approach 1: Search-based (gradient/first-derivative)

1. Compute the **gradient magnitude** (edge strength) at each pixel — the magnitude of the first derivative of the intensity function
2. Search for pixels where the gradient is locally maximum in the gradient direction
3. Apply a threshold to classify these maxima as edges or non-edges

The gradient magnitude indicates *how strong* an edge is. The gradient direction indicates the direction perpendicular to the edge.

#### Approach 2: Zero-crossing (second-derivative)

1. Compute the **second derivative** (Laplacian) of the intensity function
2. Find pixels where the second derivative crosses zero — these correspond to intensity inflection points, which occur at the centre of edges

The Laplacian-of-Gaussian (LoG) filter is the standard implementation: smooth with a Gaussian first (to suppress noise), then compute the Laplacian.

#### Edge thinning and thresholding

After edge detection, raw edge maps contain thick edges (multiple pixels wide) and spurious responses from noise. Two post-processing steps clean them up:

**Thresholding** — a pixel is labelled as an edge only if its gradient magnitude exceeds a threshold. A lower threshold captures more edges but also more noise. Canny's method uses *two* thresholds (hysteresis): a high threshold to start edges and a lower threshold to continue them — this connects genuine edges without noise contamination.

**Edge thinning** — non-maximum suppression removes pixels that are not local maxima in their gradient direction. The result is edges exactly one pixel wide — essential for subsequent operations like the Hough transform and perimeter measurement.

---

{{interactive: edge-detection}}

---

> ### Key Terms
>
> | Term | Definition |
> |------|------------|
> | **Edge** | A location of abrupt intensity change — corresponds to a physical boundary |
> | **Gradient magnitude** | The rate of change of intensity — indicates edge strength |
> | **Gradient direction** | The direction of steepest intensity increase — perpendicular to the edge |
> | **Laplacian** | Second derivative of intensity — zero-crossings locate edge centres |
> | **LoG** | Laplacian of Gaussian — smooth then second-derivative for noise-robust edge detection |
> | **Non-maximum suppression** | Keeping only pixels that are local maxima in their gradient direction — thins edges to 1 pixel |
> | **Hysteresis thresholding** | Using two thresholds to start and continue edges — Canny's approach |

---

### 2.2 Thresholding

**Thresholding** is the simplest segmentation method. It converts a grayscale image into a binary image by comparing each pixel against a threshold value \\\\(T\\\\):

\\( g(x, y) = 255 \\) if \\\\(f(x, y) > T\\\\) (object/foreground)
\\( g(x, y) = 0 \\) if \\\\(f(x, y) \\leq T\\\\) (background)

This assumes the object is brighter than the background. If the opposite is true, the inequality is reversed.

#### Global thresholding

A single threshold \\\\(T\\\\) is applied to the entire image. Works well when:
- The illumination is uniform
- There is a clear valley in the histogram between the object and background peaks
- The image has low noise

The mean or median pixel value is often a good starting point for \\\\(T\\\\).

#### Otsu's method (automatic global thresholding)

Otsu's method automatically finds the optimal threshold by maximising the **between-class variance** — the variance between the object and background pixel populations. It examines every possible threshold value and picks the one that creates the greatest separation between the two groups.

Otsu's method requires no manual input and works well for bimodal histograms (two clear peaks).

#### Adaptive (local) thresholding

Global thresholding fails when illumination varies across the image — the optimal threshold in one region is very different from the optimal threshold in another.

**Adaptive thresholding** computes a different threshold for each pixel based on the local neighbourhood statistics (local mean, local variance). It handles:
- Uneven illumination
- Images where object and background intensities overlap globally but separate locally
- Documents with varying background colour

---

{{interactive: threshold}}

---

> ### Key Terms
>
> | Term | Definition |
> |------|------------|
> | **Thresholding** | Classifying pixels as object or background based on intensity vs a threshold value |
> | **Binary image** | An image with only two intensity values — typically 0 (black) and 255 (white) |
> | **Global threshold** | A single \\\\(T\\\\) applied to the whole image |
> | **Otsu's method** | Automatic threshold selection by maximising between-class variance |
> | **Adaptive threshold** | A spatially varying threshold — computed from local neighbourhood statistics |
> | **Between-class variance** | Statistical measure of separation between two groups — maximised by Otsu's method |

---

### 2.3 Region growing

**Region growing** is a segmentation technique that builds regions by starting from one or more **seed points** and expanding outward by adding neighbouring pixels that are similar to the current region.

#### How it works

1. **Select seed points** — pixels that are definitely inside the target object
2. **Define a similarity criterion** — e.g., intensity difference less than a threshold \\\\(T\\\\):
   \\\\(|I(x, y) - I(seed)| < T\\\\)
3. **Expand** — for each pixel currently in the region, examine its 4 or 8 neighbours. Add any neighbour that meets the similarity criterion.
4. **Repeat** until no further pixels qualify for addition
5. **Output** — a binary mask or labelled map showing the segmented region

#### 4-connectivity vs 8-connectivity

| Type | Neighbours examined |
|------|---------------------|
| **4-connected** | Up, down, left, right — 4 neighbours |
| **8-connected** | All 8 surrounding pixels including diagonals |

8-connectivity creates rounder, more complete regions but can "leak" through diagonal gaps.

#### Advantages and limitations

| Advantage | Limitation |
|-----------|------------|
| Correctly segments regions with well-defined, uniform properties | Computationally expensive for large images |
| Handles irregular, non-convex boundaries | Very sensitive to seed point placement |
| Works well with noisy images when threshold is appropriate | Fails with strong shading or intensity gradients |
| Supports multi-criteria similarity (colour + texture) | Can over-segment or under-segment without proper stopping rules |

> **Practical tip:** Always pre-filter the image with a Gaussian or median filter before running region growing. Isolated noise pixels can cause unwanted small regions to grow into large ones if their values happen to satisfy the similarity criterion.

---

{{interactive: region-growing}}

---

> ### Key Terms
>
> | Term | Definition |
> |------|------------|
> | **Segmentation** | Partitioning an image into regions based on shared properties |
> | **Seed point** | An initial pixel that defines the starting location for region growing |
> | **Similarity criterion** | The rule that determines whether a neighbouring pixel is added to a region |
> | **4-connectivity** | Neighbourhood including only up/down/left/right pixels |
> | **8-connectivity** | Neighbourhood including all 8 surrounding pixels (diagonals included) |
> | **Over-segmentation** | Too many small regions produced — caused by a tolerance threshold that is too small |
> | **Under-segmentation** | Regions merge incorrectly — caused by a tolerance threshold that is too large |
> | **Tolerance T** | The maximum allowed intensity difference for a pixel to be added to a growing region |

---

## Restoration vs Segmentation: A Comparison

| | Image Restoration | Image Segmentation |
|--|--|--|
| **Goal** | Recover original image from degradation | Partition image into meaningful regions |
| **Input** | Degraded image + degradation model | Any image |
| **Output** | Restored image (closer to original) | Labelled regions / binary masks |
| **Objectivity** | Objective — mathematical model guides result | Semi-objective — depends on similarity criteria and seed placement |
| **Knowledge required** | Degradation function and noise model | Domain knowledge for seed selection and thresholds |

---

## Summary

**Image Restoration:**
- Objective process guided by a degradation model: \\\\(g = f*h + \\eta\\\\)
- Noise types: Gaussian (symmetric, sensor thermal), Rayleigh (asymmetric, radar), impulse (salt-and-pepper)
- Mean filters smooth Gaussian noise but blur edges; the median filter removes impulse noise while preserving edges

**Image Segmentation:**
- Edge detection finds intensity discontinuities using gradients (search-based) or zero-crossings (Laplacian)
- Thresholding classifies pixels against a threshold — global, Otsu (automatic), or adaptive (local)
- Region growing expands from seed points using a similarity criterion — simple but sensitive to parameters

---

## Further & Self Reading

- **Self-Study:** Basic Concepts of Seed Points in Region Growing
- Gonzalez, R. C., & Woods, R. E. *Digital Image Processing*, 4th ed. — Chapters 5 (Restoration), 10 (Segmentation).
- Canny, J. (1986). *A Computational Approach to Edge Detection*. IEEE TPAMI.
- Otsu, N. (1979). *A Threshold Selection Method from Gray-Level Histograms*. IEEE Transactions on Systems, Man, and Cybernetics.
`

// ─── Self-Study: Fuzzy Techniques ──────────────────────────────────────────

export const SelfStudy_Fuzzy_Techniques = `# Self-Study: Fuzzy Techniques for Intensity Transformations & Spatial Filtering
**Course:** Image, Video and Speech Processing · Companion to Lecture 2

---

## Why Read This?

Lecture 2 introduced intensity transformations and spatial filters that use **hard rules** — a pixel is either in the neighbourhood or it is not; a value either exceeds a threshold or it does not. Fuzzy logic replaces these hard binary decisions with **degrees of membership**. The result is more flexible processing that adapts to local image content rather than applying a fixed global rule.

---

## 1. Fuzzy Logic Foundations

Classical logic is binary: something is either true (1) or false (0). **Fuzzy logic** extends this to a continuous range: something can be *partially* true — any value between 0 and 1.

In image processing, this maps naturally to pixel intensity. Instead of saying "this pixel is bright (1) or not bright (0)," fuzzy logic asks: *how bright is this pixel?* A pixel at intensity 200 out of 255 might have a membership of 0.78 in the "bright" category and 0.22 in the "medium" category simultaneously.

---

> ### Key Terms
>
> | Term | Definition |
> |------|------------|
> | **Fuzzy logic** | A framework where variables have partial truth values between 0 and 1 |
> | **Membership function** | A curve that maps an input value to its degree of belonging to a fuzzy set |
> | **Fuzzy set** | A category with soft boundaries defined by a membership function (e.g., "dark", "medium", "bright") |
> | **Crisp value** | An ordinary (non-fuzzy) numerical value — the input and final output of a fuzzy system |
> | **Fuzzification** | Converting a crisp value to a fuzzy membership value |
> | **Defuzzification** | Converting a fuzzy output back to a crisp value |

---

## 2. Fuzzy Intensity Transformations

### 2.1 Membership functions

A **membership function** maps pixel intensity to a degree of belonging in a fuzzy category. Three common shapes:

| Shape | Description | When to use |
|-------|-------------|-------------|
| **Triangular** | Linear rise and fall | Sharp, simple category boundaries |
| **Trapezoidal** | Flat top between two slopes | Categories with a definite core range |
| **Gaussian** | Smooth bell curve | Smooth transitions with no sharp boundaries |

For a three-category system (dark / medium / bright), a pixel at any intensity receives a membership value in all three categories. The memberships of all categories at any intensity sum to 1.

### 2.2 Fuzzy enhancement

**Standard contrast stretching** (Lecture 2) applies the same transformation to all intensities globally. **Fuzzy enhancement** applies *different* transformations to different intensity ranges, with smooth transitions between them.

The process:

1. **Fuzzify** — compute each pixel's membership in each fuzzy set (dark, medium, bright)
2. **Apply fuzzy rules** — IF intensity is "dark" THEN increase membership in "bright" by adjusting the output. Rules are defined by domain knowledge.
3. **Aggregate** — combine outputs from all rules
4. **Defuzzify** — convert the aggregated fuzzy output back to a crisp pixel value using the **centroid method** (weighted average) or **max-membership method** (take the value with highest membership)

> **The key advantage over global transforms:** A global gamma correction with \\\\(y = 0.5\\\\) brightens *every* pixel equally. A fuzzy approach can selectively brighten dark regions while leaving already-bright regions unchanged — and transition smoothly between the two.

---

## 3. Fuzzy Spatial Filtering

### 3.1 The problem with hard thresholds in filtering

In the median filter (Lecture 2), all pixels in the neighbourhood are treated equally — each contributes one value to the sorted list regardless of how similar they are to the centre pixel. A pixel at the boundary between two objects (one dark, one bright) contributes its full value even though it may be measuring noise or a transition rather than a genuine neighbourhood member.

**Fuzzy filtering** assigns each neighbourhood pixel a weight based on how *similar* it is to the local intensity distribution — pixels that fit the local pattern contribute more; outliers contribute less.

### 3.2 Fuzzy median / weighted filter

1. For each pixel in the neighbourhood, compute its **fuzzy similarity** to the local mean or to the centre pixel's intensity
2. Pixels with high similarity receive high weight; outliers receive low weight
3. Compute a weighted combination of neighbourhood values

The result is a filter that:
- Smooths homogeneous regions (where all pixels are similar) aggressively
- Preserves edges (where pixels differ significantly) by downweighting the dissimilar pixels across the boundary

### 3.3 Noise-adaptive rules

A simple fuzzy rule for adaptive filtering:

\\( IF local_variance is LOW  THEN apply_strong_smoothing \\)
\\( IF local_variance is HIGH THEN apply_weak_smoothing \\)

Local variance is itself fuzzified — it is not just "high or low" but a degree. The strength of smoothing adapts continuously to the local image structure.

### 3.4 The fuzzy filtering pipeline

\\( Input pixel neighbourhood \\)
\\( Fuzzify each pixel's intensity (compute membership values) \\)
\\( Apply fuzzy rule base (IF-THEN rules) \\)
\\( Aggregate neighbourhood responses \\)
\\( Defuzzify -> output pixel value \\)

---

> ### Key Terms
>
> | Term | Definition |
> |------|------------|
> | **Fuzzy similarity** | A measure (0-1) of how similar a neighbourhood pixel is to a reference value |
> | **Adaptive filtering** | Adjusting filter behaviour based on local image statistics |
> | **Local variance** | The variance of pixel intensities in a small neighbourhood — low in flat regions, high near edges |
> | **Centroid defuzzification** | Output = weighted average of all output values weighted by their membership degrees |
> | **IF-THEN rule** | A fuzzy rule: IF condition (fuzzy) THEN action (fuzzy) |

---

## 4. Why Fuzzy Techniques?

Comparing fuzzy methods to the standard techniques from Lecture 2:

| Criterion | Standard Techniques | Fuzzy Techniques |
|-----------|--------------------|--------------------|
| Decision boundaries | Hard (on/off) | Soft (gradual transition) |
| Adaptability to local content | None — global rule applied everywhere | Yes — rules fire with varying strength |
| Edge preservation | Poor (mean filters) to moderate (median filter) | Good — fuzzy similarity weights downweight cross-edge pixels |
| Noise handling in uniform regions | Good | Very good — strong smoothing where variance is low |
| Complexity | Low | Moderate — requires membership function design |
| Interpretability | Clear mathematical formulas | Human-readable IF-THEN rules |

---

## 5. Practical Applications

**Medical imaging** — MRI and X-ray images often have low contrast and ambiguous boundaries between tissue types. Fuzzy enhancement can selectively brighten soft tissue without overexposing bones, and fuzzy filtering can smooth noise while preserving diagnostically important boundaries.

**Satellite remote sensing** — Atmospheric haze and sensor drift create uneven illumination across large satellite images. Fuzzy membership functions can model haze density and apply local corrections without introducing sharp artefacts.

**Industrial inspection** — Under variable factory lighting, the same defect can appear at different intensities in different parts of an image. Fuzzy rules based on local contrast can detect defects consistently regardless of absolute intensity.

---

## 6. Connection to Lecture 2 Concepts

| Lecture 2 concept | Fuzzy extension |
|-------------------|-----------------|
| Gamma correction | Fuzzy membership functions replace the fixed power curve with locally adaptive tonal mapping |
| Contrast stretching | Fuzzy enhancement applies different stretch parameters to dark vs. bright regions |
| Histogram equalization | Fuzzy HE weights equalization by pixel class membership rather than applying globally |
| Linear spatial filter | Fuzzy weighted filter uses similarity-based weights instead of fixed kernel coefficients |
| Median filter | Fuzzy median uses partial membership instead of binary include/exclude in the sorted list |

---

## Summary

Fuzzy logic replaces binary decisions with degrees of membership, making image processing operations more adaptive to local content. The core pipeline — fuzzify, apply rules, aggregate, defuzzify — is a flexible framework for implementing both point transformations and neighbourhood filters. The main advantage is edge-preserving noise suppression in heterogeneous images; the main cost is the need to design appropriate membership functions and rules.

---

## References

- Pal, S. K., & King, R. A. (1981). *On edge detection of X-ray images using fuzzy sets*. IEEE TPAMI, 3(1), 69-77.
- Gonzalez, R. C., & Woods, R. E. *Digital Image Processing*, 4th ed. — Chapter on Fuzzy Image Processing.
- Tizhoosh, H. R. (1997). *Fuzzy Image Processing: Introduction in Theory and Practice*. Springer.
`

// ─── Self-Study: Seed Points ───────────────────────────────────────────────

export const SelfStudy_Seed_Points = `# Self-Study: Seed Points in Region Growing
**Course:** Image, Video and Speech Processing · Companion to Lecture 3

---

## Why Read This?

Lecture 3 introduced region growing as a segmentation technique. The algorithm's behaviour is highly sensitive to one decision made before any computation starts: **where you place the seed point**. This self-study guide examines seed points in depth — what they are, how they are chosen, and how that choice shapes the final segmentation.

---

## 1. What is a Seed Point?

A **seed point** is an initial pixel (or small cluster of pixels) selected within the target object to start the region growing process. It is the algorithm's answer to the question: *"Where should I begin?"*

Think of it like flooding a valley with water. You pour the water in at a specific point — the seed — and it spreads outward, filling connected areas that are at the same height (similar intensity). Where you pour the water dramatically changes which areas flood.

The seed point must be placed **inside** the target object — not on its boundary, and not in the background. Once placed, the algorithm grows the region outward, testing each neighbouring pixel against a similarity criterion.

---

> ### Key Terms
>
> | Term | Definition |
> |------|------------|
> | **Seed point** | An initial pixel or cluster inside the target object that starts region growing |
> | **Similarity criterion** | The rule for deciding whether a neighbouring pixel is added to the growing region |
> | **Tolerance T** | Maximum allowed intensity difference for a pixel to qualify for region membership |
> | **Region mask** | The binary output image showing which pixels belong to the grown region |
> | **Connectivity** | Whether neighbours are defined as 4 (up/down/left/right) or 8 (including diagonals) |

---

## 2. The Region Growing Algorithm in Detail

### Step-by-step

\\( 1. Place seed point(s) at coordinate(s) inside the target object \\)
\\( 2. Initialise region R = {seed point} \\)
\\( 3. For each pixel p in R: \\)
\\(      For each neighbour q of p (4-connected or 8-connected): \\)
\\(        If q is not already in R AND similarity_criterion(q, seed) is met: \\)
\\(          Add q to R \\)
\\( 4. Repeat step 3 until no new pixels can be added \\)
\\( 5. Output R as the segmented region mask \\)

### The similarity criterion

The most common criterion tests the **absolute intensity difference** between a candidate pixel and the original seed:

\\( |I(x, y) - I(seed)| < T \\)

Where \\\\(T\\\\) is a tolerance threshold. Alternative criteria include:

| Criterion | Description | Use case |
|-----------|-------------|----------|
| **Intensity difference from seed** | \\\\(|I(pixel) - I(seed)| < T\\\\) | Simple, uniform objects |
| **Intensity difference from region mean** | \\\\(|I(pixel) - mean(R)| < T\\\\) | Objects with gradual intensity variation |
| **Texture distance** | Comparison of local texture descriptors | Textured regions |
| **Colour distance** | Euclidean distance in RGB or Lab space | Colour image segmentation |
| **Multi-criteria** | Combination of intensity + texture + colour | Complex objects |

> **Important:** Using the region mean (rather than the original seed value) as the reference allows the region to adapt as it grows. This handles objects with gradual intensity gradients — but it also risks "drift," where the growing region slowly wanders into unrelated areas.

---

## 3. Seed Selection Strategies

### Manual selection

The user clicks directly on the target object. A human can use visual context that no algorithm has access to — which region is the tumour, which object is the defect.

**Advantages:** Precise, reliable, uses human contextual understanding
**Disadvantages:** Time-consuming for large datasets, operator-dependent (two users may place seeds differently)

**Best for:** Medical image analysis, forensic investigation, interactive tools where accuracy matters more than throughput.

### Automatic selection

The algorithm places seeds without human input using image statistics:

| Method | How it works |
|--------|--------------|
| **Gradient minima** | Place seeds at locations of locally minimum gradient (interior of flat regions) |
| **Otsu thresholding** | Segment a coarse binary image first; place seeds at the centroid of large binary blobs |
| **Watershed markers** | Compute distance transform; place seeds at local maxima of distance from edges |
| **K-means clustering** | Cluster pixels by intensity or colour; place seeds at cluster centroids |

**Advantages:** Scalable, repeatable, no human intervention
**Disadvantages:** May place seeds incorrectly if the image is complex or noisy; requires tuning

**Best for:** Batch processing of large image datasets, situations where manual seeding is impractical.

### Multi-seed growing

Instead of a single seed, place **multiple seeds** simultaneously — one for each expected region (or one for each connected component of the target object).

- All seeds grow in parallel
- Regions cannot overlap — if two growing regions reach the same pixel, it is assigned to whichever reached it first (or assigned based on similarity score)
- Essential for objects that are disconnected or have multiple disjoint parts

---

> ### Key Terms
>
> | Term | Definition |
> |------|------------|
> | **Manual seeding** | User clicks to place the seed — precise but labour-intensive |
> | **Automatic seeding** | Algorithm places seeds from gradient minima, clustering, or distance transforms |
> | **Multi-seed** | Multiple simultaneous seeds for disconnected or complex objects |
> | **Region drift** | Gradual migration of the growing region into unrelated areas — caused by using an updating reference |
> | **Watershed markers** | Seed points placed at local maxima of the distance transform |

---

## 4. How Seed Placement Affects the Result

Small changes in seed position can produce dramatically different segmentations. Consider these scenarios:

**Seed placed in the target object centre** — ideal. The region grows symmetrically outward until it hits the object boundary. Good, complete segmentation.

**Seed placed near the object boundary** — risky. Neighbouring pixels across the boundary may have similar intensities (especially if the boundary is soft), causing the region to immediately leak into the background.

**Seed placed in a textured region of the object** — problematic. If similarity is based purely on intensity, the high local variance means many pixels fail the criterion and the region stops growing prematurely, producing an incomplete segmentation.

**Seed placed in the wrong object** — the algorithm has no way to know. It will faithfully grow a region from the wrong starting point.

---

## 5. Best Practices for Region Growing

### Pre-processing

Always filter the image before growing:
- **Gaussian blur** (o = 0.5-1.5) removes fine-grained noise that would create small holes in the grown region
- **Median filter** (3x3 or 5x5) removes impulse noise spikes that would stop growth at corrupted pixels

### Threshold selection

Do not use a fixed threshold for all images. Instead:
- **Inspect the histogram** of the target region — set \\\\(T\\\\) to approximately half the standard deviation of intensities in that region
- **Use adaptive thresholds** that scale with local variance: \\\\(T = k \\cdot \\sigma_{local}\\\\) where \\\\(k \\approx 1.5-2.5\\\\)

### Stopping rules

Consider additional stopping conditions beyond similarity:
- **Region size limit** — stop if the region exceeds an expected maximum size
- **Edge map constraint** — stop growing across strong edges detected by a Canny filter
- **Morphological constraint** — stop if the region shape deviates too far from expected (e.g., for roughly circular objects)

### Post-processing

After growing, clean up the result:
- **Morphological closing** (dilation then erosion) — fills small holes inside the region
- **Morphological opening** (erosion then dilation) — removes small protrusions and isolated speckles
- **Validation** — compare segmented area/shape against expected ranges for the target object

---

## 6. Advantages and Limitations Summary

| Advantage | Limitation |
|-----------|------------|
| Simple conceptual model — easy to understand and implement | Computationally intensive for large high-resolution images |
| Handles irregular, non-convex boundaries naturally | Highly sensitive to seed placement — wrong seed = wrong region |
| Resists moderate noise when threshold is appropriate | Fails with strong intensity gradients or shading within the object |
| Supports multi-criteria similarity (colour + texture) | Can over-segment (too small T) or under-segment (too large T) without tuning |
| Results are interpretable — you can see exactly where and why it stopped growing | May produce holes inside the region if noise creates isolated non-qualifying pixels |

---

## Summary

The seed point is the most consequential decision in region growing — it determines where the algorithm starts, and therefore what it finds. Manual placement is accurate but slow; automatic placement is scalable but needs careful validation. Always pre-filter before growing, use adaptive thresholds where possible, and post-process the result with morphological operations to fill holes and remove outliers.

---

## References

- Adams, R., & Bischof, L. (1994). *Seeded region growing*. IEEE Transactions on Pattern Analysis and Machine Intelligence, 16(6), 641-647.
- Shih, F. Y. (2010). *Image Processing and Pattern Recognition: Fundamentals and Techniques*. Wiley-IEEE Press.
- Gonzalez, R. C., & Woods, R. E. *Digital Image Processing*, 4th ed. — Chapter 10 (Image Segmentation).
`

// ─── Further Study: Frequency Domain ───────────────────────────────────────

export const FurtherStudy_Frequency_Domain = `# Further Study: Image Enhancement in the Frequency Domain
**Course:** Image, Video and Speech Processing · Extends Lecture 2

---

## Why Read This?

Lecture 2 covered spatial domain filtering — operations applied directly to pixel values using kernels. The frequency domain offers a completely different perspective on the same problem. Some operations that are cumbersome or impossible in the spatial domain become straightforward in the frequency domain, and understanding both gives you a complete toolkit.

---

## 1. The Core Idea: Two Ways to Look at an Image

Every image can be viewed in two ways:

**Spatial domain** — the familiar grid of pixel intensity values at \\\\(x, y\\\\) coordinates.

**Frequency domain** — a representation of the image as a sum of sine and cosine waves of varying frequency, amplitude, and direction. Each frequency component corresponds to a pattern of repeating intensity variation across the image.

| Feature | Spatial domain | Frequency domain |
|---------|---------------|-----------------|
| Representation | Pixel grid \\\\(f(x, y)\\\\) | Spectrum \\\\(F(u, v)\\\\) |
| Low frequency content | Large, gradual variations (backgrounds, smooth surfaces) | Energy concentrated near centre |
| High frequency content | Fine detail, sharp edges, noise | Energy spread toward edges of spectrum |
| Filtering | Kernel convolution | Multiply by filter function |
| Relationship | Convert with FFT/iFFT | Convert back with inverse FFT |

> **Key insight:** Spatial convolution and frequency multiplication are mathematically equivalent. Filtering in the frequency domain is *simpler to reason about* for some operations, even though the same result can be obtained spatially.

---

> ### Key Terms
>
> | Term | Definition |
> |------|------------|
> | **Fourier Transform** | A mathematical transform that converts a spatial-domain image into its frequency representation |
> | **Frequency domain** | A representation where image content is described by spatial frequency components |
> | **Spatial frequency** | How rapidly intensity varies across the image — measured in cycles per pixel |
> | **Low frequency** | Slow intensity variation — corresponds to smooth regions, large-scale structure |
> | **High frequency** | Rapid intensity variation — corresponds to edges, fine texture, and noise |
> | **FFT** | Fast Fourier Transform — an efficient algorithm for computing the Fourier Transform |
> | **Spectrum** | The magnitude of each frequency component — shows which frequencies are present |

---

## 2. The 2D Fourier Transform

For a digital image \\\\(f(x, y)\\\\) of size \\\\(M \\times N\\\\), the 2D Discrete Fourier Transform (DFT) is:

\\( F(u, v) = \\sum_x \\sum_y f(x, y) \\cdot e^{-j2\\pi(ux/M + vy/N)} \\)

And the inverse:

\\( f(x, y) = (1/MN) \\sum_u \\sum_v F(u, v) \\cdot e^{+j2\\pi(ux/M + vy/N)} \\)

\\( F(u, v)\\\\) is a complex number at each frequency coordinate \\\\(u, v\\\\). The **magnitude** \\\\(|F(u, v)|\\\\) is the spectrum — how strongly each frequency is present. The **phase** \\\\(\\angle F(u, v)\\\\) encodes where those frequencies appear spatially.

> **Important:** Both magnitude and phase are needed to reconstruct the original image. In many frequency-domain visualisations, only the magnitude spectrum is shown (because it is more interpretable), but never discard the phase if you need to reconstruct the image.

### Centring the spectrum

By convention, the zero-frequency component \\\\(F(0, 0)\\\\) appears at the corner of the spectrum. A **frequency shift** moves it to the centre, making the spectrum much easier to interpret visually — low frequencies cluster in the centre, high frequencies at the periphery.

In MATLAB:
\\( F  = fft2(f) \\)
\\( Fs = fftshift(F) \\)

---

## 3. Frequency Domain Filtering Workflow

The standard filtering procedure is:

\\( 1. f(x, y)     -> Compute 2D FFT         -> F(u, v) \\)
\\( 2. F(u, v)     -> Shift to centre        -> Fshifted(u, v) \\)
\\( 3. Fshifted    -> Multiply by H(u, v)    -> G(u, v) = H(u, v) \\cdot F(u, v) \\)
\\( 4. G(u, v)     -> Inverse FFT            -> g(x, y) \\)
\\( 5. g(x, y)     -> Take real part         -> output image \\)

\\( H(u, v)\\\\) is the **filter transfer function** — a mask in the frequency domain that selectively amplifies or attenuates certain frequencies.

\\( F  = fft2(double(f)) \\)
\\( Fs = fftshift(F) \\)
\\( G  = Fs .* H \\)
\\( g  = real(ifft2(ifftshift(G))) \\)
\\( g  = uint8(mat2gray(g) * 255) \\)

---

## 4. Types of Frequency Domain Filters

### 4.1 Low-pass filters (LPF)

A low-pass filter **passes low frequencies and attenuates high frequencies**. In the spatial domain, this corresponds to smoothing/blurring. In the frequency domain, it is a mask that keeps the central region of the spectrum and zeros out the periphery.

Three common designs:

| Filter | Transfer function | Behaviour |
|--------|------------------|-----------|
| **Ideal LPF** | \\\\(H = 1\\\\) if distance from centre < cutoff, else \\\\(0\\\\) | Hard cutoff — produces "ringing" artefacts (Gibbs phenomenon) |
| **Butterworth LPF** | \\\\(H = 1 / (1 + (D/D_0)^{2n})\\\\) | Smooth roll-off — reduces ringing; order \\\\(n\\\\) controls sharpness |
| **Gaussian LPF** | \\\\(H = e^{-D^2/2\\sigma^2}\\\\) | Smoothest roll-off — no ringing; computationally equivalent to Gaussian spatial filter |

\\( D\\\\) is the distance from the centre of the spectrum; \\\\(D_0\\\\) is the cutoff frequency.

### 4.2 High-pass filters (HPF)

A high-pass filter **attenuates low frequencies and passes high frequencies** — the opposite of LPF. The same three designs apply:

\\( H_{HPF}(u, v) = 1 - H_{LPF}(u, v) \\)

In the spatial domain, high-pass filtering sharpens edges and enhances fine detail. It can also amplify noise, since noise has high-frequency content.

### 4.3 Band-reject and notch filters

Some images contain **periodic noise** — patterns that repeat at specific spatial frequencies (for example, scanner interference stripes or power-line frequency artefacts in medical images). These appear as distinct bright spots in the spectrum.

A **notch filter** zeroes out specific frequency coordinates, eliminating the periodic pattern while leaving the rest of the image intact. A **band-reject filter** eliminates a ring of frequencies.

These are frequency-domain operations with no simple spatial-domain equivalent — one of the cases where frequency domain filtering is genuinely superior.

### 4.4 Homomorphic filtering

Many images suffer from **uneven illumination** — one part of the scene is brightly lit, another is in shadow. Because illumination and reflectance multiply rather than add, a simple additive filter cannot separate them.

**Homomorphic filtering** solves this by using logarithms:

\\( f(x, y) = illumination(x, y) \\cdot reflectance(x, y) \\)
\\( log[f(x, y)] = log[illumination] + log[reflectance] \\)

After taking the log, illumination (low-frequency) and reflectance (high-frequency) become **additive** and can be separated by frequency-domain filtering. The steps:

\\( 1. Compute log(f) \\)
\\( 2. Compute FFT \\)
\\( 3. Apply a filter that attenuates low frequencies (illumination) and boosts high frequencies (reflectance) \\)
\\( 4. Inverse FFT \\)
\\( 5. Exponentiate (undo the log) \\)

The result corrects uneven lighting while enhancing edge detail.

---

> ### Key Terms
>
> | Term | Definition |
> |------|------------|
> | **Low-pass filter** | Passes low frequencies (smooth areas) — produces blurring/smoothing |
> | **High-pass filter** | Passes high frequencies (edges, noise) — produces sharpening |
> | **Ideal filter** | Hard cutoff at a specific frequency — simple but causes ringing artefacts |
> | **Butterworth filter** | Smooth roll-off controlled by order parameter — practical compromise |
> | **Gaussian filter** | Smooth bell-curve roll-off — no ringing, equivalent to spatial Gaussian |
> | **Notch filter** | Removes specific frequency coordinates — used for periodic noise |
> | **Band-reject filter** | Removes a band (ring) of frequencies |
> | **Homomorphic filtering** | Log-domain filtering to separate illumination from reflectance |
> | **Cutoff frequency D0** | The frequency at which the filter starts attenuating |
> | **Gibbs phenomenon** | Ringing artefacts caused by abrupt (ideal) frequency cutoffs |

---

## 5. Frequency vs Spatial: When to Use Which

| Situation | Preferred domain |
|-----------|-----------------|
| Simple smoothing or sharpening | Spatial — faster, more intuitive |
| Removing periodic noise (stripes, interference) | **Frequency** — can target specific frequencies exactly |
| Correcting uneven illumination | **Frequency** — homomorphic filtering |
| Edge detection | Spatial — gradient operators are simpler |
| Large-kernel convolutions | **Frequency** — multiplication is faster than large convolution |
| Understanding image structure | **Frequency** — the spectrum reveals what frequencies dominate |

---

## 6. Worked Example: Removing Scanner Stripe Noise

1. Load the noisy image and compute \\\\(fftshift(fft2(f))\\\\)
2. Display the magnitude spectrum \\\\(log(1 + |Fs|)\\\\)
3. Observe bright spots corresponding to the stripe frequency
4. Create a notch filter that zeros out those spots
5. Multiply spectrum by notch filter, inverse FFT, display result

The stripes vanish. The rest of the image is unchanged. This would be extremely difficult to achieve with any spatial filter.

---

## Summary

The frequency domain is an alternative representation of an image where spatial frequencies (not pixel positions) are the primary variable. The Fourier Transform converts between domains. Frequency domain filtering multiplies the spectrum by a transfer function \\\\(H(u, v)\\\\) — equivalent to convolution in the spatial domain. Low-pass filters smooth; high-pass filters sharpen. Notch filters remove periodic noise. Homomorphic filtering corrects illumination non-uniformity. The frequency domain is most powerful when the target artefact is periodic or when large-area filtering would require impractically large spatial kernels.

---

## References

- Gonzalez, R. C., & Woods, R. E. *Digital Image Processing*, 4th ed. — Chapter 4.
- Bracewell, R. N. *The Fourier Transform and Its Applications*, 3rd ed. McGraw-Hill.
- Oppenheim, A. V., & Schafer, R. W. *Discrete-Time Signal Processing*. Prentice Hall.
`

export const CONTENT_FILES: Record<string, string> = {
  L1_Introduction_Digital_Fundamentals,
  L2_Intensity_Transformations_Spatial_Filtering,
  L3_Image_Restoration_Segmentation,
  SelfStudy_Fuzzy_Techniques,
  SelfStudy_Seed_Points,
  FurtherStudy_Frequency_Domain,
}
