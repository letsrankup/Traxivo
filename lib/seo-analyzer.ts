import { ScrapedPage } from './scraper'

export interface SEOIssue {
  type: 'error' | 'warning' | 'info'
  category: string
  message: string
  fix: string
}

export interface SEOAudit {
  score: {
    overall: number
    technical: number
    content: number
    onpage: number
    ux: number
  }
  issues: SEOIssue[]
  passed: string[]
}

export function analyzeSEO(page: ScrapedPage): SEOAudit {
  const issues: SEOIssue[] = []
  const passed: string[] = []

  // Title checks
  if (!page.title) {
    issues.push({ type: 'error', category: 'On-Page', message: 'Missing page title', fix: 'Add a unique <title> tag' })
  } else if (page.title.length < 30) {
    issues.push({ type: 'warning', category: 'On-Page', message: `Title too short (${page.title.length} chars)`, fix: 'Expand title to 50-60 characters' })
  } else if (page.title.length > 60) {
    issues.push({ type: 'warning', category: 'On-Page', message: `Title too long (${page.title.length} chars)`, fix: 'Shorten title to under 60 characters' })
  } else {
    passed.push('Title length is optimal')
  }

  // Description checks
  if (!page.description) {
    issues.push({ type: 'error', category: 'On-Page', message: 'Missing meta description', fix: 'Add meta description (150-160 chars)' })
  } else if (page.description.length > 160) {
    issues.push({ type: 'warning', category: 'On-Page', message: 'Meta description too long', fix: 'Shorten to under 160 characters' })
  } else {
    passed.push('Meta description present')
  }

  // H1 checks
  if (page.h1.length === 0) {
    issues.push({ type: 'error', category: 'Content', message: 'No H1 tag found', fix: 'Add exactly one H1 tag with main keyword' })
  } else if (page.h1.length > 1) {
    issues.push({ type: 'warning', category: 'Content', message: `Multiple H1 tags (${page.h1.length})`, fix: 'Use only one H1 per page' })
  } else {
    passed.push('Single H1 tag present')
  }

  // Canonical
  if (!page.canonical) {
    issues.push({ type: 'warning', category: 'Technical', message: 'No canonical URL', fix: 'Add <link rel="canonical"> tag' })
  } else {
    passed.push('Canonical URL set')
  }

  // Images
  const noAltImages = page.images.filter(i => !i.hasAlt).length
  if (noAltImages > 0) {
    issues.push({ type: 'warning', category: 'Content', message: `${noAltImages} images missing alt text`, fix: 'Add descriptive alt attributes to all images' })
  } else if (page.images.length > 0) {
    passed.push('All images have alt text')
  }

  // Word count
  if (page.wordCount < 300) {
    issues.push({ type: 'warning', category: 'Content', message: `Thin content (${page.wordCount} words)`, fix: 'Add more content, aim for 800+ words' })
  } else {
    passed.push(`Good content length (${page.wordCount} words)`)
  }

  // Load time
  if (page.loadTime > 3000) {
    issues.push({ type: 'error', category: 'Performance', message: `Slow load time (${(page.loadTime/1000).toFixed(2)}s)`, fix: 'Optimize images and reduce server response time' })
  } else {
    passed.push(`Fast load time (${(page.loadTime/1000).toFixed(2)}s)`)
  }

  // Schema
  if (page.schemaTypes.length === 0) {
    issues.push({ type: 'info', category: 'Technical', message: 'No structured data', fix: 'Add JSON-LD schema markup' })
  } else {
    passed.push(`Schema markup found: ${page.schemaTypes.join(', ')}`)
  }

  // OG tags
  if (!page.ogTitle) {
    issues.push({ type: 'info', category: 'Social', message: 'Missing Open Graph title', fix: 'Add og:title meta tag' })
  } else {
    passed.push('Open Graph tags present')
  }

  // HTTPS
  if (!page.url.startsWith('https')) {
    issues.push({ type: 'error', category: 'Security', message: 'Not using HTTPS', fix: 'Install SSL certificate' })
  } else {
    passed.push('HTTPS enabled')
  }

  // Score calc
  const errorCount = issues.filter(i => i.type === 'error').length
  const warningCount = issues.filter(i => i.type === 'warning').length
  const technical = Math.max(0, 100 - errorCount * 20 - warningCount * 5)
  const content = Math.min(100, (page.wordCount > 800 ? 40 : 20) + (page.h1.length === 1 ? 20 : 0) + (page.h2.length > 2 ? 20 : 0) + (noAltImages === 0 ? 20 : 0))
  const onpage = Math.max(0, 100 - (issues.filter(i => i.category === 'On-Page').length * 15))
  const ux = page.loadTime < 2000 ? 90 : page.loadTime < 3000 ? 70 : 40
  const overall = Math.round((technical + content + onpage + ux) / 4)

  return { score: { overall, technical, content, onpage, ux }, issues, passed }
}
