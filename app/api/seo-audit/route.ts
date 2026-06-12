import { NextRequest, NextResponse } from 'next/server'
import { scrapePage } from '@/lib/scraper'
import { analyzeSEO } from '@/lib/seo-analyzer'

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()
    if (!url) return NextResponse.json({ error: 'URL required' }, { status: 400 })

    const page = await scrapePage(url)
    const audit = analyzeSEO(page)

    return NextResponse.json({
      success: true,
      url: page.url,
      page: {
        title: page.title,
        description: page.description,
        h1: page.h1,
        h2: page.h2,
        wordCount: page.wordCount,
        loadTime: page.loadTime,
        statusCode: page.statusCode,
        canonical: page.canonical,
        robots: page.robots,
        ogTitle: page.ogTitle,
        ogDesc: page.ogDesc,
        ogImage: page.ogImage,
        schemaTypes: page.schemaTypes,
        internalLinks: page.internalLinks,
        externalLinks: page.externalLinks,
        imageCount: page.images.length,
        imagesWithAlt: page.images.filter(i => i.hasAlt).length,
      },
      audit,
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Audit failed' }, { status: 500 })
  }
}
