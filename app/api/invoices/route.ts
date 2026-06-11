import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    // Calculate stats
    const all = data || []
    const stats = {
      total: all.reduce((s: number, i: any) => s + (i.total || 0), 0),
      paid: all.filter((i: any) => i.status === 'paid').reduce((s: number, i: any) => s + (i.total || 0), 0),
      pending: all.filter((i: any) => i.status === 'pending').reduce((s: number, i: any) => s + (i.total || 0), 0),
      overdue: all.filter((i: any) => i.status === 'overdue').length,
    }

    return NextResponse.json({ success: true, data: all, stats })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const body = await req.json()

    // Generate invoice number
    const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`

    // Calculate totals
    const subtotal = body.items.reduce(
      (s: number, item: any) => s + item.quantity * item.price, 0
    )
    const tax = (subtotal * (body.taxRate || 0)) / 100
    const total = subtotal + tax - (body.discount || 0)

    const { data, error } = await supabase
      .from('invoices')
      .insert({
        invoice_number: invoiceNumber,
        client_name: body.clientName,
        client_email: body.clientEmail,
        client_address: body.clientAddress || '',
        items: body.items,
        subtotal,
        tax_rate: body.taxRate || 0,
        tax,
        discount: body.discount || 0,
        total,
        status: 'pending',
        due_date: body.dueDate,
        notes: body.notes || '',
        currency: body.currency || 'USD',
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
      .from('invoices')
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
