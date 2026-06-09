import type { Metadata } from 'next'
import { requireSession } from '@/lib/session'
import { employees } from '@/lib/store'
import NewEmployeeClient from './NewEmployeeClient'

export const metadata: Metadata = { title: 'Add Employee' }

export default async function NewEmployeePage() {
  const session = await requireSession()
  if (!['admin', 'hr_admin'].includes(session.role)) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text3)' }}>
        Access restricted to HR Admin and Admin roles.
      </div>
    )
  }
  return <NewEmployeeClient nextCode={'EMP-' + String(employees.length + 1).padStart(4, '0')} />
}
