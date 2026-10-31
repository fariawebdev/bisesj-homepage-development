import manifestData from '@/content/syllabus-manifest.json'

export interface SyllabusItem {
  subjectSlug: string
  subjectCode: string
  displayName: string
  fileName: string
  url: string
  fileSizeBytes: number
  fileSizeFormatted: string
  flag: string | null
}

export interface SyllabusClass {
  slug: string
  name: string
  stage: string
  academicYear: string
  totalFiles: number
  items: SyllabusItem[]
}

export interface SyllabusManifest {
  academicYear: string
  generatedAt: string
  totalClasses: number
  totalFiles: number
  classes: SyllabusClass[]
}

const manifest = manifestData as SyllabusManifest

/** Returns the entire syllabus manifest metadata */
export function getSyllabusIndex(): SyllabusManifest {
  return manifest
}

/** Returns all syllabus classes list */
export function getAllSyllabusClasses(): SyllabusClass[] {
  return manifest.classes
}

/** Returns the syllabus details and file list for a specific class slug */
export function getSyllabusForClass(slug: string): SyllabusClass | undefined {
  return manifest.classes.find((c) => c.slug === slug)
}
