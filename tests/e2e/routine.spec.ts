import { test, expect } from '@playwright/test'
import { CLASSES } from '@/lib/classes'

test.describe('S3-04: Routine Locked State & Interaction (e2e)', () => {
  test('Routine index (/en/routine) is locked and shows disabled class buttons', async ({ page }) => {
    await page.goto('/en/routine')

    // Headings and locked notice
    await expect(page.locator('h1')).toContainText('Class Routine & Timetables')
    await expect(page.getByText('Routine Currently Restricted')).toBeVisible()

    // 14 disabled class buttons
    for (const c of CLASSES) {
      const btn = page.getByRole('button', { name: c.label, exact: true })
      await expect(btn).toBeVisible()
      await expect(btn).toBeDisabled()
    }

    // Contact actions within page body
    const main = page.locator('#main')
    await expect(main.getByRole('link', { name: /Contact School Office/i })).toBeVisible()
    await expect(main.getByRole('link', { name: /Email/i })).toBeVisible()
  })

  test('Class routine page (/en/routine/year-7) displays locked message and restricted badges', async ({ page }) => {
    await page.goto('/en/routine/year-7')

    // Heading
    await expect(page.locator('h1')).toContainText('Year 7 Routine & Timetable')
    await expect(page.getByText('Year 7 Schedule Restricted')).toBeVisible()

    // Enrolled families notice
    await expect(
      page.getByText(/The school routine is published to enrolled families at the start of each term/i)
    ).toBeVisible()

    // Contact actions within page body
    const main = page.locator('#main')
    await expect(main.getByRole('link', { name: /Contact School Office/i })).toBeVisible()
    await expect(main.getByRole('link', { name: /Email/i })).toBeVisible()
  })

  test('Non-existent class slug (/en/routine/unknown-slug) returns 404', async ({ page }) => {
    const res = await page.goto('/en/routine/unknown-slug')
    expect(res?.status()).toBe(404)
    await expect(page.locator('body')).toContainText(/404|not found/i)
  })

  test('Responsive display on 360x740 mobile viewport without horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 })
    await page.goto('/en/routine/year-11')

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth)

    await expect(page.locator('h1')).toBeVisible()
    await expect(page.getByText('Year 11 (AS Level) Schedule Restricted')).toBeVisible()
  })
})
