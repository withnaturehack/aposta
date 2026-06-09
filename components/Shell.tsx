'use client'
import { useState } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import Footer from './Footer'

export default function Shell({ user, children }: { user: any; children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100vh', overflow:'hidden' }}>
      <Topbar user={user} onToggle={() => setCollapsed(!collapsed)} />
      <div style={{ display:'flex', flex:1, overflow:'hidden' }}>
        <Sidebar collapsed={collapsed} />
        <main style={{
          flex:1, overflowY:'auto', background:'var(--bg)', padding:'28px 32px', display:'flex', flexDirection:'column',
        }}>
          <div style={{ flex:1 }} className="fade-in">
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>{children}</div>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  )
}
