import { InnerPage } from '@/components/site/inner-page'
import { Award, Globe, BookOpen, Star } from 'lucide-react'

export const metadata = {
  title: '20+ Years with Cambridge International | BISESJ',
  description: 'Celebrating two decades of partnership with Cambridge Assessment International Education at BISESJ in Jeddah.',
}

export default function TwentyYearsCambridgePage() {
  return (
    <InnerPage
      title="20+ Years with Cambridge"
      subtitle="Celebrating more than two decades of affiliation with Cambridge Assessment International Education in Jeddah, Saudi Arabia."
      badge="Milestone Partnership"
    >
      <div className="space-y-8">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-forest/10 p-3 text-forest shrink-0">
              <Award aria-hidden="true" className="size-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">A Legacy of British Educational Excellence</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Since becoming an accredited Cambridge International School over 20 years ago, BISESJ has prepared generations of students for global academic success. Our students consistently achieve Outstanding Cambridge Learner Awards, including Top in Country and High Achievement accolades.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="rounded-xl bg-forest/10 p-3 text-forest w-fit">
              <Globe aria-hidden="true" className="size-6" />
            </div>
            <h3 className="mt-4 font-bold text-foreground">Global University Access</h3>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Cambridge qualifications earned at BISESJ open pathways to leading universities in the UK, USA, Canada, Australia, Bangladesh, and worldwide.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="rounded-xl bg-forest/10 p-3 text-forest w-fit">
              <BookOpen aria-hidden="true" className="size-6" />
            </div>
            <h3 className="mt-4 font-bold text-foreground">Comprehensive Curriculum</h3>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Delivering full-scale IGCSE and A Level syllabi across Sciences, Commerce, Mathematics, English Literature, and Computer Science.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="rounded-xl bg-forest/10 p-3 text-forest w-fit">
              <Star aria-hidden="true" className="size-6" />
            </div>
            <h3 className="mt-4 font-bold text-foreground">Teacher Professional Development</h3>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Our faculty continually participates in Cambridge official training courses and webinars to maintain international pedagogical standards.
            </p>
          </div>
        </div>
      </div>
    </InnerPage>
  )
}
