'use client'

import { useEffect, useRef, useState } from 'react'
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import { cn } from '@/lib/utils'

/** Fades and lifts children into view once. Static when reduced motion is preferred. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'li' | 'article'
}) {
  const reduce = useReducedMotion()
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  )
}

/** Gently pulls its child toward the pointer. Used on primary buttons only. */
export function Magnetic({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  return (
    <motion.div
      className={cn('inline-flex', className)}
      style={reduce ? undefined : { x: sx, y: sy }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== 'mouse') return
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * 0.25)
        y.set((e.clientY - (r.top + r.height / 2)) * 0.35)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

/** Counts up from a nearby value when scrolled into view. */
export function CountUp({
  to,
  from,
  suffix = '',
  grouping = true,
}: {
  to: number
  from?: number
  suffix?: string
  grouping?: boolean
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  const start = from ?? 0
  const [value, setValue] = useState(reduce ? to : start)

  useEffect(() => {
    if (!inView || reduce) {
      if (reduce) setValue(to)
      return
    }
    const controls = animate(start, to, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, reduce, start, to])

  const display = grouping ? value.toLocaleString('en-US') : String(value)
  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  )
}
