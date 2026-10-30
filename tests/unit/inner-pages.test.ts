import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { getPageMarkdown } from '@/lib/markdown'
import { SITE_CONFIG } from '@/lib/site-config'
import { LINKS } from '@/lib/links'

describe('Inner Pages & Content Foundation (S2-05)', () => {
  const SLUGS = [
    'about-us',
    'chairmans-message',
    'principals-message',
    'merit-scholarship',
    'academic-calendar',
    'admission',
    'contact',
    'routine',
  ]

  it('loads all 8 required markdown pages from content/pages/<slug>.md', () => {
    for (const slug of SLUGS) {
      const content = getPageMarkdown(slug)
      expect(content, `Markdown for slug "${slug}" must exist and not be empty`).toBeTruthy()
      expect(content.length).toBeGreaterThan(50)
    }
  })

  it('ensures no "Grade" or "KG" appears in any of the 8 content pages', () => {
    for (const slug of SLUGS) {
      const content = getPageMarkdown(slug)
      expect(content.toLowerCase(), `File content/pages/${slug}.md should not contain "grade"`).not.toContain('grade')
      expect(content, `File content/pages/${slug}.md should not contain "KG"`).not.toMatch(/\bKG\b/)
    }
  })

  it('ensures no "Grade" or "KG" appears in any localization message files (messages/*.json)', () => {
    const messagesDir = path.resolve(process.cwd(), 'messages')
    const messageFiles = fs.readdirSync(messagesDir).filter((file) => file.endsWith('.json'))

    expect(messageFiles.length).toBeGreaterThan(0)
    for (const file of messageFiles) {
      const content = fs.readFileSync(path.join(messagesDir, file), 'utf8')
      expect(content.toLowerCase(), `File messages/${file} should not contain "grade"`).not.toContain('grade')
      expect(content, `File messages/${file} should not contain "KG"`).not.toMatch(/\bKG\b/)
    }
  })

  it('contains the exact approved locked notice text in routine.md', () => {
    const routineContent = getPageMarkdown('routine')
    expect(routineContent).toContain(
      'The school routine is published to enrolled families at the start of each term. For class-specific schedules, please contact the school office.'
    )
    expect(SITE_CONFIG.features.routine).toBe('locked')
  })

  it('contains verified contact info in contact.md matching SITE_CONFIG and no stale numbers', () => {
    const contactContent = getPageMarkdown('contact')
    expect(contactContent).toContain(SITE_CONFIG.inquiryEmail)
    expect(contactContent).toContain(SITE_CONFIG.admissionsEmail)
    expect(contactContent).toContain(SITE_CONFIG.feedbackEmail)
    expect(contactContent).toContain(SITE_CONFIG.contact.officialPhone.display)
    expect(contactContent).toContain(SITE_CONFIG.contact.whatsapp.display)

    // Stale numbers must not appear
    expect(contactContent).not.toContain('663 8992')
    expect(contactContent).not.toContain('58 223 7432')
    expect(contactContent).not.toContain('582237432')
  })

  it('defines parent feedback link in LINKS', () => {
    expect(LINKS.parentFeedback).toBeDefined()
    expect(LINKS.parentFeedback.href).toBe('/parent-feedback')
    expect(LINKS.parentFeedback.internal).toBe(true)
  })
})
