import fs from 'fs'
import path from 'path'

const standaloneDir = path.resolve(process.cwd(), '.next/standalone')
if (fs.existsSync(standaloneDir)) {
  const publicSrc = path.resolve(process.cwd(), 'public')
  const publicDest = path.join(standaloneDir, 'public')
  if (fs.existsSync(publicSrc)) {
    fs.cpSync(publicSrc, publicDest, { recursive: true, force: true })
  }

  const staticSrc = path.resolve(process.cwd(), '.next/static')
  const staticDest = path.join(standaloneDir, '.next/static')
  if (fs.existsSync(staticSrc)) {
    fs.cpSync(staticSrc, staticDest, { recursive: true, force: true })
  }
  console.log('[standalone] static assets copied into .next/standalone')
}
