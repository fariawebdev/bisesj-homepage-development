import { ArrowUpRight, Quote } from 'lucide-react'
import { ASSETS } from '@/lib/assets'
import { LEADERSHIP } from '@/lib/content'
import { Reveal } from './motion'
import { SafeImage } from './safe-image'
import { SectionHeading } from './section-heading'
import { SmartLink } from './smart-link'

export function LeadershipSection() {
  return (
    <section aria-labelledby="leadership-title" className="relative bg-secondary/60 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <SectionHeading id="leadership-title" eyebrow={LEADERSHIP.eyebrow} title={LEADERSHIP.heading} />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {LEADERSHIP.leaders.map((leader, i) => (
            <Reveal key={leader.name} as="article" delay={i * 0.1} className="h-full">
              <div className="grid h-full overflow-hidden rounded-[24px] border border-border bg-card shadow-soft sm:grid-cols-5">
                <SafeImage
                  src={ASSETS[leader.asset]}
                  alt={`Portrait of ${leader.name}, ${leader.role}`}
                  wrapperClassName="aspect-[4/3] sm:col-span-2 sm:aspect-auto sm:h-full"
                  className="object-top"
                />
                <div className="flex flex-col gap-6 p-7 sm:col-span-3 md:p-9">
                  <Quote aria-hidden="true" className="size-8 text-gold rtl:-scale-x-100" />
                  <blockquote className="font-serif text-xl leading-snug tracking-tight text-primary md:text-2xl">
                    <p>{leader.quote}</p>
                  </blockquote>
                  <div className="mt-auto flex flex-col gap-4">
                    <div className="gold-rule w-16" />
                    <div>
                      <p className="font-semibold text-foreground">{leader.name}</p>
                      <p className="text-sm text-muted-foreground">{leader.role}</p>
                    </div>
                    <SmartLink
                      to={leader.link}
                      label={`${LEADERSHIP.readMore} from the ${leader.role}`}
                      className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary underline decoration-gold decoration-2 underline-offset-8 hover:decoration-primary"
                    >
                      {LEADERSHIP.readMore}
                      <ArrowUpRight aria-hidden="true" className="size-4 rtl:-scale-x-100" />
                    </SmartLink>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <p className="mx-auto max-w-3xl text-balance text-center font-serif text-2xl italic leading-snug text-primary md:text-3xl">
            <span aria-hidden="true" className="text-gold">{'“'}</span>
            {LEADERSHIP.vision}
            <span aria-hidden="true" className="text-gold">{'”'}</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
