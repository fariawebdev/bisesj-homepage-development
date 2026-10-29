import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Home } from 'lucide-react'
import { SiteHeader } from './header'
import { SiteFooter, FloatingActions } from './footer'
import { MarkdownRenderer, getPageMarkdown } from '@/lib/markdown'

type InnerPageProps = {
  title: string
  subtitle: string
  badge?: string
  slug?: string
  markdown?: string
  children?: React.ReactNode
}

export function InnerPage({
  title,
  subtitle,
  badge = 'BISESJ Information',
  slug,
  markdown,
  children,
}: InnerPageProps) {
  const content = markdown ?? (slug ? getPageMarkdown(slug) : '')

  return (
    <>
      <div id="top" />
      <SiteHeader />
      <main id="main" className="min-h-screen bg-background">
        <section className="border-b border-border bg-card/60 px-6 py-12 md:py-16">
          <div className="mx-auto max-w-5xl">
            <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
              <Link href="/" className="inline-flex items-center gap-1 hover:text-primary transition-colors">
                <Home aria-hidden="true" className="size-3.5" />
                <span>Home</span>
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium">{title}</span>
            </nav>

            <span className="inline-block rounded-full bg-forest/10 px-3 py-1 text-xs font-semibold text-forest">
              {badge}
            </span>
            <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight text-forest sm:text-4xl md:text-5xl">
              {title}
            </h1>
            <p className="mt-3 max-w-3xl text-base text-muted-foreground sm:text-lg">
              {subtitle}
            </p>
          </div>
        </section>

        <section className="px-6 py-12 md:py-16">
          <div className="mx-auto max-w-5xl space-y-8">
            {content ? <MarkdownRenderer content={content} /> : null}
            {children}

            <div className="mt-12 border-t border-border pt-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:text-forest-deep transition-colors"
              >
                <ArrowLeft aria-hidden="true" className="size-4" />
                <span>Return to Home</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <FloatingActions />
    </>
  )
}
