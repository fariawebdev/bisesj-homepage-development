import Database from 'better-sqlite3'
import { getDatabasePath } from './index'
import { hashPassword } from './auth'
import { SITE_CONFIG } from '../site-config'

export function runSeed(customDbPath?: string, adminPassword = 'AdminPassword123!'): { seeded: boolean } {
  const dbPath = customDbPath || getDatabasePath()
  if (!dbPath) {
    throw new Error('DATABASE_PATH environment variable is not defined.')
  }

  const db = new Database(dbPath)
  db.pragma('journal_mode = WAL')
  db.pragma('foreign_keys = ON')

  // 1. Seed Site Settings
  const insertSetting = db.prepare(
    `INSERT INTO site_settings (key, value, updated_at)
     VALUES (?, ?, CURRENT_TIMESTAMP)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP`,
  )

  const settingsSeed: [string, string][] = [
    ['school_short_name', SITE_CONFIG.shortName],
    ['school_full_name', SITE_CONFIG.fullName],
    ['official_phone', SITE_CONFIG.contact.officialPhone.display],
    ['official_phone_link', SITE_CONFIG.contact.officialPhone.href],
    ['whatsapp_phone', SITE_CONFIG.contact.whatsapp.display],
    ['whatsapp_link', SITE_CONFIG.contact.whatsapp.href],
    ['general_email', SITE_CONFIG.contact.generalEmail.address],
    ['admissions_email', SITE_CONFIG.contact.admissionsEmail.address],
    ['students_enrolled', '791'],
    ['nationalities_count', '10'],
    ['footer_credit', SITE_CONFIG.footer.credit],
  ]

  const seedTransaction = db.transaction(() => {
    for (const [key, value] of settingsSeed) {
      insertSetting.run(key, value)
    }

    // 2. Seed Default Admin User with Hashed Password
    const defaultAdminEmail = (process.env.ADMIN_EMAIL || 'admin@bisesjsa.com').toLowerCase()
    const rawPassword = process.env.ADMIN_PASSWORD || adminPassword
    const { hash, salt } = hashPassword(rawPassword)

    const insertAdmin = db.prepare(
      `INSERT INTO admin_users (email, password_hash, salt, role)
       VALUES (?, ?, ?, 'admin')
       ON CONFLICT(email) DO UPDATE SET password_hash = excluded.password_hash, salt = excluded.salt`,
    )

    insertAdmin.run(defaultAdminEmail, hash, salt)
  })

  seedTransaction()
  db.close()
  return { seeded: true }
}

// CLI execution
if (require.main === module || process.argv[1]?.endsWith('seed.ts')) {
  try {
    runSeed()
    console.log('[Seed] Database successfully populated with initial settings and admin user.')
  } catch (error) {
    console.error('[Seed] Seeding failed:', error)
    process.exit(1)
  }
}
