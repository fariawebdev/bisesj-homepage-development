import crypto from 'crypto'

/**
 * Generates a cryptographically secure hash and salt using scrypt.
 * Never stores plain text passwords.
 */
export function hashPassword(password: string): { hash: string; salt: string } {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.scryptSync(password, salt, 64).toString('hex')
  return { hash, salt }
}

/**
 * Validates a plaintext password against the stored scrypt hash using timing-safe comparison.
 */
export function verifyPassword(password: string, hash: string, salt: string): boolean {
  try {
    const checkHash = crypto.scryptSync(password, salt, 64).toString('hex')
    const hashBuffer = Buffer.from(hash, 'hex')
    const checkBuffer = Buffer.from(checkHash, 'hex')
    if (hashBuffer.length !== checkBuffer.length) {
      return false
    }
    return crypto.timingSafeEqual(hashBuffer, checkBuffer)
  } catch {
    return false
  }
}
