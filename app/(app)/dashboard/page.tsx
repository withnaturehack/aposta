import type { Metadata } from 'next'
import { requireSession } from '@/lib/session'
import { employees, attendance, leaveRequests, tickets, payrollRuns } from '@/lib/store'
import { Card, CardHead, Stats, Badge, Avatar, Th, Td } from '@/components/ui'
import { fmt } from '@/lib/utils'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Dashboard' }

export default async function Dashboard() {
  const session = await requireSession()
  const today = attendance
  const present = today.filter(a => a.status === 'present' || a.status === 'wfh').length
  const pending = leaveRequests.filter(l => l.status === 'pending').length
  const openT = tickets.filter(t => t.status === 'open').length
  const lastRun = payrollRuns.find(r => r.status === 'paid')

  return (
    <div>
      <div style={{ marginBottom:28 }}>
        <h1 style={{ fontSize:22, fontWeight:700, letterSpacing:'-0.4px', marginBottom:4 }}>Dashboard</h1>
        <p style={{ fontSize:13, color:'var(--text3)' }}>
          {new Date().toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long', year:'numeric' })}
        </p>
      </div>

      <Stats items={[
        { label:'Total Employees', value:employees.length, color:'var(--blue)' },
        { label:'Present Today', value:present, color:'var(--green)' },
        { label:'Leave Pending', value:pending, color:'var(--amber)' },
        { label:'Open Tickets', value:openT, color:'var(--red)' },
      ]} />

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:20 }}>

        <Card>
          <CardHead title="Today's Attendance" right={<Link href="/attendance" style={{ fontSize:12, color:'var(--blue)', fontWeight:600 }}>View all</Link>} />
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead><tr><Th>Employee</Th><Th>In</Th><Th>Mode</Th><Th>Status</Th></tr></thead>
            <tbody>
              {today.slice(0,6).map(a => (
                <tr key={a.id}>
                  <Td><div style={{ display:'flex', alignItems:'center', gap:8 }}><Avatar name={a.name} size={26} />{a.name}</div></Td>
                  <Td mono>{a.clockIn || '—'}</Td>
                  <Td>{a.mode ? <Badge label={a.mode} type={a.mode} /> : '—'}</Td>
                  <Td><Badge label={a.status} type={a.status} /></Td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card>
          <CardHead title="Pending Leave Requests" right={<Link href="/leave" style={{ fontSize:12, color:'var(--blue)', fontWeight:600 }}>View all</Link>} />
          {leaveRequests.filter(l => l.status === 'pending').slice(0,5).map(l => (
            <div key={l.id} style={{ padding:'11px 20px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', gap:12 }}>
              <Avatar name={l.name} size={28} />
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:13, fontWeight:500 }}>{l.name}</div>
                <div style={{ fontSize:11, color:'var(--text3)' }}>{l.type} — {l.days} day{l.days>1?'s':''}</div>
              </div>
              <Badge label="Pending" type="pending" />
            </div>
          ))}
          {leaveRequests.filter(l => l.status === 'pending').length === 0 && (
            <div style={{ padding:'20px', textAlign:'center', fontSize:13, color:'var(--text3)' }}>No pending requests</div>
          )}
        </Card>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>

        <Card>
          <CardHead title="Recent Payroll" />
          {payrollRuns.map(r => (
            <div key={r.id} style={{ padding:'11px 20px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div>
                <div style={{ fontSize:13, fontWeight:500 }}>{r.month}</div>
                <div style={{ fontSize:11, color:'var(--text3)' }}>{r.employees} employees</div>
              </div>
              <div style={{ textAlign:'right' }}>
                <div style={{ fontSize:13, fontFamily:'var(--mono)', fontWeight:600 }}>{r.net > 0 ? fmt(r.net) : '—'}</div>
                <Badge label={r.status} type={r.status} />
              </div>
            </div>
          ))}
        </Card>

        <Card>
          <CardHead title="Open Tickets" right={<Link href="/helpdesk" style={{ fontSize:12, color:'var(--blue)', fontWeight:600 }}>View all</Link>} />
          {tickets.filter(t => t.status === 'open' || t.status === 'in_progress').slice(0,4).map(t => (
            <div key={t.id} style={{ padding:'11px 20px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', gap:12 }}>
              <div style={{ width:3, height:36, background:t.priority==='urgent'?'var(--red)':t.priority==='high'?'var(--amber)':'var(--blue)', borderRadius:2, flexShrink:0 }} />
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:13, fontWeight:500, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{t.subject}</div>
                <div style={{ fontSize:11, color:'var(--text3)' }}>{t.by} — {t.category}</div>
              </div>
              <Badge label={t.priority} type={t.priority} />
            </div>
          ))}
          {tickets.filter(t=>t.status==='open'||t.status==='in_progress').length===0 && (
            <div style={{ padding:'20px', textAlign:'center', fontSize:13, color:'var(--text3)' }}>No open tickets</div>
          )}
        </Card>

      </div>
    </div>
  )
}
