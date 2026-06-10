'use client'

import { Book, Lightbulb, HelpCircle, CheckCircle, Quote, Sigma } from 'lucide-react'

export interface BlockData {
  type: 'paragraph' | 'definition' | 'example' | 'key-note' | 'list' | 'formula' | 'question' | 'solution'
  title?: string
  content?: string
  items?: string[]
}

interface ContentBlockProps {
  block: BlockData
}

export function ContentBlock({ block }: ContentBlockProps) {
  // Common plain text styles
  if (block.type === 'paragraph') {
    return (
      <div className="t-text-body t-color-muted" style={{ marginBottom: '20px', lineHeight: '1.7' }}>
        {/* Simple markdown bolding replacement for demo purposes */}
        <span dangerouslySetInnerHTML={{ __html: block.content?.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') || '' }} />
      </div>
    )
  }

  if (block.type === 'example') {
    return (
      <div style={{ marginBottom: '24px' }}>
        {block.title && <div style={{ fontWeight: 600, marginBottom: '8px', color: 'var(--t-text-primary)' }}>{block.title}</div>}
        <div className="t-text-body t-color-muted" style={{ fontStyle: 'italic', paddingLeft: '16px', borderLeft: '3px solid var(--t-border)' }}>
          {block.content}
        </div>
      </div>
    )
  }

  if (block.type === 'list') {
    return (
      <ul style={{ marginBottom: '24px', paddingLeft: '24px', listStyleType: 'disc', color: 'var(--t-text-muted)', lineHeight: '1.7' }}>
        {block.items?.map((item, idx) => (
          <li key={idx} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
        ))}
      </ul>
    )
  }

  if (block.type === 'formula') {
    return (
      <div style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {block.title && <div className="t-text-label t-color-muted" style={{ marginBottom: '8px' }}>{block.title}</div>}
        <div style={{ 
          padding: '16px 32px', 
          backgroundColor: 'var(--t-surface)', 
          borderRadius: 'var(--t-radius-md)',
          fontFamily: 'monospace',
          fontSize: '1.125rem',
          color: 'var(--t-text-primary)'
        }}>
          {block.content}
        </div>
      </div>
    )
  }

  // Tagged blocks (Definition, Key-Note, Question, Solution)
  let icon = null
  let borderColor = 'var(--t-border)'
  let bgColor = 'var(--t-surface)'

  switch (block.type) {
    case 'definition':
      icon = <Book size={20} style={{ color: 'var(--t-smart-blue)' }} />
      borderColor = 'var(--t-smart-blue)'
      bgColor = 'rgba(37, 99, 235, 0.05)'
      break
    case 'key-note':
      icon = <Lightbulb size={20} style={{ color: 'var(--t-warning, #f59e0b)' }} />
      borderColor = 'var(--t-warning, #f59e0b)'
      bgColor = 'rgba(245, 158, 11, 0.05)'
      break
    case 'question':
      icon = <HelpCircle size={20} style={{ color: 'var(--t-purple, #8b5cf6)' }} />
      borderColor = 'var(--t-purple, #8b5cf6)'
      bgColor = 'rgba(139, 92, 246, 0.05)'
      break
    case 'solution':
      icon = <CheckCircle size={20} style={{ color: 'var(--t-success, #22c55e)' }} />
      borderColor = 'var(--t-success, #22c55e)'
      bgColor = 'rgba(34, 197, 94, 0.05)'
      break
  }

  if (icon) {
    return (
      <div style={{ 
        marginBottom: '24px', 
        padding: '20px 24px', 
        backgroundColor: bgColor,
        borderLeft: `4px solid ${borderColor}`,
        borderRadius: '0 var(--t-radius-md) var(--t-radius-md) 0'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          <div style={{ marginTop: '2px' }}>{icon}</div>
          <div>
            {block.title && <h4 style={{ fontWeight: 600, color: 'var(--t-text-primary)', marginBottom: '4px' }}>{block.title}</h4>}
            <div className="t-text-body" style={{ color: 'var(--t-text-body)', lineHeight: '1.6' }}
              dangerouslySetInnerHTML={{ __html: block.content?.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') || '' }}
            />
          </div>
        </div>
      </div>
    )
  }

  return null
}
