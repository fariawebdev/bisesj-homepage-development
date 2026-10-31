import Link from 'next/link'
import { InnerPage } from '@/components/site/inner-page'
import { PATHWAY_STAGES, getClassBySlug } from '@/lib/classes'
import { getSyllabusIndex } from '@/lib/syllabus'
import { BookOpen, ChevronRight, GraduationCap } from 'lucide-react'

export const metadata = {
  title: 'Syllabus & Curriculum | BISESJ',
  description:
    'Cambridge International Curriculum syllabus from Early Years to IGCSE and AS/A Levels at BISESJ for Academic Session 2026–27.',
}

export default async function SyllabusIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const index = getSyllabusIndex()

  return (
    <InnerPage
      slug="syllabus"
      title="Syllabus & Curriculum"
      subtitle="Complete Cambridge International Curriculum syllabus, course outlines, and subject guides for Academic Session 2026–27."
      badge="Academic Session 2026–27"
    >
      <div className="space-y-10">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-forest/10 p-3 text-forest shrink-0">
              <BookOpen aria-hidden="true" className="size-8 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Cambridge Assessment International Education
              </h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Detailed subject syllabi, learning objectives, and curriculum guidelines across all 14 class levels ({index.totalFiles} downloadable course documents). Select your class below to view or download subject syllabi.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground">Curriculum by Academic Stage</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Explore syllabus documents organized across our five academic pathway stages.
          </p>

          <div className="mt-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {PATHWAY_STAGES.map((stage) => (
              <div
                key={stage.name}
                className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-block rounded-full bg-forest/10 px-3 py-1 text-xs font-semibold text-forest">
                      {stage.classesLabel}
                    </span>
                    <GraduationCap aria-hidden="true" className="size-5 text-gold" />
                  </div>
                  <h3 className="mt-3 font-serif text-lg font-bold text-foreground">{stage.name}</h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{stage.body}</p>
                </div>

                <div className="mt-6 border-t border-border/70 pt-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Classes in this Stage
                  </h4>
                  <div className="flex flex-col gap-2">
                    {stage.classSlugs.map((classSlug) => {
                      const c = getClassBySlug(classSlug)
                      if (!c) return null
                      const syllabusClass = index.classes.find((sc) => sc.slug === classSlug)
                      const count = syllabusClass ? syllabusClass.totalFiles : 0

                      return (
                        <Link
                          key={classSlug}
                          href={`/${locale}/syllabus/${classSlug}`}
                          className="group flex min-h-[44px] items-center justify-between rounded-lg border border-border bg-background px-3.5 py-2 text-sm font-medium text-foreground hover:border-gold hover:bg-forest/5 focus-visible:outline-2 focus-visible:outline-gold transition-colors"
                        >
                          <span className="group-hover:text-primary transition-colors">{c.label}</span>
                          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <span>{count} {count === 1 ? 'file' : 'files'}</span>
                            <ChevronRight
                              aria-hidden="true"
                              className="size-4 text-muted-foreground group-hover:translate-x-0.5 group-hover:text-primary transition-all rtl:rotate-180"
                            />
                          </span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </InnerPage>
  )
}
