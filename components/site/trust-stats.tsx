'use client'

import { cn } from '@/lib/utils'
import { ASSETS } from '@/lib/assets'
import { TRUST } from '@/lib/content'
import { SITE_CONFIG } from '@/lib/site-config'
import { Reveal } from './motion'
import { SafeImage } from './safe-image'

export function TrustStrip() {
  // Duplicated once so the marquee can loop seamlessly at -50%.
  const items = [...TRUST.partners, ...TRUST.partners]
  return (
    <section aria-labelledby="trust-label" className="border-b border-border bg-card py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 md:flex-row md:items-center md:gap-10 md:px-6">
        <p
          id="trust-label"
          className="shrink-0 text-xs font-semibold uppercase tracking-[0.22em] text-primary md:max-w-[12rem]"
        >
          {TRUST.label}
        </p>
        <div
          dir="ltr"
          className="relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]"
        >
          <ul className="flex w-max animate-marquee items-center gap-14 hover:[animation-play-state:paused]">
            {items.map((p, i) => (
              <li key={`${p.name}-${i}`} aria-hidden={i >= TRUST.partners.length || undefined}>
                <SafeImage
                  src={ASSETS.partners[p.asset]}
                  alt={p.name}
                  wrapperClassName="h-14 w-36 rounded-xl bg-card [background:none]"
                  className="object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export function StatsBand() {
  return (
    <section aria-label="BISESJ at a glance" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <dl className="grid grid-cols-2 overflow-hidden rounded-[24px] border border-border bg-card shadow-soft md:grid-cols-5">
          {SITE_CONFIG.stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.06}
              className={cn(
                'flex flex-col justify-between gap-6 border-border p-6 md:p-8',
                (i === 0 || i === 3) && 'border-e',
                i < 3 && 'border-b md:border-b-0',
                i < SITE_CONFIG.stats.length - 1 && 'md:border-e',
                i === 2 && 'col-span-2 md:col-span-1',
              )}
            >
              <dt className="order-2 text-sm font-medium text-muted-foreground">{s.label}</dt>
              <dd className="order-1 font-serif text-4xl leading-none tracking-tight text-primary md:text-5xl">
                {s.format === 'text' ? (
                  <span className="block text-2xl leading-tight md:text-[1.6rem]">{s.displayValue}</span>
                ) : (
                  <span className="tabular-nums">{s.displayValue}</span>
                )}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
