import { InnerPage } from '@/components/site/inner-page'
import { Shield, Award, Users, BookOpen } from 'lucide-react'

export const metadata = {
  title: 'About Us | BISESJ',
  description: 'About Bangladesh International School, English Section, Jeddah - established 1993, Cambridge International School.',
}

export default function AboutUsPage() {
  return (
    <InnerPage
      title="About Us"
      subtitle="Bangladesh International School, English Section, Jeddah (BISESJ) was founded in 1993 to provide premier British Cambridge curriculum education to the Bangladeshi and expatriate international community in Jeddah."
      badge="Our Heritage & Mission"
    >
      <div className="space-y-8">
        <div className="prose max-w-none text-muted-foreground leading-relaxed">
          <p className="text-lg">
            Under the supervision of the Ministry of Education, Kingdom of Saudi Arabia, BISESJ has maintained a proud tradition of academic excellence for over three decades. Offering comprehensive learning pathways from Kindergarten through Cambridge IGCSE and AS & A Levels, our students consistently achieve top percentiles worldwide.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="rounded-xl bg-forest/10 p-3 text-forest w-fit">
              <Award aria-hidden="true" className="size-6" />
            </div>
            <h3 className="mt-4 font-bold text-foreground">Cambridge Partner</h3>
            <p className="mt-2 text-xs text-muted-foreground">
              Over 20 continuous years affiliated with Cambridge Assessment International Education.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="rounded-xl bg-forest/10 p-3 text-forest w-fit">
              <Users aria-hidden="true" className="size-6" />
            </div>
            <h3 className="mt-4 font-bold text-foreground">790+ Enrolled</h3>
            <p className="mt-2 text-xs text-muted-foreground">
              A diverse student body representing 10 nationalities learning together in harmony.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="rounded-xl bg-forest/10 p-3 text-forest w-fit">
              <BookOpen aria-hidden="true" className="size-6" />
            </div>
            <h3 className="mt-4 font-bold text-foreground">Rigorous Academics</h3>
            <p className="mt-2 text-xs text-muted-foreground">
              Proven track record of Outstanding Cambridge Learner Awards and global university placements.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="rounded-xl bg-forest/10 p-3 text-forest w-fit">
              <Shield aria-hidden="true" className="size-6" />
            </div>
            <h3 className="mt-4 font-bold text-foreground">Inclusive Culture</h3>
            <p className="mt-2 text-xs text-muted-foreground">
              Safe, modern campus in Al-Rehab district fostering moral character and global citizenship.
            </p>
          </div>
        </div>
      </div>
    </InnerPage>
  )
}
