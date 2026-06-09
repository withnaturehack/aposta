import type { Metadata } from 'next'
import { requireSession } from '@/lib/session'
import { payrollRuns, employees } from '@/lib/store'
import { Card, CardHead, Stats, Badge } from '@/components/ui'
import { fmt, fmtFull } from '@/lib/utils'
import PayrollClient from './PayrollClient'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Payroll' }

export default async function PayrollPage() {
  const session = await requireSession()
  if (!['admin','hr_admin','finance_team'].includes(session.role)) {
    return <div style={{ padding:'60px', textAlign:'center', color:'var(--text3)' }}>Access restricted to HR Admin and Finance team.</div>
  }
  const lastPaid = payrollRuns.find(r => r.status === 'paid')

  return (
    <div>
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:28 }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:700, letterSpacing:'-0.4px', marginBottom:4 }}>Payroll</h1>
          <p style={{ fontSize:13, color:'var(--text3)' }}>June 2026 — {employees.length} employees</p>
        </div>
        <PayrollClient />
      </div>

      <Stats items={[
        { label:'Monthly Gross', value:lastPaid ? fmt(lastPaid.gross) : '—', color:'var(--blue)' },
        { label:'Net Disbursement', value:lastPaid ? fmt(lastPaid.net) : '—', color:'var(--green)' },
        { label:'Employees', value:lastPaid?.employees || employees.length, color:'var(--violet)' },
        { label:'Last Run', value:lastPaid?.month || '—', color:'var(--text3)' },
      ]} />

      <div style={{ background:'var(--card)', border:'1px solid rgba(34,197,94,0.2)', borderLeft:'3px solid var(--green)', borderRadius:10, padding:'14px 20px', marginBottom:20, fontSize:13, color:'var(--text2)' }}>
        <strong style={{ color:'var(--green)' }}>Spend Integration:</strong> HRMS computes salaries. Bank disbursement calls Spend payout rails POST /api/payouts/payroll. No duplicate payout engine here.
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
        <Card>
          <CardHead title="Payroll Run History" />
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead><tr>
              {['Period','Employees','Gross','Net','Status'].map(h => (
                <th key={h} style={{ padding:'10px 16px', textAlign:'left', fontSize:11, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color:'var(--text3)', background:'var(--surface)', borderBottom:'1px solid var(--border)' }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {payrollRuns.map(r => (
                <tr key={r.id}>
                  <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)', fontSize:13, fontWeight:500, color:'var(--text)' }}>
                    {r.status !== 'draft' ? <Link href={'/payroll/'+r.id} style={{ color:'var(--blue)', fontWeight:600 }}>{r.month}</Link> : r.month}
                  </td>
                  <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)', fontSize:13, fontFamily:'var(--mono)', color:'var(--text2)' }}>{r.employees}</td>
                  <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)', fontSize:12, fontFamily:'var(--mono)', color:'var(--text2)' }}>{r.gross > 0 ? fmt(r.gross) : '—'}</td>
                  <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)', fontSize:12, fontFamily:'var(--mono)', color:'var(--text2)' }}>{r.net > 0 ? fmt(r.net) : '—'}</td>
                  <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)' }}><Badge label={r.status} type={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card>
          <CardHead title="Salary Structures" />
          {[['Grade A — Senior','Rs.8L – Rs.15L CTC'],['Grade B — Mid','Rs.4L – Rs.8L CTC'],['Grade C — Junior','Rs.2L – Rs.4L CTC']].map(([n,s]) => (
            <div key={n} style={{ padding:'14px 20px', borderBottom:'1px solid var(--border)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div>
                <div style={{ fontSize:13, fontWeight:600 }}>{n}</div>
                <div style={{ fontSize:11, color:'var(--text3)', marginTop:2 }}>{s}</div>
              </div>
              <Badge label="Active" type="active" />
            </div>
          ))}
        </Card>
      </div>
    </div>
  )
}
