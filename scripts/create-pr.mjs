import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

async function createPR() {
  const credPath = path.join(os.homedir(), '.git-credentials')
  const creds = fs.readFileSync(credPath, 'utf-8')
  const match = creds.match(/https:\/\/([^:]+):([^@]+)@github\.com/)
  if (!match) {
    throw new Error('No github credentials found in ~/.git-credentials')
  }
  const token = match[2]

  const prFile = process.argv[2]
  if (!prFile || !fs.existsSync(prFile)) {
    throw new Error(`PR payload file not found: ${prFile}`)
  }

  const payload = JSON.parse(fs.readFileSync(prFile, 'utf-8'))

  const res = await fetch('https://api.github.com/repos/fariawebdev/bisesj-homepage-development/pulls', {
    method: 'POST',
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'Node-Fetch',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const json = await res.json()
  if (!res.ok) {
    console.error('Error creating PR:', json)
    process.exit(1)
  }

  console.log(`PR Created: ${json.html_url} (Number: ${json.number})`)
}

createPR()
