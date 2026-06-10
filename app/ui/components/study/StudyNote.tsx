'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, ChevronRight, FileText } from 'lucide-react'
import { ContentBlock, BlockData } from './ContentBlock'

export interface SubtopicData {
  id: string
  title: string
  blocks: BlockData[]
}

export interface TopicData {
  id: string
  title: string
  subtopics: SubtopicData[]
}

interface StudyNoteProps {
  topics: TopicData[]
  initialTopicId?: string
  initialSubtopicId?: string
}

export function StudyNote({ topics, initialTopicId, initialSubtopicId }: StudyNoteProps) {
  // If no initial IDs, default to first topic and first subtopic
  const defaultTopic = topics.length > 0 ? topics[0].id : ''
  const defaultSubtopic = topics.length > 0 && topics[0].subtopics.length > 0 ? topics[0].subtopics[0].id : ''

  const [activeTopic, setActiveTopic] = useState<string>(initialTopicId || defaultTopic)
  const [activeSubtopic, setActiveSubtopic] = useState<string>(initialSubtopicId || defaultSubtopic)

  // Find the currently active subtopic data
  const currentTopicData = topics.find(t => t.id === activeTopic)
  const currentSubtopicData = currentTopicData?.subtopics.find(s => s.id === activeSubtopic)

  // Update URL purely for bookmarking without forcing a reload (shallow routing approach handled manually or just state-based for now)
  useEffect(() => {
    const url = new URL(window.location.href)
    url.searchParams.set('topic', activeTopic)
    url.searchParams.set('subtopic', activeSubtopic)
    window.history.replaceState({}, '', url.toString())
  }, [activeTopic, activeSubtopic])

  return (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
      
      {/* SideNav (Study Variants) */}
      <div className="t-card" style={{ width: '300px', flexShrink: 0, padding: '16px', position: 'sticky', top: '100px' }}>
        <div className="t-hero__eyebrow" style={{ marginBottom: '16px', marginLeft: '8px' }}>
          <span className="t-text-label t-color-muted">Module Outline</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {topics.map(topic => {
            const isTopicActive = activeTopic === topic.id
            return (
              <div key={topic.id}>
                <button
                  onClick={() => {
                    setActiveTopic(topic.id)
                    // Auto-select first subtopic when expanding a topic
                    if (!isTopicActive && topic.subtopics.length > 0) {
                      setActiveSubtopic(topic.subtopics[0].id)
                    }
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: 'var(--t-radius-sm)',
                    backgroundColor: isTopicActive ? 'var(--t-surface)' : 'transparent',
                    color: isTopicActive ? 'var(--t-text-primary)' : 'var(--t-text-muted)',
                    fontWeight: isTopicActive ? 600 : 500,
                    cursor: 'pointer',
                    transition: 'all var(--t-transition-fast)'
                  }}
                  className="hover:bg-[var(--t-surface)] hover:text-[var(--t-text-primary)]"
                >
                  <span style={{ textAlign: 'left' }}>{topic.title}</span>
                  {isTopicActive ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>

                {/* Subtopics */}
                {isTopicActive && (
                  <div style={{ paddingLeft: '16px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {topic.subtopics.map(sub => {
                      const isSubActive = activeSubtopic === sub.id
                      return (
                        <button
                          key={sub.id}
                          onClick={() => setActiveSubtopic(sub.id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            width: '100%',
                            padding: '6px 12px',
                            borderRadius: 'var(--t-radius-sm)',
                            backgroundColor: isSubActive ? 'var(--t-accent-light)' : 'transparent',
                            color: isSubActive ? 'var(--t-accent)' : 'var(--t-text-muted)',
                            fontWeight: isSubActive ? 500 : 400,
                            cursor: 'pointer',
                            textAlign: 'left'
                          }}
                          className="hover:text-[var(--t-text-body)]"
                        >
                          <FileText size={14} style={{ flexShrink: 0 }} />
                          <span style={{ fontSize: '0.875rem' }}>{sub.title}</span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flexGrow: 1, maxWidth: '800px', backgroundColor: 'var(--t-bg)' }}>
        {currentSubtopicData ? (
          <div className="t-animate-fade-in">
            <h2 className="t-text-title" style={{ fontSize: '2rem', marginBottom: '8px' }}>
              {currentSubtopicData.title}
            </h2>
            <div className="t-text-label t-color-muted" style={{ marginBottom: '32px' }}>
              {currentTopicData?.title}
            </div>

            <div>
              {currentSubtopicData.blocks.map((block, idx) => (
                <ContentBlock key={idx} block={block} />
              ))}
            </div>
            
            {/* Minimal footer for navigation */}
            <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid var(--t-border)', display: 'flex', justifyContent: 'flex-end' }}>
              <div className="t-text-label t-color-muted">End of {currentSubtopicData.title}</div>
            </div>
          </div>
        ) : (
          <div style={{ padding: '48px', textAlign: 'center', color: 'var(--t-text-muted)' }}>
            Select a topic to start studying.
          </div>
        )}
      </div>

    </div>
  )
}
