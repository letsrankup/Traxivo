'use client'
import { useState } from 'react'
import { FileText, Sparkles, Send, Download, Loader2, CheckCircle2 } from 'lucide-react'

export default function ProposalBuilderPage() {
  const [clientName, setClientName] = useState('')
  const [projectScope, setProjectScope] = useState('SEO Optimization & Technical Lead Generation')
  const [budget, setBudget] = useState('')
  const [loading, setLoading] = useState(false)
  const [generatedDoc, setGeneratedDoc] = useState<string | null>(null)

  const handleCreateProposal = (e: React.FormEvent) => {
    e.preventDefault()
    if (!clientName || !budget) return
    setLoading(true)
    
    setTimeout(() => {
      setGeneratedDoc(`
# EXECUTIVE BUSINESS PROPOSAL
**Prepared For:** ${clientName}
**Service Architecture:** ${projectScope}
**Estimated Investment:** $${budget}/month

## 1. Tactical Execution Plan
Our generative engine automation framework will initiate deep crawling checkpoints to discover technical infrastructure defects and harvest organic conversion paths.

## 2. Deliverables Stack
* Weekly algorithmic ranking surveillance grids.
* Cleansed B2B outreach profile maps with custom pipeline matching.
* Dynamic ledger invoicing dashboards for client accountability.
      `)
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4 md:p-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">Proposal & Pitch Builder</h1>
        <p className="text-slate-400 text-xs mt-1">Generate structural project agreements, high-intent client onboarding contracts, and commercial scopes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Input Settings */}
        <div className="glass border border-white/5 rounded-2xl p-5 space-y-4 h-fit">
          <h3 className="text-white font-semibold text-xs uppercase tracking-wider">Proposal Configurator</h3>
          <form onSubmit={handleCreateProposal} className="space-y-3">
            <div>
              <label className="text-slate-500 text-[10px] uppercase font-bold tracking-wider block mb-1">Prospect Entity</label>
              <input
                type="text"
                required
                placeholder="Client or Corporate Name..."
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-slate-500 text-[10px] uppercase font-bold tracking-wider block mb-1">Project Scope</label>
              <select
                value={projectScope}
                onChange={(e) => setProjectScope(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
              >
                <option value="SEO Optimization & Technical Lead Generation">Full SEO Suite & Lead Scraper</option>
                <option value="Custom CRM Infrastructure Setup">Dedicated CRM Architecture</option>
                <option value="Full Stack Operations Management">Monthly Performance Maintenance</option>
              </select>
            </div>

            <div>
              <label className="text-slate-500 text-[10px] uppercase font-bold tracking-wider block mb-1">Target Budget Valuation ($)</label>
              <input
                type="number"
                required
                placeholder="e.g., 1500"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5"
            >
              {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              Generate Custom Proposal
            </button>
          </form>
        </div>

        {/* Right Output Manifest Document */}
        <div className="md:col-span-2">
          {loading ? (
            <div className="text-center py-24 glass border border-white/5 rounded-2xl h-full flex flex-col justify-center items-center">
              <Loader2 className="w-6 h-6 text-indigo-500 animate-spin mb-2" />
              <p className="text-xs text-slate-400">Assembling enterprise contract templates...</p>
            </div>
          ) : generatedDoc ? (
            <div className="glass border border-white/5 rounded-2xl p-6 space-y-4 text-left animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Proposal Engine Compiling Complete
                </span>
                <button 
                  onClick={() => alert("Simulation download active. PDF stream generation simulated.")}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all"
                >
                  <Download className="w-3 h-3" /> Export Draft
                </button>
              </div>
              <div className="bg-slate-950/60 border border-white/3 rounded-xl p-4 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap max-h-[400px] overflow-y-auto">
                {generatedDoc}
              </div>
            </div>
          ) : (
            <div className="text-center py-20 border border-dashed border-white/5 rounded-2xl h-full flex flex-col justify-center items-center">
              <FileText className="w-6 h-6 text-slate-600 mb-2 opacity-50" />
              <p className="text-slate-400 text-xs">No active documents drafted</p>
              <p className="text-slate-600 text-[11px] mt-0.5">Use the configuration parameters block to assemble a technical business pitch layout.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
  }
        
