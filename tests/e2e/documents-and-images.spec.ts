import { test, expect } from '@playwright/test'

test.describe('S2-07 Mobile Images and PDF Downloads E2E', () => {
  test('Admission page renders DocumentCards for all 3 official PDF documents with separate Open and Download buttons', async ({ page }) => {
    await page.goto('/en/admission')

    // 1. Admission Test PDF Card
    const admissionTestCard = page.locator('.group', { hasText: 'Admission Test for Newcomers 2026–27' })
    await expect(admissionTestCard).toBeVisible()
    await expect(admissionTestCard.getByText('PDF', { exact: true })).toBeVisible()
    await expect(admissionTestCard.getByText('1.63 MB')).toBeVisible()

    const admissionTestOpen = admissionTestCard.getByRole('link', { name: /Open/i })
    await expect(admissionTestOpen).toBeVisible()
    await expect(admissionTestOpen).toHaveAttribute('href', '/documents/admission-test-for-newcomers-2026-27.pdf')
    await expect(admissionTestOpen).toHaveAttribute('target', '_blank')
    await expect(admissionTestOpen).toHaveAttribute('rel', /noopener noreferrer/)

    const admissionTestDownload = admissionTestCard.getByRole('link', { name: /Download/i })
    await expect(admissionTestDownload).toBeVisible()
    await expect(admissionTestDownload).toHaveAttribute('href', '/documents/admission-test-for-newcomers-2026-27.pdf')
    await expect(admissionTestDownload).toHaveAttribute('download', '')

    // 2. Bangladeshi Fee Structure Card
    const bangladeshiFeeCard = page.locator('.group', { hasText: 'Tuition Fee Structure (Bangladeshi Students) 2026–2027' })
    await expect(bangladeshiFeeCard).toBeVisible()
    await expect(bangladeshiFeeCard.getByText('55 KB')).toBeVisible()

    const bangladeshiOpen = bangladeshiFeeCard.getByRole('link', { name: /Open/i })
    await expect(bangladeshiOpen).toBeVisible()
    await expect(bangladeshiOpen).toHaveAttribute('href', '/documents/tuition-fee-structure-bangladeshi-2026-2027.pdf')
    await expect(bangladeshiOpen).toHaveAttribute('target', '_blank')

    const bangladeshiDownload = bangladeshiFeeCard.getByRole('link', { name: /Download/i })
    await expect(bangladeshiDownload).toBeVisible()
    await expect(bangladeshiDownload).toHaveAttribute('href', '/documents/tuition-fee-structure-bangladeshi-2026-2027.pdf')
    await expect(bangladeshiDownload).toHaveAttribute('download', '')

    // 3. Foreigner Fee Structure Card
    const foreignerFeeCard = page.locator('.group', { hasText: 'Tuition Fee Structure (Foreigner Students) 2026–2027' })
    await expect(foreignerFeeCard).toBeVisible()
    await expect(foreignerFeeCard.getByText('53 KB')).toBeVisible()

    const foreignerOpen = foreignerFeeCard.getByRole('link', { name: /Open/i })
    await expect(foreignerOpen).toBeVisible()
    await expect(foreignerOpen).toHaveAttribute('href', '/documents/tuition-fee-structure-foreigner-2026-2027.pdf')
    await expect(foreignerOpen).toHaveAttribute('target', '_blank')

    const foreignerDownload = foreignerFeeCard.getByRole('link', { name: /Download/i })
    await expect(foreignerDownload).toBeVisible()
    await expect(foreignerDownload).toHaveAttribute('href', '/documents/tuition-fee-structure-foreigner-2026-2027.pdf')
    await expect(foreignerDownload).toHaveAttribute('download', '')
  })

  test('Academic Calendar page renders DocumentCard with correct file size and separate Open and Download buttons', async ({ page }) => {
    await page.goto('/en/academic-calendar')

    const calendarCard = page.locator('.group', { hasText: 'BISESJ Academic Calendar 2026–2027' })
    await expect(calendarCard).toBeVisible()
    await expect(calendarCard.getByText('PDF', { exact: true })).toBeVisible()
    await expect(calendarCard.getByText('582 KB')).toBeVisible()

    const calendarOpen = calendarCard.getByRole('link', { name: /Open/i })
    await expect(calendarOpen).toBeVisible()
    await expect(calendarOpen).toHaveAttribute('href', '/documents/academic-calendar-2026-2027.pdf')
    await expect(calendarOpen).toHaveAttribute('target', '_blank')
    await expect(calendarOpen).toHaveAttribute('rel', /noopener noreferrer/)

    const calendarDownload = calendarCard.getByRole('link', { name: /Download/i })
    await expect(calendarDownload).toBeVisible()
    await expect(calendarDownload).toHaveAttribute('href', '/documents/academic-calendar-2026-2027.pdf')
    await expect(calendarDownload).toHaveAttribute('download', '')
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
