import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/site/header'
import { Hero } from '@/components/site/hero'
import { StatsBand, TrustStrip } from '@/components/site/trust-stats'
import { WhySection } from '@/components/site/why'
import { PathwaySection } from '@/components/site/pathway'
import { AdmissionsSection } from '@/components/site/admissions'
import { LeadershipSection } from '@/components/site/leadership'
import { CampusSection } from '@/components/site/campus'
import { NewsSection } from '@/components/site/news'
import { VoicesSection } from '@/components/site/voices'
import { EnquirySection } from '@/components/site/enquiry'
import { FloatingActions, SiteFooter } from '@/components/site/footer'
import { LocalePlaceholder } from '@/components/site/locale-placeholder'
import { isLocale, type Locale } from '@/lib/i18n'

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params

  if (!isLocale(rawLocale)) {
    notFound()
  }

  const locale = rawLocale as Locale

  if (locale === 'ar' || locale === 'bn') {
    return (
      <>
        <div id="top" />
        <SiteHeader />
        <LocalePlaceholder locale={locale} />
        <main id="main">
          <Hero />
        </main>
        <SiteFooter />
        <FloatingActions />
      </>
    )
  }

  // English: full unchanged homepage
  return (
    <>
      <div id="top" />
      <SiteHeader />
      <main id="main">
        <Hero />
        <TrustStrip />
        <StatsBand />
        <WhySection />
        <PathwaySection />
        <AdmissionsSection />
        <LeadershipSection />
        <CampusSection />
        <NewsSection />
        <VoicesSection />
        <EnquirySection />
      </main>
      <SiteFooter />
      <FloatingActions />
    </>
  )
}
