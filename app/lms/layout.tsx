import TopBar from '@/app/ui/components/molecule/TopBar'
import SideNav from '@/app/ui/components/molecule/SideNav'

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

        <main className="layout-content" id="main-content" tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  )
}