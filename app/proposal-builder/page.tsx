'use client'
import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { FileText, Plus, Loader2, X, Download, Eye } from 'lucide-react'
import { formatDate } from '@/lib/utils'

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-600',
  sent: 'bg-blue-100 text-blue-600',
  accepted: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-600',
}

export default function ProposalsPage() {
  const [proposals, setProposals] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [preview, setPreview] = useState<any>(null)
  const [form, setForm] = useState({ clientName: '', service: '', budget: '', timeline: '', needs: '' })

  useEffect(() => {
    fetch('/api/proposals').then(r => r.json()).then(d => {
      if (d.success) setProposals(d.data)
    })
  }, [])

  const generate = async () => {
    if (!form.clientName || !form.service) return
    setGenerating(true)
    try {
      const res = await fetch('/api/proposals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'generate', ...form }),
      })
      const data = await res.json()
      if (data.success) {
        setProposals(p => [data.data, ...p])
        setShowModal(false)
        setPreview(data.data)
        setForm({ clientName: '', service: '', budget: '', timeline: '', needs: '' })
      }
    } finally { setGenerating(false) }
  }

  const updateStatus = async (id: string, status: string) => {
    await fetch('/api/proposals', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    setProposals(p => p.map(pr => pr.id === id ? { ...pr, status } : pr))
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Proposals</h1>
            <p className="text-gray-500 text-sm mt-0.5">Create and manage client proposals</p>
          </div>
          <button onClick={() => setShowModal(true)}
            className="gradient-brand text-white px-4 py-2 rounded-xl font-semibold text-sm shadow-purple hover:opacity-90 transition flex items-center gap-2">
            <Plus size={16} /> New Proposal
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {['draft', 'sent', 'accepted', 'rejected'].map(s => (
            <div key={s} className="bg-white rounded-2xl border border-gray-100 shadow-card p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{proposals.filter(p => p.status === s).length}</div>
              <div className={`text-xs font-medium mt-1 px-2 py-0.5 rounded-lg inline-block capitalize ${statusColors[s]}`}>{s}</div>
            </div>
          ))}
        </div>

        {/* List */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
          {proposals.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <FileText size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No proposals yet. Create your first one!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {proposals.map(p => (
                <div key={p.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                    <FileText size={18} className="text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-800 text-sm truncate">{p.title}</div>
                    <div className="text-xs text-gray-400">{p.client_name} · {p.service} · {formatDate(p.created_at)}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <select value={p.status} onChange={e => updateStatus(p.id, e.target.value)}
                      className={`text-xs font-medium px-2 py-1 rounded-lg border-0 cursor-pointer ${statusColors[p.status]}`}>
                      {['draft', 'sent', 'accepted', 'rejected'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <button onClick={() => setPreview(p)} className="text-gray-400 hover:text-purple-600 transition p-1">
                      <Eye size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-gray-900">New Proposal</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="space-y-3">
              {[
                ['clientName', 'Client Name *', 'text'],
                ['service', 'Service/Project *', 'text'],
                ['budget', 'Budget (e.g. $5,000)', 'text'],
                ['timeline', 'Timeline (e.g. 4 weeks)', 'text'],
              ].map(([k, l, t]) => (
                <input key={k} type={t} placeholder={l} value={form[k as keyof typeof form]}
                  onChange={e => setForm(p => ({ ...p, [k]: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent" />
              ))}
              <textarea placeholder="Client needs / project description" value={form.needs}
                onChange={e => setForm(p => ({ ...p, needs: e.target.value }))} rows={3}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none" />
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={generate} disabled={generating}
                className="flex-1 gradient-brand text-white py-2.5 rounded-xl text-sm font-semibold shadow-purple hover:opacity-90 transition disabled:opacity-60 flex items-center justify-center gap-2">
                {generating ? <><Loader2 size={14} className="animate-spin" /> Generating...</> : 'Generate'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {preview && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">{preview.title}</h2>
              <button onClick={() => setPreview(null)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">{preview.content}</div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
                                                                                                     }
