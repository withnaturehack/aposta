import type { Metadata } from 'next'
import { requireSession } from '@/lib/session'
import { leaveRequests, leaveBalances } from '@/lib/store'
import { Card, CardHead, Badge, Avatar, ProgressBar } from '@/components/ui'
import LeaveClient from './LeaveClient'

export const metadata: Metadata = { title: 'Leave Management' }

export default async function LeavePage() {
  const session = await requireSession()
  const pending = leaveRequests.filter(l => l.status === 'pending')
  const canApprove = ['admin','hr_admin','manager'].includes(session.role)

  return (
    <div>
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:28 }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:700, letterSpacing:'-0.4px', marginBottom:4 }}>Leave Management</h1>
          <p style={{ fontSize:13, color:'var(--text3)' }}>{pending.length} pending approvals</p>
        </div>
        <LeaveClient role={session.role} />
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:24 }}>
        <Card>
          <CardHead title="My Leave Balances — 2026" />
          <div style={{ padding:16 }}>
            {leaveBalances.map(l => (
              <div key={l.code} style={{ display:'flex', alignItems:'center', gap:14, padding:'8px 0', borderBottom:'1px solid var(--border)' }}>
                <div style={{ width:8, height:8, borderRadius:'50%', background:l.color, flexShrink:0 }} />
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, marginBottom:4 }}>
                    <span>{l.type}</span>
                    <span style={{ fontFamily:'var(--mono)', fontSize:12, color:'var(--text3)' }}>{l.used}/{l.total} used</span>
                  </div>
                  <ProgressBar pct={(l.used/l.total)*100} color={l.color} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHead title="Leave Policy" />
          <div style={{ padding:16 }}>
            {[['Casual Leave (CL)','12 days/year'],['Sick Leave (SL)','12 days/year'],['Earned Leave (EL)','24 days/year — 15 carry fwd'],['Comp Off (CO)','8 days/year']].map(([k,v]) => (
              <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'9px 0', borderBottom:'1px solid var(--border)', fontSize:13 }}>
                <span style={{ color:'var(--text2)' }}>{k}</span>
                <span style={{ fontFamily:'var(--mono)', fontSize:12, color:'var(--text3)' }}>{v}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <CardHead title="All Leave Requests" />
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead><tr>
            {['Employee','Type','From','To','Days','Reason','Status','Actions'].map(h => (
              <th key={h} style={{ padding:'10px 16px', textAlign:'left', fontSize:11, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color:'var(--text3)', background:'var(--surface)', borderBottom:'1px solid var(--border)' }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {leaveRequests.map(l => (
              <tr key={l.id}>
                <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)', fontSize:13, fontWeight:500, color:'var(--text)' }}>{l.name}</td>
                <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)', fontSize:13, color:'var(--text2)' }}>{l.type}</td>
                <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)', fontSize:12, fontFamily:'var(--mono)', color:'var(--text2)' }}>{l.from}</td>
                <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)', fontSize:12, fontFamily:'var(--mono)', color:'var(--text2)' }}>{l.to}</td>
                <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)', fontSize:13, fontFamily:'var(--mono)' }}>{l.days}d</td>
                <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)', fontSize:12, color:'var(--text3)', maxWidth:140, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{l.reason}</td>
                <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)' }}><Badge label={l.status} type={l.status} /></td>
                <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)' }}>
                  {l.status === 'pending' && canApprove && (
                    <LeaveActions id={l.id} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

function LeaveActions({ id }: { id: string }) {
  return (
    <div style={{ display:'flex', gap:6 }}>
      <span style={{ fontSize:11, padding:'3px 10px', borderRadius:6, background:'rgba(34,197,94,0.1)', color:'#22c55e', border:'1px solid rgba(34,197,94,0.25)', fontWeight:600, cursor:'pointer' }}>Approve</span>
      <span style={{ fontSize:11, padding:'3px 10px', borderRadius:6, background:'rgba(239,68,68,0.1)', color:'#ef4444', border:'1px solid rgba(239,68,68,0.25)', fontWeight:600, cursor:'pointer' }}>Reject</span>
    </div>
  )
}
