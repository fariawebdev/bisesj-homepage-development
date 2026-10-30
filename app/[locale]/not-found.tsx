import Link from 'next/link'
import { ArrowLeft, Compass, Home, Mail, UserPlus } from 'lucide-react'
import { SiteHeader } from '@/components/site/header'
import { SiteFooter } from '@/components/site/footer'

export const metadata = {
  title: '404 - Page Not Found | BISESJ',
  description: 'The requested page could not be found.',
}

export default function NotFound() {
  return (
    <>
      <div id="top" />
      <SiteHeader />
      <main id="main" className="min-h-[75vh] flex items-center justify-center bg-background px-6 py-20">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-forest/10 text-forest shadow-soft">
            <Compass aria-hidden="true" className="size-10 text-gold" />
          </div>
          <span className="mt-6 inline-block font-serif text-6xl font-bold tracking-tight text-forest">
            404
          </span>
          <h1 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl">
            Page Not Found
          </h1>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            The page you are looking for might have been moved, renamed, or is temporarily unavailable.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/en"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-forest-deep"
            >
              <Home aria-hidden="true" className="size-4" />
              <span>Home</span>
            </Link>
            <Link
              href="/en/admission"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-primary shadow-soft transition-colors hover:bg-gold-soft"
            >
              <UserPlus aria-hidden="true" className="size-4" />
              <span>Admission</span>
            </Link>
            <Link
              href="/en/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-soft transition-colors hover:bg-muted"
            >
              <Mail aria-hidden="true" className="size-4" />
              <span>Contact</span>
            </Link>
          </div>

          <div className="mt-10">
            <Link
              href="/en"
              className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft aria-hidden="true" className="size-3.5" />
              <span>Back to Bangladesh International School English Section</span>
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
