import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('S2-08: Accessibility Audits (axe-core)', () => {
  test('Home page has zero critical or serious accessibility violations', async ({ page }) => {
    await page.goto('/en')
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    // Filter for serious/critical if needed, or inspect all violations
    const seriousOrCritical = accessibilityScanResults.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    )
    expect(seriousOrCritical).toEqual([])
  })

  test('Admission page has zero critical or serious accessibility violations', async ({ page }) => {
    await page.goto('/en/admission')
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    const seriousOrCritical = accessibilityScanResults.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    )
    expect(seriousOrCritical).toEqual([])
  })

  test('Contact page has zero critical or serious accessibility violations', async ({ page }) => {
    await page.goto('/en/contact')
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    const seriousOrCritical = accessibilityScanResults.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    )
    expect(seriousOrCritical).toEqual([])
  })

  test('Routine page has zero critical or serious accessibility violations', async ({ page }) => {
    await page.goto('/en/routine')
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    const seriousOrCritical = accessibilityScanResults.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    )
    expect(seriousOrCritical).toEqual([])
  })

  test('404 Not Found page has zero critical or serious accessibility violations', async ({ page }) => {
    await page.goto('/en/non-existent-page-for-test')
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    const seriousOrCritical = accessibilityScanResults.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    )
    expect(seriousOrCritical).toEqual([])
  })
})
