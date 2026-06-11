'use client'
import { useState } from 'react'
import { DollarSign, FileCheck, Landmark, Plus, Receipt } from 'lucide-react'

interface LocalInvoice {
  id: string
  client: string
  items: string
  amount: number
  status: 'Paid' | 'Pending'
}

export default function InvoiceSystemPage() {
  const [invoices, setInvoices] = useState<LocalInvoice[]>([
    { id: 'INV-001', client: 'Acme Cloud Corp', items: 'SEO Audit Execution & Consultancy', amount: 850, status: 'Paid' },
    { id: 'INV-002', client: 'Quantum Labs LLC', items: 'Strategic Growth Operations Pipeline', amount: 2400, status: 'Pending' }
  ])

  const [client, setClient] = useState('')
  const [items, setItems] = useState('')
  const [amount, setAmount] = useState('')

  const handleInvoiceCreate = (e: React.FormEvent) => {
    e.preventDefault()
    if (client && items && amount) {
      setInvoices(prev => [
        ...prev,
        {
          id: `INV-${Math.floor(100 + Math.random() * 900)}`,
          client,
          items,
          amount: Number(amount),
          status: 'Pending'
        }
      ])
      setClient('')
      setItems('')
      setAmount('')
    }
  }

  const totalRevenueGenerated = invoices.reduce((s, i) => i.status === 'Paid' ? s + i.amount : s, 0)

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4 md:p-6">
      {/* Title block */}
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">Ledger & Invoice Flow</h1>
        <p className="text-slate-400 text-xs mt-1">Generate customer billing records and analyze live cash deposits parameters.</p>
      </div>

      {/* Total Aggregated Snapshot Mini Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="glass border border-white/5 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Settled Clean Earnings</span>
            <p className="text-2xl font-black text-white mt-1">${totalRevenueGenerated.toLocaleString()}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Landmark className="w-5 h-5" />
          </div>
        </div>

        <div className="glass border border-white/5 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Total Active Ledgers</span>
            <p className="text-2xl font-black text-white mt-1">{invoices.length}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Receipt className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Input Form Fields Box */}
      <div className="glass border border-white/5 rounded-2xl p-5">
        <h3 className="text-white font-semibold text-sm mb-4">Compile Professional Billing Invoice</h3>
        <form onSubmit={handleInvoiceCreate} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="Recipient Client / Entity"
            required
            value={client}
            onChange={(e) => setClient(e.target.value)}
            className="bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <input
            type="text"
            placeholder="Service Package Descriptions"
            required
            value={items}
            onChange={(e) => setItems(e.target.value)}
            className="bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 sm:col-span-2"
          />
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Price ($)"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Spreadsheet Presentation Wrapper */}
      <div className="glass border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/5 bg-white/3 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="p-4">Invoice Hash</th>
                <th className="p-4">Client Target</th>
                <th className="p-4">Statement Items</th>
                <th className="p-4">Aggregate Cost</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-white/2 transition-colors">
                  <td className="p-4 font-mono text-indigo-400 font-bold">{inv.id}</td>
                  <td className="p-4 font-semibold text-white">{inv.client}</td>
                  <td className="p-4 text-slate-400">{inv.items}</td>
                  <td className="p-4 font-bold font-mono text-white">${inv.amount}</td>
                  <td className="p-4 text-right">
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-black ${
                      inv.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
  }
          
