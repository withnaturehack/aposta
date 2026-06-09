# APOTSA HRMS — People Platform

Complete HR management system built with **Next.js 14**, **React 18**, **Tailwind CSS**, **Supabase**.

## 🚀 Run It

```bash
# Install dependencies (already done)
npm install

# Start development server (auth bypassed in dev)
npm run dev
# → http://localhost:3002/dashboard
```

## 📋 All Pages Working

| Route | Page |
|-------|------|
| `/dashboard` | Overview, stats, quick actions |
| `/people/directory` | Employee directory with search |
| `/people/org` | Org chart by department |
| `/people/import` | Bulk CSV import |
| `/people/[id]` | Employee profile |
| `/attendance` | Clock in/out, team log |
| `/leave` | Leave requests, balances, approvals |
| `/payroll` | Payroll runs, salary structures |
| `/payroll/[runId]` | Payslip detail |
| `/approvals` | Approval inbox with actions |
| `/tickets` | HR helpdesk |
| `/assets` | Asset management |
| `/documents` | Document tracking |
| `/onboarding` | Onboarding tasks |
| `/offboarding` | Offboarding checklist |
| `/ats` | Recruitment / ATS |
| `/performance` | Performance reviews |
| `/reimbursements` | Deep-link → Spend |
| `/settings` | Module config, roles |

## 🔑 Environment Variables (pre-filled in .env.local)

```
NEXT_PUBLIC_SUPABASE_URL=https://rtgwajigbaagwzkrajpe.supabase.co
DATABASE_URL=postgresql://postgres:...@db.rtgwajigbaagwzkrajpe.supabase.co:5432/postgres
RESEND_API_KEY=re_CVEkdBx1_...
UPSTASH_REDIS_REST_URL=https://large-katydid-90128.upstash.io
NEXT_PUBLIC_HUB_URL=http://localhost:3000
NEXT_PUBLIC_SPEND_URL=http://localhost:3001
```

## 🏗 Architecture

- **No duplicate finance** — Reimbursements deep-link to Spend
- **Supabase Auth** — SSO via cookie domain (.apotsa.com in prod)
- **In-memory store** for demo, Supabase Postgres in production
- **React Server Components** by default, `'use client'` only for interactivity
- **Middleware** bypasses auth in development, enforces in production
# aposta
# aposta
