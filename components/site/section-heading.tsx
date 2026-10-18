import { cn } from '@/lib/utils'
import { Reveal } from './motion'

export function Eyebrow({ children, tone = 'dark' }: { children: React.ReactNode; tone?: 'dark' | 'light' }) {
  return (
    <p
      className={cn(
        'inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em]',
        tone === 'dark' ? 'text-primary/80' : 'text-gold-soft',
      )}
    >
      <span aria-hidden="true" className="h-px w-8 bg-gold" />
      {children}
    </p>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  id,
  tone = 'dark',
  align = 'start',
  className,
}: {
  eyebrow: string
  title: string
  sub?: string
  id?: string
  tone?: 'dark' | 'light'
  align?: 'start' | 'center'
  className?: string
}) {
  return (
    <Reveal
      className={cn(
        'flex max-w-3xl flex-col gap-5',
        align === 'center' && 'mx-auto items-center text-center',
        className,
      )}
    >
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2
        id={id}
        className={cn(
          'font-serif text-4xl leading-[1.05] tracking-tight md:text-5xl lg:text-6xl',
          tone === 'dark' ? 'text-primary' : 'text-primary-foreground',
        )}
      >
        {title}
      </h2>
      {sub && (
        <p
          className={cn(
            'max-w-2xl text-lg leading-relaxed',
            tone === 'dark' ? 'text-muted-foreground' : 'text-primary-foreground/75',
          )}
        >
          {sub}
        </p>
      )}
    </Reveal>
  )
}
