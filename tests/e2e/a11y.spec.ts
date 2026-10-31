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

test.describe('S2-09 & S2-10 & S3-03: Comprehensive Accessibility Audits across all 15 routes (axe-core)', () => {
  for (const route of ROUTES) {
    test(`${route.name} (${route.path}) has zero accessibility violations (critical, serious, moderate, minor)`, async ({
      page,
    }) => {
      // Ensure reduced motion is preferred so entrance animations settle immediately into final static styles
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto(route.path)
      await page.waitForTimeout(500)

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze()

      const critical = accessibilityScanResults.violations.filter((v) => v.impact === 'critical')
      const serious = accessibilityScanResults.violations.filter((v) => v.impact === 'serious')
      const moderate = accessibilityScanResults.violations.filter((v) => v.impact === 'moderate')
      const minor = accessibilityScanResults.violations.filter((v) => v.impact === 'minor')

      console.log(
        `[AXE RESULTS] ${route.name.padEnd(25)} critical=${critical.length} serious=${serious.length} moderate=${moderate.length} minor=${minor.length} total=${accessibilityScanResults.violations.length}`
      )

      if (accessibilityScanResults.violations.length > 0) {
        for (const v of accessibilityScanResults.violations) {
          console.log(`  -> [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} nodes)`)
        }
      }

      // Assert zero violations at ANY impact level (critical, serious, moderate, minor)
      expect(
        accessibilityScanResults.violations,
        `Accessibility violations found on ${route.name}: ${JSON.stringify(
          accessibilityScanResults.violations.map((v) => ({
            id: v.id,
            impact: v.impact,
            help: v.help,
            nodes: v.nodes.length,
          }))
        )}`
      ).toEqual([])
    })
  }
})
