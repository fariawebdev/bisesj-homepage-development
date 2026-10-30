import { test, expect } from '@playwright/test'
import { SITE_CONFIG } from '../../lib/site-config'

test.describe('S1-11 & S2-10: Trust stats static values and permanence', () => {
  test('reads every stat value at load, again after scrolling into view, and again after 2 seconds, asserting strings never change', async ({
    page,
  }) => {
    await page.goto('/en')

    const statsSection = page.locator('section[aria-label="BISESJ at a glance"]')
    await expect(statsSection).toBeVisible()

    // Helper to read all stat values currently rendered
    const readAllStats = async () => {
      const results: Record<string, string> = {}
      for (const stat of SITE_CONFIG.stats) {
        const item = statsSection.locator('dl > div, dl > Comp').filter({ hasText: stat.label })
        const val = (await item.locator('dd').textContent())?.trim() ?? ''
        results[stat.label] = val
      }
      return results
    }

    // 1. Read at initial page load
    const initialStats = await readAllStats()

    // Assert initial values match SITE_CONFIG exactly (static from first paint)
    for (const stat of SITE_CONFIG.stats) {
      expect(initialStats[stat.label]).toBe(stat.displayValue)
    }

    // 2. Scroll the stats section into view
    await statsSection.evaluate((el) => el.scrollIntoView({ behavior: 'instant', block: 'center' }))
    await page.waitForTimeout(300)
    const scrolledStats = await readAllStats()

    // Assert values remain identical after scrolling
    expect(scrolledStats).toEqual(initialStats)

    // 3. Wait 2 full seconds
    await page.waitForTimeout(2000)
    const afterTwoSecondsStats = await readAllStats()

    // Assert values never changed over time
    expect(afterTwoSecondsStats).toEqual(initialStats)
  })

  test('displays exact final values with reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/en')

    const statsSection = page.locator('section[aria-label="BISESJ at a glance"]')
    await expect(statsSection).toBeVisible()

    for (const stat of SITE_CONFIG.stats) {
      const item = statsSection.locator('dl > div, dl > Comp').filter({ hasText: stat.label })
      await expect(item.locator('dd')).toHaveText(stat.displayValue)
    }
  })
})
