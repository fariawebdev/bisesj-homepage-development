'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CAMPUS, GALLERY } from '@/src/content'
import { Magnetic, Reveal } from './motion'
import { SafeImage } from './safe-image'
import { SectionHeading } from './section-heading'
import { SmartLink } from './smart-link'
import { bookCampusTour } from './tour'

export function CampusSection() {
  const [index, setIndex] = useState<number | null>(null)
  const lastTrigger = useRef<HTMLButtonElement | null>(null)

  const close = useCallback(() => {
    setIndex(null)
    lastTrigger.current?.focus()
  }, [])
  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + GALLERY.length) % GALLERY.length)),
    [],
  )

  return (
    <section aria-labelledby="campus-title" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <SectionHeading id="campus-title" eyebrow={CAMPUS.eyebrow} title={CAMPUS.heading} />

        <ul className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
          {GALLERY.map((item, i) => (
            <Reveal as="li" key={item.src} delay={(i % 3) * 0.08} className="break-inside-avoid">
              <figure className="group relative overflow-hidden rounded-[24px] shadow-soft">
                <button
                  type="button"
                  onClick={(e) => {
                    lastTrigger.current = e.currentTarget
                    setIndex(i)
                  }}
                  className="block w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  aria-label={`View larger: ${item.alt}`}
                >
                  <SafeImage
                    src={item.src}
                    alt={item.alt}
                    wrapperClassName={cn('w-full', item.tall ? 'aspect-[3/4]' : 'aspect-[4/3]')}
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute end-4 top-4 inline-flex size-10 items-center justify-center rounded-full bg-white/85 text-primary opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                    <Expand aria-hidden="true" className="size-4" />
                  </span>
                </button>
                {item.caption && item.link && (
                  <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-[linear-gradient(0deg,rgb(7_42_32/0.92),transparent)] p-5 pt-16">
                    <SmartLink
                      to={item.link}
                      label={item.caption}
                      className="pointer-events-auto inline-flex items-center gap-2 font-serif text-lg leading-tight text-primary-foreground hover:text-gold-soft"
                    >
                      {item.caption}
                      <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 text-gold rtl:-scale-x-100" />
                    </SmartLink>
                  </figcaption>
                )}
              </figure>
            </Reveal>
          ))}
        </ul>

        {/* Campus tour CTA */}
        <Reveal className="mt-10">
          <div className="relative overflow-hidden rounded-[28px] bg-primary px-7 py-12 text-primary-foreground md:px-14 md:py-16">
            <div aria-hidden="true" className="absolute -start-24 -top-24 size-80 rounded-full bg-[radial-gradient(circle,rgb(201_162_75/0.3),transparent_70%)]" />
            <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <h3 className="font-serif text-3xl leading-tight tracking-tight text-balance md:text-5xl">{CAMPUS.ctaHeading}</h3>
                <p className="mt-4 text-lg text-primary-foreground/75">{CAMPUS.ctaBody}</p>
              </div>
              <Magnetic>
                <a
                  href="#enquiry"
                  onClick={bookCampusTour}
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gold px-8 py-4 text-base font-semibold text-primary shadow-lift transition-colors hover:bg-gold-soft"
                >
                  {CAMPUS.cta}
                </a>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </div>

      <Lightbox index={index} onClose={close} onStep={step} />
    </section>
  )
}

function Lightbox({
  index,
  onClose,
  onStep,
}: {
  index: number | null
  onClose: () => void
  onStep: (dir: 1 | -1) => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const open = index !== null

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onStep(document.dir === 'rtl' ? -1 : 1)
      if (e.key === 'ArrowLeft') onStep(document.dir === 'rtl' ? 1 : -1)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose, onStep])

  const item = index !== null ? GALLERY[index] : null

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          className="fixed inset-0 z-[80] flex flex-col bg-forest-deep/95 p-4 backdrop-blur-sm md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <div className="flex items-center justify-between text-primary-foreground">
            <p className="text-sm tabular-nums text-primary-foreground/70" aria-live="polite">
              {(index ?? 0) + 1} / {GALLERY.length}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close image viewer"
              className="inline-flex size-11 items-center justify-center rounded-full border border-white/20 hover:bg-white/10"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>
          <div className="relative flex flex-1 items-center justify-center gap-4 py-4">
            <LightboxNav dir={-1} onStep={onStep} />
            <motion.figure
              key={item.src}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex max-h-full max-w-5xl flex-col items-center gap-4"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.src} alt={item.alt} className="max-h-[72vh] w-auto rounded-2xl object-contain" />
              <figcaption className="text-center font-serif text-lg text-primary-foreground">
                {item.caption ?? item.alt}
              </figcaption>
            </motion.figure>
            <LightboxNav dir={1} onStep={onStep} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function LightboxNav({ dir, onStep }: { dir: 1 | -1; onStep: (dir: 1 | -1) => void }) {
  const Icon = dir === 1 ? ChevronRight : ChevronLeft
  return (
    <button
      type="button"
      onClick={() => onStep(dir)}
      aria-label={dir === 1 ? 'Next image' : 'Previous image'}
      className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-white/20 text-primary-foreground hover:bg-white/10"
    >
      <Icon aria-hidden="true" className="size-6 rtl:-scale-x-100" />
    </button>
  )
}
