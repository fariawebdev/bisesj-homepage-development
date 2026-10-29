import { InnerPage } from '@/components/site/inner-page'

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
    />
  )
}
