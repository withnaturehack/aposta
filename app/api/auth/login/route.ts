import { NextRequest, NextResponse } from 'next/server'
import { users } from '@/lib/store'
import { makeSessionCookie, SESSION_KEY_NAME } from '@/lib/session'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()
  const user = users.find(u => u.email === email && u.password === password)
  if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })

  const session = { userId: user.id, name: user.name, email: user.email, role: user.role }
  const res = NextResponse.json({ ok: true })
  res.cookies.set(SESSION_KEY_NAME(), makeSessionCookie(session), {
    httpOnly: true, sameSite: 'lax', path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
  return res
}
