import TopBar from '@/app/ui/components/atomic/TopBar'
import SideNav from '@/app/ui/components/atomic/SideNav'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard-wrapper">
      <TopBar />
      <div className="dashboard-main">
        <aside className="sidenav">
          <SideNav />
        </aside>
        <main className="dashboard-content">
          {children}
        </main>
      </div>
    </div>
  )
}