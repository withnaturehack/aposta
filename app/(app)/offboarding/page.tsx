import type { Metadata } from 'next'
import { requireSession } from '@/lib/session'
import { employees } from '@/lib/store'
import { PageHeader, Card, CardHead, Badge, Btn } from '@/components/ui'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Offboarding' }

const checklist = [
  { title: 'Exit interview', status: 'pending' },
  { title: 'Final settlement', status: 'processing' },
  { title: 'Asset return', status: 'pending' },
  { title: 'Knowledge transfer', status: 'pending' },
  { title: 'Revoke access', status: 'draft' },
]

export default async function OffboardingPage() {
  await requireSession()
  const leavingSoon = employees.filter(e => e.status === 'notice')

  return (
    <div>
      <PageHeader title="Offboarding" subtitle="Track employees leaving the company and complete exit tasks on time." />

      <Card>
        <CardHead title="Notice board" right={<Link href="/people" style={{ fontSize: 12, color: 'var(--blue)', fontWeight: 600 }}>View people</Link>} />
        <div style={{ padding: '20px' }}>
          {leavingSoon.length ? leavingSoon.map(emp => (
            <div key={emp.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18, padding: '16px 0', borderBottom: '1px solid var(--border)' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{emp.name}</div>
                <div style={{ color: 'var(--text3)', fontSize: 12 }}>{emp.desig} • {emp.dept}</div>
              </div>
              <Badge label={emp.status === 'notice' ? 'Notice' : emp.status} type={emp.status} />
            </div>
          )) : <div style={{ color: 'var(--text3)', padding: 16 }}>No employees currently in notice period.</div>}
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 20, marginTop: 20 }}>
        <Card>
          <CardHead title="Offboarding checklist" right={<Btn variant="ghost">Add task</Btn>} />
          <div style={{ padding: '18px 20px' }}>
            {checklist.map(item => (
              <div key={item.title} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--border)' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{item.title}</div>
                </div>
                <Badge label={item.status} type={item.status} />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHead title="Next steps" />
          <div style={{ padding: '18px 20px', display: 'grid', gap: 14 }}>
            <div><strong>Exit checklist</strong><div style={{ color: 'var(--text3)', marginTop: 6 }}>Complete approvals, employee handover and asset returns.</div></div>
            <div><strong>Final payroll</strong><div style={{ color: 'var(--text3)', marginTop: 6 }}>Ensure last salary and reimbursements are settled.</div></div>
            <div><strong>Delightful exit</strong><div style={{ color: 'var(--text3)', marginTop: 6 }}>Send a smooth offboarding experience to departing employees.</div></div>
          </div>
        </Card>
      </div>
    </div>
  )
}
