'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CLASSES } from '@/lib/classes'
import { cn } from '@/lib/utils'

interface ClassSwitcherProps {
  currentSlug: string
  locale: string
  basePath?: string
}

export function ClassSwitcher({
  currentSlug,
  locale,
  basePath = 'syllabus',
}: ClassSwitcherProps) {
  const router = useRouter()

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const slug = e.target.value
    if (slug) {
      router.push(`/${locale}/${basePath}/${slug}`)
    }
  }

  return (
    <div className="w-full space-y-4">
      {/* Mobile Select Dropdown */}
      <div className="block md:hidden">
        <label htmlFor="mobile-class-select" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
          Select Class
        </label>
        <select
          id="mobile-class-select"
          aria-label="Select Class"
          value={currentSlug}
          onChange={handleSelectChange}
          className="w-full min-h-[44px] rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium text-foreground shadow-xs focus-visible:outline-2 focus-visible:outline-gold"
        >
          {CLASSES.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.label} ({c.stage})
            </option>
          ))}
        </select>
      </div>

      {/* Desktop & Tablet Chip List */}
      <div className="hidden md:block">
        <nav className="flex flex-wrap items-center gap-2" aria-label="Class Switcher">
          {CLASSES.map((c) => {
            const isActive = c.slug === currentSlug
            return (
              <Link
                key={c.slug}
                href={`/${locale}/${basePath}/${c.slug}`}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'inline-flex min-h-[44px] items-center justify-center rounded-lg px-3.5 py-2 text-xs font-semibold transition-all focus-visible:outline-2 focus-visible:outline-gold',
                  isActive
                    ? 'bg-forest text-primary-foreground shadow-sm ring-1 ring-gold/40'
                    : 'border border-border bg-background text-foreground hover:border-gold/60 hover:bg-muted',
                )}
              >
                {c.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
