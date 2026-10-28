import { test, expect } from '@playwright/test'
import { SITE_CONFIG } from '../../lib/site-config'

test.describe('S1-12: Honest enquiry form', () => {
  test('submitting enquiry displays opening-soon notice with phone and WhatsApp buttons, never received message', async ({
    page,
  }) => {
    await page.goto('/en')

    const enquirySection = page.locator('#enquiry')
    await expect(enquirySection).toBeVisible()

    // Form elements
    const nameInput = enquirySection.locator('input[name="name"]')
    const phoneInput = enquirySection.locator('input[name="phone"]')
    const gradeSelect = enquirySection.locator('select[name="grade"]')
    const messageInput = enquirySection.locator('textarea[name="message"]')
    const submitBtn = enquirySection.locator('button[type="submit"]')

    await expect(submitBtn).toBeVisible()
    await expect(submitBtn).toBeEnabled()

    // Fill valid values
    await nameInput.fill('Rahim Ahmed')
    await phoneInput.fill('+966 50 123 4567')
    await gradeSelect.selectOption('Grade 1')
    await messageInput.fill('Interested in admission for next academic year.')

    // Submit the form
    await submitBtn.click()

    // Check status notice
    const statusNotice = page.locator('#enquiry-status-notice')
    await expect(statusNotice).toBeVisible()

    const noticeText = (await statusNotice.textContent()) ?? ''

    // Assert that the form NEVER shows "received"
    expect(noticeText.toLowerCase()).not.toContain('received')
    expect(noticeText).not.toContain('Thank you! Your enquiry has been received')

    // Assert it shows honest opening soon notice with official numbers from SITE_CONFIG
    expect(noticeText).toContain('Online enquiries are opening soon')
    expect(noticeText).toContain(SITE_CONFIG.contact.officialPhone.display)
    expect(noticeText).toContain(SITE_CONFIG.contact.whatsapp.display)

    // Check Call button and href
    const callBtn = statusNotice.getByRole('link', { name: /Call/ })
    await expect(callBtn).toBeVisible()
    expect(await callBtn.getAttribute('href')).toBe(SITE_CONFIG.contact.officialPhone.href)

    // Check WhatsApp button and href
    const whatsappBtn = statusNotice.getByRole('link', { name: /WhatsApp/ })
    await expect(whatsappBtn).toBeVisible()
    expect(await whatsappBtn.getAttribute('href')).toBe(SITE_CONFIG.contact.whatsapp.href)
  })

  test('empty fields trigger validation errors and never show received message', async ({ page }) => {
    await page.goto('/en')

    const enquirySection = page.locator('#enquiry')
    const submitBtn = enquirySection.locator('button[type="submit"]')
    await expect(submitBtn).toBeVisible()
    await submitBtn.click()

    // Assert validation error appeared
    const errorText = enquirySection.getByText('Please enter the parent name.')
    await expect(errorText).toBeVisible()

    // Status notice must not exist or contain "received"
    const receivedEl = enquirySection.locator(':has-text("received")')
    await expect(receivedEl).toHaveCount(0)
  })
})
