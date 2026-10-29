import { test, expect } from '@playwright/test'

const TEST_VIEWPORTS = [
  { width: 360, height: 740, label: '360px' },
  { width: 390, height: 844, label: '390px' },
]

test.describe('S2-04: Mobile sticky action bar clearance', () => {
  for (const vp of TEST_VIEWPORTS) {
    test(`does not overlap hero buttons or footer on ${vp.label} viewport`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height })
      await page.goto('/en')
      await page.waitForLoadState('networkidle')

      const stickyBar = page.locator('nav[aria-label="Quick actions"]')
      await expect(stickyBar).toBeVisible()

      const stickyBarBox = await stickyBar.boundingBox()
      expect(stickyBarBox).not.toBeNull()
      if (!stickyBarBox) return

      // Helper to assert two bounding boxes do not collide/overlap
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

      // 1. Check Hero CTA button when centered into view
      const heroSection = page.locator('section[aria-labelledby="hero-title"]')
      const heroApplyBtn = heroSection.getByRole('link', { name: /Apply/i })
      await heroApplyBtn.evaluate((el) => el.scrollIntoView({ block: 'center' }))
      await page.waitForTimeout(300)
      const heroApplyBox = await heroApplyBtn.boundingBox()
      assertNoOverlap(heroApplyBox, 'Hero Apply button')

      // 2. Check Hero Cards when centered into view
      const heroCard1 = heroSection.locator('article').first()
      await heroCard1.evaluate((el) => el.scrollIntoView({ block: 'center' }))
      await page.waitForTimeout(300)
      const heroCard1Box = await heroCard1.boundingBox()
      assertNoOverlap(heroCard1Box, 'Hero Admissions Card')

      const heroCard2 = heroSection.locator('article').nth(1)
      await heroCard2.evaluate((el) => el.scrollIntoView({ block: 'center' }))
      await page.waitForTimeout(300)
      const heroCard2Box = await heroCard2.boundingBox()
      assertNoOverlap(heroCard2Box, 'Hero Scholarship Card')

      // 3. Check Footer when page is scrolled to bottom
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
      await page.waitForTimeout(300)

      const footer = page.locator('footer')
      const copyright = footer.locator('p:has-text("BISESJ")')
      const copyrightBox = await copyright.boundingBox()
      assertNoOverlap(copyrightBox, 'Footer copyright at page bottom')

      const credit = footer.getByText(/Powered by Salman & Alwajeez/)
      const creditBox = await credit.boundingBox()
      assertNoOverlap(creditBox, 'Footer credit at page bottom')
    })
  }
})
