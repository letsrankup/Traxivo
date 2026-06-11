'use client'
import { motion } from 'framer-motion'
import { CheckCircle, AlertTriangle, ShieldCheck, Gauge } from 'lucide-react'
import { AuditResult } from '@/lib/seo-analyzer'

interface AuditScoreProps {
  result: AuditResult
}

export default function AuditScore({ result }: AuditScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5'
    if (score >= 50) return 'text-amber-400 border-amber-500/20 bg-amber-500/5'
    return 'text-red-400 border-red-500/20 bg-red-500/5'
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Main Score Radial Display */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`glass border rounded-2xl p-6 flex flex-col items-center justify-center text-center ${getScoreColor(result.score)}`}
      >
        <Gauge className="w-8 h-8 mb-2 opacity-80" />
        <span className="text-5xl font-black tracking-tight mb-1">{result.score}</span>
        <p className="text-xs font-semibold uppercase tracking-wider opacity-90">Overall SEO Score</p>
      </motion.div>

      {/* Core Vitals */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="glass border border-white/5 rounded-2xl p-5 flex flex-col justify-between"
      >
        <div>
          <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">Performance & Speed</h4>
          <p className="text-2xl font-bold text-white mb-1">{result.loadTimeEstimated}s</p>
          <p className="text-xs text-slate-500">Estimated page loading speed</p>
        </div>
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
          <span className="text-slate-400">Images Tracked:</span>
          <span className="text-white font-mono font-bold">{result.imagesCount}</span>
        </div>
      </motion.div>

      {/* Security Status */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="glass border border-white/5 rounded-2xl p-5 flex flex-col justify-between"
      >
        <div>
          <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">Security Infrastructure</h4>
          <div className="flex items-center gap-2 mt-1">
            {result.sslEnabled ? (
              <>
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-bold text-white">SSL Encrypted</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <span className="text-sm font-bold text-white">Insecure Connection</span>
              </>
            )}
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
          <span className="text-slate-400">HTML Tags (H1 / H2):</span>
          <span className="text-white font-mono font-bold">{result.h1Count} / {result.h2Count}</span>
        </div>
      </motion.div>
    </div>
  )
          }
        
