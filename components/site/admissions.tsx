'use client'

import { ArrowUpRight, Award, Download, FileText } from 'lucide-react'
import { ASSETS } from '@/src/assets'
import { ADMISSIONS } from '@/src/content'
import { useLocale } from './i18n'
import { Magnetic, Reveal } from './motion'
import { SafeImage } from './safe-image'
import { SectionHeading } from './section-heading'
import { SmartLink } from './smart-link'

export function AdmissionsSection() {
  const { t } = useLocale()

  return (
    <section aria-labelledby="admissions-title" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="admissions-title" eyebrow={ADMISSIONS.eyebrow} title={ADMISSIONS.heading} sub={ADMISSIONS.sub} />
          <SmartLink
            to="admissions2026"
            label={ADMISSIONS.noticeCta}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline decoration-gold decoration-2 underline-offset-8 hover:decoration-primary"
          >
            <FileText aria-hidden="true" className="size-4 text-gold" />
            {ADMISSIONS.noticeCta}
          </SmartLink>
        </div>

        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ADMISSIONS.steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 0.08}
              className="relative flex flex-col gap-6 rounded-[24px] border border-border bg-card p-7 shadow-soft"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-5xl leading-none text-gold">{i + 1}</span>
                {i < ADMISSIONS.steps.length - 1 && (
                  <span aria-hidden="true" className="hidden h-px flex-1 ms-6 bg-[linear-gradient(90deg,var(--gold),transparent)] lg:block rtl:bg-[linear-gradient(270deg,var(--gold),transparent)]" />
                )}
              </div>
              <div>
                <h3 className="font-serif text-2xl tracking-tight text-primary">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Magnetic>
            <SmartLink
              to="registration"
              label={t.applyNow}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-forest-deep"
            >
              {t.applyNow}
              <ArrowUpRight aria-hidden="true" className="size-4 text-gold rtl:-scale-x-100" />
            </SmartLink>
          </Magnetic>
          <SmartLink
            to="admissionTestPdf"
            label={ADMISSIONS.downloadCta}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-7 py-4 text-sm font-semibold text-primary transition-colors hover:border-primary"
          >
            <Download aria-hidden="true" className="size-4 text-gold" />
            {ADMISSIONS.downloadCta}
          </SmartLink>
        </div>

        {/* Scholarship banner */}
        <Reveal className="mt-16">
          <article className="relative grid overflow-hidden rounded-[28px] bg-forest-deep text-primary-foreground shadow-lift md:grid-cols-5">
            <SafeImage
              src={ASSETS.scholarship}
              alt="Merit Scholarship announcement for regular IGCSE students"
              wrapperClassName="h-64 md:col-span-2 md:h-full"
            />
            <div className="relative flex flex-col gap-5 p-8 md:col-span-3 md:p-12">
              <div aria-hidden="true" className="absolute end-0 top-0 h-full w-1/2 bg-[radial-gradient(60%_60%_at_100%_0%,rgb(201_162_75/0.25),transparent)]" />
              <span className="relative inline-flex w-fit items-center gap-2 rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-soft">
                <Award aria-hidden="true" className="size-3.5" />
                Scholarship
              </span>
              <h3 className="relative font-serif text-3xl leading-tight tracking-tight md:text-4xl">
                {ADMISSIONS.scholarshipTitle}
              </h3>
              <p className="relative max-w-lg leading-relaxed text-primary-foreground/75">{ADMISSIONS.scholarshipBody}</p>
              <SmartLink
                to="meritScholarship"
                label={ADMISSIONS.scholarshipCta}
                className="relative mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-gold-soft"
              >
                {ADMISSIONS.scholarshipCta}
                <ArrowUpRight aria-hidden="true" className="size-4 rtl:-scale-x-100" />
              </SmartLink>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
