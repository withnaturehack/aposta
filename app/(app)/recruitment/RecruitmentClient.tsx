'use client'
import { useState } from 'react'
import { PageHeader, Card, Stats, Badge, Btn, Modal, FormField, Grid2 } from '@/components/ui'
import type { Job } from '@/lib/store'

const STAGES = ['Applied','Screening','Interview','Offer','Hired']

export default function RecruitmentClient({ jobs: initial }: { jobs: Job[] }) {
  const [list, setList] = useState(initial)
  const [selected, setSelected] = useState<Job|null>(null)
  const [showNew, setShowNew] = useState(false)
  const [form, setForm] = useState({ title:'', dept:'Engineering', type:'Full Time', exp:'', openings:'1' })
  const [toast, setToast] = useState('')

  function set(k:string,v:string) { setForm(p=>({...p,[k]:v})) }

  function addJob() {
    if (!form.title) { alert('Title required'); return }
    setList(p => [...p, { id:'j'+Date.now(), title:form.title, dept:form.dept, type:form.type, exp:form.exp, status:'open', openings:parseInt(form.openings)||1, applications:0, description:'' }])
    setShowNew(false); setToast('Job posted'); setTimeout(()=>setToast(''),2500)
    setForm({ title:'', dept:'Engineering', type:'Full Time', exp:'', openings:'1' })
  }

  function updateStatus(id:string, status:string) {
    setList(p => p.map(j => j.id===id ? {...j, status} : j))
  }

  return (
    <div>
      <PageHeader title="Recruitment" subtitle={`${list.filter(j=>j.status==='open').length} open positions`} action={<Btn onClick={()=>setShowNew(true)}>Post Job</Btn>} />

      <Stats items={[
        { label:'Open Positions', value:list.filter(j=>j.status==='open').length, color:'var(--green)' },
        { label:'Total Applicants', value:list.reduce((s,j)=>s+j.applications,0), color:'var(--blue)' },
        { label:'In Interview', value:12, color:'var(--violet)' },
        { label:'Offers Extended', value:3, color:'var(--amber)' },
      ]} />

      <div style={{ display:'grid', gridTemplateColumns:selected?'1fr 1fr':'1fr', gap:20 }}>
        <Card>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead><tr>
              {['Position','Department','Openings','Applicants','Status',''].map(h=>(
                <th key={h} style={{ padding:'10px 16px', textAlign:'left', fontSize:11, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color:'var(--text3)', background:'var(--surface)', borderBottom:'1px solid var(--border)' }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {list.map(j => (
                <tr key={j.id} onClick={()=>setSelected(j)} style={{ cursor:'pointer', background:selected?.id===j.id?'var(--surface)':'transparent' }}>
                  <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)' }}>
                    <div style={{ fontSize:13, fontWeight:600, color:'var(--text)' }}>{j.title}</div>
                    <div style={{ fontSize:11, color:'var(--text3)' }}>{j.exp}</div>
                  </td>
                  <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)', fontSize:13, color:'var(--text2)' }}>{j.dept}</td>
                  <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)', fontSize:13, fontFamily:'var(--mono)', textAlign:'center' }}>{j.openings}</td>
                  <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)', fontSize:14, fontFamily:'var(--mono)', fontWeight:700, color:'var(--blue)', textAlign:'center' }}>{j.applications}</td>
                  <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)' }}><Badge label={j.status} type={j.status} /></td>
                  <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)' }}>
                    <select value={j.status} onChange={e=>{e.stopPropagation();updateStatus(j.id,e.target.value)}} style={{ fontSize:11, padding:'4px 6px', width:'auto' }}>
                      <option value="open">Open</option>
                      <option value="paused">Paused</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {selected && (
          <Card>
            <div style={{ padding:'16px 20px', borderBottom:'1px solid var(--border)', display:'flex', justifyContent:'space-between' }}>
              <div>
                <div style={{ fontSize:15, fontWeight:700 }}>{selected.title}</div>
                <div style={{ fontSize:12, color:'var(--text3)', marginTop:2 }}>{selected.dept} — {selected.type}</div>
              </div>
              <button onClick={()=>setSelected(null)} style={{ background:'none', border:'none', color:'var(--text3)', cursor:'pointer', fontSize:16 }}>x</button>
            </div>
            <div style={{ padding:20 }}>
              <div style={{ fontSize:13, fontWeight:600, marginBottom:12 }}>Candidate Pipeline</div>
              <div style={{ display:'flex', gap:8, overflowX:'auto', paddingBottom:8 }}>
                {STAGES.map((s,i) => (
                  <div key={s} style={{ minWidth:120, flexShrink:0 }}>
                    <div style={{ fontSize:11, fontWeight:700, color:'var(--text3)', marginBottom:8, textTransform:'uppercase', letterSpacing:'0.06em' }}>{s}</div>
                    <div style={{ background:'var(--surface)', borderRadius:8, padding:8, minHeight:60, border:'1px dashed var(--border)' }}>
                      {i===0 && <div style={{ fontSize:11, color:'var(--text3)' }}>{selected.applications} applicants</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}
      </div>

      <Modal open={showNew} onClose={()=>setShowNew(false)} title="Post New Job">
        <FormField label="Job Title"><input value={form.title} onChange={e=>set('title',e.target.value)} placeholder="Senior Frontend Engineer" autoFocus /></FormField>
        <Grid2>
          <FormField label="Department">
            <select value={form.dept} onChange={e=>set('dept',e.target.value)}>
              {['Engineering','HR & Admin','Sales','Product','Finance','Marketing'].map(d=><option key={d}>{d}</option>)}
            </select>
          </FormField>
          <FormField label="Employment Type">
            <select value={form.type} onChange={e=>set('type',e.target.value)}>
              {['Full Time','Part Time','Contract','Intern'].map(t=><option key={t}>{t}</option>)}
            </select>
          </FormField>
        </Grid2>
        <Grid2>
          <FormField label="Experience"><input value={form.exp} onChange={e=>set('exp',e.target.value)} placeholder="3-5 years" /></FormField>
          <FormField label="Openings"><input type="number" value={form.openings} onChange={e=>set('openings',e.target.value)} min="1" /></FormField>
        </Grid2>
        <div style={{ display:'flex', gap:8, justifyContent:'flex-end', paddingTop:16, borderTop:'1px solid var(--border)' }}>
          <Btn variant="ghost" onClick={()=>setShowNew(false)}>Cancel</Btn>
          <Btn onClick={addJob}>Post Job</Btn>
        </div>
      </Modal>

      {toast && <div style={{ position:'fixed', bottom:20, right:20, zIndex:9999, background:'var(--surface)', border:'1px solid rgba(34,197,94,0.3)', borderRadius:8, padding:'10px 16px', fontSize:13 }}>{toast}</div>}
    </div>
  )
}
