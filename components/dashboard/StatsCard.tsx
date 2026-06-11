'use client'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon: ReactNode
  color: string
  prefix?: string
  suffix?: string
  loading?: boolean
  index?: number
}

export default function StatsCard({
  title, value, change, changeLabel, icon,
  color, prefix, suffix, loading, index = 0
}: StatsCardProps) {
  const isPositive = (change ?? 0) > 0
  const isNeutral = change === 0 || change === undefined

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="glass rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-all duration-300 group"
    >
      {loading ? (
        <div className="space-y-3">
          <div className="h-4 shimmer rounded-lg w-2/3" />
          <div className="h-8 shimmer rounded-lg w-1/2" />
          <div className="h-3 shimmer rounded-lg w-1/3" />
        </div>
      ) : (
        <>
          {/* Top Row */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">
                {title}
              </p>
            </div>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
              style={{ background: `${color}20`, border: `1px solid ${color}30` }}
            >
              <div style={{ color }}>{icon}</div>
            </div>
          </div>

          {/* Value */}
          <div className="mb-3">
            <div className="flex items-baseline gap-1">
              {prefix && <span className="text-slate-400 text-sm">{prefix}</span>}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.08 + 0.3 }}
                className="text-2xl font-black text-white"
              >
                {typeof value === 'number' ? value.toLocaleString() : value}
              </motion.span>
              {suffix && <span className="text-slate-400 text-sm">{suffix}</span>}
            </div>
          </div>

          {/* Change */}
          {change !== undefined && (
            <div className="flex items-center gap-1.5">
              <div className={`flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-lg ${
                isNeutral
                  ? 'text-slate-400 bg-slate-500/10'
                  : isPositive
                    ? 'text-emerald-400 bg-emerald-500/10'
                    : 'text-red-400 bg-red-500/10'
              }`}>
                {isNeutral
                  ? <Minus className="w-3 h-3" />
                  : isPositive
                    ? <TrendingUp className="w-3 h-3" />
                    : <TrendingDown className="w-3 h-3" />
                }
                {!isNeutral && `${Math.abs(change)}%`}
              </div>
              {changeLabel && (
                <span className="text-slate-500 text-xs">{changeLabel}</span>
              )}
            </div>
          )}
        </>
      )}
    </motion.div>
  )
              }
