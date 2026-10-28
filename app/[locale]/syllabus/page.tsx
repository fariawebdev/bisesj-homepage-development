import { InnerPage } from '@/components/site/inner-page'
import { BookOpen, GraduationCap, Layers } from 'lucide-react'

export const metadata = {
  title: 'Syllabus & Curriculum | BISESJ',
  description: 'Cambridge International Curriculum syllabus from Kindergarten to IGCSE and AS/A Levels at BISESJ.',
}

const STAGES = [
  {
    title: 'Kindergarten & Early Years',
    levels: 'KG1 – KG3',
    desc: 'Foundational literacy, numeracy, social skills, and creative play structured around early childhood developmental milestones.',
  },
  {
    title: 'Cambridge Primary',
    levels: 'Grade 1 – Grade 5',
    desc: 'Core English, Mathematics, Science, Social Studies, and Arabic, aligned with Cambridge Primary progression tests.',
  },
  {
    title: 'Cambridge Lower Secondary',
    levels: 'Grade 6 – Grade 8',
    desc: 'Bridging intermediate academics with analytical thinking, laboratory sciences, and Cambridge Checkpoint preparations.',
  },
  {
    title: 'Cambridge Upper Secondary (IGCSE)',
    levels: 'Grade 9 – Grade 10',
    desc: 'Comprehensive Cambridge IGCSE subject selections spanning Sciences, Commerce, Humanities, and ICT.',
  },
  {
    title: 'Cambridge Advanced (AS & A Level)',
    levels: 'Grade 11 – Grade 12',
    desc: 'In-depth pre-university preparation recognized by premier universities and professional colleges globally.',
  },
]

export default function SyllabusPage() {
  return (
    <InnerPage
      title="Syllabus & Curriculum"
      subtitle="Structured British Cambridge curriculum pathways empowering students from early foundational learning through university entrance examinations."
      badge="Academic Structure"
    >
      <div className="space-y-8">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-forest/10 p-3 text-forest shrink-0">
              <BookOpen aria-hidden="true" className="size-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Cambridge Assessment International Education</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Detailed subject syllabi, learning objectives, and recommended textbook lists for each academic level are published at the beginning of each academic session. Downloadable course outlines will be available here.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {STAGES.map((stage) => (
            <div key={stage.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft flex flex-col justify-between">
              <div>
                <span className="inline-block rounded-full bg-forest/10 px-2.5 py-0.5 text-xs font-semibold text-forest">
                  {stage.levels}
                </span>
                <h3 className="mt-3 font-semibold text-foreground text-lg">{stage.title}</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{stage.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </InnerPage>
  )
}
