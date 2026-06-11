'use client'
import { useState } from 'react'
import { analyzeCompetitors, CompetitorData } from '@/lib/competitor'
import { ShieldAlert, Loader2, BarChart2, ShieldCheck, HelpCircle } from 'lucide-react'

export default function WebsiteAnalyzerPage() {
  const [targetUrl, setTargetUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [competitors, setCompetitors] = useState<CompetitorData[]>([])

  const executeAnalysis = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!targetUrl.trim()) return
    setLoading(true)
    try {
      const data = await analyzeCompetitors(targetUrl)
      setCompetitors(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4 md:p-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">Competitor Core Analyzer</h1>
        <p className="text-slate-400 text-xs mt-1">Cross-reference active competitor domain matrices, keywords overlapping ratios, and backlinks clusters.</p>
      </div>

      <div className="glass border border-white/5 rounded-2xl p-4">
        <form onSubmit={executeAnalysis} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            required
            placeholder="Input base domain signature (e.g., targetcompetitor.io)..."
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <BarChart2 className="w-3.5 h-3.5" />}
            Map Ecosystem
          </button>
        </form>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <Loader2 className="w-6 h-6 text-indigo-500 animate-spin mx-auto mb-2" />
          <p className="text-xs text-slate-500">Mapping domain authority cluster grids...</p>
        </div>
      ) : competitors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {competitors.map((comp, index) => (
            <div key={index} className="glass border border-white/5 rounded-2xl p-5 flex flex-col justify-between group hover:border-white/10 transition-colors">
              <div className="mb-4">
                <p className="text-white font-semibold text-sm group-hover:text-indigo-400 transition-colors">{comp.domain}</p>
                <p className="text-slate-500 text-[11px] mt-0.5">Market Overlap Ratio: <span className="text-indigo-400 font-bold font-mono">{comp.overlapScore}%</span></p>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center pt-3 border-t border-white/5">
                <div>
                  <span className="text-slate-500 text-[9px] uppercase font-bold tracking-wider block">Authority</span>
                  <span className="text-white text-xs font-black font-mono">{comp.authority}/100</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[9px] uppercase font-bold tracking-wider block">Backlinks</span>
                  <span className="text-emerald-400 text-xs font-black font-mono">{comp.backlinks.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[9px] uppercase font-bold tracking-wider block">Est Traffic</span>
                  <span className="text-sky-400 text-xs font-black font-mono">{comp.traffic}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-white/5 rounded-2xl">
          <BarChart2 className="w-6 h-6 text-slate-600 mx-auto mb-2 opacity-50" />
          <p className="text-slate-400 text-xs">No analysis cached</p>
        </div>
      )}
    </div>
  )
            }
          
