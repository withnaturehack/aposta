import { cookies } from 'next/headers'
import { users, type Session } from './store'

const SESSION_KEY = 'apotsa_session'

export async function getSession(): Promise<Session | null> {
  const store = cookies()
  const raw = store.get(SESSION_KEY)?.value
  if (!raw) return null
  try {
    const data = JSON.parse(Buffer.from(raw, 'base64').toString())
    return data as Session
  } catch { return null }
}

export async function requireSession(): Promise<Session> {
  const s = await getSession()
  if (!s) {
    const { redirect } = await import('next/navigation')
    redirect('/login')
  }
  return s!
}

export function makeSessionCookie(session: Session): string {
  return Buffer.from(JSON.stringify(session)).toString('base64')
}

export function SESSION_KEY_NAME() { return SESSION_KEY }
