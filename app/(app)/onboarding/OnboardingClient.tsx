'use client'
import { useState } from 'react'
import { PageHeader, Card, CardHead, ProgressBar, Badge, Btn } from '@/components/ui'
import type { OnboardingEmp } from '@/lib/store'

export default function OnboardingClient({ data }: { data: OnboardingEmp[] }) {
  const [list, setList] = useState(data)

  function toggle(empId: string, taskId: string) {
    setList(p => p.map(e => e.id===empId ? {
      ...e, tasks: e.tasks.map(t => t.id===taskId ? {...t, done:!t.done} : t)
    } : e))
  }

  const typeColor: Record<string,string> = { document:'var(--blue)', payroll:'var(--green)', it:'var(--violet)', policy:'var(--amber)', buddy:'var(--text2)' }

  return (
    <div>
      <PageHeader title="Onboarding" subtitle={`${list.length} employees in progress`} />
      {list.map(e => {
        const done = e.tasks.filter(t=>t.done).length
        const pct = Math.round((done/e.tasks.length)*100)
        return (
          <div key={e.id} style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:12, marginBottom:16, overflow:'hidden' }}>
            <div style={{ padding:'16px 20px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div>
                <div style={{ fontSize:15, fontWeight:700 }}>{e.emp}</div>
                <div style={{ fontSize:11, color:'var(--text3)', fontFamily:'var(--mono)', marginTop:2 }}>{e.code}</div>
              </div>
              <div style={{ textAlign:'right' }}>
                <div style={{ fontSize:14, fontWeight:600, fontFamily:'var(--mono)' }}>{done}/{e.tasks.length}</div>
                <div style={{ fontSize:11, color:'var(--text3)' }}>{pct}% complete</div>
              </div>
            </div>
            <div style={{ padding:'14px 20px 6px' }}>
              <ProgressBar pct={pct} color="var(--blue)" />
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8, padding:'14px 20px 20px' }}>
              {e.tasks.map(t => (
                <div key={t.id} onClick={() => toggle(e.id, t.id)} style={{
                  padding:'10px 12px', borderRadius:8, cursor:'pointer',
                  background: t.done ? 'rgba(34,197,94,0.08)' : 'var(--surface)',
                  border: `1px solid ${t.done ? 'rgba(34,197,94,0.2)' : 'var(--border)'}`,
                  display:'flex', alignItems:'center', gap:8, transition:'all 0.12s',
                }}>
                  <div style={{ width:16, height:16, borderRadius:4, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', background: t.done?'var(--green)':'transparent', border: t.done?'none':'1.5px solid var(--border2)', fontSize:10, color:'#fff', fontWeight:700 }}>
                    {t.done?'✓':''}
                  </div>
                  <div>
                    <div style={{ fontSize:12, fontWeight:500, color:t.done?'var(--green)':'var(--text)', lineHeight:1.3 }}>{t.title}</div>
                    <div style={{ fontSize:10, color:'var(--text3)', marginTop:1 }}>Due {t.dueDate}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
