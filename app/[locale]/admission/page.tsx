import { InnerPage } from '@/components/site/inner-page'
import { Download, ExternalLink, FileText, GraduationCap, Phone, Mail, MessageCircle } from 'lucide-react'
import { CONTACT } from '@/lib/links'

export const metadata = {
  title: 'Admissions 2026-2027 | BISESJ',
  description: 'Admissions open for Academic Year 2026-2027 at Bangladesh International School, English Section, Jeddah.',
}

const DOCUMENTS = [
  {
    title: 'Admission Test for Newcomers (2026-27)',
    description: 'Sample paper and test preparation guide for prospective students.',
    href: '/documents/admission-test-for-newcomers-2026-27.pdf',
    filename: 'admission-test-for-newcomers-2026-27.pdf',
    badge: 'Admission Test',
  },
  {
    title: 'Tuition Fee Structure (Bangladeshi Students)',
    description: 'Detailed fee structure for Bangladeshi community students for 2026-2027.',
    href: '/documents/tuition-fee-structure-bangladeshi-2026-2027.pdf',
    filename: 'tuition-fee-structure-bangladeshi-2026-2027.pdf',
    badge: 'Fee Structure',
  },
  {
    title: 'Tuition Fee Structure (International Students)',
    description: 'Detailed fee structure for foreign / international community students for 2026-2027.',
    href: '/documents/tuition-fee-structure-foreigner-2026-2027.pdf',
    filename: 'tuition-fee-structure-foreigner-2026-2027.pdf',
    badge: 'Fee Structure',
  },
]

export default function AdmissionPage() {
  return (
    <InnerPage
      title="Admissions 2026-2027"
      subtitle="Welcome to Bangladesh International School, English Section, Jeddah. Applications are now open for the 2026-2027 academic year across Kindergarten, Primary, Lower Secondary, IGCSE, and AS & A Level."
      badge="Admissions Open"
    >
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">
            Official Admission Documents & Fee Structures
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Download the official guides and schedules approved by the BISESJ Board of Directors.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {DOCUMENTS.map((doc) => (
            <div
              key={doc.title}
              className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:border-gold/50"
            >
              <div>
                <span className="inline-block rounded-full bg-forest/10 px-2.5 py-0.5 text-xs font-semibold text-forest">
                  {doc.badge}
                </span>
                <h3 className="mt-3 font-semibold text-foreground text-lg leading-snug">
                  {doc.title}
                </h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {doc.description}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2 pt-4 border-t border-border/60">
                <a
                  href={doc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full border border-forest/20 bg-forest/5 px-3 py-2 text-xs font-semibold text-forest hover:bg-forest/10 transition-colors"
                >
                  <ExternalLink aria-hidden="true" className="size-3.5" />
                  <span>Preview</span>
                </a>
                <a
                  href={doc.href}
                  download={doc.filename}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-forest px-3 py-2 text-xs font-semibold text-primary-foreground shadow-soft hover:bg-forest-deep transition-colors"
                >
                  <Download aria-hidden="true" className="size-3.5" />
                  <span>Download</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-gold/30 bg-gold/10 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-forest p-3 text-gold">
              <GraduationCap aria-hidden="true" className="size-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-forest">Admissions Office Inquiries</h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                For seat availability, age criteria, and document verification, contact the BISESJ Admissions Office directly:
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm font-medium">
                <a
                  href={`mailto:${CONTACT.admissionsEmail}`}
                  className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-forest border border-border shadow-soft hover:border-gold"
                >
                  <Mail aria-hidden="true" className="size-4 text-gold" />
                  <span>{CONTACT.admissionsEmail}</span>
                </a>
                <a
                  href={CONTACT.phoneHref}
                  className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-forest border border-border shadow-soft hover:border-gold"
                >
                  <Phone aria-hidden="true" className="size-4 text-gold" />
                  <span>{CONTACT.phoneDisplay}</span>
                </a>
                <a
                  href={CONTACT.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-forest border border-border shadow-soft hover:border-gold"
                >
                  <MessageCircle aria-hidden="true" className="size-4 text-gold" />
                  <span>WhatsApp: {CONTACT.whatsappDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </InnerPage>
  )
}
