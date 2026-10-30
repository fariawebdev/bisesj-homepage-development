import { InnerPage } from '@/components/site/inner-page'
import { DocumentCard } from '@/components/site/document-card'

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
    >
      <div className="space-y-4 pt-4">
        <h2 className="font-serif text-2xl font-bold tracking-tight text-forest border-b border-border/60 pb-2">
          Official Admission & Fee Documents
        </h2>
        <div className="grid grid-cols-1 gap-4">
          <DocumentCard
            title="Admission Test for Newcomers 2026–27"
            description="Official syllabus, test dates, subjects, and scoring criteria for newcomer evaluations."
            href="/documents/admission-test-for-newcomers-2026-27.pdf"
            fileSize="1.63 MB"
            format="PDF"
          />
          <DocumentCard
            title="Tuition Fee Structure (Bangladeshi Students) 2026–2027"
            description="Complete fee schedule and payment terms for regular Bangladeshi community students."
            href="/documents/tuition-fee-structure-bangladeshi-2026-2027.pdf"
            fileSize="55 KB"
            format="PDF"
          />
          <DocumentCard
            title="Tuition Fee Structure (Foreigner Students) 2026–2027"
            description="Complete fee schedule and admission charges for international student enrollment."
            href="/documents/tuition-fee-structure-foreigner-2026-2027.pdf"
            fileSize="53 KB"
            format="PDF"
          />
        </div>
      </div>
    </InnerPage>
  )
}
