'use client'
import { useState } from 'react'
import { Btn } from '@/components/ui'

export default function PayrollClient() {
  const [status, setStatus] = useState<'idle'|'running'|'done'>('idle')

  async function run() {
    if (!confirm('Run payroll for June 2026? This will compute all payslips.')) return
    setStatus('running')
    await new Promise(r => setTimeout(r, 2000))
    setStatus('done')
    setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <Btn onClick={run} disabled={status === 'running'}>
      {status === 'running' ? 'Processing...' : status === 'done' ? 'Run Complete' : 'Run June 2026 Payroll'}
    </Btn>
  )
}
