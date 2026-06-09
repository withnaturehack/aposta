import { NextResponse } from 'next/server'
import { SESSION_KEY_NAME } from '@/lib/session'

export async function POST() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set(SESSION_KEY_NAME(), '', { maxAge: 0, path: '/' })
  return res
}
