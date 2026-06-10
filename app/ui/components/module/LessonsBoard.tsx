'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronRight, FileText, PlayCircle, HelpCircle } from 'lucide-react'

interface Subtopic {
  id: string
  title: string
  type: 'video' | 'reading' | 'quiz'
  duration: string
}

interface Topic {
  id: string
  title: string
  subtopics: Subtopic[]
}

const mockTopics: Topic[] = [
  {
    id: 't1',
    title: '1. Introduction to Statistics',
    subtopics: [
      { id: 's1-1', title: 'What is Statistics?', type: 'reading', duration: '12 min' },
      { id: 's1-2', title: 'Characteristics of Statistics', type: 'reading', duration: '15 min' },
      { id: 's1-3', title: 'Key Terminology', type: 'reading', duration: '10 min' },
      { id: 's1-4', title: 'Types of Variables', type: 'reading', duration: '10 min' },
      { id: 's1-5', title: 'Descriptive vs. Inferential', type: 'reading', duration: '10 min' },
      { id: 's1-6', title: 'Practice Questions', type: 'quiz', duration: '15 min' },
    ]
  },
  {
    id: 't2',
    title: '2. Data Presentation',
    subtopics: [
      { id: 's2-1', title: 'Frequency Distributions', type: 'reading', duration: '25 min' },
    ]
  }
]

interface LessonsBoardProps {
  moduleSlug: string
}

export function LessonsBoard({ moduleSlug }: LessonsBoardProps) {
  // Store the IDs of currently open topics. Empty by default (all closed).
  const [openTopics, setOpenTopics] = useState<string[]>([])

  const toggleTopic = (id: string) => {
    setOpenTopics(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    )
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'video': return <PlayCircle size={16} className="t-color-accent" />
      case 'reading': return <FileText size={16} className="t-color-muted" />
      case 'quiz': return <HelpCircle size={16} style={{ color: 'var(--t-warning, #f59e0b)' }} />
      default: return <FileText size={16} />
    }
  }

  return (
    <div className="t-card" style={{ padding: '24px' }}>
      <h2 className="t-text-title" style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Course Syllabus</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {mockTopics.map((topic) => {
          const isOpen = openTopics.includes(topic.id)
          
          return (
            <div 
              key={topic.id} 
              style={{ 
                border: '1px solid var(--t-border)', 
                borderRadius: 'var(--t-radius-md)',
                overflow: 'hidden',
                backgroundColor: 'var(--t-bg)'
              }}
            >
              {/* Accordion Header */}
              <button 
                onClick={() => toggleTopic(topic.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 24px',
                  backgroundColor: isOpen ? 'var(--t-surface)' : 'transparent',
                  borderBottom: isOpen ? '1px solid var(--t-border)' : 'none',
                  cursor: 'pointer',
                  transition: 'background-color var(--t-transition-fast)'
                }}
                className="hover:bg-[var(--t-surface)]"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    width: '32px', 
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: isOpen ? 'var(--t-accent-light)' : 'var(--t-border)',
                    color: isOpen ? 'var(--t-accent)' : 'var(--t-text-muted)',
                    transition: 'all var(--t-transition-fast)'
                  }}>
                    {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                  </div>
                  <span style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--t-text-primary)' }}>
                    {topic.title}
                  </span>
                </div>
                <div className="t-text-label t-color-muted">
                  {topic.subtopics.length} items
                </div>
              </button>

              {/* Accordion Content */}
              {isOpen && (
                <div style={{ padding: '16px 24px', backgroundColor: 'var(--t-bg)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {topic.subtopics.map((sub) => (
                      <Link 
                        key={sub.id}
                        href={`/archives/${moduleSlug}/study?topic=${topic.id}&subtopic=${sub.id}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 16px',
                          borderRadius: 'var(--t-radius-sm)',
                          backgroundColor: 'var(--t-surface)',
                          border: '1px solid var(--t-border-subtle)',
                          cursor: 'pointer',
                          textDecoration: 'none'
                        }}
                        className="hover:-translate-y-[1px] hover:shadow-sm transition-all duration-200"
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          {getIcon(sub.type)}
                          <span style={{ fontWeight: 500, color: 'var(--t-text-body)' }}>{sub.title}</span>
                        </div>
                        <span className="t-text-label t-color-muted">{sub.duration}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
