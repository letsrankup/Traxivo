import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const type = new URL(req.url).searchParams.get('type') || 'contacts'

    if (type === 'contacts') {
      const { data, error } = await supabase
        .from('contacts').select('*').order('created_at', { ascending: false })
      if (error) throw error
      return NextResponse.json({ success: true, data: data || [] })
    }

    if (type === 'deals') {
      const { data, error } = await supabase
        .from('deals').select('*, contacts(name, email)').order('created_at', { ascending: false })
      if (error) throw error
      return NextResponse.json({ success: true, data: data || [] })
    }

    return NextResponse.json({ success: true, data: [] })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const body = await req.json()
    const { type, ...data } = body

    if (type === 'contact') {
      const { data: contact, error } = await supabase
        .from('contacts')
        .insert({
          name: data.name, email: data.email, phone: data.phone,
          company: data.company, website: data.website,
          status: data.status || 'lead', tags: data.tags || [],
          notes: data.notes || '', value: data.value || 0,
        })
        .select().single()
      if (error) throw error
      return NextResponse.json({ success: true, data: contact })
    }

    if (type === 'deal') {
      const { data: deal, error } = await supabase
        .from('deals')
        .insert({
          title: data.title, contact_id: data.contactId,
          value: data.value, stage: data.stage || 'prospecting',
          probability: data.probability || 20,
          expected_close: data.expectedClose, notes: data.notes || '',
        })
        .select().single()
      if (error) throw error
      return NextResponse.json({ success: true, data: deal })
    }

    return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const { type, id, ...data } = await req.json()
    const table = type === 'deal' ? 'deals' : 'contacts'
    const { data: updated, error } = await supabase
      .from(table).update(data).eq('id', id).select().single()
    if (error) throw error
    return NextResponse.json({ success: true, data: updated })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    const type = searchParams.get('type')
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
    const table = type === 'deal' ? 'deals' : 'contacts'
    const { error } = await supabase.from(table).delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
        }
