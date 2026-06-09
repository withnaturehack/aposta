import type { Metadata } from 'next'
import { requireSession } from '@/lib/session'
import SettingsClient from './SettingsClient'

export const metadata: Metadata = { title: 'Settings' }

export default async function SettingsPage() {
  const session = await requireSession()
  if (!['admin','hr_admin'].includes(session.role)) {
    return <div style={{ padding:'60px', textAlign:'center', color:'var(--text3)' }}>Access restricted to Admin and HR Admin.</div>
  }
  return <SettingsClient />
}
