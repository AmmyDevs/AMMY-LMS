import { Sidebar } from '../ui/components/dashboard/Sidebar'
import { Topbar } from '../ui/components/dashboard/Topbar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="t-dashboard">
      <Sidebar />
      <div className="t-dashboard__main">
        <Topbar />
        <main className="t-dashboard__content">
          {children}
        </main>
      </div>
    </div>
  )
}
