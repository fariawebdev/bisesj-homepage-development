'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

type SafeImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string
  alt: string
  wrapperClassName?: string
  priority?: boolean
}

/** Lazy-loaded image that falls back to a branded green gradient if the source fails. */
export function SafeImage({ src, alt, className, wrapperClassName, priority, ...rest }: SafeImageProps) {
  const [failed, setFailed] = useState(false)

  return (
    <div className={cn('relative overflow-hidden brand-fallback', wrapperClassName)}>
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onError={() => setFailed(true)}
          className={cn('h-full w-full object-cover', className)}
          {...rest}
        />
      )}
      {failed && alt && <span className="sr-only">{alt}</span>}
    </div>
  )
}
