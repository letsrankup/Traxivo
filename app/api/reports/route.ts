import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'
import { analyzeWithGemini } from '@/lib/gemini'

export async function GET(req: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()

    // Fetch all data in parallel
    const [contacts, deals, invoices, proposals] = await Promise.all([
      supabase.from('contacts').select('*'),
      supabase.from('deals').select('*'),
      supabase.from('invoices').select('*'),
      supabase.from('proposals').select('*'),
    ])

    const c = contacts.data || []
    const d = deals.data || []
    const inv = invoices.data || []
    const p = proposals.data || []

    // Revenue by month
    const revenueByMonth: Record<string, number> = {}
    inv
      .filter((i: any) => i.status === 'paid')
      .forEach((i: any) => {
        const month = new Date(i.created_at).toLocaleString('default', { month: 'short', year: '2-digit' })
        revenueByMonth[month] = (revenueByMonth[month] || 0) + (i.total || 0)
      })

    // Deal pipeline
    const pipeline: Record<string, number> = {}
    d.forEach((deal: any) => {
      pipeline[deal.stage] = (pipeline[deal.stage] || 0) + 1
    })

    // Contact sources
    const sources: Record<string, number> = {}
    c.forEach((contact: any) => {
      const src = contact.source || 'Direct'
      sources[src] = (sources[src] || 0) + 1
    })

    const totalRevenue = inv
      .filter((i: any) => i.status === 'paid')
      .reduce((s: number, i: any) => s + (i.total || 0), 0)

    const pendingRevenue = inv
      .filter((i: any) => i.status === 'pending')
      .reduce((s: number, i: any) => s + (i.total || 0), 0)

    const wonDeals = d.filter((deal: any) => deal.stage === 'closed_won').length
    const totalDeals = d.length
    const winRate = totalDeals > 0 ? Math.round((wonDeals / totalDeals) * 100) : 0

    return NextResponse.json({
      success: true,
      summary: {
        totalRevenue,
        pendingRevenue,
        totalContacts: c.length,
        totalDeals: d.length,
        wonDeals,
        winRate,
        totalProposals: p.length,
        sentProposals: p.filter((pp: any) => pp.status === 'sent').length,
        totalInvoices: inv.length,
        paidInvoices: inv.filter((i: any) => i.status === 'paid').length,
      },
      charts: {
        revenueByMonth,
        pipeline,
        contactSources: sources,
      },
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { reportData } = await req.json()

    const aiPrompt = `
You are a business analytics expert. Analyze this business performance data:

Revenue: $${reportData.totalRevenue?.toLocaleString()}
Pending Revenue: $${reportData.pendingRevenue?.toLocaleString()}
Total Contacts: ${reportData.totalContacts}
Win Rate: ${reportData.winRate}%
Total Deals: ${reportData.totalDeals}
Won Deals: ${reportData.wonDeals}

Provide:
1. Executive summary of business performance
2. Key strengths to leverage
3. Critical areas needing attention
4. Revenue growth recommendations
5. 30-60-90 day action plan

Be specific, data-driven, and actionable.
    `

    const aiInsights = await analyzeWithGemini(aiPrompt)
    return NextResponse.json({ success: true, aiInsights })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
          }
