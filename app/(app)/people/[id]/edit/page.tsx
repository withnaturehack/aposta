import type { Metadata } from 'next'
import { requireSession } from '@/lib/session'
import { employees } from '@/lib/store'
import EditEmployeeClient from './EditEmployeeClient'
import { notFound } from 'next/navigation'

export const metadata: Metadata = { title: 'Edit Employee' }

export default async function EditEmployeePage({ params }: { params: { id: string } }) {
  const session = await requireSession()
  if (!['admin', 'hr_admin'].includes(session.role)) {
    return <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text3)' }}>Access restricted.</div>
  }
  const emp = employees.find(e => e.id === params.id)
  if (!emp) notFound()
  return <EditEmployeeClient employee={emp} />
}
