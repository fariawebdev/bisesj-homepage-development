'use client'

import { forwardRef } from 'react'
import { LINKS, type LinkKey } from '@/src/links'
import { useLocale } from './i18n'

type SmartLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  to: LinkKey
  /** Human-readable name used to build the accessible label. */
  label: string
}

/**
 * Renders any destination from LINKS. External links always open in a new tab
 * with rel="noopener noreferrer" and an aria-label ending in "(opens in a new tab)".
 */
export const SmartLink = forwardRef<HTMLAnchorElement, SmartLinkProps>(function SmartLink(
  { to, label, children, onClick, ...rest },
  ref,
) {
  const { t } = useLocale()
  const link = LINKS[to]

  if ('internal' in link && link.internal) {
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
