import type { Metadata } from 'next'
import { requireSession } from '@/lib/session'
import { assets, employees } from '@/lib/store'
import AssetsClient from './AssetsClient'

export const metadata: Metadata = { title: 'Assets' }

export default async function AssetsPage() {
  await requireSession()
  return <AssetsClient assets={assets} employees={employees} />
}
