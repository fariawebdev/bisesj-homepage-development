import { test } from '@playwright/test'
import path from 'path'
import fs from 'fs'

const VIEWPORTS = [
  { width: 360, height: 800, name: 'home-360px.png' },
  { width: 768, height: 1024, name: 'home-768px.png' },
  { width: 1280, height: 900, name: 'home-1280px.png' },
]

test.describe('S2-04 Homepage Responsive Screenshots', () => {
  const outputDir = path.resolve(process.cwd(), 'docs/qa/sprint-2')

  test.beforeAll(() => {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }
  })

  for (const vp of VIEWPORTS) {
    test(`captures homepage screenshot at ${vp.width}px width`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height })
      await page.goto('/en')
      await page.waitForLoadState('networkidle')

      const screenshotPath = path.join(outputDir, vp.name)
      await page.screenshot({ path: screenshotPath, fullPage: true })
    })
  }
})
