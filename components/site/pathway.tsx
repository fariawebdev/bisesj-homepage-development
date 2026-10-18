'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PATHWAY } from '@/src/content'
import { SmartLink } from './smart-link'
import { SectionHeading } from './section-heading'
import { Magnetic } from './motion'

export function PathwaySection() {
  const [active, setActive] = useState(3)
  const reduce = useReducedMotion()
  const stages = PATHWAY.stages
  const stage = stages[active]
  const progress = (active / (stages.length - 1)) * 100

  return (
    <section
      aria-labelledby="pathway-title"
      className="relative overflow-hidden bg-primary py-20 text-primary-foreground md:py-28"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--gold),transparent)]"
      />
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="pathway-title" tone="light" eyebrow={PATHWAY.eyebrow} title={PATHWAY.heading} sub={PATHWAY.sub} />
          <Magnetic>
            <SmartLink
              to="syllabus"
              label={PATHWAY.cta}
              className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-gold-soft"
            >
              {PATHWAY.cta}
              <ArrowUpRight aria-hidden="true" className="size-4 rtl:-scale-x-100" />
            </SmartLink>
          </Magnetic>
        </div>

        {/* Stepper */}
        <div className="relative mt-16">
          <div aria-hidden="true" className="absolute inset-x-0 top-5 hidden h-px bg-white/15 md:block" />
          <motion.div
            aria-hidden="true"
            className="absolute start-0 top-5 hidden h-px bg-gold md:block"
            animate={{ width: `${progress}%` }}
            transition={{ duration: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
          <ol className="-mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-5 md:gap-0 md:overflow-visible md:px-0">
            {stages.map((s, i) => {
              const isActive = i === active
              const reached = i <= active
              return (
                <li key={s.name} className="snap-start md:flex md:justify-center first:md:justify-start last:md:justify-end">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    aria-controls="pathway-panel"
                    className={cn(
                      'group flex min-w-40 flex-col items-start gap-4 rounded-2xl p-3 text-start transition-colors md:min-w-0 md:items-center md:text-center md:first:items-start md:first:text-start',
                      'focus-visible:outline-2 focus-visible:outline-gold',
                      isActive ? 'bg-white/10 md:bg-transparent' : 'hover:bg-white/5',
                    )}
                  >
                    <span
                      className={cn(
                        'relative inline-flex size-4 items-center justify-center rounded-full border-2 transition-colors md:mt-3',
                        reached ? 'border-gold bg-gold' : 'border-white/40 bg-primary',
                      )}
                    >
                      {isActive && (
                        <span aria-hidden="true" className="absolute inset-[-8px] animate-ping rounded-full border border-gold/60" />
                      )}
                    </span>
                    <span className="flex flex-col gap-1">
                      <span className="text-xs font-semibold uppercase tracking-wider text-gold-soft/80">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className={cn('font-serif text-xl leading-tight', isActive ? 'text-primary-foreground' : 'text-primary-foreground/70')}>
                        {s.name}
                      </span>
                      <span className="text-xs text-primary-foreground/60">{s.grades}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>
        </div>

        {/* Detail panel */}
        <div id="pathway-panel" aria-live="polite" className="mt-10 overflow-hidden rounded-[24px] border border-white/10 bg-white/5">
          <AnimatePresence mode="wait">
            <motion.div
              key={stage.name}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="grid gap-6 p-7 md:grid-cols-12 md:items-center md:p-10"
            >
              <p className="font-serif text-6xl leading-none text-gold md:col-span-2 md:text-7xl">
                {String(active + 1).padStart(2, '0')}
              </p>
              <div className="md:col-span-6">
                <h3 className="font-serif text-3xl tracking-tight">{stage.name}</h3>
                <p className="mt-1 text-sm text-gold-soft">{stage.grades}</p>
              </div>
              <p className="text-base leading-relaxed text-primary-foreground/75 md:col-span-4">{stage.body}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
