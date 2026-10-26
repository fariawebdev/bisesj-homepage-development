import fs from 'fs'
import path from 'path'
import os from 'os'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { runMigrations } from '@/lib/db/migrate'
import { runSeed } from '@/lib/db/seed'
import { hashPassword, verifyPassword } from '@/lib/db/auth'
import { getSetting, setSetting, getAdminByEmail, closeDatabase } from '@/lib/db/index'

describe('Database Foundation (S1-05)', () => {
  const tempDir = path.join(os.tmpdir(), `bisesj-test-${Date.now()}`)
  const testDbPath = path.join(tempDir, 'test-cms.db')

  beforeAll(() => {
    process.env.DATABASE_PATH = testDbPath
  })

  afterAll(() => {
    closeDatabase()
    if (fs.existsSync(tempDir)) {
      try {
        fs.rmSync(tempDir, { recursive: true, force: true })
      } catch {
        // Ignore cleanup failure on temp directory
      }
    }
    delete process.env.DATABASE_PATH
  })

  it('runs migrations on a fresh database', () => {
    const result = runMigrations(testDbPath)
    expect(result.applied).toContain('001_initial.sql')
    expect(fs.existsSync(testDbPath)).toBe(true)
  })

  it('hashes passwords securely and never in plain text', () => {
    const raw = 'SecretAdmin2026!'
    const { hash, salt } = hashPassword(raw)
    expect(hash).not.toBe(raw)
    expect(hash.length).toBeGreaterThan(32)
    expect(salt.length).toBe(32)

    expect(verifyPassword(raw, hash, salt)).toBe(true)
    expect(verifyPassword('WrongPassword', hash, salt)).toBe(false)
  })

  it('runs seed script to populate site_settings and admin_users', () => {
    const result = runSeed(testDbPath, 'SuperSecurePassword2026!')
    expect(result.seeded).toBe(true)

    const officialPhone = getSetting('official_phone')
    expect(officialPhone).toBe('+966 12 664 7079')

    const studentsEnrolled = getSetting('students_enrolled')
    expect(studentsEnrolled).toBe('791')

    const admin = getAdminByEmail('admin@bisesjsa.com')
    expect(admin).not.toBeNull()
    expect(admin?.email).toBe('admin@bisesjsa.com')
    expect(admin?.role).toBe('admin')
    expect(verifyPassword('SuperSecurePassword2026!', admin!.password_hash, admin!.salt)).toBe(true)
  })

  it('updates and persists settings through typed client', () => {
    const success = setSetting('test_key', 'test_value')
    expect(success).toBe(true)
    expect(getSetting('test_key')).toBe('test_value')
  })

  it('renders public pages safely with fallback when no database exists', () => {
    closeDatabase()
    const savedPath = process.env.DATABASE_PATH
    delete process.env.DATABASE_PATH

    // Should return default value without throwing any error
    const val = getSetting('any_key', 'fallback_default')
    expect(val).toBe('fallback_default')

    process.env.DATABASE_PATH = savedPath
  })
})
