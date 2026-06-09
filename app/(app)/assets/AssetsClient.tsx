'use client'
import { useState } from 'react'
import { PageHeader, Card, Stats, Badge, Btn, Modal, FormField, Grid2 } from '@/components/ui'
import { fmtFull } from '@/lib/utils'
import type { Asset, Employee } from '@/lib/store'

export default function AssetsClient({ assets: initial, employees }: { assets: Asset[]; employees: Employee[] }) {
  const [list, setList] = useState(initial)
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ name:'', tag:'', category:'Laptop', serial:'', value:'' })
  const [toast, setToast] = useState('')

  function set(k:string,v:string) { setForm(p=>({...p,[k]:v})) }

  function addAsset() {
    if (!form.name) { alert('Name required'); return }
    setList(p => [...p, { id:'as'+Date.now(), name:form.name, tag:form.tag||`AST-${String(p.length+1).padStart(3,'0')}`, category:form.category, serial:form.serial, value:parseInt(form.value)||0, status:'available', assignedTo:null, purchaseDate:new Date().toISOString().split('T')[0] }])
    setShowAdd(false); setToast('Asset added')
    setTimeout(()=>setToast(''),2500)
    setForm({ name:'', tag:'', category:'Laptop', serial:'', value:'' })
  }

  function assign(id: string) {
    const name = prompt('Enter employee name to assign:')
    if (!name) return
    setList(p => p.map(a => a.id===id ? {...a, status:'assigned', assignedTo:employees.find(e=>e.name.toLowerCase().includes(name.toLowerCase()))?.id||null} : a))
    setToast('Asset assigned')
    setTimeout(()=>setToast(''),2500)
  }

  const empName = (id: string|null) => id ? employees.find(e=>e.id===id)?.name||'Unknown' : '—'

  return (
    <div>
      <PageHeader title="Asset Management" subtitle={`${list.length} total assets`} action={<Btn onClick={()=>setShowAdd(true)}>Add Asset</Btn>} />

      <Stats items={[
        { label:'Total', value:list.length, color:'var(--blue)' },
        { label:'Assigned', value:list.filter(a=>a.status==='assigned').length, color:'var(--green)' },
        { label:'Available', value:list.filter(a=>a.status==='available').length, color:'var(--amber)' },
        { label:'Maintenance', value:list.filter(a=>a.status==='maintenance').length, color:'var(--red)' },
      ]} />

      <Card>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead><tr>
            {['Asset','Tag','Category','Assigned To','Purchase Value','Status',''].map(h=>(
              <th key={h} style={{ padding:'10px 16px', textAlign:'left', fontSize:11, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color:'var(--text3)', background:'var(--surface)', borderBottom:'1px solid var(--border)' }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {list.map(a => (
              <tr key={a.id}>
                <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)', fontSize:13, fontWeight:600, color:'var(--text)' }}>{a.name}</td>
                <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)', fontSize:12, fontFamily:'var(--mono)', color:'var(--text3)' }}>{a.tag}</td>
                <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)', fontSize:13, color:'var(--text2)' }}>{a.category}</td>
                <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)', fontSize:13, color:'var(--text2)' }}>{empName(a.assignedTo)}</td>
                <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)', fontSize:12, fontFamily:'var(--mono)', color:'var(--text2)' }}>{fmtFull(a.value)}</td>
                <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)' }}><Badge label={a.status} type={a.status} /></td>
                <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)' }}>
                  {a.status==='available' && <Btn size="sm" variant="ghost" onClick={()=>assign(a.id)}>Assign</Btn>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Modal open={showAdd} onClose={()=>setShowAdd(false)} title="Add Asset">
        <Grid2>
          <FormField label="Asset Name"><input value={form.name} onChange={e=>set('name',e.target.value)} placeholder="MacBook Pro 14" autoFocus /></FormField>
          <FormField label="Asset Tag"><input value={form.tag} onChange={e=>set('tag',e.target.value)} placeholder="AST-006" /></FormField>
        </Grid2>
        <Grid2>
          <FormField label="Category">
            <select value={form.category} onChange={e=>set('category',e.target.value)}>
              {['Laptop','Monitor','Phone','Peripheral','Furniture','Other'].map(c=><option key={c}>{c}</option>)}
            </select>
          </FormField>
          <FormField label="Purchase Value (Rs.)"><input type="number" value={form.value} onChange={e=>set('value',e.target.value)} placeholder="180000" /></FormField>
        </Grid2>
        <FormField label="Serial Number"><input value={form.serial} onChange={e=>set('serial',e.target.value)} placeholder="Optional" /></FormField>
        <div style={{ display:'flex', gap:8, justifyContent:'flex-end', paddingTop:16, borderTop:'1px solid var(--border)' }}>
          <Btn variant="ghost" onClick={()=>setShowAdd(false)}>Cancel</Btn>
          <Btn onClick={addAsset}>Add Asset</Btn>
        </div>
      </Modal>

      {toast && <div style={{ position:'fixed', bottom:20, right:20, zIndex:9999, background:'var(--surface)', border:'1px solid rgba(34,197,94,0.3)', borderRadius:8, padding:'10px 16px', fontSize:13 }}>{toast}</div>}
    </div>
  )
}
