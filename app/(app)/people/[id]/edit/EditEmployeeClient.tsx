'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHead, FormField, Grid2, Btn } from '@/components/ui'
import type { Employee } from '@/lib/store'
import Link from 'next/link'

export default function EditEmployeeClient({ employee }: { employee: Employee }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: employee.name, email: employee.email, phone: employee.phone,
    gender: employee.gender, dept: employee.dept, desig: employee.desig,
    grade: employee.grade, type: employee.type, doj: employee.doj,
    mgr: employee.mgr, pan: employee.pan || '', bank: employee.bank || '', ifsc: employee.ifsc || '',
    status: employee.status,
  })
  const [toast, setToast] = useState('')

  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 500))
    setLoading(false)
    setToast('Employee updated successfully')
    setTimeout(() => {
      setToast('')
      router.push('/people/' + employee.id)
    }, 1500)
  }

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Link href={'/people/' + employee.id} style={{ fontSize: 13, color: 'var(--text3)', textDecoration: 'none' }}>
          &larr; Back to Profile
        </Link>
      </div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.4px', marginBottom: 4 }}>Edit Employee</h1>
        <p style={{ fontSize: 13, color: 'var(--text3)', fontFamily: 'var(--mono)' }}>{employee.code}</p>
      </div>

      <form onSubmit={submit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Card>
            <CardHead title="Personal Information" />
            <div style={{ padding: 20 }}>
              <Grid2>
                <FormField label="Full Name"><input value={form.name} onChange={e => set('name', e.target.value)} required /></FormField>
                <FormField label="Work Email"><input type="email" value={form.email} onChange={e => set('email', e.target.value)} required /></FormField>
              </Grid2>
              <Grid2>
                <FormField label="Phone"><input value={form.phone} onChange={e => set('phone', e.target.value)} /></FormField>
                <FormField label="Gender">
                  <select value={form.gender} onChange={e => set('gender', e.target.value)}>
                    {['Not specified','Male','Female','Other'].map(g => <option key={g}>{g}</option>)}
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
                    {['Engineering','HR & Admin','Sales','Product','Finance','Marketing','Operations'].map(d => <option key={d}>{d}</option>)}
                  </select>
                </FormField>
                <FormField label="Designation"><input value={form.desig} onChange={e => set('desig', e.target.value)} /></FormField>
              </Grid2>
              <Grid2>
                <FormField label="Grade">
                  <select value={form.grade} onChange={e => set('grade', e.target.value)}>
                    {['Grade A','Grade B','Grade C'].map(g => <option key={g}>{g}</option>)}
                  </select>
                </FormField>
                <FormField label="Status">
                  <select value={form.status} onChange={e => set('status', e.target.value)}>
                    {['active','probation','notice','exited'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </FormField>
              </Grid2>
              <Grid2>
                <FormField label="Employment Type">
                  <select value={form.type} onChange={e => set('type', e.target.value)}>
                    {['Full Time','Part Time','Contract','Intern'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </FormField>
                <FormField label="Date of Joining"><input type="date" value={form.doj} onChange={e => set('doj', e.target.value)} /></FormField>
              </Grid2>
            </div>
          </Card>

          <Card>
            <CardHead title="Financial Details" />
            <div style={{ padding: 20 }}>
              <Grid2>
                <FormField label="PAN"><input value={form.pan} onChange={e => set('pan', e.target.value)} style={{ fontFamily:'var(--mono)', textTransform:'uppercase' }} /></FormField>
                <FormField label="Bank Account"><input value={form.bank} onChange={e => set('bank', e.target.value)} style={{ fontFamily:'var(--mono)' }} /></FormField>
              </Grid2>
              <Grid2>
                <FormField label="IFSC"><input value={form.ifsc} onChange={e => set('ifsc', e.target.value)} style={{ fontFamily:'var(--mono)', textTransform:'uppercase' }} /></FormField>
                <div />
              </Grid2>
            </div>
          </Card>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', paddingBottom: 20 }}>
            <Link href={'/people/' + employee.id}><Btn variant="ghost" type="button">Cancel</Btn></Link>
            <Btn type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Changes'}</Btn>
          </div>
        </div>
      </form>

      {toast && (
        <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999, background: 'var(--surface)', border: '1px solid rgba(34,197,94,0.4)', borderRadius: 8, padding: '10px 16px', fontSize: 13 }}>
          {toast}
        </div>
      )}
    </div>
  )
}
