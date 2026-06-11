import * as cheerio from 'cheerio'

export interface ScrapedPage {
  url: string
  title: string
  description: string
  h1: string[]
  h2: string[]
  h3: string[]
  links: { href: string; text: string; internal: boolean }[]
  images: { src: string; alt: string; hasAlt: boolean }[]
  wordCount: number
  statusCode: number
  loadTime: number
  canonical: string
  robots: string
  ogTitle: string
  ogDesc: string
  ogImage: string
  schemaTypes: string[]
  internalLinks: number
  externalLinks: number
  brokenLinks: string[]
  rawHtml: string
}

export async function scrapePage(url: string): Promise<ScrapedPage> {
  const normalized = url.startsWith('http') ? url : `https://${url}`
  const start = Date.now()

  const res = await fetch(normalized, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; Traxivo/1.0; +https://traxivo.com)',
      'Accept': 'text/html,application/xhtml+xml',
    },
    signal: AbortSignal.timeout(15000),
  })

  const loadTime = Date.now() - start
  const html = await res.text()
  const $ = cheerio.load(html)
  const base = new URL(normalized)

  // Remove scripts/styles for text
  $('script, style, noscript').remove()

  // Links
  const links: ScrapedPage['links'] = []
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href') || ''
    const text = $(el).text().trim().slice(0, 100)
    if (!href || href.startsWith('#') || href.startsWith('mailto:')) return
    try {
      const abs = new URL(href, normalized).href
      links.push({
        href: abs,
        text,
        internal: new URL(abs).hostname === base.hostname,
      })
    } catch {}
  })

  // Images
  const images: ScrapedPage['images'] = []
  $('img').each((_, el) => {
    const src = $(el).attr('src') || ''
    const alt = $(el).attr('alt') || ''
    images.push({ src, alt, hasAlt: alt.length > 0 })
  })

  // Schema types
  const schemaTypes: string[] = []
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const json = JSON.parse($(el).html() || '{}')
      const type = json['@type'] || (Array.isArray(json) && json[0]?.['@type'])
      if (type) schemaTypes.push(Array.isArray(type) ? type.join(', ') : type)
    } catch {}
  })

  const bodyText = $('body').text().replace(/\s+/g, ' ').trim()
  const internal = links.filter(l => l.internal).length
  const external = links.filter(l => !l.internal).length

  return {
    url: normalized,
    title: $('title').text().trim(),
    description: $('meta[name="description"]').attr('content') || '',
    h1: $('h1').map((_, el) => $(el).text().trim()).get(),
    h2: $('h2').map((_, el) => $(el).text().trim()).get(),
    h3: $('h3').map((_, el) => $(el).text().trim()).get(),
    links,
    images,
    wordCount: bodyText.split(/\s+/).filter(Boolean).length,
    statusCode: res.status,
    loadTime,
    canonical: $('link[rel="canonical"]').attr('href') || '',
    robots: $('meta[name="robots"]').attr('content') || '',
    ogTitle: $('meta[property="og:title"]').attr('content') || '',
    ogDesc: $('meta[property="og:description"]').attr('content') || '',
    ogImage: $('meta[property="og:image"]').attr('content') || '',
    schemaTypes,
    internalLinks: internal,
    externalLinks: external,
    brokenLinks: [],
    rawHtml: html.slice(0, 5000),
  }
}

export async function scrapeMultiple(urls: string[]): Promise<ScrapedPage[]> {
  const results = await Promise.allSettled(urls.map(scrapePage))
  return results
    .filter((r): r is PromiseFulfilledResult<ScrapedPage> => r.status === 'fulfilled')
    .map(r => r.value)
        }
