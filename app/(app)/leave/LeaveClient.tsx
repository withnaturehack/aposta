'use client'
import { useState } from 'react'
import { Modal, FormField, Grid2, Btn } from '@/components/ui'

export default function LeaveClient({ role }: { role: string }) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ type:'Casual Leave', from:'', to:'', reason:'' })
  const [toast, setToast] = useState('')

  function set(k: string, v: string) { setForm(p => ({ ...p, [k]:v })) }

  function submit() {
    if (!form.from || !form.to) { alert('Please select dates'); return }
    setOpen(false)
    setToast('Leave request submitted successfully')
    setTimeout(() => setToast(''), 3000)
  }

  return (
    <>
      <Btn onClick={() => setOpen(true)}>Apply Leave</Btn>

      <Modal open={open} onClose={() => setOpen(false)} title="Apply for Leave">
        <FormField label="Leave Type">
          <select value={form.type} onChange={e => set('type', e.target.value)}>
            <option>Casual Leave</option>
            <option>Sick Leave</option>
            <option>Earned Leave</option>
            <option>Comp Off</option>
          </select>
        </FormField>
        <Grid2>
          <FormField label="From Date"><input type="date" value={form.from} onChange={e => set('from', e.target.value)} /></FormField>
          <FormField label="To Date"><input type="date" value={form.to} onChange={e => set('to', e.target.value)} /></FormField>
        </Grid2>
        <FormField label="Reason">
          <textarea rows={3} value={form.reason} onChange={e => set('reason', e.target.value)} placeholder="Brief reason for leave" style={{ resize:'none' }} />
        </FormField>
        <div style={{ display:'flex', gap:8, justifyContent:'flex-end', paddingTop:16, borderTop:'1px solid var(--border)' }}>
          <Btn variant="ghost" onClick={() => setOpen(false)}>Cancel</Btn>
          <Btn onClick={submit}>Submit Request</Btn>
        </div>
      </Modal>

      {toast && (
        <div style={{ position:'fixed', bottom:20, right:20, zIndex:9999, background:'var(--surface)', border:'1px solid rgba(34,197,94,0.3)', borderRadius:8, padding:'10px 16px', fontSize:13, color:'var(--text)', boxShadow:'0 8px 24px rgba(0,0,0,0.4)' }}>
          {toast}
        </div>
      )}
    </>
  )
}
