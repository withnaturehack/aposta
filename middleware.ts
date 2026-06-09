import { type NextRequest, NextResponse } from 'next/server'

const PUBLIC = ['/login', '/api/auth']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isPublic = PUBLIC.some(p => pathname.startsWith(p))
  const isStatic = pathname.startsWith('/_next') || pathname.includes('.')
  if (isPublic || isStatic) return NextResponse.next()

  const session = request.cookies.get('apotsa_session')
  if (!session?.value) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next()
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'] }
