'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { section: 'Overview' },
  { label: 'Home', href: '/home' },
  { label: 'Dashboard', href: '/dashboard' },
  { section: 'People' },
  { label: 'Directory', href: '/people' },
  { label: 'Org Chart', href: '/org' },
  { label: 'Bulk Import', href: '/import' },
  { section: 'Time & Leave' },
  { label: 'Attendance', href: '/attendance' },
  { label: 'Leave', href: '/leave' },
  { section: 'Payroll' },
  { label: 'Payroll', href: '/payroll' },
  { section: 'Workflow' },
  { label: 'Approvals', href: '/approvals' },
  { section: 'HR Operations' },
  { label: 'Onboarding', href: '/onboarding' },
  { label: 'Helpdesk', href: '/helpdesk' },
  { label: 'Assets', href: '/assets' },
  { label: 'Documents', href: '/documents' },
  { label: 'Recruitment', href: '/recruitment' },
  { label: 'Performance', href: '/performance' },
  { section: 'Operations' },
  { label: 'Reports', href: '/reports' },
  { label: 'Reimbursements', href: '/reimbursements' },
  { label: 'Offboarding', href: '/offboarding' },
  { section: 'Platform' },
  { label: 'Settings', href: '/settings' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const

export default function Sidebar({ collapsed }: { collapsed: boolean }) {
  const path = usePathname()
  if (collapsed) return (
    <aside style={{ width: 48, background: 'var(--surface)', borderRight: '1px solid var(--border)', flexShrink: 0 }} />
  )
  return (
    <aside style={{
      width: 210, background: 'var(--surface)',
      borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column',
      overflowY: 'auto', flexShrink: 0, padding: '6px 0 20px',
    }}>
      {NAV.map((item, i) => {
        if ('section' in item) return (
          <div key={i} style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text3)', padding: '14px 16px 5px', marginTop: i === 0 ? 0 : 4 }}>{item.section}</div>
        )
        const active = path === item.href || (item.href !== '/dashboard' && path.startsWith(item.href))
        return (
          <Link key={i} href={item.href} style={{
            display: 'block', padding: '7px 12px', margin: '1px 6px', borderRadius: 6,
            fontSize: 13, fontWeight: active ? 600 : 400,
            color: active ? 'var(--blue)' : 'var(--text2)',
            background: active ? 'rgba(59,130,246,0.1)' : 'transparent',
            border: active ? '1px solid rgba(59,130,246,0.15)' : '1px solid transparent',
            textDecoration: 'none', transition: 'all 0.12s',
          }}>{item.label}</Link>
        )
      })}
    </aside>
  )
}
