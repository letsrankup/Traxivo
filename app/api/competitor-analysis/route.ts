import { NextRequest, NextResponse } from 'next/server'
import { analyzeMultipleCompetitors } from '@/lib/competitor'
import { analyzeWithGemini } from '@/lib/gemini'

export async function POST(req: NextRequest) {
  try {
    const { competitors, myUrl } = await req.json()

    if (!competitors?.length) {
      return NextResponse.json({ error: 'At least one competitor URL required' }, { status: 400 })
    }

    const urls = competitors.slice(0, 5) // max 5 competitors
    const results = await analyzeMultipleCompetitors(urls)

    if (results.length === 0) {
      return NextResponse.json({ error: 'Could not analyze competitors' }, { status: 400 })
    }

    // Build comparison matrix
    const comparison = {
      avgDA: Math.round(results.reduce((s, r) => s + r.domainAuthority, 0) / results.length),
      avgSpeed: Math.round(results.reduce((s, r) => s + r.pageSpeed, 0) / results.length),
      avgContent: Math.round(results.reduce((s, r) => s + r.contentLength, 0) / results.length),
      topTechnologies: Array.from(new Set(results.flatMap(r => r.technologies))).slice(0, 10),
      allKeywords: Array.from(new Set(results.flatMap(r => r.keywords))).slice(0, 20),
    }

    // AI competitive intelligence
    const aiPrompt = `
You are a competitive intelligence expert. Analyze these competitors:

${results.map((r, i) => `
Competitor ${i + 1}: ${r.name} (${r.url})
- Domain Authority: ${r.domainAuthority}
- Page Speed: ${r.pageSpeed}/100
- Content Length: ${r.contentLength} words
- Technologies: ${r.technologies.join(', ')}
- Keywords: ${r.keywords.join(', ')}
- Strengths: ${r.strengths.join(', ')}
- Weaknesses: ${r.weaknesses.join(', ')}
`).join('')}

${myUrl ? `My Website: ${myUrl}` : ''}

Provide:
1. Competitive landscape summary
2. Market gaps and opportunities
3. Which competitor is strongest and why
4. Top 5 strategies to outrank them
5. Quick wins to implement immediately

Be specific and data-driven.
    `

    const aiIntelligence = await analyzeWithGemini(aiPrompt)

    return NextResponse.json({
      success: true,
      competitors: results,
      comparison,
      aiIntelligence,
    })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Competitor analysis failed' },
      { status: 500 }
    )
  }
                                          }
      
