'use client'

import { useState } from 'react'
import { Download, FileText, AlertCircle, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

export type DocumentCardProps = {
  title: string
  description?: string
  href: string
  fileSize?: string
  format?: string
  className?: string
}

export function DocumentCard({
  title,
  description,
  href,
  fileSize = 'PDF',
  format = 'PDF',
  className,
}: DocumentCardProps) {
  const [isMissing, setIsMissing] = useState(false)

  const handleDownloadClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    try {
      const res = await fetch(href, { method: 'HEAD' })
      if (!res.ok && res.status === 404) {
        e.preventDefault()
        setIsMissing(true)
      }
    } catch {
      // If network inspection is blocked or client is offline, allow normal navigation
    }
  }

  if (isMissing) {
    return (
      <div
        role="alert"
        className={cn(
          'flex flex-col gap-2 rounded-2xl border border-destructive/20 bg-destructive/5 p-5',
          className,
        )}
      >
        <div className="flex items-center gap-3">
          <AlertCircle aria-hidden="true" className="size-5 text-destructive" />
          <h3 className="font-serif text-base font-semibold text-foreground">{title}</h3>
        </div>
        <p className="text-xs text-muted-foreground">
          This document is temporarily unavailable. Please contact the school office.
        </p>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'group flex flex-col justify-between gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:border-gold/50 hover:shadow-lift sm:flex-row sm:items-center',
        className,
      )}
    >
      <div className="flex items-start gap-3.5">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <FileText aria-hidden="true" className="size-5 text-gold" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-serif text-base font-semibold text-foreground">{title}</h3>
            <div className="flex items-center gap-1.5">
              <span className="rounded-md bg-gold/15 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-primary">
                {format}
              </span>
              {fileSize && (
                <span className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                  {fileSize}
                </span>
              )}
            </div>
          </div>
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleDownloadClick}
        aria-label={`Download ${title} (${format}, ${fileSize}) (opens in a new tab)`}
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-xs transition-colors hover:bg-forest-deep focus-visible:outline-2 focus-visible:outline-gold sm:self-center"
      >
        <Download aria-hidden="true" className="size-3.5 text-gold" />
        <span>Download</span>
        <ExternalLink aria-hidden="true" className="size-3 opacity-60" />
      </a>
    </div>
  )
}
