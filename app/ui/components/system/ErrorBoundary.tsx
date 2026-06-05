'use client'

import React, { Component, type ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="surface-card centered col gap-item p-12 my-8">
          <div className="w-14 h-14 radius-xl centered" style={{ backgroundColor: 'var(--tone-danger-bg)' }}>
            <AlertTriangle className="w-7 h-7" style={{ color: 'var(--tone-danger-text)' }} />
          </div>
          <h3 className="text-subheading color-heading">Something went wrong</h3>
          <p className="text-body color-muted text-center max-w-md">
            {this.state.error?.message || 'An unexpected error occurred while rendering this section.'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="btn-secondary"
          >
            <RefreshCw size={18} />
            <span>Try again</span>
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
