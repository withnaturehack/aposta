'use client'
import { useState } from 'react'
import { PageHeader, Card, CardHead, ProgressBar, Badge, Avatar } from '@/components/ui'
import type { PerfRecord } from '@/lib/store'

const RATING_COLOR: Record<string,string> = {
  'Exceeds':'var(--green)', 'Meets':'var(--blue)',
  'Needs Improvement':'var(--amber)', 'Not Rated':'var(--text3)',
}

export default function PerformanceClient({ data }: { data: PerfRecord[] }) {
  return (
    <div>
      <PageHeader title="Performance Reviews" subtitle="H1 2026 Review Cycle — Jan to Jun 2026" />

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:24 }}>
        <Card>
          <CardHead title="Rating Distribution" />
          <div style={{ padding:20, display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, textAlign:'center' }}>
            {['Exceeds','Meets','Needs Improvement','Not Rated'].map(r => {
              const count = data.filter(p=>p.rating===r).length
              const pct = Math.round((count/data.length)*100)
              return (
                <div key={r}>
                  <div style={{ height:56, background:'var(--surface)', borderRadius:6, overflow:'hidden', display:'flex', alignItems:'flex-end', marginBottom:6 }}>
                    <div style={{ width:'100%', height:`${pct}%`, background:RATING_COLOR[r], transition:'height 0.5s ease', borderRadius:'4px 4px 0 0' }} />
                  </div>
                  <div style={{ fontSize:20, fontWeight:700, color:RATING_COLOR[r], fontFamily:'var(--mono)' }}>{count}</div>
                  <div style={{ fontSize:10, color:'var(--text3)', marginTop:2 }}>{r}</div>
                </div>
              )
            })}
          </div>
        </Card>

        <Card>
          <CardHead title="Completion Progress" />
          <div style={{ padding:20 }}>
            {[['Self Reviews', data.filter(p=>p.selfDone).length],['Manager Reviews', data.filter(p=>p.mgrDone).length],['Calibration',2]].map(([label,done]) => (
              <div key={String(label)} style={{ marginBottom:16 }}>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, marginBottom:6 }}>
                  <span style={{ color:'var(--text2)' }}>{label}</span>
                  <span style={{ fontFamily:'var(--mono)', fontSize:12, color:'var(--text3)' }}>{done}/{data.length}</span>
                </div>
                <ProgressBar pct={(Number(done)/data.length)*100} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <CardHead title="Employee Reviews" />
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead><tr>
            {['Employee','Self Review','Manager Review','Rating','Score'].map(h=>(
              <th key={h} style={{ padding:'10px 16px', textAlign:'left', fontSize:11, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color:'var(--text3)', background:'var(--surface)', borderBottom:'1px solid var(--border)' }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {data.map((p,i) => (
              <tr key={i}>
                <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <Avatar name={p.emp} size={28} />
                    <span style={{ fontSize:13, fontWeight:500 }}>{p.emp}</span>
                  </div>
                </td>
                <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)' }}>
                  <span style={{ fontSize:11, padding:'3px 9px', borderRadius:6, fontWeight:600, background:p.selfDone?'rgba(34,197,94,0.1)':'rgba(245,158,11,0.1)', color:p.selfDone?'var(--green)':'var(--amber)', border:`1px solid ${p.selfDone?'rgba(34,197,94,0.2)':'rgba(245,158,11,0.2)'}` }}>
                    {p.selfDone?'Submitted':'Pending'}
                  </span>
                </td>
                <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)' }}>
                  <span style={{ fontSize:11, padding:'3px 9px', borderRadius:6, fontWeight:600, background:p.mgrDone?'rgba(34,197,94,0.1)':'rgba(245,158,11,0.1)', color:p.mgrDone?'var(--green)':'var(--amber)', border:`1px solid ${p.mgrDone?'rgba(34,197,94,0.2)':'rgba(245,158,11,0.2)'}` }}>
                    {p.mgrDone?'Submitted':'Pending'}
                  </span>
                </td>
                <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)', fontWeight:600, color:RATING_COLOR[p.rating] }}>{p.rating}</td>
                <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)', fontFamily:'var(--mono)', color:'var(--text2)' }}>{p.score?.toFixed(1)||'—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
