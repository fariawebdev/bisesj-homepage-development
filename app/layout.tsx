import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Plus_Jakarta_Sans, IBM_Plex_Sans_Arabic, Hind_Siliguri } from 'next/font/google'
import { ASSETS } from '@/src/assets'
import { CONTACT, LINKS } from '@/src/links'
import { SCHOOL } from '@/src/content'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz', 'SOFT'],
})
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-body', display: 'swap' })
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plex-arabic',
  display: 'swap',
  preload: false,
})
const hind = Hind_Siliguri({
  subsets: ['bengali'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hind',
  display: 'swap',
  preload: false,
})

const TITLE = 'Bangladesh International School English Section, Jeddah | Cambridge IGCSE & A Level'
const DESCRIPTION =
  "Bangladesh International School, English Section, Jeddah (BISESJ): a Cambridge International School since 1993, offering IGCSE and AS & A Level education for Jeddah's Bangladeshi and international community. Admissions open for 2026-27."

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bisesjsa.com'),
  title: TITLE,
  description: DESCRIPTION,
  generator: 'v0.app',
  applicationName: 'BISESJ',
  keywords: [
    'Bangladesh International School Jeddah',
    'BISESJ',
    'Cambridge IGCSE Jeddah',
    'A Level Jeddah',
    'English Section',
    'international school Jeddah',
  ],
  openGraph: {
    type: 'website',
    title: TITLE,
    description: DESCRIPTION,
    siteName: SCHOOL.name,
    images: [{ url: ASSETS.hero, alt: 'BISESJ campus in Jeddah' }],
    locale: 'en_US',
    alternateLocale: ['ar_SA', 'bn_BD'],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [ASSETS.hero],
  },
  icons: { icon: ASSETS.logo, apple: ASSETS.logo },
}

export const viewport: Viewport = {
  themeColor: '#0B3D2E',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'School',
  name: SCHOOL.name,
  alternateName: SCHOOL.shortName,
  foundingDate: String(SCHOOL.founded),
  url: 'https://bisesjsa.com/',
  logo: ASSETS.logo,
  image: ASSETS.hero,
  telephone: CONTACT.phoneDisplay,
  email: CONTACT.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Jeddah',
    addressCountry: 'SA',
  },
  hasMap: LINKS.map.href,
  sameAs: [LINKS.facebook.href, LINKS.youtube.href, LINKS.instagram.href],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${fraunces.variable} ${jakarta.variable} ${plexArabic.variable} ${hind.variable} bg-background`}
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
