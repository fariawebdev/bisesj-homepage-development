'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, CalendarDays } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NEWS } from '@/src/content'
import { SectionHeading } from './section-heading'
import { SmartLink } from './smart-link'

const TABS = [
  { key: 'news', label: 'News' },
  { key: 'notices', label: 'Notices' },
  { key: 'careers', label: 'Careers' },
] as const

type TabKey = (typeof TABS)[number]['key']

export function NewsSection() {
  const [tab, setTab] = useState<TabKey>('news')
  const reduce = useReducedMotion()
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const items = NEWS.tabs[tab]

  // Roving focus for the tablist, per the WAI-ARIA tabs pattern.
  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const rtl = document.dir === 'rtl'
    const next = { ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1 }[e.key as 'ArrowRight' | 'ArrowLeft']
    if (!next) return
    e.preventDefault()
    const j = (i + next + TABS.length) % TABS.length
    setTab(TABS[j].key)
    tabRefs.current[j]?.focus()
  }

  return (
    <section aria-labelledby="news-title" className="bg-secondary/60 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="news-title" eyebrow={NEWS.eyebrow} title={NEWS.heading} />
          <SmartLink
            to="news"
            label={NEWS.viewAll}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline decoration-gold decoration-2 underline-offset-8 hover:decoration-primary"
          >
            {NEWS.viewAll}
            <ArrowUpRight aria-hidden="true" className="size-4 rtl:-scale-x-100" />
          </SmartLink>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div role="tablist" aria-label="News categories" className="inline-flex rounded-full border border-border bg-card p-1 shadow-soft">
              {TABS.map((t, i) => (
                <button
                  key={t.key}
                  ref={(el) => {
                    tabRefs.current[i] = el
                  }}
                  role="tab"
                  type="button"
                  id={`tab-${t.key}`}
                  aria-selected={tab === t.key}
                  aria-controls={`panel-${t.key}`}
                  tabIndex={tab === t.key ? 0 : -1}
                  onClick={() => setTab(t.key)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={cn(
                    'relative rounded-full px-5 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-gold',
                    tab === t.key ? 'text-primary-foreground' : 'text-muted-foreground hover:text-primary',
                  )}
                >
                  {tab === t.key && (
                    <motion.span
                      layoutId="news-tab-pill"
                      aria-hidden="true"
                      className="absolute inset-0 -z-0 rounded-full bg-primary"
                      transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                  <span className="relative">{t.label}</span>
                </button>
              ))}
            </div>

            <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="mt-6">
              <AnimatePresence mode="wait">
                <motion.ul
                  key={tab}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid gap-4 sm:grid-cols-2"
                >
                  {items.map((item) => (
                    <li key={item.title}>
                      <SmartLink
                        to={item.link}
                        label={item.title}
                        className="group flex h-full flex-col justify-between gap-8 rounded-[24px] border border-border bg-card p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-gold"
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
                            {item.tag}
                          </span>
                          {'date' in item && item.date && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-primary">
                              <CalendarDays aria-hidden="true" className="size-3.5" />
                              {item.date}
                            </span>
                          )}
                        </div>
                        <div className="flex items-end justify-between gap-4">
                          <h3 className="font-serif text-xl leading-snug tracking-tight text-primary">{item.title}</h3>
                          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border text-primary transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                            <ArrowUpRight aria-hidden="true" className="size-4 rtl:-scale-x-100" />
                          </span>
                        </div>
                      </SmartLink>
                    </li>
                  ))}
                </motion.ul>
              </AnimatePresence>
            </div>
          </div>

          <aside aria-labelledby="calendar-title" className="lg:col-span-4 lg:pt-[3.75rem]">
            <div className="flex h-full flex-col gap-6 rounded-[24px] bg-primary p-7 text-primary-foreground shadow-lift">
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-gold text-primary">
                <CalendarDays aria-hidden="true" className="size-6" />
              </span>
              <div>
                <h3 id="calendar-title" className="font-serif text-2xl tracking-tight">
                  {NEWS.calendarTitle}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/75">{NEWS.calendarBody}</p>
              </div>
              <div aria-hidden="true" className="grid grid-cols-7 gap-1.5">
                {Array.from({ length: 28 }).map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      'aspect-square rounded-md',
                      i === 17 ? 'bg-gold' : i % 7 >= 5 ? 'bg-white/5' : 'bg-white/10',
                    )}
                  />
                ))}
              </div>
              <SmartLink
                to="academicCalendar"
                label={NEWS.calendarCta}
                className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-gold-soft"
              >
                {NEWS.calendarCta}
                <ArrowUpRight aria-hidden="true" className="size-4 rtl:-scale-x-100" />
              </SmartLink>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
