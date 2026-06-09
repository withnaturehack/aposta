'use client'
import { useState } from 'react'
import { PageHeader, Card, Badge, Btn } from '@/components/ui'
import type { Document } from '@/lib/store'

export default function DocumentsClient({ documents: initial }: { documents: Document[] }) {
  const [list, setList] = useState(initial)
  const [toast, setToast] = useState('')

  function verify(id: string) {
    setList(p => p.map(d => d.id===id ? {...d, status:'verified'} : d))
    setToast('Document verified'); setTimeout(()=>setToast(''),2500)
  }

  return (
    <div>
      <PageHeader title="Document Vault" subtitle={`${list.length} documents — Supabase private storage`}
        action={<Btn>Upload Document</Btn>} />
      <Card>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead><tr>
            {['Document','Employee','Category','Uploaded','Expires','Status',''].map(h=>(
              <th key={h} style={{ padding:'10px 16px', textAlign:'left', fontSize:11, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color:'var(--text3)', background:'var(--surface)', borderBottom:'1px solid var(--border)' }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {list.map(d => (
              <tr key={d.id}>
                <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)', fontSize:13, fontWeight:600, color:'var(--text)' }}>{d.name}</td>
                <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)', fontSize:13, color:'var(--text2)' }}>{d.empName}</td>
                <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)', fontSize:12, color:'var(--text3)' }}>{d.category}</td>
                <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)', fontSize:12, fontFamily:'var(--mono)', color:'var(--text3)' }}>{d.uploaded}</td>
                <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)', fontSize:12, fontFamily:'var(--mono)', color:'var(--text3)' }}>{d.expires||'—'}</td>
                <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)' }}><Badge label={d.status} type={d.status} /></td>
                <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)' }}>
                  <div style={{ display:'flex', gap:6 }}>
                    {d.status==='pending' && <Btn size="sm" variant="success" onClick={()=>verify(d.id)}>Verify</Btn>}
                    <a href={d.url} style={{ fontSize:12, color:'var(--blue)', fontWeight:600 }}>View</a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      {toast && <div style={{ position:'fixed', bottom:20, right:20, zIndex:9999, background:'var(--surface)', border:'1px solid rgba(34,197,94,0.3)', borderRadius:8, padding:'10px 16px', fontSize:13 }}>{toast}</div>}
    </div>
  )
}
