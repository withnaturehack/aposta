'use client'
import { useState } from 'react'

export default function AttendanceClient() {
  const [clocked, setClocked] = useState(false)
  const [time, setTime] = useState('')
  const [mode, setMode] = useState('office')
  const [loading, setLoading] = useState(false)

  async function toggle() {
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    if (!clocked) {
      setTime(new Date().toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit', second:'2-digit' }))
      setClocked(true)
    } else {
      setClocked(false); setTime('')
    }
    setLoading(false)
  }

  return (
    <div style={{
      background:'var(--card)', border:'1px solid var(--border)',
      borderRadius:12, padding:24, marginBottom:24,
      display:'flex', alignItems:'center', gap:24,
    }}>
      <div>
        <div style={{ fontFamily:'var(--mono)', fontSize:32, fontWeight:600, letterSpacing:1 }}>
          {new Date().toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit', second:'2-digit' })}
        </div>
        <div style={{ fontSize:12, color:'var(--text3)', marginTop:2 }}>
          {clocked ? `Clocked in at ${time}` : 'Not clocked in'}
        </div>
      </div>
      <div style={{ width:1, height:48, background:'var(--border)' }} />
      <div style={{ marginLeft:'auto', display:'flex', gap:10, alignItems:'center' }}>
        {!clocked && (
          <select value={mode} onChange={e => setMode(e.target.value)} style={{ width:'auto', padding:'8px 12px' }}>
            <option value="office">Office</option>
            <option value="wfh">WFH</option>
            <option value="travel">Travel</option>
          </select>
        )}
        <button onClick={toggle} disabled={loading} style={{
          padding:'9px 20px', borderRadius:7, fontSize:13, fontWeight:600,
          background: clocked ? 'var(--red)' : 'var(--blue)', color:'#fff',
          border:'none', cursor:'pointer', opacity:loading?0.7:1,
          fontFamily:'var(--font)',
        }}>
          {loading ? 'Processing...' : clocked ? 'Clock Out' : 'Clock In'}
        </button>
      </div>
    </div>
  )
}
