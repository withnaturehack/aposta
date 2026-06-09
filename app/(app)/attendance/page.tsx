import type { Metadata } from 'next'
import { requireSession } from '@/lib/session'
import { attendance } from '@/lib/store'
import { Stats, Card, CardHead, Badge, Avatar } from '@/components/ui'
import AttendanceClient from './AttendanceClient'

export const metadata: Metadata = { title: 'Attendance' }

export default async function AttendancePage() {
  const session = await requireSession()
  const present = attendance.filter(a => a.status === 'present').length
  const wfh = attendance.filter(a => a.status === 'wfh').length
  const absent = attendance.filter(a => a.status === 'absent').length

  return (
    <div>
      <div style={{ marginBottom:28 }}>
        <h1 style={{ fontSize:22, fontWeight:700, letterSpacing:'-0.4px', marginBottom:4 }}>Attendance</h1>
        <p style={{ fontSize:13, color:'var(--text3)' }}>
          {new Date().toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long', year:'numeric' })}
        </p>
      </div>

      <AttendanceClient />

      <Stats items={[
        { label:'Present', value:present, color:'var(--green)' },
        { label:'WFH', value:wfh, color:'var(--blue)' },
        { label:'Absent', value:absent, color:'var(--red)' },
        { label:'Total', value:attendance.length, color:'var(--text3)' },
      ]} />

      <Card>
        <CardHead title="Team Attendance Log" sub="GPS validated server-side" />
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead><tr>
            <th style={{ padding:'10px 16px', textAlign:'left', fontSize:11, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color:'var(--text3)', background:'var(--surface)', borderBottom:'1px solid var(--border)' }}>Employee</th>
            <th style={{ padding:'10px 16px', textAlign:'left', fontSize:11, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color:'var(--text3)', background:'var(--surface)', borderBottom:'1px solid var(--border)' }}>Clock In</th>
            <th style={{ padding:'10px 16px', textAlign:'left', fontSize:11, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color:'var(--text3)', background:'var(--surface)', borderBottom:'1px solid var(--border)' }}>Clock Out</th>
            <th style={{ padding:'10px 16px', textAlign:'left', fontSize:11, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color:'var(--text3)', background:'var(--surface)', borderBottom:'1px solid var(--border)' }}>Mode</th>
            <th style={{ padding:'10px 16px', textAlign:'left', fontSize:11, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color:'var(--text3)', background:'var(--surface)', borderBottom:'1px solid var(--border)' }}>Worked</th>
            <th style={{ padding:'10px 16px', textAlign:'left', fontSize:11, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color:'var(--text3)', background:'var(--surface)', borderBottom:'1px solid var(--border)' }}>Status</th>
          </tr></thead>
          <tbody>
            {attendance.map(a => (
              <tr key={a.id}>
                <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)', verticalAlign:'middle' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}><Avatar name={a.name} size={26} /><span style={{ fontSize:13, fontWeight:500 }}>{a.name}</span></div>
                </td>
                <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)', fontSize:13, fontFamily:'var(--mono)', color:'var(--text2)' }}>{a.clockIn || '—'}</td>
                <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)', fontSize:13, fontFamily:'var(--mono)', color:'var(--text2)' }}>{a.clockOut || '—'}</td>
                <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)' }}>{a.mode ? <Badge label={a.mode} type={a.mode} /> : '—'}</td>
                <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)', fontSize:12, fontFamily:'var(--mono)', color:'var(--text2)' }}>{a.worked}</td>
                <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)' }}><Badge label={a.status} type={a.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
