'use client'

interface CardProps {
  title: string
  description: string
  href?: string
}

export default function DashboardCard({ title, description, href }: CardProps) {
  const content = (
    <>
      <h3 className="text-subheading">{title}</h3>
      <p className="text-caption text-muted">{description}</p>
    </>
  )

  return href ? (
    <a href={href} className="surface-card col gap-item">{content}</a>
  ) : (
    <div className="surface-card col gap-item">{content}</div>
  )
}
