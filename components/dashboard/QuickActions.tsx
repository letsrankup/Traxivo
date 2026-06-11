'use client'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  Search, Zap, Users, FileText,
  DollarSign, Globe, TrendingUp, BarChart3
} from 'lucide-react'

const actions = [
  { label: 'Run SEO Audit',       icon: Search,     href: '/seo-audit',           color: '#8b5cf6', desc: 'Analyze any URL' },
  { label: 'Find Leads',          icon: Zap,        href: '/leads-finder',         color: '#f59e0b', desc: 'Discover prospects' },
  { label: 'Analyze Website',     icon: Globe,      href: '/website-analyzer',     color: '#06b6d4', desc: 'Full site report' },
  { label: 'Check Rankings',      icon: TrendingUp, href: '/rank-tracker',         color: '#10b981', desc: 'SERP positions' },
  { label: 'Add Contact',         icon: Users,      href: '/crm',                 color: '#3b82f6', desc: 'CRM management' },
  { label: 'Create Proposal',     icon: FileText,   href: '/proposal-builder',     color: '#a78bfa', desc: 'AI-powered' },
  { label: 'New Invoice',         icon: DollarSign, href: '/invoice-system',       color: '#14b8a6', desc: 'Billing & payments' },
  { label: 'View Reports',        icon: BarChart3,  href: '/reports',             color: '#f97316', desc: 'Analytics' },
]

export default function QuickActions() {
  const router = useRouter()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass rounded-2xl p-6 border border-white/5"
    >
      <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-2">
        {actions.map((action, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push(action.href)}
            className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5 hover:bg-white/6 hover:border-white/10 transition-all text-left group"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
              style={{ background: `${action.color}20`, border: `1px solid ${action.color}30` }}
            >
              <action.icon className="w-4 h-4" style={{ color: action.color }} />
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-medium truncate">{action.label}</p>
              <p className="text-slate-500 text-xs truncate">{action.desc}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
