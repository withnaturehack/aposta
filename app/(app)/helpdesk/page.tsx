import type { Metadata } from 'next'
import { requireSession } from '@/lib/session'
import { tickets } from '@/lib/store'
import { Stats, Card, CardHead, Badge } from '@/components/ui'
import HelpdeskClient from './HelpdeskClient'

export const metadata: Metadata = { title: 'HR Helpdesk' }

export default async function HelpdeskPage() {
  const session = await requireSession()
  return <HelpdeskClient tickets={tickets} role={session.role} />
}
