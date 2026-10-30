import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const ROUTES = [
  { name: 'Home', path: '/en' },
  { name: 'About Us', path: '/en/about-us' },
  { name: "Chairman's Message", path: '/en/chairmans-message' },
  { name: "Principal's Message", path: '/en/principals-message' },
  { name: 'Admission', path: '/en/admission' },
  { name: 'Academic Calendar', path: '/en/academic-calendar' },
  { name: 'Contact', path: '/en/contact' },
  { name: 'Parent Feedback', path: '/en/parent-feedback' },
  { name: 'Routine', path: '/en/routine' },
  { name: 'Syllabus', path: '/en/syllabus' },
  { name: 'News', path: '/en/news' },
  { name: 'Job Vacancy', path: '/en/job-vacancy' },
  { name: 'Merit Scholarship', path: '/en/merit-scholarship' },
  { name: '20 Years with Cambridge', path: '/en/20-years-with-cambridge' },
  { name: '404', path: '/en/non-existent-page-404' },
]

test.describe('S2-09: Comprehensive Accessibility Audits across all 15 routes (axe-core)', () => {
  for (const route of ROUTES) {
    test(`${route.name} (${route.path}) has zero critical or serious accessibility violations`, async ({ page }) => {
      await page.goto(route.path)

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze()

      const critical = accessibilityScanResults.violations.filter((v) => v.impact === 'critical')
      const serious = accessibilityScanResults.violations.filter((v) => v.impact === 'serious')
      const moderate = accessibilityScanResults.violations.filter((v) => v.impact === 'moderate')
      const minor = accessibilityScanResults.violations.filter((v) => v.impact === 'minor')

      if (moderate.length > 0 || minor.length > 0) {
        console.log(`[A11Y NOTICE] ${route.name} (${route.path}): moderate=${moderate.length}, minor=${minor.length}`)
        for (const v of [...moderate, ...minor]) {
          console.log(`  - [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} occurrences)`)
        }
      }

      expect(critical, `Critical a11y violations found on ${route.name}`).toEqual([])
      expect(serious, `Serious a11y violations found on ${route.name}`).toEqual([])
    })
  }
})
