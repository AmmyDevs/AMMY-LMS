'use client'

interface CardProps {
  title: string
  description: string
  href?: string
}

export default function DashboardCard({ title, description, href }: CardProps) {
  const content = (
    <div className="card-body">
      <h3 className="card-title">{title}</h3>
      <p className="card-text">{description}</p>
    </div>
  )

  return href ? (
    <a href={href} className="dashboard-card">{content}</a>
  ) : (
    <div className="dashboard-card">{content}</div>
  )
}
