import fs from 'node:fs'
import path from 'node:path'

const RESOURCE_DIR = path.resolve('..', 'Resources', 'SYLLABUS 2026-27')
const TARGET_DIR = path.resolve('public', 'documents', 'syllabus')
const MANIFEST_PATH = path.resolve('content', 'syllabus-manifest.json')

const CLASS_CONFIG = [
  { slug: 'pre-reception', name: 'Pre-Reception', stage: 'Early Years', singleFile: 'Year Pre Reception.pdf' },
  { slug: 'reception', name: 'Reception', stage: 'Early Years', singleFile: 'Year Reception.pdf' },
  { slug: 'year-1', name: 'Year 1', stage: 'Primary', singleFile: 'Year 1.pdf' },
  { slug: 'year-2', name: 'Year 2', stage: 'Primary', singleFile: 'Year 2.pdf' },
  { slug: 'year-3', name: 'Year 3', stage: 'Primary', singleFile: 'Year 3.pdf' },
  { slug: 'year-4', name: 'Year 4', stage: 'Primary', singleFile: 'Year 4.pdf' },
  { slug: 'year-5', name: 'Year 5', stage: 'Primary', singleFile: 'Year 5.pdf' },
  { slug: 'year-6', name: 'Year 6', stage: 'Lower Secondary', folder: 'Year 6' },
  { slug: 'year-7', name: 'Year 7', stage: 'Lower Secondary', folder: 'Year 7' },
  { slug: 'year-8', name: 'Year 8', stage: 'Lower Secondary', folder: 'Year 8' },
  { slug: 'year-9', name: 'Year 9', stage: 'Cambridge IGCSE', folder: 'Year 9' },
  { slug: 'year-10', name: 'Year 10', stage: 'Cambridge IGCSE', folder: 'Year 10' },
  { slug: 'year-11', name: 'Year 11 (AS Level)', stage: 'AS & A Level', folder: 'AS' },
  { slug: 'year-12', name: 'Year 12 (A Level)', stage: 'AS & A Level', folder: 'A2' },
]

function parseFileInfo(fileName, classCfg) {
  const ext = path.extname(fileName).toLowerCase()
  if (ext !== '.pdf') return null

  const base = path.basename(fileName, ext)

  if (classCfg.singleFile) {
    return {
      subjectSlug: 'syllabus',
      subjectCode: 'SYLLABUS',
      displayName: 'Complete Class Syllabus',
      flag: null,
    }
  }

  if (fileName === 'Year 6.pdf') {
    return {
      subjectSlug: 'syllabus',
      subjectCode: 'SYLLABUS-OVERVIEW',
      displayName: 'Year 6 Syllabus Overview',
      flag: 'Flagged: Standalone whole-class syllabus overview',
    }
  }

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
      throw new Error(`Unmapped file: ${fileName} in class ${classCfg.slug}`)
  }
}

function run() {
  console.log(`Copying PDFs and building manifest...`)
  fs.mkdirSync(TARGET_DIR, { recursive: true })

  const classes = []
  let totalFiles = 0

  for (const c of CLASS_CONFIG) {
    const classDir = path.join(TARGET_DIR, c.slug)
    fs.mkdirSync(classDir, { recursive: true })

    const classItems = []

    if (c.singleFile) {
      const srcPath = path.join(RESOURCE_DIR, c.singleFile)
      const info = parseFileInfo(c.singleFile, c)
      const targetFileName = `${info.subjectSlug}.pdf`
      const destPath = path.join(classDir, targetFileName)

      fs.copyFileSync(srcPath, destPath)
      const stat = fs.statSync(destPath)
      totalFiles++

      classItems.push({
        subjectSlug: info.subjectSlug,
        subjectCode: info.subjectCode,
        displayName: info.displayName,
        fileName: targetFileName,
        url: `/documents/syllabus/${c.slug}/${targetFileName}`,
        fileSizeBytes: stat.size,
        fileSizeFormatted: `${(stat.size / 1024).toFixed(0)} KB`,
        flag: info.flag,
      })
    } else {
      const folderPath = path.join(RESOURCE_DIR, c.folder)
      const rawFiles = fs.readdirSync(folderPath).sort()

      for (const file of rawFiles) {
        if (file.startsWith('~$') || !file.toLowerCase().endsWith('.pdf')) continue

        const srcPath = path.join(folderPath, file)
        const info = parseFileInfo(file, c)
        const targetFileName = `${info.subjectSlug}.pdf`
        const destPath = path.join(classDir, targetFileName)

        fs.copyFileSync(srcPath, destPath)
        const stat = fs.statSync(destPath)
        totalFiles++

        classItems.push({
          subjectSlug: info.subjectSlug,
          subjectCode: info.subjectCode,
          displayName: info.displayName,
          fileName: targetFileName,
          url: `/documents/syllabus/${c.slug}/${targetFileName}`,
          fileSizeBytes: stat.size,
          fileSizeFormatted: `${(stat.size / 1024).toFixed(0)} KB`,
          flag: info.flag,
        })
      }
    }

    // Sort items alphabetically by displayName (or put overview first if present)
    classItems.sort((a, b) => {
      if (a.subjectSlug === 'syllabus') return -1
      if (b.subjectSlug === 'syllabus') return 1
      return a.displayName.localeCompare(b.displayName)
    })

    classes.push({
      slug: c.slug,
      name: c.name,
      stage: c.stage,
      academicYear: '2026-27',
      totalFiles: classItems.length,
      items: classItems,
    })
  }

  const manifest = {
    academicYear: '2026-27',
    generatedAt: new Date().toISOString(),
    totalClasses: classes.length,
    totalFiles,
    classes,
  }

  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true })
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf-8')

  console.log(`Successfully copied ${totalFiles} PDFs to public/documents/syllabus/`)
  console.log(`Generated manifest at: ${MANIFEST_PATH}`)
}

run()
