import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SiteHeader } from '@/components/site/header'
import { SiteFooter, FloatingActions } from '@/components/site/footer'
import { ClassSwitcher } from '@/components/site/class-switcher'
import { DocumentCard } from '@/components/site/document-card'
import { CLASSES, getClassBySlug } from '@/lib/classes'
import { getSyllabusForClass } from '@/lib/syllabus'
import { SUPPORTED_LOCALES } from '@/lib/i18n'
import { ArrowLeft, BookOpen, Download, Home } from 'lucide-react'

interface PageProps {
  params: Promise<{
    locale: string
    class: string
  }>
}

export async function generateStaticParams() {
  const params: { locale: string; class: string }[] = []
  for (const locale of SUPPORTED_LOCALES) {
    for (const c of CLASSES) {
      params.push({
        locale,
        class: c.slug,
      })
    }
  }
  return params
}

export async function generateMetadata({ params }: PageProps) {
  const { class: classSlug } = await params
  const classInfo = getClassBySlug(classSlug)
  if (!classInfo) {
    return { title: 'Class Not Found | BISESJ' }
  }

  return {
    title: `${classInfo.label} Syllabus | BISESJ`,
    description: `Official Cambridge Curriculum syllabus and course outlines for ${classInfo.label} (${classInfo.stage}) at Bangladesh International School English Section, Jeddah for Academic Session 2026–27.`,
  }
}

export default async function SyllabusClassPage({ params }: PageProps) {
  const { locale, class: classSlug } = await params

  const classInfo = getClassBySlug(classSlug)
  const syllabusData = getSyllabusForClass(classSlug)

  if (!classInfo || !syllabusData) {
    notFound()
  }

  return (
    <>
      <div id="top" />
      <SiteHeader />
      <main id="main" className="min-h-screen bg-background">
        {/* Header / Hero Section */}
        <section className="border-b border-border bg-card/60 px-5 py-10 md:px-6 md:py-14">
          <div className="mx-auto max-w-5xl">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <Link href={`/${locale}`} className="inline-flex items-center gap-1 hover:text-primary transition-colors">
                <Home aria-hidden="true" className="size-3.5" />
                <span>Home</span>
              </Link>
              <span>/</span>
              <Link href={`/${locale}/syllabus`} className="hover:text-primary transition-colors">
                <span>Syllabus</span>
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium">{classInfo.label}</span>
            </nav>

            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-block rounded-full bg-forest/10 px-3 py-1 text-xs font-semibold text-forest">
                {classInfo.stage}
              </span>
              <span className="inline-block rounded-full bg-gold/15 px-3 py-1 text-xs font-bold text-primary uppercase tracking-wider">
                Session {syllabusData.academicYear}
              </span>
              <span className="text-xs text-muted-foreground">
                · {syllabusData.totalFiles} {syllabusData.totalFiles === 1 ? 'document' : 'documents'}
              </span>
            </div>

            <h1 className="mt-4 font-serif text-3xl font-bold tracking-tight text-forest sm:text-4xl md:text-5xl">
              {classInfo.label} Syllabus
            </h1>
            <p className="mt-3 max-w-3xl text-base text-muted-foreground sm:text-lg">
              Official Cambridge Assessment International Education curriculum outlines and subject specifications for {classInfo.label}.
            </p>

            {/* Class Switcher */}
            <div className="mt-8 pt-6 border-t border-border">
              <ClassSwitcher currentSlug={classSlug} locale={locale} basePath="syllabus" />
            </div>
          </div>
        </section>

        {/* Syllabus Document List */}
        <section className="px-5 py-10 md:px-6 md:py-14">
          <div className="mx-auto max-w-5xl space-y-6">
            <div className="flex items-center justify-between border-b border-border/70 pb-4">
              <div>
                <h2 className="text-xl font-serif font-bold text-foreground">
                  Available Course Syllabi
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Direct PDF downloads · Valid for Academic Year {syllabusData.academicYear}
                </p>
              </div>
              <span className="text-xs font-medium text-muted-foreground hidden sm:inline">
                {syllabusData.totalFiles} {syllabusData.totalFiles === 1 ? 'subject' : 'subjects'}
              </span>
            </div>

            {/* Document Cards */}
            <div className="grid gap-4">
              {syllabusData.items.map((item) => (
                <DocumentCard
                  key={item.subjectSlug}
                  title={item.displayName}
                  description={`${classInfo.label} · Academic Session ${syllabusData.academicYear}`}
                  href={item.url}
                  fileSize={item.fileSizeFormatted}
                  format="PDF"
                  tag={item.subjectCode}
                  flag={item.flag}
                />
              ))}
            </div>

            {/* Back to all stages button */}
            <div className="mt-12 border-t border-border pt-8 flex items-center justify-between">
              <Link
                href={`/${locale}/syllabus`}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground shadow-xs transition-colors hover:border-gold hover:bg-muted focus-visible:outline-2 focus-visible:outline-gold"
              >
                <ArrowLeft aria-hidden="true" className="size-4 rtl:rotate-180" />
                <span>All Academic Stages</span>
              </Link>

              <a
                href="#top"
                className="text-xs text-muted-foreground hover:text-primary transition-colors min-h-[44px] inline-flex items-center"
              >
                Back to top ↑
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <FloatingActions />
    </>
  )
}
