import type { Metadata } from 'next'
import Link from 'next/link'
import { requireSession } from '@/lib/session'
import { employees, attendance, leaveRequests, payrollRuns, jobs, leaveBalances } from '@/lib/store'
import { PageHeader, Card, CardHead, Stats, Badge, Grid2, ProgressBar, Btn } from '@/components/ui'

export const metadata: Metadata = { title: 'Reports' }

export default async function ReportsPage() {
  const session = await requireSession()
  const pendingApprovals = leaveRequests.filter(l => l.status === 'pending').length
  const drafts = payrollRuns.filter(r => r.status === 'draft').length
  const openRoles = jobs.filter(j => j.status === 'open').length
  const activeEmployees = employees.filter(e => e.status === 'active').length
  const attendancePct = Math.round((attendance.filter(a => a.status === 'present' || a.status === 'wfh').length / Math.max(attendance.length, 1)) * 100)

  return (
    <div>
      <PageHeader title="Reports" subtitle="HR insights and operational metrics for your people team." />

      <Stats items={[
        { label: 'Active employees', value: activeEmployees, color: 'var(--blue)' },
        { label: 'Attendance rate', value: `${attendancePct}%`, color: 'var(--green)' },
        { label: 'Pending approvals', value: pendingApprovals, color: 'var(--amber)' },
        { label: 'Payroll drafts', value: drafts, color: 'var(--red)' },
      ]} />

      <div style={{ display: 'grid', gap: 20, marginBottom: 20 }}>
        <Grid2>
          <Card>
            <CardHead title="Leave balance forecast" right={<Link href="/leave" style={{ fontSize: 12, color: 'var(--blue)', fontWeight: 600 }}>Manage leave</Link>} />
            <div style={{ padding: '18px 20px' }}>
              {leaveBalances.map(item => {
                const pct = Math.round((item.used / item.total) * 100)
                return (
                  <div key={item.type} style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                      <span>{item.type}</span>
                      <span style={{ color: 'var(--text3)' }}>{item.used}/{item.total} days</span>
                    </div>
                    <ProgressBar pct={pct} color={item.color} />
                  </div>
                )
              })}
            </div>
          </Card>

          <Card>
            <CardHead title="Hiring pipeline" right={<Link href="/recruitment" style={{ fontSize: 12, color: 'var(--blue)', fontWeight: 600 }}>Open roles</Link>} />
            <div style={{ padding: '18px 20px' }}>
              {jobs.filter(job => job.status === 'open').map(job => (
                <div key={job.id} style={{ padding: '14px 0', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{job.title}</div>
                  <div style={{ color: 'var(--text3)', fontSize: 12, marginTop: 4 }}>{job.dept} • {job.openings} openings • {job.applications} applicants</div>
                </div>
              ))}
              {jobs.filter(job => job.status === 'open').length === 0 && <div style={{ color: 'var(--text3)', padding: 16 }}>No open roles right now.</div>}
            </div>
          </Card>
        </Grid2>

        <Grid2>
          <Card>
            <CardHead title="Payroll trend" right={<Link href="/payroll" style={{ fontSize: 12, color: 'var(--blue)', fontWeight: 600 }}>View payroll</Link>} />
            <div style={{ padding: '18px 20px' }}>
              {payrollRuns.slice(0, 4).map(run => (
                <div key={run.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{run.month}</div>
                    <div style={{ color: 'var(--text3)', fontSize: 12 }}>{run.employees} employees</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 13, fontFamily: 'var(--mono)', fontWeight: 700 }}>{run.net > 0 ? `₹${(run.net/1000).toFixed(1)}k` : 'Draft'}</div>
                    <Badge label={run.status} type={run.status} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHead title="Quick insights" />
            <div style={{ padding: '18px 20px', display: 'grid', gap: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                <span style={{ color: 'var(--text3)' }}>Average days to approve leave</span>
                <strong>2.4</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                <span style={{ color: 'var(--text3)' }}>Employee churn</span>
                <strong>3.1%</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                <span style={{ color: 'var(--text3)' }}>Expense approvals</span>
                <strong>{Math.round((openRoles / Math.max(employees.length, 1)) * 100)}%</strong>
              </div>
              <Link href="/reports" style={{ marginTop: 8, display: 'inline-flex', textDecoration: 'none' }}><Btn variant="ghost">Refresh</Btn></Link>
            </div>
          </Card>
        </Grid2>
      </div>
    </div>
  )
}
