import { useEffect, useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import type { ParameterSchema } from '@/types'

interface ParameterPanelProps {
  parameters: ParameterSchema[]
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
      <div className="flex items-center gap-2 text-sm text-muted py-2">
        <SlidersHorizontal className="w-4 h-4" />
        <span>No parameters — effect is parameter-free</span>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {parameters.map((param) => (
        <div key={param.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-text">
              {param.label}
            </label>
            {param.type === 'slider' && (
              <span className="text-sm font-mono text-brand bg-brand/10 px-2 py-0.5 rounded">
                {String(localValues[param.id] ?? param.default)}{param.unit ? ` ${param.unit}` : ''}
              </span>
            )}
          </div>

          {param.type === 'slider' && (
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted w-8 text-right">{param.min}</span>
              <input
                type="range"
                min={param.min}
                max={param.max}
                step={param.step}
                value={Number(localValues[param.id] ?? param.default)}
                onChange={(e) => handleChange(param.id, Number(e.target.value))}
                disabled={disabled}
                className="flex-1 h-2 appearance-none rounded-full bg-border accent-brand cursor-pointer disabled:opacity-50"
              />
              <span className="text-xs text-muted w-8">{param.max}</span>
            </div>
          )}

          {param.type === 'select' && param.options && (
            <select
              value={String(localValues[param.id] ?? param.default)}
              onChange={(e) => handleChange(param.id, e.target.value)}
              disabled={disabled}
              className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-text text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand disabled:opacity-50"
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
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand/50 ${
                (localValues[param.id] ?? param.default)
                  ? 'bg-brand'
                  : 'bg-border'
              } disabled:opacity-50`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  (localValues[param.id] ?? param.default) ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
