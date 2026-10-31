import routineData from '@/content/routine-manifest.json'
import { SITE_CONFIG } from '@/lib/site-config'

export type RoutineMode = 'locked' | 'open'

export interface RoutinePeriod {
  periodNumber: number
  startTime: string
  endTime: string
  subject: string
  teacher?: string
  room?: string
}

export interface DayRoutine {
  day: string
  periods: RoutinePeriod[]
}

export interface ClassRoutine {
  slug: string
  label: string
  academicYear: string
  updatedAt?: string
  pdfUrl?: string
  schedule?: DayRoutine[]
}

export interface RoutineManifest {
  academicYear: string
  generatedAt: string
  classes: ClassRoutine[]
}

/**
 * Returns current routine mode ('locked' or 'open').
 * Defaults to 'locked'. Can be overridden by ROUTINE_MODE env var.
 */
export function getRoutineMode(): RoutineMode {
  const envMode = process.env.ROUTINE_MODE
  if (envMode === 'open') return 'open'
  if (envMode === 'locked') return 'locked'
  return (SITE_CONFIG.features.routine as string) === 'open' ? 'open' : 'locked'
}

/**
 * Returns true if routine is restricted to enrolled families.
 */
export function isRoutineLocked(): boolean {
  return getRoutineMode() === 'locked'
}

/**
 * Retrieves routine data for a specific class slug from manifest.
 */
export function getRoutineForClass(
  slug: string,
  customManifest?: RoutineManifest
): ClassRoutine | undefined {
  const data = customManifest ?? (routineData as RoutineManifest)
  return data.classes.find((c) => c.slug === slug)
}
