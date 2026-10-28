import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  isLocale,
  isMultilingualEnabled,
  type Locale,
} from './lib/i18n'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Ignore static assets, api routes, and files with extensions
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Exact root request: redirect to default locale (/en)
  if (pathname === '/') {
    const url = request.nextUrl.clone()
    url.pathname = `/${DEFAULT_LOCALE}`
    return NextResponse.redirect(url)
  }

  // Extract first segment
  const segments = pathname.split('/')
  const firstSegment = segments[1]

  if (isLocale(firstSegment)) {
    // Check multilingual feature flag
    if (firstSegment !== DEFAULT_LOCALE && !isMultilingualEnabled()) {
      // In production without feature flag, redirect Arabic and Bengali to /en
      const url = request.nextUrl.clone()
      segments[1] = DEFAULT_LOCALE
      url.pathname = segments.join('/') || `/${DEFAULT_LOCALE}`
      return NextResponse.redirect(url)
    }
    return NextResponse.next()
  }

  // Path is missing locale prefix (e.g., /about, /contact) -> redirect to /en/<path>
  const url = request.nextUrl.clone()
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|images|documents|favicon.ico).*)'],
}
