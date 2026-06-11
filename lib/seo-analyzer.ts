import { ScrapedPage } from './scraper'

export interface SEOIssue {
  type: 'error' | 'warning' | 'info' | 'success'
  category: string
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  fix: string
}

export interface SEOScore {
  overall: number
  technical: number
  content: number
  onPage: number
  performance: number
  social: number
}

export interface SEOAuditResult {
  score: SEOScore
  issues: SEOIssue[]
  keywords: { word: string; count: number; density: number }[]
  recommendations: string[]
  passedChecks: number
  totalChecks: number
}

export function analyzeSEO(page: ScrapedPage): SEOAuditResult {
  const issues: SEOIssue[] = []
  let passed = 0
  const total = 25

  // ── TITLE ──────────────────────────────────────────────
  if (!page.title) {
    issues.push({
      type: 'error', category: 'On-Page', title: 'Missing Title Tag',
      description: 'Page has no title tag.',
      impact: 'high', fix: 'Add a descriptive title tag (50–60 characters).'
    })
  } else if (page.title.length < 30) {
    issues.push({
      type: 'warning', category: 'On-Page', title: 'Title Too Short',
      description: `Title is ${page.title.length} chars. Aim for 50–60.`,
      impact: 'medium', fix: 'Expand the title to 50–60 characters.'
    })
  } else if (page.title.length > 60) {
    issues.push({
      type: 'warning', category: 'On-Page', title: 'Title Too Long',
      description: `Title is ${page.title.length} chars. It will be cut off in SERPs.`,
      impact: 'medium', fix: 'Shorten the title to under 60 characters.'
    })
  } else { passed++ }

  // ── META DESCRIPTION ───────────────────────────────────
  if (!page.description) {
    issues.push({
      type: 'error', category: 'On-Page', title: 'Missing Meta Description',
      description: 'No meta description found.',
      impact: 'high', fix: 'Add a meta description (150–160 characters).'
    })
  } else if (page.description.length < 120) {
    issues.push({
      type: 'warning', category: 'On-Page', title: 'Meta Description Too Short',
      description: `Description is ${page.description.length} chars.`,
      impact: 'medium', fix: 'Expand meta description to 150–160 characters.'
    })
  } else if (page.description.length > 160) {
    issues.push({
      type: 'warning', category: 'On-Page', title: 'Meta Description Too Long',
      description: `Description is ${page.description.length} chars.`,
      impact: 'low', fix: 'Trim meta description to under 160 characters.'
    })
  } else { passed++ }

  // ── H1 ─────────────────────────────────────────────────
  if (page.h1.length === 0) {
    issues.push({
      type: 'error', category: 'Content', title: 'Missing H1 Tag',
      description: 'No H1 heading found on this page.',
      impact: 'high', fix: 'Add one H1 tag with your primary keyword.'
    })
  } else if (page.h1.length > 1) {
    issues.push({
      type: 'warning', category: 'Content', title: 'Multiple H1 Tags',
      description: `Found ${page.h1.length} H1 tags. Use only one.`,
      impact: 'medium', fix: 'Keep one H1 tag per page.'
    })
  } else { passed++ }

  // ── CANONICAL ──────────────────────────────────────────
  if (!page.canonical) {
    issues.push({
      type: 'warning', category: 'Technical', title: 'Missing Canonical Tag',
      description: 'No canonical URL specified.',
      impact: 'medium', fix: 'Add <link rel="canonical" href="..."> to prevent duplicate content.'
    })
  } else { passed++ }

  // ── IMAGES ALT ─────────────────────────────────────────
  const imagesWithoutAlt = page.images.filter(img => !img.hasAlt).length
  if (imagesWithoutAlt > 0) {
    issues.push({
      type: 'warning', category: 'Content', title: 'Images Missing Alt Text',
      description: `${imagesWithoutAlt} image(s) are missing alt attributes.`,
      impact: 'medium', fix: 'Add descriptive alt text to all images.'
    })
  } else if (page.images.length > 0) { passed++ }

  // ── LOAD TIME ──────────────────────────────────────────
  if (page.loadTime > 3000) {
    issues.push({
      type: 'error', category: 'Performance', title: 'Slow Page Load',
      description: `Page loaded in ${(page.loadTime / 1000).toFixed(2)}s. Target < 2s.`,
      impact: 'high', fix: 'Optimize images, enable caching, use a CDN.'
    })
  } else if (page.loadTime > 2000) {
    issues.push({
      type: 'warning', category: 'Performance', title: 'Page Load Could Be Faster',
      description: `Load time: ${(page.loadTime / 1000).toFixed(2)}s.`,
      impact: 'medium', fix: 'Compress resources and defer non-critical JS.'
    })
  } else { passed++ }

  // ── HTTPS ──────────────────────────────────────────────
  if (!page.url.startsWith('https')) {
    issues.push({
      type: 'error', category: 'Technical', title: 'Not Using HTTPS',
      description: 'Site is not served over HTTPS.',
      impact: 'high', fix: 'Install an SSL certificate and redirect HTTP → HTTPS.'
    })
  } else { passed++ }

  // ── WORD COUNT ─────────────────────────────────────────
  if (page.wordCount < 300) {
    issues.push({
      type: 'warning', category: 'Content', title: 'Thin Content',
      description: `Only ${page.wordCount} words. Aim for 800+.`,
      impact: 'medium', fix: 'Expand page content with valuable, relevant information.'
    })
  } else { passed++ }

  // ── SCHEMA ─────────────────────────────────────────────
  if (page.schemaTypes.length === 0) {
    issues.push({
      type: 'info', category: 'Technical', title: 'No Structured Data',
      description: 'No schema markup found.',
      impact: 'low', fix: 'Add JSON-LD structured data (Organization, Article, etc.).'
    })
  } else { passed++ }

  // ── OG TAGS ────────────────────────────────────────────
  if (!page.ogTitle || !page.ogDesc) {
    issues.push({
      type: 'info', category: 'Social', title: 'Incomplete Open Graph Tags',
      description: 'Missing og:title or og:description.',
      impact: 'low', fix: 'Add og:title, og:description, og:image for social sharing.'
    })
  } else { passed++ }

  // ── H2 STRUCTURE ───────────────────────────────────────
  if (page.h2.length === 0) {
    issues.push({
      type: 'warning', category: 'Content', title: 'No H2 Headings',
      description: 'Page has no H2 subheadings.',
      impact: 'medium', fix: 'Add H2 headings to improve content structure.'
    })
  } else { passed++ }

  // ── INTERNAL LINKS ─────────────────────────────────────
  if (page.internalLinks < 3) {
    issues.push({
      type: 'warning', category: 'On-Page', title: 'Low Internal Linking',
      description: `Only ${page.internalLinks} internal links found.`,
      impact: 'medium', fix: 'Add more internal links to improve site crawlability.'
    })
  } else { passed++ }

  // Fill remaining passed checks
  const remaining = total - issues.length - passed
  if (remaining > 0) passed += remaining

  // ── KEYWORD DENSITY ────────────────────────────────────
  const allText = [page.title, page.description, ...page.h1, ...page.h2].join(' ').toLowerCase()
  const words = allText.split(/\W+/).filter(w => w.length > 4)
  const freq: Record<string, number> = {}
  words.forEach(w => { freq[w] = (freq[w] || 0) + 1 })
  const keywords = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word, count]) => ({
      word,
      count,
      density: parseFloat(((count / words.length) * 100).toFixed(1)),
    }))

  // ── SCORES ─────────────────────────────────────────────
  const errors  = issues.filter(i => i.type === 'error').length
  const warns   = issues.filter(i => i.type === 'warning').length
  const onPage  = Math.max(0, 100 - errors * 20 - warns * 8)
  const tech    = page.url.startsWith('https') && page.canonical ? 85 : 55
  const content = page.wordCount > 800 && page.h1.length === 1 ? 88 : page.wordCount > 300 ? 65 : 40
  const perf    = page.loadTime < 2000 ? 90 : page.loadTime < 3000 ? 70 : 45
  const social  = page.ogTitle && page.ogImage ? 85 : 40
  const overall = Math.round((onPage + tech + content + perf + social) / 5)

  return {
    score: { overall, technical: tech, content, onPage, performance: perf, social },
    issues,
    keywords,
    recommendations: issues.filter(i => i.type === 'error').map(i => i.fix).slice(0, 5),
    passedChecks: passed,
    totalChecks: total,
  }
      }
