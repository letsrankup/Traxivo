import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'
import { analyzeWithGemini } from '@/lib/gemini'

export async function GET(req: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from('proposals')
      .select('*')
      .order('created_at', { ascending: false })

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
      // AI-generate proposal content
      const prompt = `
You are a professional business proposal writer. Generate a complete proposal:

Client: ${body.clientName}
Service: ${body.service}
Budget: ${body.budget}
Timeline: ${body.timeline}
Client Needs: ${body.needs}

Generate a professional proposal with these sections:
1. Executive Summary (2-3 paragraphs)
2. Understanding of Requirements
3. Proposed Solution
4. Deliverables (bulleted list)
5. Timeline & Milestones
6. Investment (pricing breakdown)
7. Why Choose Us
8. Next Steps

Format it professionally. Use the client name. Be specific about the service.
      `

      const content = await analyzeWithGemini(prompt)

      return NextResponse.json({
        success: true,
        content,
        title: `Proposal for ${body.clientName} — ${body.service}`,
      })
    }

    // Save proposal
    const { data, error } = await supabase
      .from('proposals')
      .insert({
        title: body.title,
        client_name: body.clientName,
        client_email: body.clientEmail,
        service: body.service,
        content: body.content,
        budget: body.budget,
        status: 'draft',
        valid_until: body.validUntil,
      })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ success: true, data })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const { id, ...data } = await req.json()

    const { data: updated, error } = await supabase
      .from('proposals')
      .update(data)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ success: true, data: updated })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
        }
