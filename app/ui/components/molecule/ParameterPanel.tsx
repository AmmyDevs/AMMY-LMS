import { useEffect, useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import type { ParameterConfig } from '@/lib/utils/types'

interface ParameterPanelProps {
  parameters: ParameterConfig[]
  values: Record<string, unknown>
  onChange: (id: string, value: unknown) => void
  disabled?: boolean
}

export function ParameterPanel({ parameters, values, onChange, disabled }: ParameterPanelProps) {
  const [localValues, setLocalValues] = useState<Record<string, unknown>>({})

  useEffect(() => {
    const defaults: Record<string, unknown> = {}
    parameters.forEach((p) => {
      defaults[p.id] = p.default
    })
    setLocalValues({ ...defaults, ...values })
  }, [parameters])

  const handleChange = (id: string, value: unknown) => {
    setLocalValues((prev) => ({ ...prev, [id]: value }))
    onChange(id, value)
  }

  if (parameters.length === 0) {
    return (
      <div className="row gap-item text-caption color-muted py-3">
        <SlidersHorizontal className="w-4 h-4" />
        <span>No parameters — effect is parameter-free</span>
      </div>
    )
  }

  return (
    <div className="col gap-block">
      {parameters.map((param) => (
        <div key={param.id} className="col gap-item">
          <div className="row-between">
            <label className="text-caption weight-bold color-heading">
              {param.label}
            </label>
            {param.type === 'slider' && (
              <span
                className="text-fine font-mono px-2 py-0.5 radius-xs"
                style={{
                  backgroundColor: 'var(--accent-light)',
                  color: 'var(--accent)',
                }}
              >
                {String(localValues[param.id] ?? param.default)}
                {param.unit ? ` ${param.unit}` : ''}
              </span>
            )}
          </div>

          {param.type === 'slider' && (
            <div className="row gap-item">
              <span className="text-fine color-muted w-8 text-right">{param.min}</span>
              <input
                type="range"
                min={param.min}
                max={param.max}
                step={param.step}
                value={Number(localValues[param.id] ?? param.default)}
                onChange={(e) => handleChange(param.id, Number(e.target.value))}
                disabled={disabled}
                className="flex-1 h-2 appearance-none radius-pill cursor-pointer disabled:opacity-50"
                style={{
                  backgroundColor: 'var(--color-border)',
                  accentColor: 'var(--accent)',
                }}
              />
              <span className="text-fine color-muted w-8">{param.max}</span>
            </div>
          )}

          {param.type === 'select' && param.options && (
            <select
              value={String(localValues[param.id] ?? param.default)}
              onChange={(e) => handleChange(param.id, e.target.value)}
              disabled={disabled}
              className="input-primary disabled:opacity-50"
              style={{ height: '40px' }}
            >
              {param.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          )}

          {param.type === 'toggle' && (
            <button
              onClick={() => handleChange(param.id, !(localValues[param.id] ?? param.default))}
              disabled={disabled}
              className="relative inline-flex h-6 w-11 items-center radius-pill transition-colors disabled:opacity-50"
              style={{
                backgroundColor: (localValues[param.id] ?? param.default)
                  ? 'var(--accent)'
                  : 'var(--color-border)',
              }}
              aria-pressed={Boolean(localValues[param.id] ?? param.default)}
            >
              <span
                className="inline-block h-4 w-4 transform radius-pill transition-transform"
                style={{
                  backgroundColor: 'var(--white)',
                  transform: (localValues[param.id] ?? param.default)
                    ? 'translateX(1.5rem)'
                    : 'translateX(0.25rem)',
                }}
              />
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
