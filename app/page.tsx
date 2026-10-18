import { LocaleProvider } from '@/components/site/i18n'
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

export default function HomePage() {
  return (
    <LocaleProvider>
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
    </LocaleProvider>
  )
}
