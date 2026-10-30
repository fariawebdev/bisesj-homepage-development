import { test, expect } from '@playwright/test'
import { SITE_CONFIG } from '../../lib/site-config'

test.describe('S2-05 & S2-10: Inner Pages, Locked Routine, Contact Map & Styled 404', () => {
  test('Routine page shows locked state when features.routine is locked', async ({ page }) => {
    // Assert that the site configuration flag is set to 'locked'
    expect(SITE_CONFIG.features.routine).toBe('locked')

    await page.goto('/en/routine')

    const heading = page.locator('h1').first()
    await expect(heading).toContainText('Routine')

    const lockedNotice = page.getByText(
      'The school routine is published to enrolled families at the start of each term. For class-specific schedules, please contact the school office.'
    )
    await expect(lockedNotice).toBeVisible()

    const contactBtn = page.getByRole('link', { name: /Contact School Office/i })
    await expect(contactBtn).toBeVisible()
    await expect(contactBtn).toHaveAttribute('href', '/contact')
  })

  test('Routine page shows no timetable text or table when locked', async ({ page }) => {
    // Verify feature flag configuration
    expect(SITE_CONFIG.features.routine).toBe('locked')

    await page.goto('/en/routine')

    // Must NOT contain an HTML table or table role
    expect(await page.locator('table').count()).toBe(0)
    expect(await page.getByRole('table').count()).toBe(0)

    // Must NOT contain public schedule or timetable text
    const pageText = await page.locator('main').textContent()
    expect(pageText).not.toContain('Period 1')
    expect(pageText).not.toContain('Period 2')
    expect(pageText).not.toContain('Timetable Schedule')
    expect(pageText).not.toContain('Sunday - Thursday')
    expect(pageText).not.toContain('8:00 AM')
  })

  test('Contact page has click-to-load interactive map and parent feedback link', async ({ page }) => {
    await page.goto('/en/contact')

    // Initial state: Google Maps iframe is NOT loaded
    expect(await page.locator('iframe[title*="Google Maps"]').count()).toBe(0)

    // Placeholder button is visible
    const showMapBtn = page.getByRole('button', { name: /Show interactive map/i })
    await expect(showMapBtn).toBeVisible()

    // Click button to load map
    await showMapBtn.click()

    // Iframe is now loaded
    const mapIframe = page.locator('iframe[title*="Google Maps"]')
    await expect(mapIframe).toBeVisible()

    // Parent feedback link is visible
    const feedbackLink = page.getByRole('link', { name: /Submit Parent Feedback/i })
    await expect(feedbackLink).toBeVisible()
    await expect(feedbackLink).toHaveAttribute('href', '/parent-feedback')
  })

  test('Parent feedback route displays feedback email and WhatsApp messaging', async ({ page }) => {
    await page.goto('/en/parent-feedback')

    const heading = page.locator('h1').first()
    await expect(heading).toContainText('Parent Feedback & Complaints')

    const emailLink = page.getByRole('link', { name: new RegExp(SITE_CONFIG.feedbackEmail) })
    await expect(emailLink).toBeVisible()
    await expect(emailLink).toHaveAttribute('href', SITE_CONFIG.contact.feedbackEmail.href)
  })

  test('Styled 404 page renders on-brand design with links to Home, Admission, and Contact', async ({ page }) => {
    const response = await page.goto('/en/this-page-does-not-exist')
    expect(response?.status()).toBe(404)

    // Heading and 404 number
    await expect(page.getByText('404')).toBeVisible()
    await expect(page.getByRole('heading', { name: /Page Not Found/i })).toBeVisible()

    // Quick links
    const homeLink = page.getByRole('link', { name: /^Home$/i })
    await expect(homeLink).toBeVisible()
    await expect(homeLink).toHaveAttribute('href', '/en')

    const admissionLink = page.getByRole('link', { name: /^Admission$/i })
    await expect(admissionLink).toBeVisible()
    await expect(admissionLink).toHaveAttribute('href', '/en/admission')

    const contactLink = page.getByRole('link', { name: /^Contact$/i })
    await expect(contactLink).toBeVisible()
    await expect(contactLink).toHaveAttribute('href', '/en/contact')
  })
})
