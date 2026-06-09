// ── Shared UI primitives ─────────────────────────────────────────────────────
import { initials, clr } from '@/lib/utils'

export function PageHeader({ title, subtitle, action }: {
  title: string; subtitle?: string; action?: React.ReactNode
}) {
  return (
    <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:28 }}>
      <div>
        <h1 style={{ fontSize:22, fontWeight:700, letterSpacing:'-0.4px', marginBottom:4 }}>{title}</h1>
        {subtitle && <p style={{ fontSize:13, color:'var(--text3)' }}>{subtitle}</p>}
      </div>
      {action && <div style={{ display:'flex', gap:8 }}>{action}</div>}
    </div>
  )
}

export function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background:'var(--card)', border:'1px solid var(--border)',
      borderRadius:12, overflow:'hidden', ...style,
    }}>{children}</div>
  )
}

export function CardHead({ title, sub, right }: { title: string; sub?: string; right?: React.ReactNode }) {
  return (
    <div style={{
      padding:'14px 20px', borderBottom:'1px solid var(--border)',
      display:'flex', alignItems:'center', justifyContent:'space-between',
    }}>
      <div>
        <div style={{ fontSize:14, fontWeight:600 }}>{title}</div>
        {sub && <div style={{ fontSize:11, color:'var(--text3)', marginTop:1 }}>{sub}</div>}
      </div>
      {right}
    </div>
  )
}

export function Stats({ items }: { items: { label: string; value: string|number; color?: string }[] }) {
  return (
    <div style={{ display:'grid', gridTemplateColumns:`repeat(${items.length},1fr)`, gap:14, marginBottom:24 }}>
      {items.map(s => (
        <div key={s.label} style={{
          background:'var(--card)', border:'1px solid var(--border)',
          borderRadius:10, padding:'18px 20px',
          borderTop:`3px solid ${s.color || 'var(--blue)'}`,
        }}>
          <div style={{ fontSize:11, fontWeight:600, color:'var(--text3)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:8 }}>{s.label}</div>
          <div style={{ fontFamily:'var(--mono)', fontSize:28, fontWeight:600, lineHeight:1 }}>{s.value}</div>
        </div>
      ))}
    </div>
  )
}

export function Badge({ label, type }: { label: string; type: string }) {
  const map: Record<string,string> = {
    active:       '#22c55e', probation:'#8b5cf6', notice:'#f59e0b', exited:'#6b7280',
    present:      '#22c55e', wfh:'#3b82f6',       absent:'#ef4444', half_day:'#f59e0b',
    pending:      '#f59e0b', approved:'#22c55e',   rejected:'#ef4444', cancelled:'#6b7280',
    open:         '#f59e0b', in_progress:'#3b82f6',resolved:'#22c55e', closed:'#6b7280',
    paid:         '#22c55e', draft:'#6b7280',      processing:'#3b82f6',
    urgent:       '#ef4444', high:'#f59e0b',       medium:'#3b82f6',   low:'#6b7280',
    assigned:     '#3b82f6', available:'#22c55e',   maintenance:'#f59e0b',
    verified:     '#22c55e', unverified:'#f59e0b',
    'Full Time':  '#22c55e', 'Part Time':'#3b82f6', Contract:'#f59e0b', Intern:'#8b5cf6',
  }
  const c = map[type] || map[label] || '#6b7280'
  return (
    <span style={{
      display:'inline-flex', alignItems:'center',
      padding:'2px 8px', borderRadius:20,
      fontSize:11, fontWeight:600, whiteSpace:'nowrap',
      background: c + '18', color: c,
      border: `1px solid ${c}30`,
    }}>{label}</span>
  )
}

export function Btn({ children, onClick, variant='primary', size='md', type='button', disabled, style }: {
  children: React.ReactNode; onClick?: () => void; variant?: string; size?: string
  type?: 'button'|'submit'; disabled?: boolean; style?: React.CSSProperties
}) {
  const styles: Record<string, React.CSSProperties> = {
    primary:   { background:'var(--blue)', color:'#fff', border:'none' },
    secondary: { background:'var(--card)', color:'var(--text)', border:'1px solid var(--border2)' },
    danger:    { background:'rgba(239,68,68,0.1)', color:'#ef4444', border:'1px solid rgba(239,68,68,0.25)' },
    success:   { background:'rgba(34,197,94,0.1)', color:'#22c55e', border:'1px solid rgba(34,197,94,0.25)' },
    ghost:     { background:'transparent', color:'var(--text2)', border:'1px solid var(--border)' },
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} style={{
      padding: size === 'sm' ? '5px 12px' : '8px 16px',
      borderRadius: 7, fontSize: size === 'sm' ? 12 : 13,
      fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1, transition: 'opacity 0.15s',
      fontFamily: 'var(--font)',
      ...styles[variant], ...style,
    }}>{children}</button>
  )
}

export function Avatar({ name, size=32 }: { name: string; size?: number }) {
  return (
    <div style={{
      width:size, height:size, borderRadius:'50%', background:clr(name),
      display:'flex', alignItems:'center', justifyContent:'center',
      fontSize:Math.max(10,size*0.34), fontWeight:700, color:'#fff', flexShrink:0,
    }}>{initials(name)}</div>
  )
}

export function Th({ children }: { children?: React.ReactNode }) {
  return <th style={{ padding:'10px 16px', textAlign:'left', fontSize:11, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color:'var(--text3)', fontFamily:'inherit', background:'var(--surface)', borderBottom:'1px solid var(--border)' }}>{children}</th>
}

export function Td({ children, mono }: { children?: React.ReactNode; mono?: boolean }) {
  return <td style={{ padding:'11px 16px', borderBottom:'1px solid var(--border)', verticalAlign:'middle', fontSize:13, color:'var(--text2)', fontFamily:mono?'var(--mono)':'inherit' }}>{children}</td>
}

export function Modal({ open, onClose, title, children, width=480 }: {
  open: boolean; onClose: () => void; title: string; children: React.ReactNode; width?: number
}) {
  if (!open) return null
  return (
    <div onClick={onClose} style={{
      position:'fixed', inset:0, background:'rgba(0,0,0,0.65)',
      backdropFilter:'blur(3px)', display:'flex', alignItems:'center',
      justifyContent:'center', zIndex:1000,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background:'var(--surface)', border:'1px solid var(--border2)',
        borderRadius:14, padding:28, width, maxWidth:'95vw',
        boxShadow:'0 20px 60px rgba(0,0,0,0.5)',
        animation:'fadeIn 0.2s ease',
      }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
          <div style={{ fontSize:17, fontWeight:700 }}>{title}</div>
          <button onClick={onClose} style={{
            background:'none', border:'none', color:'var(--text3)',
            fontSize:18, cursor:'pointer', lineHeight:1, padding:4,
          }}>x</button>
        </div>
        {children}
      </div>
    </div>
  )
}

export function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom:14 }}>
      <label style={{ display:'block', fontSize:11, fontWeight:700, color:'var(--text3)', marginBottom:5, textTransform:'uppercase', letterSpacing:'0.06em' }}>{label}</label>
      {children}
    </div>
  )
}

export function Grid2({ children }: { children: React.ReactNode }) {
  return <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>{children}</div>
}

export function Empty({ text }: { text: string }) {
  return <div style={{ padding:'48px 16px', textAlign:'center', color:'var(--text3)', fontSize:13 }}>{text}</div>
}

export function Toast({ msg, type }: { msg: string; type: 'success'|'error'|'info' }) {
  const c = { success:'#22c55e', error:'#ef4444', info:'#3b82f6' }[type]
  return (
    <div style={{
      position:'fixed', bottom:20, right:20, zIndex:9999,
      background:'var(--surface)', border:`1px solid ${c}40`,
      borderRadius:8, padding:'10px 16px', fontSize:13,
      display:'flex', gap:8, alignItems:'center',
      boxShadow:'0 8px 24px rgba(0,0,0,0.4)',
      animation:'slideIn 0.2s ease',
    }}>
      <span style={{ width:7, height:7, borderRadius:'50%', background:c, flexShrink:0 }} />
      {msg}
    </div>
  )
}

export function ProgressBar({ pct, color='var(--blue)' }: { pct: number; color?: string }) {
  return (
    <div style={{ height:5, background:'var(--border)', borderRadius:3, overflow:'hidden' }}>
      <div style={{ height:'100%', width:`${Math.min(pct,100)}%`, background:color, borderRadius:3, transition:'width 0.5s ease' }} />
    </div>
  )
}

export function KV({ rows }: { rows: [string, React.ReactNode][] }) {
  return (
    <div>
      {rows.map(([k,v]) => (
        <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'9px 0', borderBottom:'1px solid var(--border)', fontSize:13 }}>
          <span style={{ color:'var(--text3)' }}>{k}</span>
          <span style={{ fontWeight:500 }}>{v}</span>
        </div>
      ))}
    </div>
  )
}
