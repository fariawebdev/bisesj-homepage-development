import React from 'react'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'

/**
 * Loads markdown content from content/pages/<slug>.md
 */
export function getPageMarkdown(slug: string): string {
  const filePath = path.join(process.cwd(), 'content/pages', `${slug}.md`)
  if (!fs.existsSync(filePath)) {
    return ''
  }
  return fs.readFileSync(filePath, 'utf8')
}

/**
 * Formats inline markdown (bold, italic, code, links)
 */
function renderInline(text: string): React.ReactNode[] {
  // Pattern for [text](url), **bold**, *italic*, `code`
  const regex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`)/g
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index))
    }

    if (match[2] && match[3]) {
      // Link: [text](href)
      const linkText = match[2]
      const href = match[3]
      const isInternal = href.startsWith('/') || href.startsWith('#')
      if (isInternal) {
        parts.push(
          <Link key={match.index} href={href} className="text-primary underline font-medium hover:text-gold transition-colors">
            {linkText}
          </Link>
        )
      } else {
        parts.push(
          <a
            key={match.index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline font-medium hover:text-gold transition-colors"
          >
            {linkText}
          </a>
        )
      }
    } else if (match[4]) {
      // Bold: **text**
      parts.push(
        <strong key={match.index} className="font-semibold text-foreground">
          {match[4]}
        </strong>
      )
    } else if (match[5]) {
      // Italic: *text*
      parts.push(
        <em key={match.index} className="italic text-foreground/90">
          {match[5]}
        </em>
      )
    } else if (match[6]) {
      // Inline code: `code`
      parts.push(
        <code key={match.index} className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-primary font-medium">
          {match[6]}
        </code>
      )
    }

    lastIndex = regex.lastIndex
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex))
  }

  return parts
}

/**
 * Clean, safe Markdown renderer for inner pages without third-party dependencies.
 */
export function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split(/\r?\n/)
  const elements: React.ReactNode[] = []
  let index = 0

  while (index < lines.length) {
    const line = lines[index]
    const trimmed = line.trim()

    // Skip empty lines
    if (!trimmed) {
      index++
      continue
    }

    // Horizontal Rule
    if (/^(\*\*\*|---|___)$/.test(trimmed)) {
      elements.push(<hr key={index} className="my-8 border-t border-border" />)
      index++
      continue
    }

    // Headings
    if (trimmed.startsWith('# ')) {
      // Document H1 is rendered by InnerPage header to preserve a single semantic H1 on the page.
      index++
      continue
    }
    if (trimmed.startsWith('## ')) {
      elements.push(
        <h2 key={index} className="font-serif text-2xl font-bold tracking-tight text-forest mt-10 mb-4 border-b border-border/60 pb-2">
          {renderInline(trimmed.substring(3))}
        </h2>
      )
      index++
      continue
    }
    if (trimmed.startsWith('### ')) {
      elements.push(
        <h3 key={index} className="font-serif text-xl font-semibold text-foreground mt-6 mb-3">
          {renderInline(trimmed.substring(4))}
        </h3>
      )
      index++
      continue
    }
    if (trimmed.startsWith('#### ')) {
      elements.push(
        <h4 key={index} className="text-lg font-semibold text-foreground mt-4 mb-2">
          {renderInline(trimmed.substring(5))}
        </h4>
      )
      index++
      continue
    }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      const quoteLines: string[] = []
      while (index < lines.length && (lines[index].trim().startsWith('> ') || lines[index].trim() === '>')) {
        quoteLines.push(lines[index].trim().replace(/^>\s?/, ''))
        index++
      }
      elements.push(
        <blockquote key={index} className="border-s-4 border-gold bg-gold/5 p-4 rounded-r-xl italic my-4 text-foreground/90">
          {quoteLines.map((ql, qIdx) => (
            <p key={qIdx} className={qIdx > 0 ? 'mt-2' : ''}>
              {renderInline(ql)}
            </p>
          ))}
        </blockquote>
      )
      continue
    }

    // Table
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const tableLines: string[] = []
      while (index < lines.length && lines[index].trim().startsWith('|') && lines[index].trim().endsWith('|')) {
        tableLines.push(lines[index].trim())
        index++
      }

      if (tableLines.length >= 2) {
        const headerRow = tableLines[0]
          .slice(1, -1)
          .split('|')
          .map((c) => c.trim())
        const dataRows = tableLines.slice(2).map((row) =>
          row
            .slice(1, -1)
            .split('|')
            .map((c) => c.trim())
        )

        elements.push(
          <div key={index} className="my-6 overflow-x-auto rounded-2xl border border-border shadow-soft">
            <table className="w-full text-sm text-start">
              <thead className="bg-muted/60 text-foreground font-semibold">
                <tr>
                  {headerRow.map((cell, cIdx) => (
                    <th key={cIdx} className="px-4 py-3 text-start border-b border-border font-semibold">
                      {renderInline(cell)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 bg-card">
                {dataRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-muted/20 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-3 text-start text-muted-foreground align-top">
                        {renderInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      }
      continue
    }

    // Unordered List (- or *)
    if (/^[-*]\s+/.test(trimmed)) {
      const listItems: string[] = []
      while (index < lines.length && /^[-*]\s+/.test(lines[index].trim())) {
        listItems.push(lines[index].trim().replace(/^[-*]\s+/, ''))
        index++
      }
      elements.push(
        <ul key={index} className="list-disc list-inside space-y-1.5 my-3 text-muted-foreground ps-2">
          {listItems.map((item, lIdx) => (
            <li key={lIdx} className="leading-relaxed">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      )
      continue
    }

    // Ordered List (1. 2. etc)
    if (/^\d+\.\s+/.test(trimmed)) {
      const listItems: string[] = []
      while (index < lines.length && /^\d+\.\s+/.test(lines[index].trim())) {
        listItems.push(lines[index].trim().replace(/^\d+\.\s+/, ''))
        index++
      }
      elements.push(
        <ol key={index} className="list-decimal list-inside space-y-1.5 my-3 text-muted-foreground ps-2">
          {listItems.map((item, lIdx) => (
            <li key={lIdx} className="leading-relaxed">
              {renderInline(item)}
            </li>
          ))}
        </ol>
      )
      continue
    }

    // Regular paragraph
    elements.push(
      <p key={index} className="text-base leading-relaxed text-muted-foreground my-3">
        {renderInline(trimmed)}
      </p>
    )
    index++
  }

  return <div className="space-y-2">{elements}</div>
}
