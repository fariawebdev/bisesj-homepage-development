import { InnerPage } from '@/components/site/inner-page'
import { Bell, Calendar, Tag, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'School News & Notices | BISESJ',
  description: 'Latest school news, official circulars, examination notices, and event highlights from BISESJ.',
}

const NOTICES = [
  {
    title: 'Admissions Open for Academic Year 2026-27',
    date: 'February 2026',
    category: 'Admissions',
    summary: 'Prospective students and parents are invited to apply for early enrollment from Pre-Reception to Year 12 (A Level).',
    href: '/admission',
  },
  {
    title: 'Merit Scholarship for Regular IGCSE Students Announced',
    date: 'January 2026',
    category: 'Scholarship',
    summary: 'Recognizing academic excellence and dedication among continuing students pursuing Cambridge IGCSE.',
    href: '/merit-scholarship',
  },
  {
    title: 'Academic Calendar 2026-2027 Published',
    date: 'January 2026',
    category: 'Academic',
    summary: 'The complete term schedule, examination dates, and official holidays have been confirmed.',
    href: '/academic-calendar',
  },
]

export default function NewsPage() {
  return (
    <InnerPage
      title="News & Notices"
      subtitle="Stay informed with official circulars, academic notices, event summaries, and community announcements."
      badge="School Updates"
    >
      <div className="space-y-6">
        {NOTICES.map((notice) => (
          <div
            key={notice.title}
            className="rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:border-gold/50 sm:p-8"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1 font-semibold text-forest">
                    <Tag aria-hidden="true" className="size-3.5" />
                    {notice.category}
                  </span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar aria-hidden="true" className="size-3.5" />
                    {notice.date}
                  </span>
                </div>
                <h2 className="mt-2 text-xl font-bold text-foreground">
                  {notice.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {notice.summary}
                </p>
              </div>

              <Link
                href={notice.href}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-forest/20 bg-forest/5 px-4 py-2 text-xs font-semibold text-forest hover:bg-forest/10 transition-colors"
              >
                <span>Read More</span>
                <ArrowRight aria-hidden="true" className="size-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </InnerPage>
  )
}
