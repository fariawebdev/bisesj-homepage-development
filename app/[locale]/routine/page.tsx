import { InnerPage } from '@/components/site/inner-page'
import { Clock, CalendarCheck, BookOpen } from 'lucide-react'

export const metadata = {
  title: 'Class Routine & Schedules | BISESJ',
  description: 'Daily class routine, periods, and section timetables at BISESJ.',
}

export default function RoutinePage() {
  return (
    <InnerPage
      title="Class Routine & Schedules"
      subtitle="Timetables, daily bell schedules, and class routines for all academic sections."
      badge="School Operations"
    >
      <div className="space-y-8">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-forest/10 p-3 text-forest shrink-0">
              <Clock aria-hidden="true" className="size-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Term Routine Overview</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Class routines and period allocations are formulated at the commencement of each term to optimize student engagement, science lab schedules, and physical education.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-forest/5 px-4 py-2 text-xs font-semibold text-forest">
                <CalendarCheck aria-hidden="true" className="size-4" />
                <span>Daily Assembly: 7:15 AM · Regular Classes Conclude: 1:30 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-dashed border-border bg-card/40 p-8 text-center">
          <BookOpen aria-hidden="true" className="mx-auto size-10 text-muted-foreground/60" />
          <h3 className="mt-4 text-base font-semibold text-foreground">Section Timetables</h3>
          <p className="mt-1 text-sm text-muted-foreground max-w-md mx-auto">
            Individual class and section timetable PDFs for the current academic session will be downloadable from this page.
          </p>
        </div>
      </div>
    </InnerPage>
  )
}
