import { InnerPage } from '@/components/site/inner-page'
import { SITE_CONFIG } from '@/lib/site-config'
import { CLASSES } from '@/lib/classes'
import { Lock, Phone, Mail } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Class Routine & Schedules | BISESJ',
  description: 'Daily class routine, timetables, and academic period schedules for BISESJ.',
}

export default function RoutinePage() {
  const isLocked = SITE_CONFIG.features.routine === 'locked'

  return (
    <InnerPage
      slug="routine"
      title="Class Routine & Timetables"
      subtitle="Academic period schedules, weekly class routines, and subject timetables."
      badge="Timetables"
    >
      {isLocked ? (
        <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-soft md:p-12 mt-6">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-forest/10 text-forest">
            <Lock aria-hidden="true" className="size-7" />
          </div>
          <h2 className="mt-4 font-serif text-2xl font-bold text-foreground">Routine Currently Restricted</h2>

          {/* Disabled class buttons from single source of truth */}
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Class Timetables
            </p>
            <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
              {CLASSES.map((c) => (
                <button
                  key={c.slug}
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="cursor-not-allowed rounded-lg border border-border/70 bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground opacity-60 transition-none"
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-forest-deep"
            >
              <Phone aria-hidden="true" className="size-3.5" />
              <span>Contact School Office</span>
            </Link>
            <a
              href={SITE_CONFIG.contact.inquiryEmail.href}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-xs font-semibold text-primary transition-colors hover:bg-muted"
            >
              <Mail aria-hidden="true" className="size-3.5" />
              <span>Email {SITE_CONFIG.inquiryEmail}</span>
            </a>
          </div>
        </div>
      ) : null}
    </InnerPage>
  )
}
