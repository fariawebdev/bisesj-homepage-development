import { InnerPage } from '@/components/site/inner-page'
import { MapPin, Phone, Mail, MessageCircle, ExternalLink, Clock } from 'lucide-react'
import { CONTACT, LINKS } from '@/src/links'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata = {
  title: 'Contact Us | BISESJ',
  description: 'Get in touch with Bangladesh International School, English Section, Jeddah - address, phone, email, and location.',
}

export default function ContactPage() {
  return (
    <InnerPage
      title="Contact Us"
      subtitle="We are here to answer your questions regarding admissions, academics, and school operations."
      badge="Get in Touch"
    >
      <div className="space-y-8">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="rounded-xl bg-forest/10 p-3 text-forest w-fit">
              <Phone aria-hidden="true" className="size-6" />
            </div>
            <h3 className="mt-4 font-bold text-foreground">Telephone</h3>
            <p className="mt-1 text-xs text-muted-foreground">Main School Office</p>
            <a
              href={CONTACT.phoneHref}
              className="mt-3 block text-sm font-semibold text-forest hover:underline"
            >
              {CONTACT.phoneDisplay}
            </a>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="rounded-xl bg-forest/10 p-3 text-forest w-fit">
              <MessageCircle aria-hidden="true" className="size-6" />
            </div>
            <h3 className="mt-4 font-bold text-foreground">WhatsApp</h3>
            <p className="mt-1 text-xs text-muted-foreground">Direct Admissions Line</p>
            <a
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block text-sm font-semibold text-forest hover:underline"
            >
              {CONTACT.whatsappDisplay}
            </a>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="rounded-xl bg-forest/10 p-3 text-forest w-fit">
              <Mail aria-hidden="true" className="size-6" />
            </div>
            <h3 className="mt-4 font-bold text-foreground">Email Inquiries</h3>
            <p className="mt-1 text-xs text-muted-foreground">General & Admissions</p>
            <div className="mt-3 space-y-1">
              <a
                href={CONTACT.emailHref}
                className="block text-xs font-semibold text-forest hover:underline"
              >
                {CONTACT.email}
              </a>
              <a
                href={CONTACT.admissionsEmailHref}
                className="block text-xs font-semibold text-forest hover:underline"
              >
                {CONTACT.admissionsEmail}
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-forest/10 p-3 text-forest shrink-0">
                <MapPin aria-hidden="true" className="size-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Campus Location</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {SITE_CONFIG.contact.address}
                </p>
                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock aria-hidden="true" className="size-3.5" />
                  <span>Sunday – Thursday: 7:00 AM – 2:00 PM</span>
                </div>
              </div>
            </div>

            <a
              href={LINKS.map.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:bg-forest-deep transition-colors"
            >
              <ExternalLink aria-hidden="true" className="size-4" />
              <span>Open in Google Maps</span>
            </a>
          </div>
        </div>
      </div>
    </InnerPage>
  )
}
