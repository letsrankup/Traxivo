'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import {
  Search, Users, FileText, DollarSign,
  TrendingUp, Zap, Globe, CheckCircle
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface Activity {
  id: number
  type: string
  title: string
  desc: string
  time: Date
  icon: any
  color: string
}

const activityTypes = [
  { type: 'seo',      icon: Search,      color: '#8b5cf6', titles: ['SEO audit completed', 'New keyword ranked', 'Technical issue fixed'] },
  { type: 'lead',     icon: Zap,         color: '#f59e0b', titles: ['New lead discovered', 'Lead qualified', 'Lead contacted'] },
  { type: 'deal',     icon: DollarSign,  color: '#10b981', titles: ['Deal closed', 'Proposal accepted', 'Invoice paid'] },
  { type: 'crm',      icon: Users,       color: '#3b82f6', titles: ['Contact added', 'Meeting scheduled', 'Follow-up sent'] },
  { type: 'proposal', icon: FileText,    color: '#a78bfa', titles: ['Proposal sent', 'Proposal viewed', 'Proposal signed'] },
  { type: 'rank',     icon: TrendingUp,  color: '#06b6d4', titles: ['Ranking improved', 'Position #1 achieved', 'Traffic spike'] },
  { type: 'web',      icon: Globe,       color: '#ec4899', titles: ['Website analyzed', 'Performance improved', 'Speed score up'] },
]

const generateActivities = (): Activity[] => {
  return Array.from({ length: 12 }, (_, i) => {
    const type = activityTypes[Math.floor(Math.random() * activityTypes.length)]
    const title = type.titles[Math.floor(Math.random() * type.titles.length)]
    return {
      id: i,
      type: type.type,
      title,
      desc: ['acme.com', 'techstartup.io', 'growthco.net', 'digitalagency.com'][Math.floor(Math.random() * 4)],
      time: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 3),
      icon: type.icon,
      color: type.color,
    }
  }).sort((a, b) => b.time.getTime() - a.time.getTime())
}

export default function ActivityFeed() {
  const [activities] = useState<Activity[]>(generateActivities)
  const [visible, setVisible] = useState(6)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass rounded-2xl p-6 border border-white/5"
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-white font-semibold">Recent Activity</h3>
        <span className="text-indigo-400 text-xs font-medium bg-indigo-500/10 px-2 py-1 rounded-lg">
          Live
        </span>
      </div>

      <div className="space-y-1">
        {activities.slice(0, visible).map((act, i) => (
          <motion.div
            key={act.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/3 transition-colors group"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: `${act.color}20`, border: `1px solid ${act.color}30` }}
            >
              <act.icon className="w-3.5 h-3.5" style={{ color: act.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{act.title}</p>
              <p className="text-slate-500 text-xs truncate">{act.desc}</p>
            </div>
            <span className="text-slate-600 text-xs flex-shrink-0 group-hover:text-slate-400 transition-colors">
              {formatDistanceToNow(act.time, { addSuffix: true })}
            </span>
          </motion.div>
        ))}
      </div>

      {visible < activities.length && (
        <button
          onClick={() => setVisible(v => v + 6)}
          className="w-full mt-3 py-2 text-indigo-400 text-xs font-medium hover:text-indigo-300 transition-colors"
        >
          Load more →
        </button>
      )}
    </motion.div>
  )
      }
