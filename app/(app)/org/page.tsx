import type { Metadata } from 'next'
import { requireSession } from '@/lib/session'
import { employees } from '@/lib/store'
import { Card, CardHead, Badge, Avatar } from '@/components/ui'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Org Chart' }

export default async function OrgPage() {
  await requireSession()
  const depts = [...new Set(employees.map(e => e.dept))]

  return (
    <div>
      <div style={{ marginBottom:28 }}>
        <h1 style={{ fontSize:22, fontWeight:700, letterSpacing:'-0.4px', marginBottom:4 }}>Org Chart</h1>
        <p style={{ fontSize:13, color:'var(--text3)' }}>{depts.length} departments — {employees.length} employees</p>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
        {depts.map(dept => {
          const members = employees.filter(e => e.dept === dept)
          return (
            <Card key={dept}>
              <CardHead title={dept} right={<span style={{ fontSize:11, padding:'2px 8px', background:'rgba(59,130,246,0.1)', color:'var(--blue)', borderRadius:20, fontWeight:700 }}>{members.length}</span>} />
              {members.map(e => (
                <Link key={e.id} href={'/people/'+e.id} style={{
                  display:'flex', alignItems:'center', gap:10, padding:'10px 16px',
                  borderBottom:'1px solid var(--border)', textDecoration:'none',
                  transition:'background 0.1s',
                }}>
                  <Avatar name={e.name} size={28} />
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, fontWeight:500, color:'var(--text)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{e.name}</div>
                    <div style={{ fontSize:11, color:'var(--text3)' }}>{e.desig}</div>
                  </div>
                  <Badge label={e.status} type={e.status} />
                </Link>
              ))}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
