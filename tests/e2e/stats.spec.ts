import { test, expect } from '@playwright/test'

test.describe('S1-11: Stats and counters', () => {
  test('reads the stats right after load and fails if any value is below its allowed start', async ({
    page,
  }) => {
    // Navigate to homepage
    await page.goto('/en')

    const statsSection = page.locator('section[aria-label="BISESJ at a glance"]')
    await expect(statsSection).toBeVisible()

    // Read values right after load (allowed start bounds: Founded=1993, Cambridge>=17, Students>=672, Nationalities>=8)
    const foundedDd = statsSection.locator('dl > div, dl > Comp').filter({ hasText: 'Founded' }).locator('dd')
    const cambridgeDd = statsSection.locator('dl > div, dl > Comp').filter({ hasText: 'Years with Cambridge' }).locator('dd')
    const studentsDd = statsSection.locator('dl > div, dl > Comp').filter({ hasText: 'Students enrolled' }).locator('dd')
    const nationalitiesDd = statsSection.locator('dl > div, dl > Comp').filter({ hasText: 'Nationalities' }).locator('dd')

    // Read raw text immediately
    const foundedText = (await foundedDd.textContent())?.trim() ?? ''
    const cambridgeText = (await cambridgeDd.textContent())?.trim() ?? ''
    const studentsText = (await studentsDd.textContent())?.trim() ?? ''
    const nationalitiesText = (await nationalitiesDd.textContent())?.trim() ?? ''

    const foundedNum = parseInt(foundedText.replace(/[^0-9]/g, ''), 10)
    const cambridgeNum = parseInt(cambridgeText.replace(/[^0-9]/g, ''), 10)
    const studentsNum = parseInt(studentsText.replace(/[^0-9]/g, ''), 10)
    const nationalitiesNum = parseInt(nationalitiesText.replace(/[^0-9]/g, ''), 10)

    // Founded must be static 1993 - never 0, never 1900
    expect(foundedNum).toBe(1993)
    expect(foundedText).not.toBe('1900')
    expect(foundedText).not.toBe('0')

    // Other counters must never be 0 and must never be below 85% of their target
    // 20 * 0.85 = 17
    expect(cambridgeNum).toBeGreaterThanOrEqual(17)
    expect(cambridgeNum).toBeLessThanOrEqual(20)

    // 791 * 0.85 = 672.35 -> 672
    expect(studentsNum).toBeGreaterThanOrEqual(672)
    expect(studentsNum).toBeLessThanOrEqual(791)

    // 10 * 0.85 = 8.5 -> 8
    expect(nationalitiesNum).toBeGreaterThanOrEqual(8)
    expect(nationalitiesNum).toBeLessThanOrEqual(10)

    // Verify final values after settling
    await expect(foundedDd).toHaveText('1993')
    await expect(cambridgeDd).toHaveText('20+')
    await expect(studentsDd).toHaveText('791')
    await expect(nationalitiesDd).toHaveText('10')
  })

  test('displays exact final values with reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/en')

    const statsSection = page.locator('section[aria-label="BISESJ at a glance"]')
    await expect(statsSection).toBeVisible()

    const foundedDd = statsSection.locator('dl > div, dl > Comp').filter({ hasText: 'Founded' }).locator('dd')
    const cambridgeDd = statsSection.locator('dl > div, dl > Comp').filter({ hasText: 'Years with Cambridge' }).locator('dd')
    const studentsDd = statsSection.locator('dl > div, dl > Comp').filter({ hasText: 'Students enrolled' }).locator('dd')
    const nationalitiesDd = statsSection.locator('dl > div, dl > Comp').filter({ hasText: 'Nationalities' }).locator('dd')

    // Must be final values immediately
    expect(await foundedDd.textContent()).toContain('1993')
    expect(await cambridgeDd.textContent()).toContain('20+')
    expect(await studentsDd.textContent()).toContain('791')
    expect(await nationalitiesDd.textContent()).toContain('10')
  })
})
