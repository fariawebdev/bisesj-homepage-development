import fs from 'fs'
import path from 'path'
import Database from 'better-sqlite3'

export type SiteSetting = {
  key: string
  value: string
  updated_at: string
}

export type AdminUser = {
  id: number
  email: string
  password_hash: string
  salt: string
  role: string
  created_at: string
}

let dbInstance: Database.Database | null = null

/**
 * Resolves the database file path from environment variable.
 * Expected to live outside the repo in production (e.g., /var/data/bisesj/cms.db).
 */
export function getDatabasePath(): string | null {
  const envPath = process.env.DATABASE_PATH
  if (!envPath) {
    return null
  }
  return path.resolve(envPath)
}

/**
 * Retrieves the SQLite database connection.
 * If no database exists or is configured (such as on Vercel preview environments),
 * this returns null gracefully so public pages render uninterrupted.
 */
export function getDatabase(): Database.Database | null {
  const dbPath = getDatabasePath()
  if (!dbPath) {
    return null
  }

  if (dbInstance) {
    return dbInstance
  }

  try {
    const dir = path.dirname(dbPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    dbInstance = new Database(dbPath)
    dbInstance.pragma('journal_mode = WAL')
    dbInstance.pragma('foreign_keys = ON')
    return dbInstance
  } catch (error) {
    console.warn('[Database] Unable to connect to SQLite database. Proceeding without database:', error)
    return null
  }
}

/**
 * Close database connection (useful for testing and graceful shutdowns).
 */
export function closeDatabase(): void {
  if (dbInstance) {
    try {
      dbInstance.close()
    } catch {
      // Ignore closing errors
    }
    dbInstance = null
  }
}

/**
 * Safely fetches a setting value. Returns defaultValue or null if database is absent.
 */
export function getSetting(key: string, defaultValue: string | null = null): string | null {
  const db = getDatabase()
  if (!db) {
    return defaultValue
  }

  try {
    const row = db.prepare('SELECT value FROM site_settings WHERE key = ?').get(key) as
      | { value: string }
      | undefined
    return row ? row.value : defaultValue
  } catch {
    return defaultValue
  }
}

/**
 * Sets a setting key-value pair in site_settings.
 */
export function setSetting(key: string, value: string): boolean {
  const db = getDatabase()
  if (!db) {
    return false
  }

  try {
    db.prepare(
      `INSERT INTO site_settings (key, value, updated_at)
       VALUES (?, ?, CURRENT_TIMESTAMP)
       ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP`,
    ).run(key, value)
    return true
  } catch (error) {
    console.error(`[Database] Error saving setting "${key}":`, error)
    return false
  }
}

/**
 * Retrieves an admin user by email.
 */
export function getAdminByEmail(email: string): AdminUser | null {
  const db = getDatabase()
  if (!db) {
    return null
  }

  try {
    const row = db.prepare('SELECT * FROM admin_users WHERE email = ?').get(email.toLowerCase()) as
      | AdminUser
      | undefined
    return row || null
  } catch {
    return null
  }
}
