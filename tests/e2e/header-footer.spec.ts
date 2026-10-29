import { test, expect } from '@playwright/test'

test.describe('S2-06 Header and Footer E2E', () => {
  test('Skip to content link is accessible and focuses #main', async ({ page }) => {
    await page.goto('/en')
    const skipLink = page.locator('a[href="#main"]')
    await expect(skipLink).toHaveCount(1)
    await expect(skipLink).toHaveText('Skip to content')

    // Initial state: visually hidden via sr-only
    await expect(skipLink).toHaveClass(/sr-only/)

    // Tab into page to focus skip link
    await page.keyboard.press('Tab')
    await expect(skipLink).toBeFocused()

    // When focused, not-sr-only makes it visible
    await expect(skipLink).toBeVisible()

    // Trigger Enter to navigate to #main
    await page.keyboard.press('Enter')
    const main = page.locator('#main')
    await expect(main).toBeVisible()
  })

  test('Nav active-page indicator on Home page marks Home link with aria-current="page"', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 768 })
    await page.goto('/en')
    const homeLink = page.locator('header nav ul a[aria-current="page"]').first()
    await expect(homeLink).toBeVisible()
    await expect(homeLink).toHaveText('Home')
  })

  test('Nav active-page indicator on Inner page marks current page and not Home', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 768 })
    await page.goto('/en/about-us')
    const aboutLink = page.locator('header nav ul a[aria-current="page"]').first()
    await expect(aboutLink).toBeVisible()
    await expect(aboutLink).toHaveText('About')

    // Ensure home does not have aria-current
    const homeOnAbout = page.locator('header nav ul a[href="/en"]').first()
    await expect(homeOnAbout).not.toHaveAttribute('aria-current', 'page')
  })

  test('Mobile menu supports keyboard navigation, focus trap, and Escape closing', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/en')

    const menuButton = page.locator('button[aria-controls="mobile-menu"]')
    await expect(menuButton).toBeVisible()
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false')

    // Open mobile menu
    await menuButton.click()
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true')

    const dialog = page.locator('#mobile-menu')
    await expect(dialog).toBeVisible()
    await expect(dialog).toHaveAttribute('role', 'dialog')
    await expect(dialog).toHaveAttribute('aria-modal', 'true')

    const closeButton = dialog.locator('button[aria-label="Close menu"]')
    // Close button should receive initial focus
    await expect(closeButton).toBeFocused()

    // Tab through all focusable items inside dialog
    // Focus should remain inside dialog and eventually wrap
    for (let i = 0; i < 15; i++) {
      await page.keyboard.press('Tab')
      const isStillInside = await dialog.evaluate((d) => d.contains(document.activeElement))
      expect(isStillInside).toBe(true)
    }

    // Shift+Tab should cycle backward and also remain trapped
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Shift+Tab')
      const isStillInside = await dialog.evaluate((d) => d.contains(document.activeElement))
      expect(isStillInside).toBe(true)
    }

    // Pressing Escape closes dialog and restores focus to menuButton
    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    await expect(menuButton).toBeFocused()
  })

  test('Footer displays 4 columns with required headings and official contact details', async ({ page }) => {
    await page.goto('/en')
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()

    // Column 1: Identity
    await expect(footer.getByText('BISESJ', { exact: true })).toBeVisible()
    await expect(footer.getByText('Est. 1993')).toBeVisible()
    await expect(footer.getByText('Cambridge International School · Jeddah').first()).toBeVisible()

    // Column 2: Academics
    await expect(footer.getByRole('heading', { name: 'Academics' })).toBeVisible()
    await expect(footer.locator('a[href="/en/syllabus"]')).toBeVisible()
    await expect(footer.locator('a[href="/en/routine"]')).toBeVisible()
    await expect(footer.locator('a[href="/en/academic-calendar"]')).toBeVisible()

    // Column 3: School Life
    await expect(footer.getByRole('heading', { name: 'School Life' })).toBeVisible()
    await expect(footer.locator('a[href="/en/news"]')).toBeVisible()
    await expect(footer.locator('a[href="/en/merit-scholarship"]')).toBeVisible()
    await expect(footer.locator('a[href="/en/20-years-with-cambridge"]')).toBeVisible()

    // Column 4: Contact & Inquiries
    await expect(footer.getByRole('heading', { name: 'Contact & Inquiries' })).toBeVisible()
    await expect(footer.locator('a[href="/en/contact"]')).toBeVisible()
    await expect(footer.locator('a[href="/en/parent-feedback"]')).toBeVisible()

    // Direct contact channels in Column 4
    const phone = footer.locator('a[href="tel:+966126647079"]')
    await expect(phone).toBeVisible()
    await expect(phone).toContainText('+966 12 664 7079')

    const whatsapp = footer.locator('a[href="https://wa.me/966567276919"]')
    await expect(whatsapp).toBeVisible()
    await expect(whatsapp).toContainText('+966 56 727 6919')

    const email = footer.locator('a[href="mailto:inquiry@bisesjsa.com"]')
    await expect(email).toBeVisible()
    await expect(email).toContainText('inquiry@bisesjsa.com')
  })
})
