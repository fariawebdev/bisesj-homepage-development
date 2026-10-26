import fs from 'fs'
import path from 'path'
import Database from 'better-sqlite3'
import { getDatabasePath } from './index'

export function runMigrations(customDbPath?: string): { applied: string[] } {
  const dbPath = customDbPath || getDatabasePath()
  if (!dbPath) {
    throw new Error('DATABASE_PATH environment variable is not defined.')
  }

  const dir = path.dirname(dbPath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  const db = new Database(dbPath)
  db.pragma('journal_mode = WAL')
  db.pragma('foreign_keys = ON')

  // Migration tracker table
  db.exec(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      version TEXT PRIMARY KEY,
      applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `)

  const migrationsDir = path.join(__dirname, 'migrations')
  if (!fs.existsSync(migrationsDir)) {
    db.close()
    return { applied: [] }
  }

  const files = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith('.sql'))
    .sort()

  const applied: string[] = []

  const isApplied = db.prepare('SELECT 1 FROM schema_migrations WHERE version = ?')
  const recordMigration = db.prepare('INSERT INTO schema_migrations (version) VALUES (?)')

  const applyTransaction = db.transaction((file: string, sql: string) => {
    db.exec(sql)
    recordMigration.run(file)
  })

  for (const file of files) {
    const exists = isApplied.get(file)
    if (!exists) {
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8')
      applyTransaction(file, sql)
      applied.push(file)
    }
  }

  db.close()
  return { applied }
}

// CLI execution if executed directly
if (require.main === module || process.argv[1]?.endsWith('migrate.ts')) {
  try {
    const result = runMigrations()
    if (result.applied.length > 0) {
      console.log(`[Migrations] Applied ${result.applied.length} migration(s):`, result.applied.join(', '))
    } else {
      console.log('[Migrations] Database is already up to date.')
    }
  } catch (error) {
    console.error('[Migrations] Migration failed:', error)
    process.exit(1)
  }
}
