import { test } from '@playwright/test'
import path from 'path'
import fs from 'fs'

const ROUTES = [
  { slug: 'home', path: '/en' },
  { slug: 'about-us', path: '/en/about-us' },
  { slug: 'chairmans-message', path: '/en/chairmans-message' },
  { slug: 'principals-message', path: '/en/principals-message' },
  { slug: 'admission', path: '/en/admission' },
  { slug: 'academic-calendar', path: '/en/academic-calendar' },
  { slug: 'contact', path: '/en/contact' },
  { slug: 'parent-feedback', path: '/en/parent-feedback' },
  { slug: 'routine', path: '/en/routine' },
  { slug: 'syllabus', path: '/en/syllabus' },
  { slug: 'news', path: '/en/news' },
  { slug: 'job-vacancy', path: '/en/job-vacancy' },
  { slug: 'merit-scholarship', path: '/en/merit-scholarship' },
  { slug: '20-years-with-cambridge', path: '/en/20-years-with-cambridge' },
  { slug: '404', path: '/en/non-existent-page-404' },
]

const WIDTHS = [
  { width: 360, height: 800 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1280, height: 900 },
]

test.describe('S2-09 Responsive Screenshots for all 15 routes at 360, 390, 768, 1280px', () => {
  const outputDir = path.resolve(process.cwd(), 'docs/qa/sprint-2')

  test.beforeAll(() => {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }
  })

  for (const route of ROUTES) {
    for (const vp of WIDTHS) {
      test(`captures ${route.slug} at ${vp.width}px`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height })
        await page.goto(route.path)
        await page.waitForTimeout(400)

        const filename = `${route.slug}-${vp.width}.png`
        const screenshotPath = path.join(outputDir, filename)
        await page.screenshot({ path: screenshotPath, fullPage: true })
      })
    }
  }
})
