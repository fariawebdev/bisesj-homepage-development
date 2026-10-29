import { InnerPage } from '@/components/site/inner-page'

export const metadata = {
  title: 'Admission 2026-2027 | BISESJ',
  description: 'Admission procedures, age criteria, entrance evaluations, and enrollment guidelines for academic year 2026-2027 at BISESJ.',
}

export default function AdmissionPage() {
  return (
    <InnerPage
      slug="admission"
      title="New Admission 2026–2027"
      subtitle="Welcome to the BISESJ family. Discover our admission requirements, age criteria, and entrance evaluation process."
      badge="Admissions & Enrollment"
    />
  )
}
