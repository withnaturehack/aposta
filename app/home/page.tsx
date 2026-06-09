export const metadata = { title: 'Home — Apotsa' }

import Link from 'next/link'
import { PageHeader, Stats, Card, Btn, Grid2 } from '@/components/ui'

export default function HomePage() {
  return (
    <div>
      <div style={{ display:'grid', gap:20, marginBottom:24 }}>
        <PageHeader title="Welcome to APOTSA People" subtitle="Modern HR operations with a polished dashboard, people workflows, and payroll insights." />
        <div style={{ display:'flex', flexWrap:'wrap', gap:12 }}>
          <Link href="/dashboard" style={{ textDecoration:'none' }}><Btn variant="primary">Open Dashboard</Btn></Link>
          <Link href="/people" style={{ textDecoration:'none' }}><Btn variant="secondary">Employee directory</Btn></Link>
          <Link href="/reports" style={{ textDecoration:'none' }}><Btn variant="ghost">View reports</Btn></Link>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:18, marginBottom:22 }}>
        <Card className="card-smooth" style={{ padding:22 }}>
          <h2 style={{ margin:0, fontSize:18 }}>Built for founders and HR teams</h2>
          <p style={{ color:'var(--text2)', marginTop:10, lineHeight:1.7 }}>APOTSA unifies hiring, onboarding, attendance tracking, leave approvals and payroll in one intuitive workspace. Every page is designed to feel fast, modern, and easy to use.</p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginTop:18 }}>
            <div style={{ padding:14, background:'#eef4ff', borderRadius:14 }}><strong>Employee lifecycle</strong><div style={{ color:'var(--text3)', marginTop:6 }}>Hire, onboard & retain with clear workflows.</div></div>
            <div style={{ padding:14, background:'#f0fdf4', borderRadius:14 }}><strong>People operations</strong><div style={{ color:'var(--text3)', marginTop:6 }}>Automate approvals, attendance and asset requests.</div></div>
          </div>
        </Card>

        <Card className="card-smooth" style={{ padding:22, display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
          <div>
            <h2 style={{ margin:0, fontSize:18 }}>Insights at a glance</h2>
            <p style={{ color:'var(--text2)', marginTop:10, lineHeight:1.7 }}>See headcount, attendance, leave and payroll trends in one place.</p>
          </div>
          <div style={{ display:'grid', gap:10, marginTop:18 }}>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, color:'var(--text3)' }}><span>On track</span><strong>82%</strong></div>
            <div style={{ background:'var(--border)', borderRadius:10, height:10, overflow:'hidden' }}><div style={{ width:'82%', height:'100%', background:'var(--blue)' }} /></div>
          </div>
        </Card>
      </div>

      <Stats items={[{ label:'Employees', value: 142 }, { label:'Active today', value: 76, color:'var(--green)' }, { label:'Pending approvals', value: 5, color:'var(--amber)' }, { label:'Open roles', value: 4, color:'var(--blue)' }]} />

      <Grid2>
        <Card className="card-smooth" style={{ padding:20 }}>
          <h3 style={{ marginTop:0, marginBottom:12 }}>Recent activity</h3>
          <ul style={{ listStyle:'none', display:'grid', gap:12, padding:0, margin:0 }}>
            <li style={{ padding:'14px', border:'1px solid var(--border)', borderRadius:12 }}><strong>Priya Verma</strong> approved a leave request for 3 days.</li>
            <li style={{ padding:'14px', border:'1px solid var(--border)', borderRadius:12 }}><strong>Rohit Kumar</strong> submitted an expense claim for travel.</li>
            <li style={{ padding:'14px', border:'1px solid var(--border)', borderRadius:12 }}><strong>Payroll</strong> draft published for June 2026.</li>
          </ul>
        </Card>

        <Card className="card-smooth" style={{ padding:20 }}>
          <h3 style={{ marginTop:0, marginBottom:12 }}>Quick actions</h3>
          <div style={{ display:'grid', gap:12 }}>
            <Link href="/people/new" style={{ textDecoration:'none' }}><Btn variant="primary">Add employee</Btn></Link>
            <Link href="/leave" style={{ textDecoration:'none' }}><Btn variant="secondary">Review leave</Btn></Link>
            <Link href="/payroll" style={{ textDecoration:'none' }}><Btn variant="ghost">Open payroll</Btn></Link>
          </div>
        </Card>
      </Grid2>
    </div>
  )
}
