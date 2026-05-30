// ── Admin auth middleware ──────────────────────────────────────────
//
// Protects /admin/* and /api/admin/* with HTTP Basic Auth.
// Set ADMIN_USERNAME and ADMIN_PASSWORD in .env.local (and Vercel).
//
// The browser will prompt for credentials automatically.
// Once entered, the browser caches them for the session.

import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Only protect admin routes
  if (!pathname.startsWith('/admin') && !pathname.startsWith('/api/admin')) {
    return NextResponse.next()
  }

  const expectedUser = process.env.ADMIN_USERNAME || 'admin'
  const expectedPass = process.env.ADMIN_PASSWORD

  if (!expectedPass) {
    // Block access entirely if no password is configured
    return new NextResponse(
      'Admin access is not configured. Set ADMIN_PASSWORD in environment variables.',
      { status: 503 }
    )
  }

  const auth = req.headers.get('authorization')

  if (auth) {
    const [scheme, encoded] = auth.split(' ')
    if (scheme === 'Basic' && encoded) {
      const decoded = Buffer.from(encoded, 'base64').toString('utf-8')
      const colonIndex = decoded.indexOf(':')
      if (colonIndex !== -1) {
        const user = decoded.slice(0, colonIndex)
        const pass = decoded.slice(colonIndex + 1)
        if (user === expectedUser && pass === expectedPass) {
          return NextResponse.next()
        }
      }
    }
  }

  // Prompt for credentials
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Other Wine Admin", charset="UTF-8"',
    },
  })
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
