'use client'
import { useState } from 'react'
import { Card, CardHead, Btn } from '@/components/ui'

const COMPANY = [
  ['Company Name', 'Acme Corp'],
  ['Industry', 'Technology'],
  ['GSTIN', '29ABCDE1234F1Z5'],
  ['FY Start', 'April (Month 4)'],
  ['Timezone', 'Asia/Kolkata'],
  ['Employee Code Format', 'EMP-{n}'],
  ['Office Geofence', '28.6139, 77.2090 (200m radius)'],
]

const MODULES_DEF: Record<string,boolean> = {
  people:true, attendance:true, leave:true, payroll:true,
  approvals:true, onboarding:true, performance:false, ats:false,
}

const ROLES = [
  ['owner','All permissions, billing, delete company'],
  ['admin','All HR, user management, settings'],
  ['hr_admin','Payroll, leave, documents, reports, onboarding'],
  ['manager','Team leave approval, performance reviews'],
  ['finance_team','Payroll view, salary structures, payslips'],
  ['employee','Self attendance, self leave, own payslips'],
]

export default function SettingsClient() {
  const [modules, setModules] = useState(MODULES_DEF)
  const [saved, setSaved] = useState(false)

  function toggle(k: string) { setModules(p => ({ ...p, [k]: !p[k] })); setSaved(false) }

  function save() { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <div>
      <div style={{ marginBottom:28 }}>
        <h1 style={{ fontSize:22, fontWeight:700, letterSpacing:'-0.4px', marginBottom:4 }}>Settings</h1>
        <p style={{ fontSize:13, color:'var(--text3)' }}>Company configuration and module management</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:20 }}>
        <Card>
          <CardHead title="Company Profile" />
          <div style={{ padding:16 }}>
            {COMPANY.map(([k,v]) => (
              <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'9px 0', borderBottom:'1px solid var(--border)', fontSize:13 }}>
                <span style={{ color:'var(--text3)' }}>{k}</span>
                <span style={{ fontWeight:500 }}>{v}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHead title="Module Configuration" sub="Per-tenant module_config table" />
          <div style={{ padding:16 }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:16 }}>
              {Object.entries(modules).map(([key, val]) => (
                <div key={key} onClick={() => toggle(key)} style={{
                  display:'flex', alignItems:'center', justifyContent:'space-between',
                  padding:'9px 12px', borderRadius:8, cursor:'pointer',
                  background: val?'rgba(59,130,246,0.08)':'var(--surface)',
                  border:`1px solid ${val?'rgba(59,130,246,0.2)':'var(--border)'}`,
                  transition:'all 0.12s',
                }}>
                  <span style={{ fontSize:12, fontWeight:600, textTransform:'capitalize', color:val?'var(--blue)':'var(--text2)' }}>{key}</span>
                  <div style={{ width:28, height:16, background:val?'var(--blue)':'var(--border2)', borderRadius:8, position:'relative', transition:'background 0.2s' }}>
                    <div style={{ position:'absolute', top:2, width:12, height:12, background:'#fff', borderRadius:'50%', left:val?14:2, transition:'left 0.2s' }} />
                  </div>
                </div>
              ))}
            </div>
            <Btn onClick={save} style={{ width:'100%' }}>{saved?'Saved!':'Save Changes'}</Btn>
          </div>
        </Card>
      </div>

      <Card>
        <CardHead title="Roles & Permissions" />
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, padding:16 }}>
          {ROLES.map(([role, desc]) => (
            <div key={role} style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:8, padding:14 }}>
              <div style={{ fontSize:13, fontWeight:700, textTransform:'capitalize', marginBottom:6 }}>{role.replace('_',' ')}</div>
              <div style={{ fontSize:11, color:'var(--text3)', lineHeight:1.5 }}>{desc}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
