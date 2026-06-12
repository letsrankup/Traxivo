import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

function generateProposalContent(data: any): string {
  return `PROPOSAL FOR ${data.clientName?.toUpperCase()}
${'='.repeat(50)}

SERVICE: ${data.service}
BUDGET: ${data.budget}
TIMELINE: ${data.timeline}

EXECUTIVE SUMMARY
-----------------
We are pleased to present this proposal for ${data.service}. Based on our understanding of your requirements, we have developed a comprehensive solution that delivers measurable results within your budget and timeline.

Our team brings extensive expertise in ${data.service}, and we are committed to delivering excellence that exceeds your expectations.

UNDERSTANDING YOUR REQUIREMENTS
--------------------------------
${data.needs || 'Based on our initial discussion, we understand you require a professional solution that drives results, maintains quality, and delivers on time.'}

PROPOSED SOLUTION
-----------------
We propose a structured approach to ${data.service} that includes:

1. Discovery & Strategy Phase
   - In-depth analysis of your current situation
   - Competitive landscape review
   - Goal setting and KPI definition

2. Implementation Phase
   - Dedicated project team assignment
   - Weekly progress updates
   - Quality assurance at every step

3. Delivery & Optimization Phase
   - Final delivery with full documentation
   - Post-launch support
   - Performance review and optimization

KEY DELIVERABLES
----------------
• Complete ${data.service} solution
• Progress reports and updates
• Final documentation package
• 30-day post-launch support
• Training and handover session

INVESTMENT & TIMELINE
---------------------
Budget: ${data.budget}
Timeline: ${data.timeline}
Payment Terms: 50% upfront, 50% on delivery

WHY CHOOSE US
-------------
✓ Proven track record of success
✓ Dedicated project manager
✓ Transparent communication
✓ On-time delivery guarantee
✓ Post-project support included

NEXT STEPS
----------
1. Review and approve this proposal
2. Sign the agreement and submit deposit
3. Kickoff meeting within 48 hours
4. Project begins immediately

We look forward to working with you on this exciting project.

Best regards,
Traxivo Team`
}

export async function GET() {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from('proposals').select('*').order('created_at', { ascending: false })
    if (error) throw error
    return NextResponse.json({ success: true, data: data || [] })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const body = await req.json()

    if (body.action === 'generate') {
      const content = generateProposalContent(body)
      const { data, error } = await supabase
        .from('proposals')
        .insert({
          title: `${body.service} Proposal — ${body.clientName}`,
          client_name: body.clientName,
          client_email: body.clientEmail || '',
          service: body.service,
          budget: body.budget,
          timeline: body.timeline,
          content,
          status: 'draft',
        })
        .select().single()
      if (error) throw error
      return NextResponse.json({ success: true, data })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const { id, ...updates } = await req.json()
    const { data, error } = await supabase
      .from('proposals').update(updates).eq('id', id).select().single()
    if (error) throw error
    return NextResponse.json({ success: true, data })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const id = new URL(req.url).searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
    const { error } = await supabase.from('proposals').delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
      }
