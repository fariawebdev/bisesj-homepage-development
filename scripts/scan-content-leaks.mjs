import fs from 'fs'
import path from 'path'

function walk(dir) {
  let files = []
  if (!fs.existsSync(dir)) return files
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f)
    if (fs.statSync(full).isDirectory()) files.push(...walk(full))
    else if (full.endsWith('.html')) files.push(full)
  }
  return files
}

const terms = [
  'Source Page ID',
  'Last Updated',
  'Recommended Enhancements',
  'TODO',
  'CONFIRM',
  'REPLACE',
  'Lorem',
]

// 1. Scan content/pages/*.md
console.log('--- SCANNING content/pages/*.md ---')
const mdFiles = fs.readdirSync('content/pages').filter(f => f.endsWith('.md'))
let mdHits = 0
for (const file of mdFiles) {
  const content = fs.readFileSync(path.join('content/pages', file), 'utf8')
  for (const term of terms) {
    if (content.includes(term)) {
      console.log(`HIT in content/pages/${file}: "${term}"`)
      mdHits++
    }
  }
}
if (mdHits === 0) {
  console.log(`Clean: All ${mdFiles.length} markdown pages scanned. 0 leaks found.`)
}

// 2. Scan built HTML files
console.log('\n--- SCANNING .next/server/app/**/*.html ---')
const htmlFiles = walk(path.join('.next', 'server', 'app'))
let htmlHits = 0
for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8')
  for (const term of terms) {
    if (content.includes(term)) {
      console.log(`HIT in ${file}: "${term}"`)
      htmlHits++
    }
  }
}
if (htmlHits === 0) {
  console.log(`Clean: All ${htmlFiles.length} built HTML files scanned. 0 leaks found.`)
}
