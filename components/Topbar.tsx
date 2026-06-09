'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { initials, clr } from '@/lib/utils'

export default function Topbar({ user, onToggle }: { user: any; onToggle: () => void }) {
  const router = useRouter()

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  return (
    <header style={{
      height: 52, background: 'var(--surface)',
      borderBottom: '1px solid var(--border)',
      display: 'flex', alignItems: 'center',
      padding: '0 20px', gap: 16, flexShrink: 0, zIndex: 50,
    }}>
      <button onClick={onToggle} style={{
        background: 'none', border: 'none', color: 'var(--text3)',
        fontSize: 16, padding: 4, borderRadius: 4, cursor: 'pointer',
        display: 'flex', alignItems: 'center',
      }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect y="3" width="18" height="2" rx="1" fill="currentColor"/>
          <rect y="8" width="18" height="2" rx="1" fill="currentColor"/>
          <rect y="13" width="18" height="2" rx="1" fill="currentColor"/>
        </svg>
      </button>
      <Link href="/home" style={{ fontWeight: 700, fontSize: 16, letterSpacing: '-0.3px', color: 'inherit' }}>
        APOTSA <span style={{ color: 'var(--blue)' }}>People</span>
      </Link>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ fontSize: 12, color: 'var(--text3)', textAlign: 'right' }}>
          <div style={{ color: 'var(--text)', fontWeight: 500 }}>{user?.name}</div>
          <div style={{ textTransform: 'capitalize' }}>{user?.role?.replace('_',' ')}</div>
        </div>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: clr(user?.name || 'A'),
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0,
        }}>{initials(user?.name || 'Admin User')}</div>
        <button onClick={logout} style={{
          background: 'var(--card)', border: '1px solid var(--border)',
          color: 'var(--text2)', borderRadius: 6, padding: '5px 10px',
          fontSize: 12, cursor: 'pointer', fontWeight: 500,
        }}>Sign out</button>
      </div>
    </header>
  )
}
