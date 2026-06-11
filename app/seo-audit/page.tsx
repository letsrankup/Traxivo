'use client'
import { useState } from 'react'
import { useSEO } from '@/hooks/useSEO'
import AuditScore from '@/components/seo/AuditScore'
import IssuesList from '@/components/seo/IssuesList'
import { Search, Loader2, Globe, AlertCircle } from 'lucide-react'

export default function SeoAuditPage() {
  const [url, setUrl] = useState('')
  const { loading, error, result, runAudit } = useSEO()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (url.trim()) {
      runAudit(url)
    }
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4 md:p-6">
      {/* Top Header Banner */}
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">SEO Core Audit</h1>
        <p className="text-slate-400 text-xs mt-1">Analyze any platform or domain structure instantly without active cloud credits.</p>
      </div>

      {/* Input Target Action Bar */}
      <div className="glass border border-white/5 rounded-2xl p-4 md:p-6">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Globe className="absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Enter domain URL (e.g., mysite.com)..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !url}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing Domain...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                Run Diagnostics
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="mt-4 flex items-center gap-2 p-3 bg-red-500/5 border border-red-500/10 text-red-400 text-xs rounded-xl">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Results Dynamic Loading Panels */}
      {result && !loading && (
        <div className="space-y-6">
          <div className="p-4 bg-white/2 border border-white/5 rounded-xl text-xs text-slate-400 flex items-center justify-between">
            <span>Target Platform: <strong className="text-white font-mono">{result.url}</strong></span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Completed</span>
          </div>

          {/* Core Score Blocks */}
          <AuditScore result={result} />

          {/* List Of Technical Findings */}
          <IssuesList issues={result.issues} />
        </div>
      )}

      {/* Placeholder Welcome View */}
      !result && !loading && (
        <div className="text-center py-16 border border-dashed border-white/5 rounded-2xl">
          <Globe className="w-8 h-8 text-slate-600 mx-auto mb-2 opacity-50" />
          <p className="text-slate-400 text-sm font-medium">No domain audited yet</p>
          <p className="text-slate-600 text-xs mt-0.5">Submit an enterprise website link above to extract SEO configurations.</p>
        </div>
      )}
    </div>
  )
              }
                                      
