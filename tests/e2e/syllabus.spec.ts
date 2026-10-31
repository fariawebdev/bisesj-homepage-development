import { test, expect } from '@playwright/test'
import { CLASSES } from '@/lib/classes'
import { getSyllabusIndex } from '@/lib/syllabus'

test.describe('S3-03: Syllabus Pages & Interaction (e2e)', () => {
  test('Syllabus index (/en/syllabus) renders 5 pathway stages and links to all 14 classes', async ({ page }) => {
    await page.goto('/en/syllabus')

    // Page title and headings
    await expect(page.locator('h1')).toContainText('Syllabus & Curriculum')
    await expect(page.getByText('Curriculum by Academic Stage')).toBeVisible()

    // 5 Stages
    const stages = ['Early Years', 'Primary', 'Lower Secondary', 'Cambridge IGCSE', 'AS & A Level']
    for (const stage of stages) {
      await expect(page.locator('h3').filter({ hasText: stage }).first()).toBeVisible()
    }

    // All 14 class links exist
    for (const c of CLASSES) {
      const classLink = page.locator(`a[href="/en/syllabus/${c.slug}"]`).first()
      await expect(classLink).toBeVisible()
    }
  })

  test('Class syllabus page (/en/syllabus/year-6) renders all 14 documents and class switcher', async ({ page }) => {
    await page.goto('/en/syllabus/year-6')

    // Heading
    await expect(page.locator('h1')).toContainText('Year 6 Syllabus')

    // Class switcher
    const switcher = page.locator('nav[aria-label="Class Switcher"]')
    await expect(switcher).toBeVisible()
    const activeChip = switcher.locator('a[aria-current="page"]')
    await expect(activeChip).toContainText('Year 6')

    // 14 document cards
    const documentCards = page.locator('div.grid.gap-4 > div.group')
    await expect(documentCards).toHaveCount(14)

    // Check specific documents
    await expect(page.getByText('Mathematics')).toBeVisible()
    await expect(page.getByText('Science')).toBeVisible()
    await expect(page.getByText('Year 6 Syllabus Overview')).toBeVisible()
  })

  test('Responsive class switching on mobile viewport (360x740) without horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 })
    await page.goto('/en/syllabus/year-10')

    // No horizontal scroll
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth)

    // Mobile select is visible
    const select = page.locator('select#mobile-class-select')
    await expect(select).toBeVisible()
    await expect(select).toHaveValue('year-10')

    // 13 document cards for Year 10
    const documentCards = page.locator('div.grid.gap-4 > div.group')
    await expect(documentCards).toHaveCount(13)
  })

  test('Non-existent class slug (/en/syllabus/unknown-grade) returns 404', async ({ page }) => {
    const res = await page.goto('/en/syllabus/unknown-grade')
    expect(res?.status()).toBe(404)
    await expect(page.locator('body')).toContainText(/404|not found/i)
  })
})
