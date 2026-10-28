import { describe, it, expect } from 'vitest'
import { NextRequest } from 'next/server'
import { proxy } from '@/proxy'

describe('Next.js 16 Proxy Routing (S1-14)', () => {
  it('redirects root "/" to default locale "/en"', () => {
    const request = new NextRequest('http://localhost:3000/')
    const response = proxy(request)

    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toBe('http://localhost:3000/en')
  })

  it('allows valid locale route "/en" to proceed without redirect', () => {
    const request = new NextRequest('http://localhost:3000/en')
    const response = proxy(request)

    // Passes through (200 or no redirect location)
    expect(response.headers.get('location')).toBeNull()
  })

  it('redirects paths without locale prefix to "/en/<path>"', () => {
    const request = new NextRequest('http://localhost:3000/about')
    const response = proxy(request)

    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toBe('http://localhost:3000/en/about')
  })

  it('ignores static assets, api routes, and file extensions', () => {
    const staticReq = new NextRequest('http://localhost:3000/_next/static/test.js')
    expect(proxy(staticReq).headers.get('location')).toBeNull()

    const apiReq = new NextRequest('http://localhost:3000/api/health')
    expect(proxy(apiReq).headers.get('location')).toBeNull()

    const fileReq = new NextRequest('http://localhost:3000/favicon.ico')
    expect(proxy(fileReq).headers.get('location')).toBeNull()
  })
})
