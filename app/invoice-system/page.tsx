'use client'
import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Receipt, Plus, X, Trash2, Eye } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-600',
  sent: 'bg-blue-100 text-blue-600',
  paid: 'bg-green-100 text-green-700',
  overdue: 'bg-red-100 text-red-600',
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<any[]>([])
  const [showModal, setShowModal] = useState(false)
  const [preview, setPreview] = useState<any>(null)
  const [form, setForm] = useState({ clientName: '', clientEmail: '', tax: 0, notes: '', dueDate: '' })
  const [items, setItems] = useState([{ description: '', qty: 1, rate: 0 }])

  useEffect(() => {
    fetch('/api/invoices').then(r => r.json()).then(d => { if (d.success) setInvoices(d.data) })
  }, [])

  const subtotal = items.reduce((s, i) => s + i.qty * i.rate, 0)
  const tax = (subtotal * (form.tax || 0)) / 100
  const total = subtotal + tax

  const createInvoice = async () => {
    if (!form.clientName) return
    const res = await fetch('/api/invoices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, items, subtotal, tax: form.tax, total }),
    })
    const data = await res.json()
    if (data.success) {
      setInvoices(p => [data.data, ...p])
      setShowModal(false)
      setForm({ clientName: '', clientEmail: '', tax: 0, notes: '', dueDate: '' })
      setItems([{ description: '', qty: 1, rate: 0 }])
    }
  }

  const updateStatus = async (id: string, status: string) => {
    await fetch('/api/invoices', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    setInvoices(p => p.map(inv => inv.id === id ? { ...inv, status } : inv))
  }

  const totalPaid = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.total, 0)
  const totalPending = invoices.filter(i => i.status === 'sent').reduce((s, i) => s + i.total, 0)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
            <p className="text-gray-500 text-sm mt-0.5">Create and track client invoices</p>
          </div>
          <button onClick={() => setShowModal(true)}
            className="gradient-brand text-white px-4 py-2 rounded-xl font-semibold text-sm shadow-purple hover:opacity-90 transition flex items-center gap-2">
            <Plus size={16} /> New Invoice
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Total Invoices', value: invoices.length, color: 'text-gray-700' },
            { label: 'Paid', value: formatCurrency(totalPaid), color: 'text-green-600' },
            { label: 'Pending', value: formatCurrency(totalPending), color: 'text-blue-600' },
            { label: 'Overdue', value: invoices.filter(i => i.status === 'overdue').length, color: 'text-red-500' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-card p-4 text-center">
              <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
          {invoices.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <Receipt size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No invoices yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    {['Invoice #', 'Client', 'Amount', 'Status', 'Due Date', 'Actions'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {invoices.map(inv => (
                    <tr key={inv.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-purple-600">#{inv.number}</td>
                      <td className="px-4 py-3 text-gray-800">{inv.client_name}</td>
                      <td className="px-4 py-3 font-semibold text-gray-900">{formatCurrency(inv.total)}</td>
                      <td className="px-4 py-3">
                        <select value={inv.status} onChange={e => updateStatus(inv.id, e.target.value)}
                          className={`text-xs font-medium px-2 py-1 rounded-lg border-0 cursor-pointer ${statusColors[inv.status]}`}>
                          {['draft', 'sent', 'paid', 'overdue'].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-xs">{inv.due_date ? formatDate(inv.due_date) : '—'}</td>
                      <td className="px-4 py-3">
                        <button onClick={() => setPreview(inv)} className="text-gray-400 hover:text-purple-600 transition">
                          <Eye size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-gray-900">New Invoice</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="space-y-3 mb-4">
              <input placeholder="Client Name *" value={form.clientName}
                onChange={e => setForm(p => ({ ...p, clientName: e.target.value }))}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent" />
              <input placeholder="Client Email" value={form.clientEmail}
                onChange={e => setForm(p => ({ ...p, clientEmail: e.target.value }))}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent" />
              <input type="date" value={form.dueDate}
                onChange={e => setForm(p => ({ ...p, dueDate: e.target.value }))}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent" />
            </div>

            {/* Items */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">Line Items</label>
                <button onClick={() => setItems([...items, { description: '', qty: 1, rate: 0 }])}
                  className="text-xs text-purple-600 hover:underline flex items-center gap-1">
                  <Plus size={12} /> Add Item
                </button>
              </div>
              <div className="space-y-2">
                {items.map((item, i) => (
                  <div key={i} className="grid grid-cols-12 gap-2">
                    <input placeholder="Description" value={item.description}
                      onChange={e => { const n = [...items]; n[i].description = e.target.value; setItems(n) }}
                      className="col-span-6 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent" />
                    <input type="number" placeholder="Qty" value={item.qty}
                      onChange={e => { const n = [...items]; n[i].qty = Number(e.target.value); setItems(n) }}
                      className="col-span-2 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent" />
                    <input type="number" placeholder="Rate" value={item.rate}
                      onChange={e => { const n = [...items]; n[i].rate = Number(e.target.value); setItems(n) }}
                      className="col-span-3 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent" />
                    <button onClick={() => setItems(items.filter((_, idx) => idx !== i))}
                      className="col-span-1 text-gray-300 hover:text-red-500 flex items-center justify-center">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals */}
            <div className="bg-gray-50 rounded-xl p-4 mb-4 text-sm space-y-1">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
              <div className="flex items-center justify-between text-gray-600">
                <span>Tax (%)</span>
                <input type="number" value={form.tax} onChange={e => setForm(p => ({ ...p, tax: Number(e.target.value) }))}
                  className="w-16 text-right px-2 py-0.5 border border-gray-200 rounded-lg text-sm" />
              </div>
              <div className="flex justify-between font-bold text-gray-900 pt-1 border-t border-gray-200">
                <span>Total</span><span>{formatCurrency(total)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={createInvoice}
                className="flex-1 gradient-brand text-white py-2.5 rounded-xl text-sm font-semibold shadow-purple hover:opacity-90 transition">
                Create Invoice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview */}
      {preview && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-gray-900">Invoice #{preview.number}</h2>
              <button onClick={() => setPreview(null)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between"><span className="text-gray-500">Client</span><span className="font-medium">{preview.client_name}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Email</span><span>{preview.client_email}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Due Date</span><span>{preview.due_date ? formatDate(preview.due_date) : '—'}</span></div>
            </div>
            <div className="border-t border-gray-100 pt-3 space-y-1 text-sm">
              {(preview.items || []).map((item: any, i: number) => (
                <div key={i} className="flex justify-between text-gray-700">
                  <span>{item.description} × {item.qty}</span>
                  <span>{formatCurrency(item.qty * item.rate)}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-100">
                <span>Total</span><span>{formatCurrency(preview.total)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
              }
