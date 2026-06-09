export const metadata = { title: 'Contact — Apotsa' }

import { PageHeader, Card } from '@/components/ui'

export default function ContactPage() {
  return (
    <div>
      <PageHeader title="Contact" subtitle="We'd love to hear from you." />
      <div style={{ display:'grid', gap:18 }}>
        <Card className="card-smooth" style={{ padding:24 }}>
          <form onSubmit={(e) => { e.preventDefault(); alert('Thanks — message sent (demo).') }}>
            <div style={{ display:'grid', gap:16 }}>
              <label style={{ display:'block', fontSize:12, fontWeight:700, textTransform:'uppercase', color:'var(--text3)' }}>Your name</label>
              <input placeholder="Full name" />
              <label style={{ display:'block', fontSize:12, fontWeight:700, textTransform:'uppercase', color:'var(--text3)' }}>Email</label>
              <input placeholder="name@company.com" />
              <label style={{ display:'block', fontSize:12, fontWeight:700, textTransform:'uppercase', color:'var(--text3)' }}>Message</label>
              <textarea rows={5} placeholder="How can we help?" />
            </div>
            <div style={{ display:'flex', gap:10, marginTop:18 }}>
              <button type="submit" style={{ padding:'10px 18px', borderRadius:10, border:'none', background:'var(--blue)', color:'#fff', fontWeight:600, cursor:'pointer' }}>Send message</button>
              <button type="button" style={{ padding:'10px 18px', borderRadius:10, border:'1px solid var(--border)', background:'var(--card)', color:'var(--text2)', fontWeight:600, cursor:'pointer' }}>Clear</button>
            </div>
          </form>
        </Card>
        <Card className="card-smooth" style={{ padding:24 }}>
          <h2 style={{ marginTop:0 }}>Support</h2>
          <p style={{ color:'var(--text2)', lineHeight:1.7 }}>Need help with onboarding, payroll or platform access? Our team is available Monday to Friday.</p>
          <div style={{ display:'grid', gap:12, marginTop:16 }}>
            <div><strong>Email</strong><div style={{ color:'var(--text3)' }}>support@apotsa.com</div></div>
            <div><strong>Phone</strong><div style={{ color:'var(--text3)' }}>+91 98765 43210</div></div>
          </div>
        </Card>
      </div>
    </div>
  )
}
