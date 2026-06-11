import { NextRequest, NextResponse } from 'next/server'
import { scrapePage } from '@/lib/scraper'
import { analyzeWithGemini } from '@/lib/gemini'

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()
    if (!url) return NextResponse.json({ error: 'URL required' }, { status: 400 })

    const page = await scrapePage(url)

    // Performance score
    const perfScore = Math.max(0, Math.min(100,
      100 - Math.floor(page.loadTime / 50)
    ))

    // SEO score quick calc
    let seoScore = 100
    if (!page.title) seoScore -= 20
    if (!page.description) seoScore -= 15
    if (page.h1.length === 0) seoScore -= 15
    if (!page.canonical) seoScore -= 10
    if (page.images.some(i => !i.hasAlt)) seoScore -= 10

    // Security check
    const isHttps = page.url.startsWith('https')
    const hasRobots = page.robots.length > 0

    // Tech stack detection based on rawHtml
    const techStack: string[] = []
    const html = page.rawHtml
    if (html.includes('wp-content')) techStack.push('WordPress')
    if (html.includes('shopify')) techStack.push('Shopify')
    if (html.includes('next/static') || html.includes('__NEXT_DATA__')) techStack.push('Next.js')
    if (html.includes('react')) techStack.push('React')
    if (html.includes('vue')) techStack.push('Vue.js')
    if (html.includes('bootstrap')) techStack.push('Bootstrap')
    if (html.includes('tailwind')) techStack.push('Tailwind CSS')
    if (html.includes('gtag') || html.includes('analytics')) techStack.push('Google Analytics')
    if (html.includes('fbq') || html.includes('facebook')) techStack.push('Facebook Pixel')
    if (html.includes('jquery')) techStack.push('jQuery')
    if (html.includes('cloudflare')) techStack.push('Cloudflare')

    // Content analysis
    const contentScore = Math.min(100,
      (page.wordCount > 800 ? 40 : page.wordCount > 300 ? 25 : 10) +
      (page.h1.length === 1 ? 20 : 0) +
      (page.h2.length > 2 ? 20 : 0) +
      (page.images.filter(i => i.hasAlt).length > 0 ? 20 : 0)
    )

    // AI full analysis
    const aiPrompt = `
Analyze this website and provide a comprehensive report:

URL: ${page.url}
Title: ${page.title}
Description: ${page.description}
Word Count: ${page.wordCount}
Load Time: ${(page.loadTime / 1000).toFixed(2)}s
HTTPS: ${isHttps}
Technologies: ${techStack.join(', ') || 'Unknown'}
Internal Links: ${page.internalLinks}
External Links: ${page.externalLinks}
Images: ${page.images.length} (${page.images.filter(i => i.hasAlt).length} with alt)
Schema Types: ${page.schemaTypes.join(', ') || 'None'}

Provide:
1. Overall website assessment (2-3 sentences)
2. Top 3 strengths
3. Top 3 critical improvements needed
4. Estimated traffic potential
5. Competitive positioning advice

Be specific and actionable.
    `

    const aiAnalysis = await analyzeWithGemini(aiPrompt)

    return NextResponse.json({
      success: true,
      url: page.url,
      overview: {
        title: page.title,
        description: page.description,
        wordCount: page.wordCount,
        loadTime: page.loadTime,
        loadTimeFormatted: `${(page.loadTime / 1000).toFixed(2)}s`,
        statusCode: page.statusCode,
        isHttps,
        hasRobots,
        canonical: page.canonical,
      },
      scores: {
        performance: perfScore,
        seo: Math.max(0, seoScore),
        content: contentScore,
        security: isHttps ? 90 : 30,
        overall: Math.round((perfScore + Math.max(0, seoScore) + contentScore + (isHttps ? 90 : 30)) / 4),
      },
      techStack,
      links: {
        internal: page.internalLinks,
        external: page.externalLinks,
        total: page.links.length,
      },
      images: {
        total: page.images.length,
        withAlt: page.images.filter(i => i.hasAlt).length,
        withoutAlt: page.images.filter(i => !i.hasAlt).length,
      },
      headings: {
        h1: page.h1,
        h2: page.h2.slice(0, 10),
        h3: page.h3.slice(0, 10),
      },
      social: {
        ogTitle: page.ogTitle,
        ogDesc: page.ogDesc,
        ogImage: page.ogImage,
      },
      schema: page.schemaTypes,
      aiAnalysis,
    })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Analysis failed' },
      { status: 500 }
    )
  }
  }
