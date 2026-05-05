'use client'

import DashboardCard from './DashboardCard'

export default function DashboardContent() {
  return (
    <div className="cards-grid">
      <DashboardCard
        title="Study"
        description="Access your modules and track progress"
        href="/modules"
      />
      <DashboardCard
        title="AI Assistance"
        description="Ask questions, get hints, and explore topics"
        href="/assistant"
      />
      <DashboardCard
        title="Assessment"
        description="Take quizzes and view results"
        href="/assessment"
      />
    </div>
  )
}
