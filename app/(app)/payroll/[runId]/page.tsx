import type { Metadata } from 'next'
import { requireSession } from '@/lib/session'
import { payrollRuns, employees } from '@/lib/store'
import { Card, CardHead, Stats, Avatar, Badge } from '@/components/ui'
import { fmt, fmtFull } from '@/lib/utils'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Payroll Run Detail' }

export default async function PayrollRunPage({ params }: { params: { runId: string } }) {
  const session = await requireSession()
  if (!['admin','hr_admin','finance_team'].includes(session.role)) {
    return <div style={{ padding:'60px', textAlign:'center', color:'var(--text3)' }}>Access restricted.</div>
  }
  const run = payrollRuns.find(r => r.id === params.runId)
  if (!run || run.status === 'draft') notFound()

  const payslips = employees.map(e => {
    const m = e.ctc / 12
    const basic = m * 0.4, hra = basic * 0.4, special = m - basic - hra
    const pf = basic * 0.12, pt = 200, tds = m > 50000 ? m * 0.1 : 0
    return { ...e, gross:Math.round(m), basic:Math.round(basic), hra:Math.round(hra), special:Math.round(special), pf:Math.round(pf), pt, tds:Math.round(tds), net:Math.round(m-pf-pt-tds) }
  })

  return (
    <div>
      <div style={{ marginBottom:16 }}>
        <Link href="/payroll" style={{ fontSize:13, color:'var(--text3)' }}>← Payroll</Link>
      </div>
      <div style={{ marginBottom:24 }}>
        <h1 style={{ fontSize:22, fontWeight:700, marginBottom:4 }}>{run.month} Payroll</h1>
        <p style={{ fontSize:13, color:'var(--text3)' }}>{run.employees} employees — Paid {run.paidAt}</p>
      </div>

      <Stats items={[
        { label:'Gross Payroll', value:fmt(run.gross), color:'var(--blue)' },
        { label:'Net Disbursement', value:fmt(run.net), color:'var(--green)' },
        { label:'Employees', value:run.employees, color:'var(--violet)' },
        { label:'Status', value:run.status, color:'var(--green)' },
      ]} />

      <Card>
        <CardHead title="Payslips" />
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12 }}>
          <thead><tr>
            {['Employee','Gross','Basic','HRA','PF','PT','TDS','Net'].map(h => (
              <th key={h} style={{ padding:'9px 14px', textAlign:'left', fontSize:11, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color:'var(--text3)', background:'var(--surface)', borderBottom:'1px solid var(--border)' }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {payslips.map(p => (
              <tr key={p.id}>
                <td style={{ padding:'10px 14px', borderBottom:'1px solid var(--border)', fontSize:13 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <Avatar name={p.name} size={24} />
                    <div>
                      <div style={{ fontWeight:600 }}>{p.name}</div>
                      <div style={{ fontSize:10, color:'var(--text3)', fontFamily:'var(--mono)' }}>{p.code}</div>
                    </div>
                  </div>
                </td>
                {[p.gross, p.basic, p.hra].map((v,i) => <td key={i} style={{ padding:'10px 14px', borderBottom:'1px solid var(--border)', fontFamily:'var(--mono)', color:'var(--text2)' }}>{fmtFull(v)}</td>)}
                {[p.pf, p.pt, p.tds].map((v,i) => <td key={i} style={{ padding:'10px 14px', borderBottom:'1px solid var(--border)', fontFamily:'var(--mono)', color:'var(--red)', fontSize:12 }}>{fmtFull(v)}</td>)}
                <td style={{ padding:'10px 14px', borderBottom:'1px solid var(--border)', fontFamily:'var(--mono)', fontWeight:700, color:'var(--green)' }}>{fmtFull(p.net)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
