import { InnerPage } from '@/components/site/inner-page'
import { Award, CheckCircle, GraduationCap } from 'lucide-react'

export const metadata = {
  title: 'Merit Scholarship for Regular IGCSE Students | BISESJ',
  description: 'Merit scholarship program recognizing academic excellence among regular IGCSE students at BISESJ.',
}

export default function MeritScholarshipPage() {
  return (
    <InnerPage
      title="Merit Scholarship for Regular IGCSE Students"
      subtitle="Encouraging and rewarding academic diligence, scholastic achievement, and exemplary conduct."
      badge="Student Honors"
    >
      <div className="space-y-8">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-forest/10 p-3 text-forest shrink-0">
              <Award aria-hidden="true" className="size-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Scholarship Overview</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                The Board of Directors and School Management have instituted a prestigious Merit Scholarship initiative dedicated to regular students enrolled in the Cambridge IGCSE program who maintain outstanding GPA marks and attendance records.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="rounded-xl bg-forest/10 p-3 text-forest w-fit">
              <GraduationCap aria-hidden="true" className="size-6" />
            </div>
            <h3 className="mt-4 font-bold text-foreground">Eligibility</h3>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Open to full-time registered BISESJ students enrolled in Year 9 and Year 10 IGCSE courses with consistent performance.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="rounded-xl bg-forest/10 p-3 text-forest w-fit">
              <CheckCircle aria-hidden="true" className="size-6" />
            </div>
            <h3 className="mt-4 font-bold text-foreground">Evaluation Criteria</h3>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Based on term examination averages, mock examination scores, teacher assessments, and disciplinary records.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="rounded-xl bg-forest/10 p-3 text-forest w-fit">
              <Award aria-hidden="true" className="size-6" />
            </div>
            <h3 className="mt-4 font-bold text-foreground">Tuition Fee Waivers</h3>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Recipients are awarded formal certificates of honor and percentage waivers against term tuition fees.
            </p>
          </div>
        </div>
      </div>
    </InnerPage>
  )
}
