import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const { dateRange = '30d' } = await req.json()

    const days = dateRange === '7d' ? 7 : dateRange === '90d' ? 90 : 30
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()

    // Parallel queries
    const [contactsRes, dealsRes, invoicesRes, proposalsRes] = await Promise.all([
      supabase.from('contacts').select('id, created_at, status').gte('created_at', since),
      supabase.from('deals').select('id, value, stage, created_at'),
      supabase.from('invoices').select('id, total, status, created_at').gte('created_at', since),
      supabase.from('proposals').select('id, status, created_at').gte('created_at', since),
    ])

    const contacts = contactsRes.data || []
    const deals = dealsRes.data || []
    const invoices = invoicesRes.data || []
    const proposals = proposalsRes.data || []

    const totalRevenue = invoices
      .filter(i => i.status === 'paid')
      .reduce((s, i) => s + (i.total || 0), 0)

    const pendingRevenue = invoices
      .filter(i => i.status === 'sent')
      .reduce((s, i) => s + (i.total || 0), 0)

    const wonDeals = deals.filter(d => d.stage === 'closed_won').length
    const totalDeals = deals.length
    const winRate = totalDeals > 0 ? Math.round((wonDeals / totalDeals) * 100) : 0

    // Deals by stage
    const stageMap: Record<string, number> = {}
    deals.forEach(d => { stageMap[d.stage] = (stageMap[d.stage] || 0) + 1 })
    const dealsByStage = Object.entries(stageMap).map(([stage, count]) => ({ stage, count }))

    // Monthly revenue (last 6 months)
    const monthlyMap: Record<string, number> = {}
    invoices.filter(i => i.status === 'paid').forEach(inv => {
      const month = new Date(inv.created_at).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
      monthlyMap[month] = (monthlyMap[month] || 0) + (inv.total || 0)
    })
    const monthlyRevenue = Object.entries(monthlyMap).map(([month, revenue]) => ({ month, revenue }))

    // Contact status breakdown
    const contactStatusMap: Record<string, number> = {}
    contacts.forEach(c => { contactStatusMap[c.status] = (contactStatusMap[c.status] || 0) + 1 })

    return NextResponse.json({
      success: true,
      dateRange,
      totalRevenue,
      pendingRevenue,
      totalContacts: contacts.length,
      totalDeals,
      wonDeals,
      winRate,
      totalProposals: proposals.length,
      acceptedProposals: proposals.filter(p => p.status === 'accepted').length,
      dealsByStage,
      monthlyRevenue,
      contactsByStatus: Object.entries(contactStatusMap).map(([status, count]) => ({ status, count })),
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
  }
