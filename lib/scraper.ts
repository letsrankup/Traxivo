import * as cheerio from 'cheerio'

export interface ScrapedPage {
  url: string
  title: string
  description: string
  h1: string[]
  h2: string[]
  h3: string[]
  wordCount: number
  loadTime: number
  statusCode: number
  canonical: string
  robots: string
  ogTitle: string
  ogDesc: string
  ogImage: string
  schemaTypes: string[]
  internalLinks: number
  externalLinks: number
  links: string[]
  images: { src: string; hasAlt: boolean }[]
  rawHtml: string
}

export async function scrapePage(url: string): Promise<ScrapedPage> {
  const start = Date.now()

  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    },
    signal: AbortSignal.timeout(15000),
  })

  const loadTime = Date.now() - start
  const html = await res.text()
  const $ = cheerio.load(html)

  const domain = new URL(url).hostname

  const links: string[] = []
  let internalLinks = 0
  let externalLinks = 0

  $('a[href]').each((_, el) => {
    const href = $(el).attr('href') || ''
    links.push(href)
    if (href.includes(domain)) internalLinks++
    else if (href.startsWith('http')) externalLinks++
  })

  const images: { src: string; hasAlt: boolean }[] = []
  $('img').each((_, el) => {
    images.push({
      src: $(el).attr('src') || '',
      hasAlt: !!($(el).attr('alt') || '').trim(),
    })
  })

  const schemaTypes: string[] = []
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const json = JSON.parse($(el).html() || '{}')
      if (json['@type']) schemaTypes.push(json['@type'])
    } catch {}
  })

  const text = $('body').text().replace(/\s+/g, ' ').trim()
  const wordCount = text.split(' ').filter(Boolean).length

  return {
    url,
    title: $('title').text().trim(),
    description: $('meta[name="description"]').attr('content') || '',
    h1: $('h1').map((_, el) => $(el).text().trim()).get(),
    h2: $('h2').map((_, el) => $(el).text().trim()).get(),
    h3: $('h3').map((_, el) => $(el).text().trim()).get(),
    wordCount,
    loadTime,
    statusCode: res.status,
    canonical: $('link[rel="canonical"]').attr('href') || '',
    robots: $('meta[name="robots"]').attr('content') || '',
    ogTitle: $('meta[property="og:title"]').attr('content') || '',
    ogDesc: $('meta[property="og:description"]').attr('content') || '',
    ogImage: $('meta[property="og:image"]').attr('content') || '',
    schemaTypes,
    internalLinks,
    externalLinks,
    links,
    images,
    rawHtml: html,
  }
    }
