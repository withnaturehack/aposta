'use client'
import { useState } from 'react'
import { PageHeader, Card, CardHead, Badge, Stats, Modal, FormField, Grid2, Btn } from '@/components/ui'
import type { Ticket } from '@/lib/store'

const PRIO_COLOR: Record<string,string> = { urgent:'var(--red)', high:'var(--amber)', medium:'var(--blue)', low:'var(--text3)' }

export default function HelpdeskClient({ tickets, role }: { tickets: Ticket[]; role: string }) {
  const [list, setList] = useState(tickets)
  const [selected, setSelected] = useState<Ticket|null>(null)
  const [showNew, setShowNew] = useState(false)
  const [comment, setComment] = useState('')
  const [form, setForm] = useState({ subject:'', category:'Payroll', priority:'medium', description:'' })
  const [toast, setToast] = useState('')

  const open = list.filter(t => t.status==='open').length
  const urgent = list.filter(t => t.priority==='urgent'&&t.status==='open').length

  function set(k:string, v:string) { setForm(p => ({ ...p, [k]:v })) }

  function addTicket() {
    if (!form.subject) { alert('Subject required'); return }
    const sla = new Date(); sla.setDate(sla.getDate() + (form.priority==='urgent'?1:3))
    setList(p => [{ id:'t'+Date.now(), subject:form.subject, category:form.category, priority:form.priority, status:'open', by:'Admin User', byId:'u1', sla:sla.toISOString().split('T')[0], raised:new Date().toISOString().split('T')[0], description:form.description, comments:[] }, ...p])
    setShowNew(false); setToast('Ticket created')
    setTimeout(() => setToast(''), 2500)
    setForm({ subject:'', category:'Payroll', priority:'medium', description:'' })
  }

  function resolve(id: string) {
    setList(p => p.map(t => t.id===id ? {...t, status:'resolved'} : t))
    if (selected?.id===id) setSelected(p => p ? {...p, status:'resolved'} : null)
    setToast('Ticket resolved')
    setTimeout(() => setToast(''), 2500)
  }

  function addComment() {
    if (!comment.trim() || !selected) return
    const c = { id:'c'+Date.now(), by:'Admin User', text:comment, time:new Date().toLocaleString('en-IN') }
    const updated = { ...selected, comments:[...selected.comments, c] }
    setSelected(updated)
    setList(p => p.map(t => t.id===selected.id ? updated : t))
    setComment('')
  }

  return (
    <div>
      <PageHeader title="HR Helpdesk" subtitle={`${open} open — ${urgent} urgent`} action={<Btn onClick={() => setShowNew(true)}>New Ticket</Btn>} />

      <Stats items={[
        { label:'Open', value:open, color:'var(--amber)' },
        { label:'In Progress', value:list.filter(t=>t.status==='in_progress').length, color:'var(--blue)' },
        { label:'Resolved', value:list.filter(t=>t.status==='resolved').length, color:'var(--green)' },
        { label:'Urgent', value:urgent, color:'var(--red)' },
      ]} />

      <div style={{ display:'grid', gridTemplateColumns:selected?'1fr 1fr':'1fr', gap:20 }}>
        <Card>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead><tr>
              {['Subject','Raised By','Priority','SLA','Status',''].map(h => (
                <th key={h} style={{ padding:'10px 16px', textAlign:'left', fontSize:11, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color:'var(--text3)', background:'var(--surface)', borderBottom:'1px solid var(--border)' }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {list.map(t => {
                const over = new Date(t.sla) < new Date() && t.status==='open'
                return (
                  <tr key={t.id} onClick={() => setSelected(t)} style={{ cursor:'pointer', background:selected?.id===t.id?'var(--surface)':'transparent' }}>
                    <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <div style={{ width:3, height:32, background:PRIO_COLOR[t.priority], borderRadius:2, flexShrink:0 }} />
                        <div>
                          <div style={{ fontSize:13, fontWeight:500, color:'var(--text)', maxWidth:200, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{t.subject}</div>
                          <div style={{ fontSize:11, color:'var(--text3)' }}>{t.category}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)', fontSize:12, color:'var(--text2)' }}>{t.by}</td>
                    <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)' }}><Badge label={t.priority} type={t.priority} /></td>
                    <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)', fontSize:12, fontFamily:'var(--mono)', color:over?'var(--red)':'var(--text3)' }}>{over?'BREACH — ':''}{t.sla}</td>
                    <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)' }}><Badge label={t.status.replace('_',' ')} type={t.status} /></td>
                    <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)' }}>
                      {t.status!=='resolved' && <Btn size="sm" variant="ghost" onClick={() => resolve(t.id)}>Resolve</Btn>}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </Card>

        {selected && (
          <Card>
            <CardHead title={selected.subject} right={<button onClick={()=>setSelected(null)} style={{ background:'none', border:'none', color:'var(--text3)', cursor:'pointer', fontSize:16 }}>x</button>} />
            <div style={{ padding:20 }}>
              <div style={{ display:'flex', gap:8, marginBottom:16, flexWrap:'wrap' }}>
                <Badge label={selected.priority} type={selected.priority} />
                <Badge label={selected.status.replace('_',' ')} type={selected.status} />
                <Badge label={selected.category} type="medium" />
              </div>
              <p style={{ fontSize:13, color:'var(--text2)', lineHeight:1.6, marginBottom:20, padding:12, background:'var(--surface)', borderRadius:8 }}>{selected.description}</p>
              <div style={{ fontSize:11, color:'var(--text3)', marginBottom:4, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.06em' }}>Comments ({selected.comments.length})</div>
              <div style={{ maxHeight:180, overflowY:'auto', marginBottom:14 }}>
                {selected.comments.map(c => (
                  <div key={c.id} style={{ padding:'10px 12px', background:'var(--surface)', borderRadius:6, marginBottom:6 }}>
                    <div style={{ fontSize:11, fontWeight:600, color:'var(--text2)', marginBottom:3 }}>{c.by} — {c.time}</div>
                    <div style={{ fontSize:12, color:'var(--text)' }}>{c.text}</div>
                  </div>
                ))}
                {selected.comments.length===0 && <div style={{ fontSize:12, color:'var(--text3)', padding:'8px 0' }}>No comments yet</div>}
              </div>
              {selected.status !== 'resolved' && (
                <div style={{ display:'flex', gap:8 }}>
                  <textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder="Add a comment..." rows={2} style={{ flex:1, resize:'none' }} />
                  <Btn onClick={addComment}>Post</Btn>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>

      <Modal open={showNew} onClose={()=>setShowNew(false)} title="New Support Ticket">
        <FormField label="Subject"><input value={form.subject} onChange={e=>set('subject',e.target.value)} placeholder="Briefly describe the issue" autoFocus /></FormField>
        <Grid2>
          <FormField label="Category">
            <select value={form.category} onChange={e=>set('category',e.target.value)}>
              {['Payroll','Documents','IT Access','Assets','Compliance','Other'].map(c=><option key={c}>{c}</option>)}
            </select>
          </FormField>
          <FormField label="Priority">
            <select value={form.priority} onChange={e=>set('priority',e.target.value)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </FormField>
        </Grid2>
        <FormField label="Description">
          <textarea value={form.description} onChange={e=>set('description',e.target.value)} rows={3} placeholder="Provide more details..." style={{ resize:'none' }} />
        </FormField>
        <div style={{ display:'flex', gap:8, justifyContent:'flex-end', paddingTop:16, borderTop:'1px solid var(--border)' }}>
          <Btn variant="ghost" onClick={()=>setShowNew(false)}>Cancel</Btn>
          <Btn onClick={addTicket}>Create Ticket</Btn>
        </div>
      </Modal>

      {toast && <div style={{ position:'fixed', bottom:20, right:20, zIndex:9999, background:'var(--surface)', border:'1px solid rgba(34,197,94,0.3)', borderRadius:8, padding:'10px 16px', fontSize:13 }}>{toast}</div>}
    </div>
  )
}
