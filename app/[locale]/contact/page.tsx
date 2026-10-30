import { InnerPage } from '@/components/site/inner-page'
import { ContactMap } from '@/components/site/contact-map'
import Link from 'next/link'
import { MessageSquareHeart } from 'lucide-react'

export const metadata = {
  title: 'Contact Us | BISESJ',
  description: 'Official phone, WhatsApp, location map, and contact directories for Bangladesh International School English Section, Jeddah.',
}

export default function ContactPage() {
  return (
    <InnerPage
      slug="contact"
      title="Contact Us"
      subtitle="Get in touch with our admissions desk, school office, and academic administration in Jeddah."
      badge="Contact Directory"
    >
      <div className="space-y-8 mt-6">
        <ContactMap />

        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-gold">
                <MessageSquareHeart className="size-5" />
              </span>
              <div>
                <h3 className="font-serif text-lg font-bold text-foreground">Parent Feedback & Complaints</h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  Have a suggestion, concern, or formal feedback? Visit our dedicated parent feedback channel.
                </p>
              </div>
            </div>
            <Link
              href="/parent-feedback"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-semibold text-primary-foreground transition-colors hover:bg-forest-deep shrink-0"
            >
              <span>Submit Parent Feedback</span>
            </Link>
          </div>
        </div>
      </div>
    </InnerPage>
  )
}
