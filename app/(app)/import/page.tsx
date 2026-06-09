import type { Metadata } from 'next'
import { requireSession } from '@/lib/session'
import { Card, CardHead, Btn } from '@/components/ui'

export const metadata: Metadata = { title: 'Bulk Import' }

export default async function ImportPage() {
  await requireSession()
  return (
    <div>
      <div style={{ marginBottom:28 }}>
        <h1 style={{ fontSize:22, fontWeight:700, letterSpacing:'-0.4px', marginBottom:4 }}>Bulk Import Employees</h1>
        <p style={{ fontSize:13, color:'var(--text3)' }}>Upload a CSV to add multiple employees at once</p>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
        <Card>
          <CardHead title="Step 1 — Download Template" />
          <div style={{ padding:20 }}>
            <p style={{ fontSize:13, color:'var(--text2)', marginBottom:16, lineHeight:1.6 }}>
              Required columns: <code style={{ background:'var(--surface)', padding:'1px 5px', borderRadius:4, fontSize:12 }}>name, email, dateOfJoining</code><br />
              Optional: department, designation, grade, employmentType
            </p>
            <a
              href="data:text/csv,name,email,department,designation,dateOfJoining,employmentType%0APriya Verma,priya@company.com,Engineering,Software Engineer,2026-06-01,Full Time"
              download="employee_import_template.csv"
              style={{ display:'inline-flex', padding:'8px 16px', borderRadius:7, fontSize:13, fontWeight:600, background:'var(--card)', color:'var(--text)', border:'1px solid var(--border2)', textDecoration:'none' }}
            >
              Download CSV Template
            </a>
          </div>
        </Card>
        <Card>
          <CardHead title="Step 2 — Upload File" />
          <div style={{ padding:20 }}>
            <label style={{
              display:'block', border:'2px dashed var(--border2)', borderRadius:10,
              padding:'36px 20px', textAlign:'center', cursor:'pointer',
            }}>
              <div style={{ fontSize:13, fontWeight:600, color:'var(--text)', marginBottom:4 }}>Click to upload CSV file</div>
              <div style={{ fontSize:12, color:'var(--text3)' }}>or drag and drop</div>
              <input type="file" accept=".csv" style={{ display:'none' }} />
            </label>
          </div>
        </Card>
      </div>
    </div>
  )
}
