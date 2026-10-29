import { test, expect } from '@playwright/test'

test.describe('S2-07 Mobile Images and PDF Downloads E2E', () => {
  test('Admission page renders DocumentCards for all 3 official PDF documents', async ({ page }) => {
    await page.goto('/en/admission')

    // 1. Admission Test PDF Card
    const admissionTestCard = page.locator('.group', { hasText: 'Admission Test for Newcomers 2026–27' })
    await expect(admissionTestCard).toBeVisible()
    await expect(admissionTestCard.getByText('PDF', { exact: true })).toBeVisible()
    await expect(admissionTestCard.getByText('1.63 MB')).toBeVisible()

    const admissionTestLink = admissionTestCard.locator('a[href="/documents/admission-test-for-newcomers-2026-27.pdf"]')
    await expect(admissionTestLink).toBeVisible()
    await expect(admissionTestLink).toHaveAttribute('target', '_blank')
    await expect(admissionTestLink).toHaveAttribute('rel', /noopener noreferrer/)

    // 2. Bangladeshi Fee Structure Card
    const bangladeshiFeeCard = page.locator('.group', { hasText: 'Tuition Fee Structure (Bangladeshi Students) 2026–2027' })
    await expect(bangladeshiFeeCard).toBeVisible()
    await expect(bangladeshiFeeCard.getByText('55 KB')).toBeVisible()

    const bangladeshiFeeLink = bangladeshiFeeCard.locator('a[href="/documents/tuition-fee-structure-bangladeshi-2026-2027.pdf"]')
    await expect(bangladeshiFeeLink).toBeVisible()
    await expect(bangladeshiFeeLink).toHaveAttribute('target', '_blank')

    // 3. Foreigner Fee Structure Card
    const foreignerFeeCard = page.locator('.group', { hasText: 'Tuition Fee Structure (Foreigner Students) 2026–2027' })
    await expect(foreignerFeeCard).toBeVisible()
    await expect(foreignerFeeCard.getByText('53 KB')).toBeVisible()

    const foreignerFeeLink = foreignerFeeCard.locator('a[href="/documents/tuition-fee-structure-foreigner-2026-2027.pdf"]')
    await expect(foreignerFeeLink).toBeVisible()
    await expect(foreignerFeeLink).toHaveAttribute('target', '_blank')
  })

  test('Academic Calendar page renders DocumentCard with correct file size and open in new tab', async ({ page }) => {
    await page.goto('/en/academic-calendar')

    const calendarCard = page.locator('.group', { hasText: 'BISESJ Academic Calendar 2026–2027' })
    await expect(calendarCard).toBeVisible()
    await expect(calendarCard.getByText('PDF', { exact: true })).toBeVisible()
    await expect(calendarCard.getByText('582 KB')).toBeVisible()

    const calendarLink = calendarCard.locator('a[href="/documents/academic-calendar-2026-2027.pdf"]')
    await expect(calendarLink).toBeVisible()
    await expect(calendarLink).toHaveAttribute('target', '_blank')
    await expect(calendarLink).toHaveAttribute('rel', /noopener noreferrer/)
  })

  test('All four official PDF document URLs are accessible with status 200', async ({ page }) => {
    const pdfPaths = [
      '/documents/admission-test-for-newcomers-2026-27.pdf',
      '/documents/tuition-fee-structure-bangladeshi-2026-2027.pdf',
      '/documents/tuition-fee-structure-foreigner-2026-2027.pdf',
      '/documents/academic-calendar-2026-2027.pdf',
    ]

    for (const path of pdfPaths) {
      const response = await page.request.get(path)
      expect(response.status()).toBe(200)
      const headers = response.headers()
      expect(headers['content-type'] || '').toMatch(/application\/pdf|binary\/octet-stream/)
    }
  })

  test('Mobile viewport (360px & 390px) images fit within screen without horizontal page overflow', async ({ page }) => {
    for (const width of [360, 390]) {
      await page.setViewportSize({ width, height: 740 })
      await page.goto('/en')
      await page.waitForLoadState('networkidle')

      // Verify no horizontal document overflow
      const isOverflowing = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth
      })
      expect(isOverflowing).toBe(false)

      // Verify header logo and hero image exist and fit inside viewport
      const logo = page.locator('header img').first()
      await expect(logo).toBeVisible()
      const logoBox = await logo.boundingBox()
      expect(logoBox).not.toBeNull()
      if (logoBox) {
        expect(logoBox.x + logoBox.width).toBeLessThanOrEqual(width)
      }
    }
  })
})
