'use client'
import { useState } from 'react'
import { checkKeywordRankings, RankData } from '@/lib/rank-checker'
import { TrendingUp, TrendingDown, Minus, Loader2, Target, Plus, Trash2 } from 'lucide-react'

export default function RankTrackerPage() {
  const [domain, setDomain] = useState('')
  const [keywordInput, setKeywordInput] = useState('')
  const [keywords, setKeywords] = useState<string[]>(['seo tools', 'business automation'])
  const [loading, setLoading] = useState(false)
  const [rankings, setRankings] = useState<RankData[]>([])

  const addKeyword = (e: React.FormEvent) => {
    e.preventDefault()
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords(prev => [...prev, keywordInput.trim()])
      setKeywordInput('')
    }
  }

  const removeKeyword = (index: number) => {
    setKeywords(prev => prev.filter((_, i) => i !== index))
  }

  const handleTrack = async () => {
    if (!domain || keywords.length === 0) return
    setLoading(true)
    try {
      const data = await checkKeywordRankings(domain, keywords)
      setRankings(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4 md:p-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">SERP Rank Tracker</h1>
        <p className="text-slate-400 text-xs mt-1">Monitor dynamic organic search positions and keyword visibility over indexing cycles.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Control Column */}
        <div className="glass border border-white/5 rounded-2xl p-5 space-y-4 h-fit">
          <div>
            <label className="text-slate-400 text-[11px] uppercase font-bold tracking-wider block mb-1.5">Target Domain</label>
            <input
              type="text"
              placeholder="e.g., brandwebsite.com"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="text-slate-400 text-[11px] uppercase font-bold tracking-wider block mb-1.5">Keywords Pool</label>
            <form onSubmit={addKeyword} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Add keyword phrase..."
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 px-3 rounded-xl text-white transition-colors">
                <Plus className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Keyword tags bubble list */}
            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pt-1">
              {keywords.map((kw, i) => (
                <span key={i} className="inline-flex items-center gap-1 text-[11px] bg-white/5 border border-white/5 pl-2 pr-1.5 py-0.5 rounded-lg text-slate-300">
                  {kw}
                  <button onClick={() => removeKeyword(i)} className="text-slate-500 hover:text-red-400 transition-colors">
                    <Trash2 className="w-2.5 h-2.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={handleTrack}
            disabled={loading || !domain || keywords.length === 0}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Target className="w-3.5 h-3.5" />}
            Scan Keyword Positions
          </button>
        </div>

        {/* Right Rankings Results Display Grid */}
        <div className="md:col-span-2 space-y-3">
          {loading ? (
            <div className="text-center py-20 border border-white/5 rounded-2xl glass">
              <Loader2 className="w-6 h-6 text-indigo-500 animate-spin mx-auto mb-2" />
              <p className="text-xs text-slate-400">Querying live search indexing matrices...</p>
            </div>
          ) : rankings.length > 0 ? (
            <div className="glass border border-white/5 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/3 text-slate-400 font-semibold uppercase tracking-wider">
                      <th className="p-4">Target Keyword</th>
                      <th className="p-4 text-center">Current Position</th>
                      <th className="p-4 text-center">Movement</th>
                      <th className="p-4 text-center">Search Vol</th>
                      <th className="p-4 text-right">Difficulty</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    {rankings.map((rk, i) => (
                      <tr key={i} className="hover:bg-white/2 transition-colors">
                        <td className="p-4 font-medium text-white">{rk.keyword}</td>
                        <td className="p-4 text-center font-bold font-mono">
                          <span className={rk.position <= 3 ? 'text-amber-400' : 'text-white'}>
                            #{rk.position}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-1 font-mono font-bold">
                            {rk.change > 0 ? (
                              <span className="text-emerald-400 flex items-center text-[11px]"><TrendingUp className="w-3 h-3 mr-0.5" />+{rk.change}</span>
                            ) : rk.change < 0 ? (
                              <span className="text-red-400 flex items-center text-[11px]"><TrendingDown className="w-3 h-3 mr-0.5" />{rk.change}</span>
                            ) : (
                              <span className="text-slate-500"><Minus className="w-3 h-3" /></span>
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-center text-slate-400 font-mono">{rk.volume.toLocaleString()}</td>
                        <td className="p-4 text-right">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold ${
                            rk.difficulty === 'Low' ? 'bg-emerald-500/10 text-emerald-400' :
                            rk.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'
                          }`}>
                            {rk.difficulty}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 border border-dashed border-white/5 rounded-2xl">
              <Target className="w-6 h-6 text-slate-600 mx-auto mb-2 opacity-50" />
              <p className="text-slate-400 text-xs">No active audits targeted</p>
              <p className="text-slate-600 text-[11px] mt-0.5">Input parameters on the sidebar layout to begin surveillance loops.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
      }
      
