'use client'

import { forwardRef } from 'react'
import Link from 'next/link'
import { LINKS, type LinkKey } from '@/lib/links'
import { useLocale } from './i18n'

type SmartLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  to: LinkKey
  /** Human-readable name used to build the accessible label. */
  label: string
}

/**
 * Renders any destination from LINKS. External links always open in a new tab
 * with rel="noopener noreferrer" and an aria-label ending in "(opens in a new tab)".
 * Internal routes use Next.js <Link> with locale prefixing.
 */
export const SmartLink = forwardRef<HTMLAnchorElement, SmartLinkProps>(function SmartLink(
  { to, label, children, onClick, ...rest },
  ref,
) {
  const { t, locale } = useLocale()
  const link = LINKS[to]

  if ('internal' in link && link.internal) {
    const isHash = link.href.startsWith('#')
    const isDoc = link.href.startsWith('/documents/')

    if (!isHash && !isDoc) {
      const localePath = `/${locale}${link.href}`
      return (
        <Link
          ref={ref}
          href={localePath}
          aria-label={label}
          onClick={onClick}
          {...rest}
        >
          {children}
        </Link>
      )
    }

    return (
      <a
        ref={ref}
        href={link.href}
        aria-label={label}
        onClick={(e) => {
          if (to === 'home') {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }
          onClick?.(e)
        }}
        {...rest}
      >
        {children}
      </a>
    )
  }

  return (
    <a
      ref={ref}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} ${t.newTab}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </a>
  )
})
