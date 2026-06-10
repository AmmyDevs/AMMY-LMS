import { BookOpen, Calendar, Clock, LayoutList } from 'lucide-react'

interface ModuleDetailsCardProps {
  slug: string
}

export function ModuleDetailsCard({ slug }: ModuleDetailsCardProps) {
  // Placeholder logic for module details based on slug
  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  
  return (
    <div className="t-card" style={{ padding: '32px', marginBottom: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px' }}>
        
        {/* Left Side: Title and Description */}
        <div style={{ flex: '1 1 400px' }}>
          <div className="t-hero__eyebrow" style={{ marginBottom: '16px' }}>
            <span className="t-hero__eyebrow-dot" style={{ backgroundColor: 'var(--t-smart-blue)', width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block' }} />
            <span className="t-text-label" style={{ color: 'var(--t-text-muted)', marginLeft: '8px' }}>Module Overview</span>
          </div>
          
          <h1 className="t-text-title" style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', marginBottom: '12px' }}>
            {title}
          </h1>
          <p className="t-text-body t-color-muted" style={{ maxWidth: '600px' }}>
            Master the core concepts, theories, and practical applications required for this subject. Complete the topics to unlock the final examination.
          </p>
        </div>

        {/* Right Side: Stats */}
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', backgroundColor: 'var(--t-bg)', padding: '16px 24px', borderRadius: 'var(--t-radius-lg)', border: '1px solid var(--t-border)' }}>
            <div style={{ backgroundColor: 'var(--t-accent-light)', color: 'var(--t-accent)', padding: '10px', borderRadius: 'var(--t-radius-md)' }}>
              <LayoutList size={24} />
            </div>
            <div>
              <div className="t-text-label t-color-muted">Topics</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--t-text-primary)' }}>12 Modules</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', backgroundColor: 'var(--t-bg)', padding: '16px 24px', borderRadius: 'var(--t-radius-lg)', border: '1px solid var(--t-border)' }}>
            <div style={{ backgroundColor: 'var(--t-accent-light)', color: 'var(--t-accent)', padding: '10px', borderRadius: 'var(--t-radius-md)' }}>
              <Clock size={24} />
            </div>
            <div>
              <div className="t-text-label t-color-muted">Est. Time</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--t-text-primary)' }}>24 Hours</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
