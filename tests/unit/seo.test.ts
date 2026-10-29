import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { isIndexingAllowed, getRobotsConfig, getRobotsMetadata } from '@/lib/seo'

describe('SEO & Indexing Controls (S2-03)', () => {
  const originalEnv = process.env.ALLOW_INDEXING

  beforeEach(() => {
    delete process.env.ALLOW_INDEXING
  })

  afterEach(() => {
    if (originalEnv !== undefined) {
      process.env.ALLOW_INDEXING = originalEnv
    } else {
      delete process.env.ALLOW_INDEXING
    }
  })

  it('defaults to noindex and disallows crawling when ALLOW_INDEXING is undefined', () => {
    delete process.env.ALLOW_INDEXING

    expect(isIndexingAllowed()).toBe(false)

    const robotsConfig = getRobotsConfig('https://bisesjsa.com')
    expect(robotsConfig.rules).toEqual({
      userAgent: '*',
      disallow: '/',
    })
    expect(robotsConfig.sitemap).toBeUndefined()

    const robotsMeta = getRobotsMetadata()
    expect(robotsMeta.index).toBe(false)
    expect(robotsMeta.follow).toBe(false)
    expect(robotsMeta.googleBot?.index).toBe(false)
    expect(robotsMeta.googleBot?.follow).toBe(false)
  })

  it('defaults to noindex and disallows crawling when ALLOW_INDEXING is "false"', () => {
    process.env.ALLOW_INDEXING = 'false'

    expect(isIndexingAllowed()).toBe(false)

    const robotsConfig = getRobotsConfig('https://bisesjsa.com')
    expect(robotsConfig.rules).toEqual({
      userAgent: '*',
      disallow: '/',
    })

    const robotsMeta = getRobotsMetadata()
    expect(robotsMeta.index).toBe(false)
    expect(robotsMeta.follow).toBe(false)
  })

  it('allows crawling and indexing only when ALLOW_INDEXING is explicitly "true"', () => {
    process.env.ALLOW_INDEXING = 'true'

    expect(isIndexingAllowed()).toBe(true)

    const robotsConfig = getRobotsConfig('https://bisesjsa.com')
    expect(robotsConfig.rules).toEqual({
      userAgent: '*',
      allow: '/',
    })
    expect(robotsConfig.sitemap).toBe('https://bisesjsa.com/sitemap.xml')

    const robotsMeta = getRobotsMetadata()
    expect(robotsMeta.index).toBe(true)
    expect(robotsMeta.follow).toBe(true)
  })
})
