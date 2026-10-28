import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('redirects root "/" to "/en" and has correct title', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveURL(/.*\/en$/)
    await expect(page).toHaveTitle(/BISESJ|Bangladesh International School/i)
  })
})
