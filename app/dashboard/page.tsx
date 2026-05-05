'use client'

import TopBar from '@/app/ui/components/atomic/TopBar'
import SideNav from '@/app/ui/components/atomic/SideNav'
import DashboardContent from '@/app/ui/components/molecule/DashboardContent'

export default function DashboardPage() {
  return (
    <div className="dashboard-wrapper">
      <TopBar />
      <div className="dashboard-main">
        <SideNav />
        <main className="dashboard-content">
          <DashboardContent />
        </main>
      </div>
    </div>
  )
}
