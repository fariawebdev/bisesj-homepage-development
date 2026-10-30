import { describe, it, expect } from 'vitest'
import {
  CLASSES,
  PATHWAY_STAGES,
  getClassBySlug,
  getClassesByStage,
  getAllClassSlugs,
  getAllClassLabels,
  type SchoolClass,
} from '@/lib/classes'
import { PATHWAY, ENQUIRY } from '@/lib/content'

describe('Classes and Pathway Foundation (S2-02)', () => {
  it('defines the exact 14 levels with correct slugs, labels, stages, and order', () => {
    expect(CLASSES).toHaveLength(14)

    const expectedSlugs = [
      'pre-reception',
      'reception',
      'year-1',
      'year-2',
      'year-3',
      'year-4',
      'year-5',
      'year-6',
      'year-7',
      'year-8',
      'year-9',
      'year-10',
      'year-11',
      'year-12',
    ]

    expect(getAllClassSlugs()).toEqual(expectedSlugs)

    // Verify sort orders are contiguous from 1 to 14
    CLASSES.forEach((c, index) => {
      expect(c.order).toBe(index + 1)
    })

    // Special label requirements
    const y11 = getClassBySlug('year-11')
    expect(y11?.label).toBe('Year 11 (AS Level)')

    const y12 = getClassBySlug('year-12')
    expect(y12?.label).toBe('Year 12 (A Level)')
  })

  it('maps every class to its designated academic stage', () => {
    // Early Years: Pre-Reception, Reception
    const earlyYears = getClassesByStage('Early Years')
    expect(earlyYears.map((c) => c.slug)).toEqual(['pre-reception', 'reception'])

    // Primary: Year 1 to 5
    const primary = getClassesByStage('Primary')
    expect(primary.map((c) => c.slug)).toEqual(['year-1', 'year-2', 'year-3', 'year-4', 'year-5'])

    // Lower Secondary: Year 6 to 8
    const lowerSec = getClassesByStage('Lower Secondary')
    expect(lowerSec.map((c) => c.slug)).toEqual(['year-6', 'year-7', 'year-8'])

    // Cambridge IGCSE: Year 9 to 10
    const igcse = getClassesByStage('Cambridge IGCSE')
    expect(igcse.map((c) => c.slug)).toEqual(['year-9', 'year-10'])

    // AS & A Level: Year 11 to 12
    const advanced = getClassesByStage('AS & A Level')
    expect(advanced.map((c) => c.slug)).toEqual(['year-11', 'year-12'])
  })

  it('configures pathway stages correctly with matching classesLabel', () => {
    expect(PATHWAY_STAGES).toHaveLength(5)
    expect(PATHWAY_STAGES[0].name).toBe('Early Years')
    expect(PATHWAY_STAGES[0].classesLabel).toBe('Pre-Reception, Reception')

    expect(PATHWAY_STAGES[1].name).toBe('Primary')
    expect(PATHWAY_STAGES[1].classesLabel).toBe('Year 1 to 5')

    expect(PATHWAY_STAGES[2].name).toBe('Lower Secondary')
    expect(PATHWAY_STAGES[2].classesLabel).toBe('Year 6 to 8')

    expect(PATHWAY_STAGES[3].name).toBe('Cambridge IGCSE')
    expect(PATHWAY_STAGES[3].classesLabel).toBe('Year 9 to 10')

    expect(PATHWAY_STAGES[4].name).toBe('AS & A Level')
    expect(PATHWAY_STAGES[4].classesLabel).toBe('Year 11 to 12')
  })

  it('ensures "Grade" and "KG" do not appear anywhere in classes, pathway, or enquiry definitions', () => {
    const serializedClasses = JSON.stringify(CLASSES)
    const serializedPathway = JSON.stringify(PATHWAY)
    const serializedEnquiry = JSON.stringify(ENQUIRY)
    const serializedPathwayStages = JSON.stringify(PATHWAY_STAGES)

    const fullBlob = `${serializedClasses} ${serializedPathway} ${serializedEnquiry} ${serializedPathwayStages}`

    // Case-insensitive check for "grade"
    expect(fullBlob.toLowerCase()).not.toContain('grade')

    // Standalone check for "KG"
    expect(fullBlob).not.toMatch(/\bKG\b/)
    expect(fullBlob).not.toContain('KG1')
    expect(fullBlob).not.toContain('KG2')
    expect(fullBlob).not.toContain('KG3')
  })
})
