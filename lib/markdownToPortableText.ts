export function markdownToPortableText(markdown: string): any[] {
  const blocks: any[] = []
  const lines = markdown.split('\n')
  let currentBlock: any = null
  let inCodeBlock = false
  let codeContent: string[] = []
  let codeLanguage = ''

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Code blocks
    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true
        codeLanguage = line.slice(3).trim() || 'javascript'
        codeContent = []
      } else {
        blocks.push({
          _type: 'code',
          _key: Math.random().toString(36).substring(7),
          language: codeLanguage,
          code: codeContent.join('\n')
        })
        inCodeBlock = false
      }
      continue
    }

    if (inCodeBlock) {
      codeContent.push(line)
      continue
    }

    // Headers
    if (line.startsWith('#')) {
      const level = line.match(/^#+/)?.[0].length || 1
      const text = line.replace(/^#+\s*/, '').trim()
      if (text) {
        blocks.push({
          _type: 'block',
          _key: Math.random().toString(36).substring(7),
          style: `h${Math.min(level, 4)}`,
          children: [{ _type: 'span', _key: Math.random().toString(36).substring(7), text }],
          markDefs: []
        })
      }
      continue
    }

    // Lists
    if (line.match(/^[\*\-]\s+/) || line.match(/^\d+\.\s+/)) {
      const isBullet = line.match(/^[\*\-]\s+/)
      const text = line.replace(/^[\*\-]\s+/, '').replace(/^\d+\.\s+/, '').trim()
      if (text) {
        blocks.push({
          _type: 'block',
          _key: Math.random().toString(36).substring(7),
          listItem: isBullet ? 'bullet' : 'number',
          children: parseInlineContent(text),
          markDefs: []
        })
      }
      continue
    }

    // Images
    const imageMatch = line.match(/!\[([^\]]*)\]\(([^)]+)\)/)
    if (imageMatch) {
      const [, alt, url] = imageMatch
      blocks.push({
        _type: 'image',
        _key: Math.random().toString(36).substring(7),
        asset: {
          _type: 'reference',
          _ref: url // In production, you'd upload to Sanity and get a reference
        },
        alt: alt || ''
      })
      continue
    }

    // YouTube links
    const youtubeMatch = line.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/[\w\-]+/)
    if (youtubeMatch) {
      blocks.push({
        _type: 'youtube',
        _key: Math.random().toString(36).substring(7),
        url: youtubeMatch[0]
      })
      continue
    }

    // Regular paragraphs
    const trimmed = line.trim()
    if (trimmed) {
      blocks.push({
        _type: 'block',
        _key: Math.random().toString(36).substring(7),
        style: 'normal',
        children: parseInlineContent(trimmed),
        markDefs: []
      })
    }
  }

  return blocks
}

function parseInlineContent(text: string): any[] {
  const children: any[] = []
  let remaining = text
  let lastIndex = 0

  // Simple parsing for bold, italic, code, and links
  const patterns = [
    { regex: /\*\*([^*]+)\*\*/g, mark: 'strong' },
    { regex: /\*([^*]+)\*/g, mark: 'em' },
    { regex: /`([^`]+)`/g, mark: 'code' },
    { regex: /\[([^\]]+)\]\(([^)]+)\)/g, mark: 'link' }
  ]

  // For now, just return plain text
  // In production, you'd implement proper markdown parsing
  return [{
    _type: 'span',
    _key: Math.random().toString(36).substring(7),
    text: text,
    marks: []
  }]
}