'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { BookOpen, User, Calendar } from 'lucide-react'
import { Card } from '../ui/components/Card'

const modules = [
  {
    code: 'MATH 2301',
    name: 'Probability & Statistics',
    lecturer: 'Dr. E. Mushi',
    schedule: 'Mon 08:00–10:00',
    slug: 'prob-stat'
  },
  {
    code: 'CS 6301',
    name: 'Communication Systems',
    lecturer: 'Dr. A. Kimaro',
    schedule: 'Tue 10:00–12:00',
    slug: 'communication-systems'
  },
  {
    code: 'CS 6303',
    name: 'Advanced Computer Architecture',
    lecturer: 'Dr. F. Kambona',
    schedule: 'Wed 14:00–16:00',
    slug: 'advanced-architecture'
  },
  {
    code: 'CS 6304',
    name: 'Software Engineering',
    lecturer: 'Dr. P. Msuya',
    schedule: 'Thu 08:00–10:00',
    slug: 'software-engineering'
  },
  {
    code: 'CS 6305',
    name: 'Digital Forensics',
    lecturer: 'Dr. J. Mwakaje',
    schedule: 'Fri 10:00–12:00',
    slug: 'digital-forensics'
  },
  {
    code: 'MATH 2104',
    name: 'Calculus & Linear Algebra',
    lecturer: 'Mr. A. Mbaga',
    schedule: 'Mon 14:00–16:00',
    slug: 'calculus-linear-algebra'
  },
]

export default function ArchivesPage() {
  const [userName, setUserName] = useState('Student')

  useEffect(() => {
    const storedName = localStorage.getItem('ammy-username')
    if (storedName) setUserName(storedName)
  }, [])

  return (
    <div className="space-y-8 t-animate-fade-in">
      <header className="space-y-2">
        <h1 className="t-text-title" style={{ margin: 0 }}>
          Hello, <span className="t-color-accent">{userName}</span>
        </h1>
        <p className="t-text-body t-color-muted">
          Welcome back. Select a module to begin your interactive study session.
        </p>
      </header>

      <div className="t-grid-3">
        {modules.map((module) => (
          <Link 
            key={module.code} 
            href={`/archives/${module.slug}`}
            className="block outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
            style={{ textDecoration: 'none' }}
          >
            <Card
              icon={<BookOpen size={20} />}
              badge={module.code}
              title={module.name}
              meta={[
                { icon: <User size={14} />, text: module.lecturer },
                { icon: <Calendar size={14} />, text: module.schedule },
              ]}
              footerLabel="View Lessons"
              className="h-full hover:-translate-y-1 transition-transform duration-300"
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

