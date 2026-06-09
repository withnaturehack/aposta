'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')
  const router = useRouter()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setErr('')
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { setErr(data.error || 'Invalid credentials'); return }
    router.push('/dashboard')
    router.refresh()
  }

  return (
    <form onSubmit={submit}>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text3)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" required autoFocus />
      </div>
      <div style={{ marginBottom: 24 }}>
        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text3)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      </div>
      {err && <div style={{ fontSize: 12, color: '#fca5a5', marginBottom: 16 }}>{err}</div>}
      <button type="submit" disabled={loading} style={{
        width: '100%', padding: '10px 0', borderRadius: 8,
        background: loading ? 'var(--border2)' : 'var(--blue)',
        color: '#fff', fontWeight: 600, fontSize: 14,
        border: 'none', transition: 'background 0.15s',
      }}>
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  )
}
