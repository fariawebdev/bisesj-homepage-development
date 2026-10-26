import { InnerPage } from '@/components/site/inner-page'
import { Calendar, Download, ExternalLink, FileText } from 'lucide-react'

export const metadata = {
  title: 'Academic Calendar | BISESJ',
  description: 'BISESJ Academic Calendar for 2026-2027 term dates, holidays, and examination schedules.',
}

export default function AcademicCalendarPage() {
  const calendarPdf = '/documents/academic-calendar-2026-2027.pdf'

  return (
    <InnerPage
      title="Academic Calendar"
      subtitle="Academic Year 2026-2027 schedule, term dates, examination periods, and official school holidays."
      badge="School Schedule"
    >
      <div className="space-y-8">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-forest/10 p-3 text-forest">
                <Calendar aria-hidden="true" className="size-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  Academic Calendar 2026-2027
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Official PDF publication covering all terms, holidays, and Cambridge exam milestones.
                </p>
                <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <FileText aria-hidden="true" className="size-3.5" /> PDF Document
                  </span>
                  <span>·</span>
                  <span>Academic Year 2026-27</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={calendarPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-forest/5 px-5 py-2.5 text-sm font-semibold text-forest hover:bg-forest/10 transition-colors"
              >
                <ExternalLink aria-hidden="true" className="size-4" />
                <span>View PDF</span>
              </a>
              <a
                href={calendarPdf}
                download="academic-calendar-2026-2027.pdf"
                className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft hover:bg-forest-deep transition-colors"
              >
                <Download aria-hidden="true" className="size-4" />
                <span>Download PDF</span>
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card/40 p-6 sm:p-8">
          <h3 className="text-lg font-bold text-foreground">Term Breakdown & Key Dates</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Please refer to the official calendar document above for all start and end dates of terms, mid-term breaks, national holidays of the Kingdom of Saudi Arabia, and Bangladesh National Days observed by BISESJ.
          </p>
        </div>
      </div>
    </InnerPage>
  )
}
