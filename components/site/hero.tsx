'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Award, CalendarCheck, Download } from 'lucide-react'
import { ASSETS } from '@/src/assets'
import { useLocale } from './i18n'
import { SmartLink } from './smart-link'
import { Magnetic } from './motion'
import { SafeImage } from './safe-image'
import { bookCampusTour } from './tour'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const { t } = useLocale()
  const h = t.hero
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, reduce ? 1.06 : 1.14])

  const fadeUp = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease },
        }

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate -mt-[78px] flex min-h-[100svh] items-end overflow-hidden bg-forest-deep pt-36 text-primary-foreground"
    >
      <motion.div aria-hidden="true" className="absolute inset-0 -z-20" style={{ y, scale }}>
        <SafeImage src={ASSETS.hero} alt="" priority wrapperClassName="h-full w-full" />
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(7_42_32/0.92)_0%,rgb(7_42_32/0.7)_50%,rgb(7_42_32/0.35)_100%),linear-gradient(180deg,rgb(7_42_32/0.5)_0%,transparent_35%,rgb(7_42_32/0.85)_100%)] rtl:bg-[linear-gradient(270deg,rgb(7_42_32/0.92)_0%,rgb(7_42_32/0.7)_50%,rgb(7_42_32/0.35)_100%),linear-gradient(180deg,rgb(7_42_32/0.5)_0%,transparent_35%,rgb(7_42_32/0.85)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_15%_85%,rgb(201_162_75/0.22),transparent_70%)]"
      />

      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 pb-16 md:px-6 md:pb-24 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <motion.p
            {...fadeUp(0.1)}
            className="inline-flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold-soft"
          >
            <span aria-hidden="true" className="h-px w-8 bg-gold" />
            {h.eyebrow}
          </motion.p>

          <h1
            id="hero-title"
            className="mt-6 font-serif text-5xl leading-[0.98] tracking-tight text-balance sm:text-6xl md:text-7xl xl:text-8xl"
          >
            <motion.span {...fadeUp(0.2)} className="block">
              {h.title[0]}
            </motion.span>
            <motion.span {...fadeUp(0.32)} className="block italic text-gold-soft">
              {h.title[1]}
            </motion.span>
          </h1>

          <motion.p {...fadeUp(0.45)} className="mt-7 max-w-xl text-lg leading-relaxed text-primary-foreground/80 md:text-xl">
            {h.sub}
          </motion.p>

          <motion.div {...fadeUp(0.55)} className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <SmartLink
                to="registration"
                label={h.ctaApply}
                className="group inline-flex items-center gap-3 rounded-full bg-gold px-7 py-4 text-base font-semibold text-primary shadow-lift transition-colors hover:bg-gold-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-soft"
              >
                {h.ctaApply}
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100"
                />
              </SmartLink>
            </Magnetic>
            <a
              href="#enquiry"
              onClick={bookCampusTour}
              className="inline-flex items-center gap-3 rounded-full border border-white/30 px-7 py-4 text-base font-semibold text-primary-foreground transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-soft"
            >
              <CalendarCheck aria-hidden="true" className="size-5 text-gold-soft" />
              {h.ctaTour}
            </a>
          </motion.div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row lg:col-span-5 lg:flex-col lg:items-end">
          <HeroCard
            delay={0.7}
            icon={<CalendarCheck aria-hidden="true" className="size-5" />}
            title={h.cardAdmissionsTitle}
            body={h.cardAdmissionsBody}
            cta={
              <SmartLink
                to="admissionTestPdf"
                label={h.cardAdmissionsCta}
                className="inline-flex items-center gap-2 text-sm font-semibold text-gold-soft underline-offset-4 hover:underline"
              >
                <Download aria-hidden="true" className="size-4" />
                {h.cardAdmissionsCta}
              </SmartLink>
            }
          />
          <HeroCard
            delay={0.85}
            offset
            icon={<Award aria-hidden="true" className="size-5" />}
            title={h.cardScholarshipTitle}
            body={h.cardScholarshipBody}
            cta={
              <SmartLink
                to="meritScholarship"
                label={`${h.cardScholarshipCta}: ${h.cardScholarshipTitle}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-gold-soft underline-offset-4 hover:underline"
              >
                {h.cardScholarshipCta}
                <ArrowUpRight aria-hidden="true" className="size-4 rtl:-scale-x-100" />
              </SmartLink>
            }
          />
        </div>
      </div>
    </section>
  )
}

function HeroCard({
  icon,
  title,
  body,
  cta,
  delay,
  offset,
}: {
  icon: React.ReactNode
  title: string
  body: string
  cta: React.ReactNode
  delay: number
  offset?: boolean
}) {
  const reduce = useReducedMotion()
  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease }}
      className={`glass-dark w-full rounded-[24px] border border-white/15 p-6 shadow-lift sm:max-w-sm ${offset ? 'lg:me-12' : ''}`}
    >
      <div className="flex items-start gap-4">
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-gold text-primary">
          {icon}
        </span>
        <div className="flex flex-col gap-2">
          <h2 className="font-serif text-xl leading-snug">{title}</h2>
          <p className="text-sm leading-relaxed text-primary-foreground/75">{body}</p>
          <div className="mt-2">{cta}</div>
        </div>
      </div>
    </motion.article>
  )
}
