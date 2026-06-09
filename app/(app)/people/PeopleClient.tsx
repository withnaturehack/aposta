'use client'
import { useState, useEffect } from 'react'
import { Card, Badge, Avatar, Btn, Th, Td } from '@/components/ui'
import { fmt } from '@/lib/utils'
import type { Employee } from '@/lib/store'
import Link from 'next/link'

export default function PeopleClient({ employees, added }: { employees: Employee[]; added: boolean }) {
  const [q, setQ] = useState('')
  const [toast, setToast] = useState(added ? 'Employee added successfully' : '')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    if (toast) { const t = setTimeout(() => setToast(''), 3000); return () => clearTimeout(t) }
  }, [toast])

  const filtered = employees.filter(e => {
    const matchQ = !q || e.name.toLowerCase().includes(q.toLowerCase()) ||
      e.email.toLowerCase().includes(q.toLowerCase()) ||
      e.dept.toLowerCase().includes(q.toLowerCase()) ||
      e.code.toLowerCase().includes(q.toLowerCase())
    const matchStatus = statusFilter === 'all' || e.status === statusFilter
    return matchQ && matchStatus
  })

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.4px', marginBottom: 4 }}>Employee Directory</h1>
          <p style={{ fontSize: 13, color: 'var(--text3)' }}>
            {employees.length} employees &mdash; {employees.filter(e => e.status === 'active').length} active
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            value={q} onChange={e => setQ(e.target.value)}
            placeholder="Search name, email, department..."
            style={{ width: 240 }}
          />
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ width: 'auto' }}>
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="probation">Probation</option>
            <option value="notice">Notice</option>
            <option value="exited">Exited</option>
          </select>
          <Link href="/people/new" style={{ textDecoration: 'none' }}>
            <Btn>Add Employee</Btn>
          </Link>
        </div>
      </div>

      <Card>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <Th>Employee</Th>
              <Th>Department</Th>
              <Th>Designation</Th>
              <Th>Grade</Th>
              <Th>Status</Th>
              <Th>Joined</Th>
              <Th>CTC</Th>
              <Th></Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(e => (
              <tr key={e.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <Td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar name={e.name} size={32} />
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 13 }}>{e.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'var(--mono)' }}>
                        {e.code} &middot; {e.email}
                      </div>
                    </div>
                  </div>
                </Td>
                <Td>{e.dept}</Td>
                <Td>{e.desig}</Td>
                <Td mono>{e.grade}</Td>
                <Td><Badge label={e.status} type={e.status} /></Td>
                <Td mono>{e.doj}</Td>
                <Td mono>{e.ctc > 0 ? fmt(e.ctc) : '—'}</Td>
                <Td>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Link href={'/people/' + e.id} style={{ fontSize: 12, color: 'var(--blue)', fontWeight: 600, textDecoration: 'none' }}>View</Link>
                    <Link href={'/people/' + e.id + '/edit'} style={{ fontSize: 12, color: 'var(--text3)', fontWeight: 600, textDecoration: 'none' }}>Edit</Link>
                  </div>
                </Td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} style={{ padding: '40px 16px', textAlign: 'center', color: 'var(--text3)' }}>
                  No employees match your search
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>

      {/* Summary bar */}
      <div style={{ display: 'flex', gap: 16, marginTop: 12, fontSize: 12, color: 'var(--text3)' }}>
        {['active','probation','notice','exited'].map(s => (
          <span key={s}>
            {employees.filter(e => e.status === s).length} <span style={{ textTransform: 'capitalize' }}>{s}</span>
          </span>
        ))}
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999, background: 'var(--surface)', border: '1px solid rgba(34,197,94,0.4)', borderRadius: 8, padding: '10px 16px', fontSize: 13 }}>
          {toast}
        </div>
      )}
    </div>
  )
}
