import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

function generateInvoiceNumber(): string {
  const date = new Date()
  const y = date.getFullYear().toString().slice(2)
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const rand = Math.floor(Math.random() * 9000) + 1000
  return `INV-${y}${m}-${rand}`
}

export async function GET() {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from('invoices').select('*').order('created_at', { ascending: false })
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

    const subtotal = (body.items || []).reduce((s: number, i: any) => s + i.qty * i.rate, 0)
    const taxAmount = (subtotal * (body.tax || 0)) / 100
    const total = subtotal + taxAmount

    const { data, error } = await supabase
      .from('invoices')
      .insert({
        number: generateInvoiceNumber(),
        client_name: body.clientName,
        client_email: body.clientEmail || '',
        items: body.items || [],
        subtotal,
        tax: body.tax || 0,
        total,
        status: 'draft',
        due_date: body.dueDate || null,
        notes: body.notes || '',
      })
      .select().single()
    if (error) throw error
    return NextResponse.json({ success: true, data })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const { id, ...updates } = await req.json()
    const { data, error } = await supabase
      .from('invoices').update(updates).eq('id', id).select().single()
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
    const { error } = await supabase.from('invoices').delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
        }
