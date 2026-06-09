import type { Metadata } from 'next'
import { requireSession } from '@/lib/session'
import { reimbursements } from '@/lib/store'
import { PageHeader, Card, CardHead, Stats, Badge } from '@/components/ui'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Reimbursements' }

export default async function ReimbursementsPage() {
  await requireSession()
  const pending = reimbursements.filter(r => r.status === 'pending').length
  const approved = reimbursements.filter(r => r.status === 'approved').length
  const processing = reimbursements.filter(r => r.status === 'processing').length
  const total = reimbursements.reduce((sum, r) => sum + r.amount, 0)

  return (
    <div>
      <PageHeader title="Reimbursements" subtitle="Approve or review employee expense claims and track payment status." />

      <Stats items={[
        { label: 'Pending claims', value: pending, color: 'var(--amber)' },
        { label: 'Approved', value: approved, color: 'var(--green)' },
        { label: 'Processing', value: processing, color: 'var(--blue)' },
        { label: 'Total amount', value: `₹${(total / 1000).toFixed(1)}k`, color: 'var(--text3)' },
      ]} />

      <Card>
        <CardHead title="Expense claims" right={<Link href="/helpdesk" style={{ fontSize: 12, color: 'var(--blue)', fontWeight: 600 }}>Request help</Link>} />
        <div style={{ padding: '16px 20px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text3)', borderBottom: '1px solid var(--border)' }}>Employee</th>
                <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text3)', borderBottom: '1px solid var(--border)' }}>Category</th>
                <th style={{ padding: '10px 16px', textAlign: 'right', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text3)', borderBottom: '1px solid var(--border)' }}>Amount</th>
                <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text3)', borderBottom: '1px solid var(--border)' }}>Status</th>
                <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text3)', borderBottom: '1px solid var(--border)' }}>Due</th>
              </tr>
            </thead>
            <tbody>
              {reimbursements.map(item => (
                <tr key={item.id}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', fontSize: 13 }}>{item.employee}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', fontSize: 13 }}>{item.category}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', textAlign: 'right', fontSize: 13, fontFamily: 'var(--mono)' }}>₹{item.amount.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}><Badge label={item.status} type={item.status} /></td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', color: 'var(--text3)', fontSize: 13 }}>{item.due}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
