export const metadata = { title: 'About — Apotsa' }

import Link from 'next/link'
import { PageHeader, Card, Grid2, Btn } from '@/components/ui'

export default function AboutPage() {
  return (
    <div>
      <PageHeader title="About APOTSA" subtitle="Purpose-built HR tools for small and medium teams." />
      <Grid2>
        <Card className="card-smooth" style={{ padding:24 }}>
          <h2 style={{ marginTop: 0, marginBottom: 10 }}>Our mission</h2>
          <p style={{ color:'var(--text2)', lineHeight:1.8 }}>APOTSA aims to simplify HR by combining people management, payroll and attendance into one clean interface. Connect your data, invite teammates, and automate recurring work with meaningful workflows.</p>
          <div style={{ marginTop:18, display:'grid', gap:12 }}>
            <div style={{ padding:14, background:'#f0f9ff', borderRadius:14 }}><strong>Simple operations</strong><div style={{ color:'var(--text3)', marginTop:6 }}>Fast workflows for every HR user.</div></div>
            <div style={{ padding:14, background:'#ecfdf5', borderRadius:14 }}><strong>People-first</strong><div style={{ color:'var(--text3)', marginTop:6 }}>Employee data and support tools in one place.</div></div>
          </div>
        </Card>

        <Card className="card-smooth" style={{ padding:24 }}>
          <h2 style={{ marginTop: 0, marginBottom: 10 }}>Why teams love APOTSA</h2>
          <ul style={{ color:'var(--text3)', listStyle:'disc', paddingLeft:18, lineHeight:1.8 }}>
            <li>Clear approvals and leave tracking</li>
            <li>Integrated payroll snapshots</li>
            <li>Onboarding workflows and asset tracking</li>
            <li>Modern design built for fast decision making</li>
          </ul>
          <div style={{ marginTop:18 }}>
            <Link href="/home" style={{ textDecoration:'none' }}><Btn variant="primary">Explore product</Btn></Link>
          </div>
        </Card>
      </Grid2>
    </div>
  )
}
