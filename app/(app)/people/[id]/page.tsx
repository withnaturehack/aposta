import type { Metadata } from 'next'
import { requireSession } from '@/lib/session'
import { employees, leaveBalances, attendance, assets, documents } from '@/lib/store'
import { Card, CardHead, Badge, Avatar, KV, ProgressBar, Btn } from '@/components/ui'
import { fmt } from '@/lib/utils'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Employee Profile' }

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const session = await requireSession()
  const emp = employees.find(e => e.id === params.id)
  if (!emp) notFound()

  const canViewPII = ['admin', 'hr_admin'].includes(session.role)
  const canEdit = ['admin', 'hr_admin'].includes(session.role)
  const empAtt = attendance.filter(a => a.userId === params.id)
  const empAssets = assets.filter(a => a.assignedTo === params.id)
  const empDocs = documents.filter(d => d.empId === params.id)

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/people" style={{ fontSize: 13, color: 'var(--text3)', textDecoration: 'none' }}>
          &larr; Directory
        </Link>
        {canEdit && (
          <Link href={'/people/' + emp.id + '/edit'}>
            <Btn variant="secondary">Edit Employee</Btn>
          </Link>
        )}
      </div>

      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, marginBottom: 20, display: 'flex', alignItems: 'flex-start', gap: 20 }}>
        <Avatar name={emp.name} size={60} />
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{emp.name}</h1>
          <p style={{ fontSize: 14, color: 'var(--text3)', marginBottom: 10 }}>{emp.desig} &mdash; {emp.dept}</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, fontFamily: 'var(--mono)', background: 'var(--surface)', padding: '2px 8px', borderRadius: 4, border: '1px solid var(--border)' }}>{emp.code}</span>
            <Badge label={emp.status} type={emp.status} />
            <Badge label={emp.type} type={emp.type} />
            <Badge label={emp.grade} type="medium" />
          </div>
        </div>
        {canViewPII && emp.ctc > 0 && (
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 4 }}>Annual CTC</div>
            <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'var(--mono)', color: 'var(--blue)' }}>{fmt(emp.ctc)}</div>
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          <Card>
            <CardHead title="Work Information" />
            <div style={{ padding: 20 }}>
              <KV rows={[
                ['Email', emp.email],
                ['Phone', emp.phone],
                ['Department', emp.dept],
                ['Designation', emp.desig],
                ['Grade', emp.grade],
                ['Manager', emp.mgr],
                ['Date of Joining', emp.doj],
                ['Employment Type', emp.type],
                ['Gender', emp.gender],
              ]} />
            </div>
          </Card>

          {canViewPII && (
            <Card>
              <CardHead title="Financial & Compliance" sub="Restricted — HR Admin / Admin only" />
              <div style={{ padding: 20 }}>
                <KV rows={[
                  ['PAN', emp.pan || 'Not provided'],
                  ['Bank Account', emp.bank || 'Not provided'],
                  ['IFSC', emp.ifsc || 'Not provided'],
                  ['Aadhaar', emp.aadhaar || 'Not provided'],
                ]} />
              </div>
            </Card>
          )}

          <Card>
            <CardHead title="Recent Attendance" />
            {empAtt.length > 0 ? (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {empAtt.map(a => (
                    <tr key={a.id}>
                      <td style={{ padding: '10px 20px', borderBottom: '1px solid var(--border)', fontSize: 13, fontFamily: 'var(--mono)', color: 'var(--text2)' }}>{a.date}</td>
                      <td style={{ padding: '10px 20px', borderBottom: '1px solid var(--border)', fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--text3)' }}>
                        {a.clockIn || '—'} &rarr; {a.clockOut || 'In progress'}
                      </td>
                      <td style={{ padding: '10px 20px', borderBottom: '1px solid var(--border)', fontSize: 12, color: 'var(--text3)' }}>{a.worked}</td>
                      <td style={{ padding: '10px 20px', borderBottom: '1px solid var(--border)' }}><Badge label={a.status} type={a.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ padding: 20, textAlign: 'center', fontSize: 13, color: 'var(--text3)' }}>No attendance records for today</div>
            )}
          </Card>

        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card>
            <CardHead title="Leave Balances" sub="2026" />
            <div style={{ padding: 16 }}>
              {leaveBalances.map(l => (
                <div key={l.code} style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 5 }}>
                    <span style={{ color: 'var(--text2)' }}>{l.type}</span>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text3)' }}>{l.used}/{l.total}</span>
                  </div>
                  <ProgressBar pct={(l.used / l.total) * 100} color={l.color} />
                </div>
              ))}
            </div>
          </Card>

          {empAssets.length > 0 && (
            <Card>
              <CardHead title="Assigned Assets" />
              <div style={{ padding: 16 }}>
                {empAssets.map(a => (
                  <div key={a.id} style={{ padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                    <div style={{ fontWeight: 500 }}>{a.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'var(--mono)', marginTop: 2 }}>{a.tag} &middot; {a.category}</div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {empDocs.length > 0 && (
            <Card>
              <CardHead title="Documents" />
              <div style={{ padding: 16 }}>
                {empDocs.map(d => (
                  <div key={d.id} style={{ padding: '8px 0', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{d.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text3)' }}>{d.category}</div>
                    </div>
                    <Badge label={d.status} type={d.status} />
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
