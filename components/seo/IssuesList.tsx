'use client'
import { motion } from 'framer-motion'
import { AlertCircle, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { AuditResult } from '@/lib/seo-analyzer'

interface IssuesListProps {
  issues: AuditResult['issues']
}

export default function IssuesList({ issues }: IssuesListProps) {
  return (
    <div className="glass border border-white/5 rounded-2xl p-6">
      <h3 className="text-white font-semibold text-base mb-4">Detailed Audit Checklist</h3>
      
      <div className="space-y-2">
        {issues.map((issue, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`flex items-start gap-3 p-3.5 rounded-xl border ${
              issue.type === 'critical'
                ? 'bg-red-500/5 border-red-500/10 text-red-400'
                : issue.type === 'warning'
                  ? 'bg-amber-500/5 border-amber-500/10 text-amber-400'
                  : 'bg-emerald-500/5 border-emerald-500/10 text-emerald-400'
            }`}
          >
            {issue.type === 'critical' && <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />}
            {issue.type === 'warning' && <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />}
            {issue.type === 'good' && <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />}
            
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-200">{issue.message}</p>
              <p className="text-xs text-slate-500 capitalize mt-0.5">Impact Level: {issue.type}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
            }

