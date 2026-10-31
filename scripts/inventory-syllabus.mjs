import fs from 'node:fs'
import path from 'node:path'

const RESOURCE_DIR = path.resolve('..', 'Resources', 'SYLLABUS 2026-27')
const OUTPUT_FILE = path.resolve('docs', 'syllabus-inventory.md')

const CLASS_CONFIG = [
  { slug: 'pre-reception', name: 'Pre-Reception', stage: 'Early Years', singleFile: 'Year Pre Reception.pdf' },
  { slug: 'reception', name: 'Reception', stage: 'Early Years', singleFile: 'Year Reception.pdf' },
  { slug: 'year-1', name: 'Year 1', stage: 'Primary (Key Stage 1)', singleFile: 'Year 1.pdf' },
  { slug: 'year-2', name: 'Year 2', stage: 'Primary (Key Stage 1)', singleFile: 'Year 2.pdf' },
  { slug: 'year-3', name: 'Year 3', stage: 'Primary (Key Stage 2)', singleFile: 'Year 3.pdf' },
  { slug: 'year-4', name: 'Year 4', stage: 'Primary (Key Stage 2)', singleFile: 'Year 4.pdf' },
  { slug: 'year-5', name: 'Year 5', stage: 'Primary (Key Stage 2)', singleFile: 'Year 5.pdf' },
  { slug: 'year-6', name: 'Year 6', stage: 'Primary (Key Stage 2)', folder: 'Year 6' },
  { slug: 'year-7', name: 'Year 7', stage: 'Secondary (Key Stage 3)', folder: 'Year 7' },
  { slug: 'year-8', name: 'Year 8', stage: 'Secondary (Key Stage 3)', folder: 'Year 8' },
  { slug: 'year-9', name: 'Year 9', stage: 'Secondary (Key Stage 3)', folder: 'Year 9' },
  { slug: 'year-10', name: 'Year 10', stage: 'Secondary (Key Stage 4 / IGCSE)', folder: 'Year 10' },
  { slug: 'year-11', name: 'Year 11 (AS Level)', stage: 'AS & A Level', folder: 'AS' },
  { slug: 'year-12', name: 'Year 12 (A Level)', stage: 'AS & A Level', folder: 'A2' },
]

// Normalization mappings
function parseFileInfo(fileName, classCfg) {
  const ext = path.extname(fileName).toLowerCase()
  if (ext !== '.pdf') return null

  const base = path.basename(fileName, ext)

  // Single-file classes
  if (classCfg.singleFile) {
    return {
      subjectSlug: 'syllabus',
      subjectCode: 'SYLLABUS',
      displayName: 'Complete Class Syllabus',
      flag: null,
    }
  }

  // Multi-file classes
  // Specific file checks
  if (fileName === 'Year 6.pdf') {
    return {
      subjectSlug: 'syllabus',
      subjectCode: 'SYLLABUS-OVERVIEW',
      displayName: 'Year 6 Syllabus Overview',
      flag: 'Flagged: Standalone whole-class syllabus overview; preserved distinct from subject files',
    }
  }

  // Pattern matching for subjects
  const clean = base
    .replace(/^Year\s*6\s*/i, '')
    .replace(/^YEAR\s*7\s*/i, '')
    .replace(/^ARABIC\s*YEAR\s*7$/i, 'ARABIC')
    .replace(/^BENGALI\s*YEAR\s*7$/i, 'BENGALI')
    .replace(/^ICT\s*YEAR\s*7$/i, 'ICT')
    .replace(/^YEAR\s*8\s*/i, '')
    .replace(/^YEAR\s*9\s*/i, '')
    .replace(/^YEAR\s*10\s*/i, '')
    .replace(/^Y10\s*/i, '')
    .replace(/^CS\s*Y\s*10$/i, 'CS')
    .replace(/^AS\s*/i, '')
    .replace(/^A2\s*/i, '')
    .trim()

  const upper = clean.toUpperCase()

  switch (upper) {
    case 'ACCOUNTING':
      return { subjectSlug: 'accounting', subjectCode: 'ACC', displayName: 'Accounting', flag: null }
    case 'ADD MATH':
      return { subjectSlug: 'additional-mathematics', subjectCode: 'ADD-MATH', displayName: 'Additional Mathematics', flag: null }
    case 'ARABIC':
      return { subjectSlug: 'arabic', subjectCode: 'ARB', displayName: 'Arabic', flag: null }
    case 'ART AND CRAFT':
      return { subjectSlug: 'art-and-craft', subjectCode: 'ART', displayName: 'Art and Craft', flag: null }
    case 'B.ST':
      return {
        subjectSlug: 'b-st',
        subjectCode: 'B.ST',
        displayName: 'B.ST',
        flag: 'Flagged abbreviation: Displayed as B.ST (Eva confirmation needed: Business Studies)',
      }
    case 'BENGALI':
      return { subjectSlug: 'bengali', subjectCode: 'BEN', displayName: 'Bengali', flag: null }
    case 'BIOLOGY':
      return { subjectSlug: 'biology', subjectCode: 'BIO', displayName: 'Biology', flag: null }
    case 'CHEMISTRY':
      return { subjectSlug: 'chemistry', subjectCode: 'CHEM', displayName: 'Chemistry', flag: null }
    case 'CS':
      return {
        subjectSlug: 'cs',
        subjectCode: 'CS',
        displayName: 'CS',
        flag: 'Flagged abbreviation: Displayed as CS (Eva confirmation needed: Computer Science)',
      }
    case 'ENGLISH':
      return { subjectSlug: 'english', subjectCode: 'ENG', displayName: 'English', flag: null }
    case 'ENGLISH PAPER 1':
      return { subjectSlug: 'english-paper-1', subjectCode: 'ENG-P1', displayName: 'English Paper 1', flag: null }
    case 'ENGLISH PAPER 2':
      return { subjectSlug: 'english-paper-2', subjectCode: 'ENG-P2', displayName: 'English Paper 2', flag: null }
    case 'ICT':
      return { subjectSlug: 'ict', subjectCode: 'ICT', displayName: 'ICT', flag: null }
    case 'ISLAMIC':
    case 'ISLAMIC ST.':
    case 'ISLAMIC ST':
      return { subjectSlug: 'islamic-studies', subjectCode: 'ISL', displayName: 'Islamic Studies', flag: null }
    case 'IT':
      return { subjectSlug: 'it', subjectCode: 'IT', displayName: 'IT', flag: null }
    case 'MAIN ARABIC':
      return { subjectSlug: 'main-arabic', subjectCode: 'MAIN-ARB', displayName: 'Main Arabic', flag: null }
    case 'MATH':
    case 'MATHEMATICS':
      return { subjectSlug: 'mathematics', subjectCode: 'MATH', displayName: 'Mathematics', flag: null }
    case 'PHYSICS':
      return { subjectSlug: 'physics', subjectCode: 'PHY', displayName: 'Physics', flag: null }
    case 'QURAN':
      return { subjectSlug: 'quran', subjectCode: 'QUR', displayName: 'Quran', flag: null }
    case 'SAC':
      return {
        subjectSlug: 'sac',
        subjectCode: 'SAC',
        displayName: 'SAC',
        flag: 'Flagged abbreviation: Displayed as SAC (Eva confirmation needed: Saudi Arabian Culture / Social Studies)',
      }
    case 'SCIENCE':
      return { subjectSlug: 'science', subjectCode: 'SCI', displayName: 'Science', flag: null }
    case 'SOCIAL STUDIES':
      return { subjectSlug: 'social-studies', subjectCode: 'SOC', displayName: 'Social Studies', flag: null }
    default:
      throw new Error(`Unmapped file: ${fileName} (clean: ${clean}) in class ${classCfg.slug}`)
  }
}

function run() {
  console.log(`Scanning syllabus directory: ${RESOURCE_DIR}`)
  if (!fs.existsSync(RESOURCE_DIR)) {
    throw new Error(`Resources directory does not exist: ${RESOURCE_DIR}`)
  }

  const inventory = []
  let totalBytes = 0
  let maxFileBytes = 0
  let maxFileName = ''

  for (const classCfg of CLASS_CONFIG) {
    if (classCfg.singleFile) {
      const fullPath = path.join(RESOURCE_DIR, classCfg.singleFile)
      if (!fs.existsSync(fullPath)) {
        throw new Error(`Expected single file missing: ${fullPath}`)
      }
      const stat = fs.statSync(fullPath)
      totalBytes += stat.size
      if (stat.size > maxFileBytes) {
        maxFileBytes = stat.size
        maxFileName = classCfg.singleFile
      }

      const info = parseFileInfo(classCfg.singleFile, classCfg)
      inventory.push({
        classSlug: classCfg.slug,
        className: classCfg.name,
        stage: classCfg.stage,
        sourceRelative: classCfg.singleFile,
        sizeBytes: stat.size,
        sizeKB: (stat.size / 1024).toFixed(1),
        ...info,
      })
    } else {
      const folderPath = path.join(RESOURCE_DIR, classCfg.folder)
      if (!fs.existsSync(folderPath)) {
        throw new Error(`Expected folder missing: ${folderPath}`)
      }

      const files = fs.readdirSync(folderPath).sort()
      for (const file of files) {
        if (file.startsWith('~$') || !file.toLowerCase().endsWith('.pdf')) {
          continue // ignore lock files or non-pdfs
        }
        const fullPath = path.join(folderPath, file)
        const stat = fs.statSync(fullPath)
        totalBytes += stat.size
        if (stat.size > maxFileBytes) {
          maxFileBytes = stat.size
          maxFileName = `${classCfg.folder}/${file}`
        }

        const info = parseFileInfo(file, classCfg)
        inventory.push({
          classSlug: classCfg.slug,
          className: classCfg.name,
          stage: classCfg.stage,
          sourceRelative: `${classCfg.folder}/${file}`,
          sizeBytes: stat.size,
          sizeKB: (stat.size / 1024).toFixed(1),
          ...info,
        })
      }
    }
  }

  const totalMB = (totalBytes / (1024 * 1024)).toFixed(2)
  const maxMB = (maxFileBytes / (1024 * 1024)).toFixed(2)

  console.log(`Scanned ${inventory.length} PDFs across ${CLASS_CONFIG.length} classes.`)
  console.log(`Total size: ${totalMB} MB (${totalBytes} bytes)`)
  console.log(`Max file size: ${maxMB} MB (${maxFileName})`)

  if (totalBytes > 100 * 1024 * 1024) {
    throw new Error(`STOP: Total PDF size exceeds 100 MB (${totalMB} MB)!`)
  }
  if (maxFileBytes > 10 * 1024 * 1024) {
    throw new Error(`STOP: File ${maxFileName} exceeds 10 MB (${maxMB} MB)!`)
  }
  if (inventory.length !== 85) {
    throw new Error(`STOP: Expected 85 files, found ${inventory.length}!`)
  }

  // Generate docs/syllabus-inventory.md
  let md = `# Syllabus Inventory (Academic Session 2026-27)\n\n`
  md += `Generated by \`scripts/inventory-syllabus.mjs\` on ${new Date().toISOString()}.\n\n`
  md += `## Summary Statistics\n`
  md += `- **Total Classes:** 14\n`
  md += `- **Total Syllabus PDFs:** 85\n`
  md += `- **Total File Size:** ${totalMB} MB (${totalBytes.toLocaleString()} bytes)\n`
  md += `- **Maximum File Size:** ${maxMB} MB (\`${maxFileName}\`)\n`
  md += `- **Size Compliance:** PASS (Total < 100 MB, all files < 10 MB)\n\n`

  md += `## Class Breakdown\n\n`
  md += `| Class | Stage | Files | Total Size (KB) |\n`
  md += `| :--- | :--- | :---: | :---: |\n`

  for (const c of CLASS_CONFIG) {
    const classFiles = inventory.filter((i) => i.classSlug === c.slug)
    const classSize = classFiles.reduce((acc, f) => acc + f.sizeBytes, 0)
    md += `| ${c.name} | ${c.stage} | ${classFiles.length} | ${(classSize / 1024).toFixed(1)} KB |\n`
  }

  md += `\n## Flagged Items (Requires Confirmation from Eva)\n\n`
  md += `1. **\`B.ST\`**: Preserved verbatim as "B.ST". Used in Year 8, Year 9, Year 10, Year 11 (AS Level), and Year 12 (A Level). Likely stands for *Business Studies*.\n`
  md += `2. **\`CS\`**: Preserved verbatim as "CS". Used in Year 9 and Year 10. Likely stands for *Computer Science*.\n`
  md += `3. **\`SAC\`**: Preserved verbatim as "SAC". Used in Year 6, Year 9, and Year 12 (A Level). Likely stands for *Saudi Arabian Culture / Social Studies*.\n`
  md += `4. **\`Year 6.pdf\`**: Preserved as "Year 6 Syllabus Overview" alongside the 13 individual subject files in Year 6.\n\n`

  md += `## Complete File Inventory (85 Files)\n\n`
  md += `| # | Class | Subject / Title | Subject Slug | Target PDF Path | Size (KB) | Flags / Notes |\n`
  md += `| :-: | :--- | :--- | :--- | :--- | -: | :--- |\n`

  inventory.forEach((item, idx) => {
    const targetPath = `/documents/syllabus/${item.classSlug}/${item.subjectSlug}.pdf`
    const note = item.flag ? item.flag : '-'
    md += `| ${idx + 1} | ${item.className} | ${item.displayName} | \`${item.subjectSlug}\` | \`${targetPath}\` | ${item.sizeKB} | ${note} |\n`
  })

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true })
  fs.writeFileSync(OUTPUT_FILE, md, 'utf-8')
  console.log(`Wrote inventory documentation to: ${OUTPUT_FILE}`)
}

run()
