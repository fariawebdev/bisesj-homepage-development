import type { MetadataRoute } from 'next'

/**
 * SEO, indexing, and crawler configuration.
 * Defaults to noindex and disallows crawling unless ALLOW_INDEXING='true'.
 */
export function isIndexingAllowed(): boolean {
  return process.env.ALLOW_INDEXING === 'true'
}

export function getRobotsConfig(
  siteUrl: string = process.env.NEXT_PUBLIC_SITE_URL || 'https://bisesjsa.com'
): MetadataRoute.Robots {
  if (isIndexingAllowed()) {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
      },
      sitemap: `${siteUrl}/sitemap.xml`,
    }
  }

  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
  }
}

export function getRobotsMetadata() {
  if (isIndexingAllowed()) {
    return {
      index: true,
      follow: true,
    }
  }

  return {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  }
}
