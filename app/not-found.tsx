import Link from 'next/link'
export default function NotFound() {
  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--bg)' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ fontSize:64, fontFamily:'var(--mono)', fontWeight:700, color:'var(--border2)', marginBottom:16 }}>404</div>
        <h1 style={{ fontSize:20, fontWeight:700, marginBottom:8 }}>Page not found</h1>
        <p style={{ color:'var(--text3)', marginBottom:20, fontSize:14 }}>The page you're looking for doesn't exist.</p>
        <Link href="/dashboard" style={{ padding:'9px 20px', borderRadius:8, background:'var(--blue)', color:'#fff', fontSize:13, fontWeight:600, textDecoration:'none' }}>Back to Dashboard</Link>
      </div>
    </div>
  )
}
