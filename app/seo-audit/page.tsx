'use client'
import { useState } from 'react'
import { useSEO } from '@/hooks/useSEO'
import AuditScore from '@/components/seo/AuditScore'
import IssuesList from '@/components/seo/IssuesList'
import { Search, Loader2, Globe, AlertCircle, CheckCircle2 } from 'lucide-react'

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
    <div className="space-y-6 max-w-6xl mx-auto p-4 md:p-6 min-h-screen text-gray-100">
      {/* Top Header Banner */}
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-2">
          <Search className="w-6 h-6 text-indigo-500" />
          SEO Core Audit
        </h1>
        <p className="text-slate-400 text-xs mt-1">
          Analyze any platform or domain structure instantly with Traxivo Engine. No active cloud credits required.
        </p>
      </div>

      {/* Input Target Action Bar */}
      <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-4 md:p-6 backdrop-blur-md shadow-xl">
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
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
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
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="p-4 bg-slate-900/50 border border-white/5 rounded-xl text-xs text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              Target Platform: <strong className="text-white font-mono">{result.url}</strong>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Completed
            </span>
          </div>

          {/* Core Score Blocks */}
          <AuditScore result={result} />

          {/* List Of Technical Findings */}
          <IssuesList issues={result.issues} />
        </div>
      )}

      {/* Placeholder Welcome View (FIXED SYNTAX WITH { }) */}
      {!result && !loading && (
        <div className="text-center py-16 border border-dashed border-white/5 bg-slate-950/20 rounded-2xl animate-in fade-in duration-200">
          <div className="p-3 bg-slate-900/60 rounded-full border border-white/5 w-fit mx-auto mb-4">
            <Globe className="w-6 h-6 text-slate-500 opacity-80" />
          </div>
          <p className="text-slate-200 text-base font-bold">No domain audited yet</p>
          <p className="text-slate-400 text-xs mt-1.5 max-w-sm mx-auto leading-relaxed">
            Submit an enterprise website link above to extract SEO configurations, core web architectures, and meta tags instantly.
          </p>
        </div>
      )}
    </div>
  )
}

