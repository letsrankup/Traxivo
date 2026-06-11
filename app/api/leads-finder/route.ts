import { NextRequest, NextResponse } from 'next/server'
import { findLeads } from '@/lib/lead-scraper'
import { analyzeWithGemini } from '@/lib/gemini'

export async function POST(req: NextRequest) {
  try {
    const { query, location, limit = 20 } = await req.json()

    if (!query) return NextResponse.json({ error: 'Query required' }, { status: 400 })

    const leads = await findLeads(query, location || 'United States', limit)

    // Score and enrich leads with AI
    if (leads.length > 0) {
      const aiPrompt = `
You are a lead qualification expert. Rate these ${leads.length} leads for "${query}" in "${location}".

Leads found:
${leads.slice(0, 5).map((l, i) => `${i + 1}. ${l.name} - ${l.website}`).join('\n')}

Provide:
1. Overall lead quality assessment for this search
2. What makes a high-value lead in "${query}" industry
3. Top 3 outreach tips for these leads
4. Best time/method to contact

Keep response concise and actionable.
      `
      const aiInsights = await analyzeWithGemini(aiPrompt)

      return NextResponse.json({
        success: true,
        query,
        location,
        total: leads.length,
        leads,
        aiInsights,
      })
    }

    return NextResponse.json({
      success: true,
      query,
      location,
      total: leads.length,
      leads,
      aiInsights: 'No leads found. Try different keywords.',
    })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Lead search failed' },
      { status: 500 }
    )
  }
        }
