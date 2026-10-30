import { test, expect } from '@playwright/test'

const TEST_VIEWPORTS = [
  { width: 360, height: 740, label: '360x740' },
  { width: 390, height: 844, label: '390x844' },
]

test.describe('S2-04, S2-10 & S3-00: Mobile sticky action bar clearance and overlap checks', () => {
  for (const vp of TEST_VIEWPORTS) {
    test(`does not overlap hero elements at initial screen or footer after scrolling on ${vp.label}`, async ({
      page,
    }) => {
      // Set exact target mobile viewport
      await page.setViewportSize({ width: vp.width, height: vp.height })
      await page.goto('/en')
      await page.waitForLoadState('networkidle')

      const stickyBar = page.locator('nav[aria-label="Quick actions"]')
      await expect(stickyBar).toBeVisible()

      const stickyBarBox = await stickyBar.boundingBox()
      expect(stickyBarBox, 'Sticky bar bounding box must be available').not.toBeNull()
      if (!stickyBarBox) return

      // Helper function to assert two element bounding boxes do not collide/overlap
      const assertNoOverlap = (
        targetBox: { x: number; y: number; width: number; height: number } | null,
        targetName: string
      ) => {
        expect(targetBox, `${targetName} bounding box must be available`).not.toBeNull()
        if (!targetBox) return

        const overlaps = !(
          targetBox.x + targetBox.width <= stickyBarBox.x ||
          stickyBarBox.x + stickyBarBox.width <= targetBox.x ||
          targetBox.y + targetBox.height <= stickyBarBox.y ||
          stickyBarBox.y + stickyBarBox.height <= targetBox.y
        )
        expect(overlaps, `${targetName} should not collide with mobile sticky action bar`).toBe(false)
      }

      // ==========================================
      // 1. FIRST SCREEN CHECKS (At Top of Page)
      // ==========================================
      // Select eyebrow lines by testid (S3-00)
      const eyebrowLine1 = page.getByTestId('hero-eyebrow-line-1')
      const eyebrowLine2 = page.getByTestId('hero-eyebrow-line-2')
      await expect(eyebrowLine1).toBeVisible()
      await expect(eyebrowLine2).toBeVisible()
      assertNoOverlap(await eyebrowLine1.boundingBox(), 'Hero eyebrow line 1 (at first screen)')
      assertNoOverlap(await eyebrowLine2.boundingBox(), 'Hero eyebrow line 2 (at first screen)')

      // Select hero subtitle by testid (S3-00)
      const heroSubtitle = page.getByTestId('hero-subtitle')
      await expect(heroSubtitle).toBeVisible()
      assertNoOverlap(await heroSubtitle.boundingBox(), 'Hero subtitle (at first screen)')

      // Assert the subtitle is not the eyebrow (S3-00)
      const subtitleText = (await heroSubtitle.textContent())?.trim() ?? ''
      const eyebrow1Text = (await eyebrowLine1.textContent())?.trim() ?? ''
      const eyebrow2Text = (await eyebrowLine2.textContent())?.trim() ?? ''
      expect(subtitleText).not.toBe(eyebrow1Text)
      expect(subtitleText).not.toBe(eyebrow2Text)
      expect(subtitleText).toContain('Cambridge IGCSE and AS & A Level')

      // Hero Buttons (Apply / Registration CTA)
      const heroSection = page.locator('section[aria-labelledby="hero-title"]')
      const heroApplyBtn = heroSection.getByRole('link', { name: /Apply/i })
      await expect(heroApplyBtn).toBeVisible()
      assertNoOverlap(await heroApplyBtn.boundingBox(), 'Hero Apply button (at first screen)')

      // ==========================================
      // 2. SCROLLED TO FOOTER CHECKS
      // ==========================================
      await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }))
      await page.waitForTimeout(300)

      const footer = page.locator('footer')
      const copyright = footer.locator('p:has-text("BISESJ")')
      await expect(copyright).toBeVisible()
      assertNoOverlap(await copyright.boundingBox(), 'Footer copyright at page bottom')

      const credit = footer.getByText(/Powered by Salman & Alwajeez/)
      await expect(credit).toBeVisible()
      assertNoOverlap(await credit.boundingBox(), 'Footer credit at page bottom')
    })
  }
})
