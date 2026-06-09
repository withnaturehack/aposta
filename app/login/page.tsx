import type { Metadata } from 'next'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import LoginForm from './LoginForm'

export const metadata: Metadata = { title: 'Sign In | APOTSA People' }

export default async function LoginPage({ searchParams }: { searchParams: { error?: string; next?: string } }) {
  const session = await getSession()
  if (session) redirect('/dashboard')

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ width: 380, padding: 40, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16 }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.5px', color: 'var(--text)', marginBottom: 4 }}>
            APOTSA People
          </div>
          <div style={{ fontSize: 13, color: 'var(--text3)' }}>Sign in to your workspace</div>
        </div>

        {searchParams.error && (
          <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 20, fontSize: 13, color: '#fca5a5' }}>
            Invalid email or password. Please try again.
          </div>
        )}

        <LoginForm />

        <div style={{ marginTop: 28, padding: 16, background: 'var(--card)', borderRadius: 8, border: '1px solid var(--border)' }}>
          <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Demo Accounts
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              ['admin@acme.com', 'admin123', 'Admin — Full access'],
              ['priya@acme.com', 'pass123', 'HR Admin — HR & payroll'],
              ['rohit@acme.com', 'pass123', 'Employee — Self service'],
            ].map(([email, pw, role]) => (
              <div key={email} style={{ fontSize: 12, color: 'var(--text2)', fontFamily: 'var(--mono)', padding: '4px 8px', background: 'var(--surface)', borderRadius: 4 }}>
                <span style={{ color: 'var(--blue)' }}>{email}</span>
                <span style={{ color: 'var(--text3)' }}> / {pw}</span>
                <span style={{ color: 'var(--text3)', fontFamily: 'var(--font)', fontSize: 11 }}> — {role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
