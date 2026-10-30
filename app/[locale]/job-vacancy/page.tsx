import { InnerPage } from '@/components/site/inner-page'
import { Briefcase, Mail, CheckCircle2 } from 'lucide-react'
import { CONTACT } from '@/lib/links'

export const metadata = {
  title: 'Job Vacancies & Careers | BISESJ',
  description: 'Career opportunities, teaching positions, and staff vacancies at BISESJ in Jeddah.',
}

export default function JobVacancyPage() {
  return (
    <InnerPage
      title="Job Vacancies & Careers"
      subtitle="Join a dedicated team of educators and administrative professionals shaping tomorrow's leaders."
      badge="Work with Us"
    >
      <div className="space-y-8">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-forest/10 p-3 text-forest shrink-0">
              <Briefcase aria-hidden="true" className="size-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Why Teach at BISESJ?</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                We offer a supportive international school environment, competitive compensation, continuous Cambridge professional development, and an opportunity to work with motivated students in Jeddah.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card/60 p-6 sm:p-8">
          <h3 className="text-lg font-bold text-foreground">How to Apply</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Interested candidates holding relevant qualifications and Cambridge curriculum teaching experience should submit an updated CV and cover letter to our administration:
          </p>

          <div className="mt-4 inline-flex items-center gap-3 rounded-full bg-card px-5 py-3 border border-border shadow-soft">
            <Mail aria-hidden="true" className="size-5 text-gold" />
            <span className="text-sm font-semibold text-foreground">{CONTACT.email}</span>
          </div>

          <div className="mt-6 space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 aria-hidden="true" className="size-4 text-forest" />
              <span>Bachelor&apos;s or Master&apos;s degree in subject area required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 aria-hidden="true" className="size-4 text-forest" />
              <span>Prior experience with Cambridge IGCSE or A Level curriculum preferred</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 aria-hidden="true" className="size-4 text-forest" />
              <span>Transferable Iqama in Saudi Arabia is preferred</span>
            </div>
          </div>
        </div>
      </div>
    </InnerPage>
  )
}
