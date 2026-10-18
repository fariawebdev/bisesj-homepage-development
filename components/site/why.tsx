import { Award, GraduationCap, Home, ShieldCheck, Sprout, Users, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ASSETS } from '@/src/assets'
import { WHY } from '@/src/content'
import { Reveal } from './motion'
import { SafeImage } from './safe-image'
import { SectionHeading } from './section-heading'

const ICONS: Record<(typeof WHY.tiles)[number]['icon'], LucideIcon> = {
  graduation: GraduationCap,
  users: Users,
  shield: ShieldCheck,
  sprout: Sprout,
  award: Award,
  home: Home,
}

/** Bento placement for each tile on large screens (4-column grid). */
const LAYOUT = [
  'lg:col-span-2 lg:row-span-2 bg-primary text-primary-foreground',
  'bg-card',
  'bg-card',
  'lg:col-span-2 bg-secondary',
  'bg-gold text-primary',
  'bg-card',
]

export function WhySection() {
  return (
    <section aria-labelledby="why-title" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <SectionHeading id="why-title" eyebrow={WHY.eyebrow} title={WHY.heading} />

        <ul className="mt-14 grid auto-rows-[minmax(13rem,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.tiles.map((tile, i) => {
            const Icon = ICONS[tile.icon]
            const featured = i === 0
            return (
              <Reveal
                as="li"
                key={tile.title}
                delay={i * 0.05}
                className={cn(
                  'group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-border/60 p-7 shadow-soft transition-shadow duration-500 hover:shadow-lift',
                  LAYOUT[i],
                  featured && 'border-transparent sm:col-span-2 lg:col-span-2',
                )}
              >
                {featured && (
                  <div
                    aria-hidden="true"
                    className="absolute -end-20 -top-20 size-72 rounded-full bg-[radial-gradient(circle,rgb(201_162_75/0.35),transparent_70%)]"
                  />
                )}
                <span
                  className={cn(
                    'relative inline-flex size-12 items-center justify-center rounded-2xl',
                    featured ? 'bg-gold text-primary' : i === 4 ? 'bg-primary text-gold' : 'bg-primary/5 text-primary',
                  )}
                >
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <div className="relative mt-10 flex flex-col gap-3">
                  <h3
                    className={cn(
                      'font-serif leading-tight tracking-tight',
                      featured ? 'text-3xl md:text-4xl' : 'text-2xl',
                      !featured && i !== 4 && 'text-primary',
                    )}
                  >
                    {tile.title}
                  </h3>
                  <p
                    className={cn(
                      'text-sm leading-relaxed',
                      featured ? 'text-primary-foreground/75 md:text-base' : i === 4 ? 'text-primary/80' : 'text-muted-foreground',
                    )}
                  >
                    {tile.body}
                  </p>
                </div>
              </Reveal>
            )
          })}
          <Reveal as="li" delay={0.3} className="overflow-hidden rounded-[24px] shadow-soft sm:col-span-2 lg:col-span-2">
            <SafeImage
              src={ASSETS.twentyYearsCambridge}
              alt="BISESJ students and staff celebrating 20 years with Cambridge"
              wrapperClassName="h-full min-h-56 w-full"
              className="transition-transform duration-700 group-hover:scale-105"
            />
          </Reveal>
        </ul>
      </div>
    </section>
  )
}
