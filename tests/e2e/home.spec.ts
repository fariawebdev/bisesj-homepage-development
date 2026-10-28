import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('has correct title and brand name', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/BISESJ|Bangladesh International School/i)
  })
})
