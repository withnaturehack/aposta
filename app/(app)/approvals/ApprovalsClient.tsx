'use client'
import { useState } from 'react'
import { PageHeader, Card, Badge, Avatar, Btn } from '@/components/ui'
import type { LeaveRequest } from '@/lib/store'

export default function ApprovalsClient({ initialItems }: { initialItems: LeaveRequest[] }) {
  const [items, setItems] = useState(initialItems)
  const [acted, setActed] = useState<Record<string,'approved'|'rejected'>>({})
  const [toast, setToast] = useState('')

  function act(id: string, action: 'approved'|'rejected') {
    setActed(p => ({ ...p, [id]: action }))
    setToast(action === 'approved' ? 'Approved successfully' : 'Request rejected')
    setTimeout(() => setToast(''), 2500)
  }

  const pending = items.filter(i => !acted[i.id])

  return (
    <div>
      <PageHeader title="Approvals Inbox" subtitle={`${pending.length} pending actions`} />

      <Card>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead><tr>
            {['Employee','Type','Period','Days','Reason','Status','Actions'].map(h => (
              <th key={h} style={{ padding:'10px 16px', textAlign:'left', fontSize:11, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color:'var(--text3)', background:'var(--surface)', borderBottom:'1px solid var(--border)' }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td style={{ padding:'12px 16px', borderBottom:'1px solid var(--border)' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <Avatar name={item.name} size={28} />
                    <span style={{ fontSize:13, fontWeight:500 }}>{item.name}</span>
                  </div>
                </td>
                <td style={{ padding:'12px 16px', borderBottom:'1px solid var(--border)', fontSize:13, color:'var(--text2)' }}>{item.type}</td>
                <td style={{ padding:'12px 16px', borderBottom:'1px solid var(--border)', fontSize:12, fontFamily:'var(--mono)', color:'var(--text2)' }}>{item.from} — {item.to}</td>
                <td style={{ padding:'12px 16px', borderBottom:'1px solid var(--border)', fontSize:13, fontFamily:'var(--mono)' }}>{item.days}d</td>
                <td style={{ padding:'12px 16px', borderBottom:'1px solid var(--border)', fontSize:12, color:'var(--text3)', maxWidth:140, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.reason}</td>
                <td style={{ padding:'12px 16px', borderBottom:'1px solid var(--border)' }}>
                  <Badge label={acted[item.id] || item.status} type={acted[item.id] || item.status} />
                </td>
                <td style={{ padding:'12px 16px', borderBottom:'1px solid var(--border)' }}>
                  {!acted[item.id] && (
                    <div style={{ display:'flex', gap:6 }}>
                      <Btn size="sm" variant="success" onClick={() => act(item.id,'approved')}>Approve</Btn>
                      <Btn size="sm" variant="danger" onClick={() => act(item.id,'rejected')}>Reject</Btn>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={7} style={{ padding:'48px', textAlign:'center', color:'var(--text3)' }}>No pending approvals</td></tr>
            )}
          </tbody>
        </table>
      </Card>

      {toast && (
        <div style={{ position:'fixed', bottom:20, right:20, zIndex:9999, background:'var(--surface)', border:'1px solid rgba(34,197,94,0.3)', borderRadius:8, padding:'10px 16px', fontSize:13 }}>
          {toast}
        </div>
      )}
    </div>
  )
}
