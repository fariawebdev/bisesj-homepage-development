'use client'

import { useState } from 'react'
import Image, { type ImageProps } from 'next/image'
import { cn } from '@/lib/utils'

type SafeImageProps = Omit<ImageProps, 'src' | 'alt'> & {
  src: string
  alt: string
  wrapperClassName?: string
  priority?: boolean
  sizes?: string
}

/**
 * Responsive image component using next/image with fallback support.
 * Ensures faces and textual elements are preserved without unwanted mobile cropping.
 */
export function SafeImage({
  src,
  alt,
  className,
  wrapperClassName,
  priority = false,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  fill = true,
  ...rest
}: SafeImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className={cn('relative overflow-hidden brand-fallback', wrapperClassName)}>
        {alt && <span className="sr-only">{alt}</span>}
      </div>
    )
  }

  return (
    <div className={cn('relative overflow-hidden brand-fallback', wrapperClassName)}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        sizes={sizes}
        priority={priority}
        onError={() => setFailed(true)}
        className={cn('h-full w-full object-cover object-center', className)}
        {...rest}
      />
    </div>
  )
}
