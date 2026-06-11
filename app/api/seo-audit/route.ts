import { NextRequest, NextResponse } from 'next/server'
import { scrapePage } from '@/lib/scraper'
import { analyzeSEO } from '@/lib/seo-analyzer'
import { analyzeWithGemini } from '@/lib/gemini'

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()
    if (!url) return NextResponse.json({ error: 'URL required' }, { status: 400 })

    // Scrape the page
    const page = await scrapePage(url)

    // Run SEO analysis
    const audit = analyzeSEO(page)

    // Get AI recommendations
    const aiPrompt = `
You are an SEO expert. Analyze this page data and give 5 specific actionable recommendations:

URL: ${page.url}
Title: ${page.title}
Description: ${page.description}
H1: ${page.h1.join(', ')}
Word Count: ${page.wordCount}
Load Time: ${page.loadTime}ms
Issues Found: ${audit.issues.length}
Overall Score: ${audit.score.overall}/100

Give 5 specific, actionable SEO improvements. Be concise and direct.
    `

    const aiInsights = await analyzeWithGemini(aiPrompt)

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
      aiInsights,
    })
  } catch (err: any) {
    console.error('SEO Audit error:', err)
    return NextResponse.json(
      { error: err.message || 'Audit failed' },
      { status: 500 }
    )
  }
                   }
