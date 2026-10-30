'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { cn } from '@/lib/utils'
import { VOICES } from '@/lib/content'
import { SectionHeading } from './section-heading'

export function VoicesSection() {
  const [i, setI] = useState(0)
  const reduce = useReducedMotion()
  const total = VOICES.items.length
  const item = VOICES.items[i]
  const go = (dir: 1 | -1) => setI((v) => (v + dir + total) % total)

  return (
    <section
      aria-labelledby="voices-title"
      aria-roledescription="carousel"
      className="relative overflow-hidden bg-forest-deep py-20 text-primary-foreground md:py-28"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(50%_60%_at_85%_20%,rgb(201_162_75/0.18),transparent)]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 md:px-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading id="voices-title" tone="light" eyebrow={VOICES.eyebrow} title={VOICES.heading} />
          <div className="mt-10 flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="inline-flex size-12 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-gold"
            >
              <ChevronLeft aria-hidden="true" className="size-5 rtl:-scale-x-100" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="inline-flex size-12 items-center justify-center rounded-full bg-gold text-primary transition-colors hover:bg-gold-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <ChevronRight aria-hidden="true" className="size-5 rtl:-scale-x-100" />
            </button>
            <div className="ms-3 flex gap-2">
              {VOICES.items.map((_, j) => (
                <button
                  key={j}
                  type="button"
                  onClick={() => setI(j)}
                  aria-label={`Show testimonial ${j + 1} of ${total}`}
                  aria-current={j === i}
                  className={cn('h-1.5 rounded-full transition-all', j === i ? 'w-8 bg-gold' : 'w-3 bg-white/30 hover:bg-white/50')}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-8" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${total}`}
              initial={reduce ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: -24 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-full flex-col gap-10 rounded-[28px] border border-white/10 bg-white/5 p-8 md:p-12"
            >
              <div className="flex items-center justify-between">
                <Quote aria-hidden="true" className="size-10 text-gold rtl:-scale-x-100" />
                <span className="rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-primary-foreground/70">
                  {VOICES.sampleLabel}
                </span>
              </div>
              <blockquote className="font-serif text-2xl leading-snug tracking-tight text-balance md:text-4xl">
                <p>{item.quote}</p>
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-4">
                <span aria-hidden="true" className="inline-flex size-12 items-center justify-center rounded-full bg-gold font-serif text-lg text-primary">
                  {item.name.charAt(0)}
                </span>
                <span>
                  <span className="block font-semibold">{item.name}</span>
                  <span className="block text-sm text-primary-foreground/65">{item.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
