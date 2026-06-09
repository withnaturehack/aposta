import type { Metadata } from 'next'
import { requireSession } from '@/lib/session'
import { leaveRequests } from '@/lib/store'
import ApprovalsClient from './ApprovalsClient'

export const metadata: Metadata = { title: 'Approvals' }

export default async function ApprovalsPage() {
  const session = await requireSession()
  const pending = leaveRequests.filter(l => l.status === 'pending')
  return <ApprovalsClient initialItems={pending} />
}
