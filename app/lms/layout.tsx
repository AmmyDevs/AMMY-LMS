import TopBar from '@/app/ui/components/atomic/TopBar'
import SideNav from '@/app/ui/components/atomic/SideNav'

/**
 * LMS Layout component.
 * Provides the structural shell for the student dashboard.
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout-shell">
      <TopBar />
      
      <div className="layout-main">
        <aside className="layout-aside">
          <SideNav />
        </aside>

        <main className="layout-content">
          {children}
        </main>
      </div>
    </div>
  )
}