'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHead, FormField, Grid2, Btn } from '@/components/ui'
import Link from 'next/link'

const DEPTS = ['Engineering','HR & Admin','Sales','Product','Finance','Marketing','Operations']
const GRADES = ['Grade A','Grade B','Grade C']

export default function NewEmployeeClient({ nextCode }: { nextCode: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', gender: 'Not specified',
    dept: 'Engineering', desig: '', grade: 'Grade B',
    type: 'Full Time', doj: new Date().toISOString().split('T')[0],
    mgr: '', pan: '', bank: '', ifsc: '',
  })

  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.email || !form.doj) {
      alert('Name, email and date of joining are required.')
      return
    }
    setLoading(true)
    await new Promise(r => setTimeout(r, 500))
    setLoading(false)
    router.push('/people?added=1')
  }

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Link href="/people" style={{ fontSize: 13, color: 'var(--text3)', textDecoration: 'none' }}>
          &larr; Back to Directory
        </Link>
      </div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.4px', marginBottom: 4 }}>
          Add New Employee
        </h1>
        <p style={{ fontSize: 13, color: 'var(--text3)' }}>
          Employee code will be: <strong style={{ fontFamily: 'var(--mono)', color: 'var(--blue)' }}>{nextCode}</strong>
        </p>
      </div>

      <form onSubmit={submit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Card>
            <CardHead title="Personal Information" />
            <div style={{ padding: 20 }}>
              <Grid2>
                <FormField label="Full Name *">
                  <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Priya Verma" required autoFocus />
                </FormField>
                <FormField label="Work Email *">
                  <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="priya@acme.com" required />
                </FormField>
              </Grid2>
              <Grid2>
                <FormField label="Phone">
                  <input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 98100 00000" />
                </FormField>
                <FormField label="Gender">
                  <select value={form.gender} onChange={e => set('gender', e.target.value)}>
                    {['Not specified', 'Male', 'Female', 'Other'].map(g => <option key={g}>{g}</option>)}
                  </select>
                </FormField>
              </Grid2>
            </div>
          </Card>

          <Card>
            <CardHead title="Work Details" />
            <div style={{ padding: 20 }}>
              <Grid2>
                <FormField label="Department">
                  <select value={form.dept} onChange={e => set('dept', e.target.value)}>
                    {DEPTS.map(d => <option key={d}>{d}</option>)}
                  </select>
                </FormField>
                <FormField label="Designation">
                  <input value={form.desig} onChange={e => set('desig', e.target.value)} placeholder="Software Engineer" />
                </FormField>
              </Grid2>
              <Grid2>
                <FormField label="Grade">
                  <select value={form.grade} onChange={e => set('grade', e.target.value)}>
                    {GRADES.map(g => <option key={g}>{g}</option>)}
                  </select>
                </FormField>
                <FormField label="Employment Type">
                  <select value={form.type} onChange={e => set('type', e.target.value)}>
                    {['Full Time', 'Part Time', 'Contract', 'Intern'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </FormField>
              </Grid2>
              <Grid2>
                <FormField label="Date of Joining *">
                  <input type="date" value={form.doj} onChange={e => set('doj', e.target.value)} required />
                </FormField>
                <FormField label="Reporting Manager">
                  <input value={form.mgr} onChange={e => set('mgr', e.target.value)} placeholder="Manager name" />
                </FormField>
              </Grid2>
            </div>
          </Card>

          <Card>
            <CardHead title="Financial Details" sub="Optional — can be added later by HR Admin" />
            <div style={{ padding: 20 }}>
              <Grid2>
                <FormField label="PAN Number">
                  <input value={form.pan} onChange={e => set('pan', e.target.value)} placeholder="ABCDE1234F" style={{ fontFamily: 'var(--mono)', textTransform: 'uppercase' }} />
                </FormField>
                <FormField label="Bank Account Number">
                  <input value={form.bank} onChange={e => set('bank', e.target.value)} placeholder="Account number" style={{ fontFamily: 'var(--mono)' }} />
                </FormField>
              </Grid2>
              <Grid2>
                <FormField label="IFSC Code">
                  <input value={form.ifsc} onChange={e => set('ifsc', e.target.value)} placeholder="HDFC0001234" style={{ fontFamily: 'var(--mono)', textTransform: 'uppercase' }} />
                </FormField>
                <div />
              </Grid2>
            </div>
          </Card>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', paddingBottom: 20 }}>
            <Link href="/people">
              <Btn variant="ghost" type="button">Cancel</Btn>
            </Link>
            <Btn type="submit" disabled={loading}>
              {loading ? 'Creating Employee...' : 'Create Employee'}
            </Btn>
          </div>
        </div>
      </form>
    </div>
  )
}
