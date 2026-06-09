import Link from 'next/link'

export default function AppNotFound() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '60vh', flexDirection: 'column', gap: 16, textAlign: 'center',
    }}>
      <div style={{ fontSize: 56, fontFamily: 'var(--mono)', fontWeight: 700, color: 'var(--border2)' }}>404</div>
      <h1 style={{ fontSize: 20, fontWeight: 700 }}>Page not found</h1>
      <p style={{ color: 'var(--text3)', fontSize: 14 }}>The page you are looking for does not exist.</p>
      <Link href="/dashboard" style={{
        padding: '9px 20px', borderRadius: 8, background: 'var(--blue)',
        color: '#fff', fontSize: 13, fontWeight: 600, textDecoration: 'none',
      }}>Back to Dashboard</Link>
    </div>
  )
}
