import { InnerPage } from '@/components/site/inner-page'
import { DocumentCard } from '@/components/site/document-card'

export const metadata = {
  title: 'Academic Calendar 2026-2027 | BISESJ',
  description: 'Term schedules, examinations, and official holidays for academic session 2026-2027 at BISESJ.',
}

export default function AcademicCalendarPage() {
  return (
    <InnerPage
      slug="academic-calendar"
      title="Academic Calendar 2026–2027"
      subtitle="Comprehensive schedule of terms, assessment periods, national holidays, and Cambridge examination windows."
      badge="Term Schedules"
    >
      <div className="space-y-4 pt-4">
        <h2 className="font-serif text-2xl font-bold tracking-tight text-forest border-b border-border/60 pb-2">
          Download Official Calendar
        </h2>
        <DocumentCard
          title="BISESJ Academic Calendar 2026–2027"
          description="Official printable calendar with term dates, Cambridge exam windows, and national observances."
          href="/documents/academic-calendar-2026-2027.pdf"
          fileSize="582 KB"
          format="PDF"
        />
      </div>
    </InnerPage>
  )
}
