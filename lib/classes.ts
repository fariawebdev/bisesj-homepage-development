/**
 * One source of truth for all school classes and academic pathway stages at BISESJ.
 *
 * Mandate:
 * - "Grade" and "KG" do not exist.
 * - Levels: Pre-Reception, Reception, Year 1 to Year 10, Year 11 (AS Level), Year 12 (A Level).
 * - Stages: Early Years, Primary, Lower Secondary, Cambridge IGCSE, AS & A Level.
 */

export type StageName =
  | 'Early Years'
  | 'Primary'
  | 'Lower Secondary'
  | 'Cambridge IGCSE'
  | 'AS & A Level'

export interface SchoolClass {
  slug: string
  label: string
  stage: StageName
  order: number
}

export interface PathwayStage {
  name: StageName
  classesLabel: string
  body: string
  classSlugs: string[]
}

export const CLASSES: readonly SchoolClass[] = [
  { slug: 'pre-reception', label: 'Pre-Reception', stage: 'Early Years', order: 1 },
  { slug: 'reception', label: 'Reception', stage: 'Early Years', order: 2 },
  { slug: 'year-1', label: 'Year 1', stage: 'Primary', order: 3 },
  { slug: 'year-2', label: 'Year 2', stage: 'Primary', order: 4 },
  { slug: 'year-3', label: 'Year 3', stage: 'Primary', order: 5 },
  { slug: 'year-4', label: 'Year 4', stage: 'Primary', order: 6 },
  { slug: 'year-5', label: 'Year 5', stage: 'Primary', order: 7 },
  { slug: 'year-6', label: 'Year 6', stage: 'Lower Secondary', order: 8 },
  { slug: 'year-7', label: 'Year 7', stage: 'Lower Secondary', order: 9 },
  { slug: 'year-8', label: 'Year 8', stage: 'Lower Secondary', order: 10 },
  { slug: 'year-9', label: 'Year 9', stage: 'Cambridge IGCSE', order: 11 },
  { slug: 'year-10', label: 'Year 10', stage: 'Cambridge IGCSE', order: 12 },
  { slug: 'year-11', label: 'Year 11 (AS Level)', stage: 'AS & A Level', order: 13 },
  { slug: 'year-12', label: 'Year 12 (A Level)', stage: 'AS & A Level', order: 14 },
] as const

export const PATHWAY_STAGES: readonly PathwayStage[] = [
  {
    name: 'Early Years',
    classesLabel: 'Pre-Reception, Reception',
    body: 'Play-based foundations in language, numeracy and curiosity.',
    classSlugs: ['pre-reception', 'reception'],
  },
  {
    name: 'Primary',
    classesLabel: 'Year 1 to 5',
    body: 'Core literacy, mathematics and science with a strong values base.',
    classSlugs: ['year-1', 'year-2', 'year-3', 'year-4', 'year-5'],
  },
  {
    name: 'Lower Secondary',
    classesLabel: 'Year 6 to 8',
    body: 'Broadening subject knowledge and independent study habits.',
    classSlugs: ['year-6', 'year-7', 'year-8'],
  },
  {
    name: 'Cambridge IGCSE',
    classesLabel: 'Year 9 to 10',
    body: 'Internationally recognised qualifications across a wide subject choice.',
    classSlugs: ['year-9', 'year-10'],
  },
  {
    name: 'AS & A Level',
    classesLabel: 'Year 11 to 12',
    body: 'Specialised, university-ready study accepted worldwide.',
    classSlugs: ['year-11', 'year-12'],
  },
] as const

export function getClassBySlug(slug: string): SchoolClass | undefined {
  return CLASSES.find((c) => c.slug === slug)
}

export function getClassesByStage(stage: StageName): SchoolClass[] {
  return CLASSES.filter((c) => c.stage === stage)
}

export function getAllClassSlugs(): string[] {
  return CLASSES.map((c) => c.slug)
}

export function getAllClassLabels(): string[] {
  return CLASSES.map((c) => c.label)
}
