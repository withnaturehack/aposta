import type { Metadata } from 'next'
import { requireSession } from '@/lib/session'
import { employees } from '@/lib/store'
import PeopleClient from './PeopleClient'

export const metadata: Metadata = { title: 'Employee Directory' }

export default async function PeoplePage({ searchParams }: { searchParams: { added?: string } }) {
  await requireSession()
  return <PeopleClient employees={employees} added={!!searchParams.added} />
}
