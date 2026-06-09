import type { Metadata } from 'next'
import { requireSession } from '@/lib/session'
import { performance } from '@/lib/store'
import PerformanceClient from './PerformanceClient'

export const metadata: Metadata = { title: 'Performance' }

export default async function PerformancePage() {
  await requireSession()
  return <PerformanceClient data={performance} />
}
