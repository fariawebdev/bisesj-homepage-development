import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SiteHeader } from '@/components/site/header'
import { SiteFooter, FloatingActions } from '@/components/site/footer'
import { CLASSES, getClassBySlug } from '@/lib/classes'
import { isRoutineLocked, getRoutineForClass } from '@/lib/routine'
import { SUPPORTED_LOCALES } from '@/lib/i18n'
import { SITE_CONFIG } from '@/lib/site-config'
import { ArrowLeft, Calendar, Download, Home, Lock, Mail, Phone } from 'lucide-react'

interface PageProps {
  params: Promise<{
    locale: string
    class: string
  }>
}

export async function generateStaticParams() {
  const params: { locale: string; class: string }[] = []
  for (const locale of SUPPORTED_LOCALES) {
    for (const c of CLASSES) {
      params.push({
        locale,
        class: c.slug,
      })
    }
  }
  return params
}

export async function generateMetadata({ params }: PageProps) {
  const { class: classSlug } = await params
  const classInfo = getClassBySlug(classSlug)
  if (!classInfo) {
    return { title: 'Class Not Found | BISESJ' }
  }

  return {
    title: `${classInfo.label} Routine & Timetable | BISESJ`,
    description: `Class routine and academic schedule for ${classInfo.label} (${classInfo.stage}) at Bangladesh International School English Section, Jeddah.`,
  }
}

export default async function RoutineClassPage({ params }: PageProps) {
  const { locale, class: classSlug } = await params

  const classInfo = getClassBySlug(classSlug)
  if (!classInfo) {
    notFound()
  }

  const locked = isRoutineLocked()
  const routineData = getRoutineForClass(classSlug)

  return (
    <>
      <div id="top" />
      <SiteHeader />
      <main id="main" className="min-h-screen bg-background">
        <section className="border-b border-border bg-card/60 px-5 py-10 md:px-6 md:py-14">
          <div className="mx-auto max-w-5xl">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <Link href={`/${locale}`} className="inline-flex items-center gap-1 hover:text-primary transition-colors">
                <Home aria-hidden="true" className="size-3.5" />
                <span>Home</span>
              </Link>
              <span>/</span>
              <Link href={`/${locale}/routine`} className="hover:text-primary transition-colors">
                <span>Routine</span>
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium">{classInfo.label}</span>
            </nav>

            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-block rounded-full bg-forest/10 px-3 py-1 text-xs font-semibold text-forest">
                {classInfo.stage}
              </span>
              <span className="inline-block rounded-full bg-gold/15 px-3 py-1 text-xs font-bold text-primary uppercase tracking-wider">
                Session 2026–27
              </span>
              {locked && (
                <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                  <Lock aria-hidden="true" className="size-3" />
                  <span>Restricted Access</span>
                </span>
              )}
            </div>

            <h1 className="mt-4 font-serif text-3xl font-bold tracking-tight text-forest sm:text-4xl md:text-5xl">
              {classInfo.label} Routine & Timetable
            </h1>
            <p className="mt-3 max-w-3xl text-base text-muted-foreground sm:text-lg">
              Daily period timings, subject allocations, and teacher schedules for {classInfo.label}.
            </p>
          </div>
        </section>

        <section className="px-5 py-10 md:px-6 md:py-14">
          <div className="mx-auto max-w-5xl space-y-8">
            {locked ? (
              /* Locked view */
              <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-soft md:p-12">
                <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-forest/10 text-forest">
                  <Lock aria-hidden="true" className="size-7" />
                </div>
                <h2 className="mt-4 font-serif text-2xl font-bold text-foreground">
                  {classInfo.label} Schedule Restricted
                </h2>
                <p className="mt-3 max-w-xl mx-auto text-sm text-muted-foreground leading-relaxed">
                  The school routine is published to enrolled families at the start of each term. For class-specific schedules, please contact the school office.
                </p>

                {/* Class selector indicator showing all classes */}
                <div className="mt-8 border-t border-border/70 pt-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    All Classes (Restricted Access)
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
                    {CLASSES.map((c) => (
                      <span
                        key={c.slug}
                        className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${
                          c.slug === classSlug
                            ? 'border-forest bg-forest/10 text-forest font-semibold'
                            : 'border-border/70 bg-muted/40 text-muted-foreground opacity-60'
                        }`}
                      >
                        {c.label}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href={`/${locale}/contact`}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-forest-deep focus-visible:outline-2 focus-visible:outline-gold"
                  >
                    <Phone aria-hidden="true" className="size-3.5" />
                    <span>Contact School Office</span>
                  </Link>
                  <a
                    href={SITE_CONFIG.contact.inquiryEmail.href}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-border bg-background px-6 py-2.5 text-xs font-semibold text-primary transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-gold"
                  >
                    <Mail aria-hidden="true" className="size-3.5" />
                    <span>Email {SITE_CONFIG.inquiryEmail}</span>
                  </a>
                </div>
              </div>
            ) : (
              /* Open view */
              <div className="space-y-6">
                {routineData?.pdfUrl && (
                  <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
                    <div className="flex items-center gap-3">
                      <Calendar aria-hidden="true" className="size-5 text-forest" />
                      <span className="text-sm font-medium text-foreground">
                        Download Printable Timetable (PDF)
                      </span>
                    </div>
                    <a
                      href={routineData.pdfUrl}
                      download
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-forest px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-forest/90"
                    >
                      <Download aria-hidden="true" className="size-4" />
                      <span>Download PDF</span>
                    </a>
                  </div>
                )}

                {routineData?.schedule && routineData.schedule.length > 0 ? (
                  <div className="space-y-6">
                    {routineData.schedule.map((day) => (
                      <div key={day.day} className="rounded-xl border border-border bg-card overflow-hidden">
                        <div className="bg-muted px-4 py-3 font-semibold text-sm text-foreground">
                          {day.day}
                        </div>
                        <div className="divide-y divide-border/60">
                          {day.periods.map((p) => (
                            <div key={p.periodNumber} className="flex items-center justify-between p-4 text-sm">
                              <div className="flex items-center gap-3">
                                <span className="font-mono text-xs font-bold text-muted-foreground w-12">
                                  P{p.periodNumber}
                                </span>
                                <span className="font-medium text-foreground">{p.subject}</span>
                              </div>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <span>{p.startTime} – {p.endTime}</span>
                                {p.room && <span className="rounded bg-secondary px-2 py-0.5">{p.room}</span>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground text-sm">
                    Timetable details for {classInfo.label} are currently being finalized.
                  </div>
                )}
              </div>
            )}

            <div className="mt-8 border-t border-border pt-6 flex items-center justify-between">
              <Link
                href={`/${locale}/routine`}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground shadow-xs transition-colors hover:border-gold hover:bg-muted focus-visible:outline-2 focus-visible:outline-gold"
              >
                <ArrowLeft aria-hidden="true" className="size-4 rtl:rotate-180" />
                <span>Routine Overview</span>
              </Link>

              <a
                href="#top"
                className="text-xs text-muted-foreground hover:text-primary transition-colors min-h-[44px] inline-flex items-center"
              >
                Back to top ↑
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <FloatingActions />
    </>
  )
}
