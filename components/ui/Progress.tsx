'use client'
import { motion } from 'framer-motion'

interface ProgressProps {
  value: number
  max?: number
  label?: string
  showValue?: boolean
  color?: string
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
}

const sizes = { sm: 'h-1', md: 'h-2', lg: 'h-3' }

const getColor = (value: number, customColor?: string) => {
  if (customColor) return customColor
  if (value >= 80) return '#10b981'
  if (value >= 60) return '#f59e0b'
  if (value >= 40) return '#f97316'
  return '#ef4444'
}

export default function Progress({
  value, max = 100, label, showValue = true,
  color, size = 'md', animated = true
}: ProgressProps) {
  const pct = Math.min(100, (value / max) * 100)
  const barColor = getColor(pct, color)

  return (
    <div className="space-y-1.5">
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-slate-400 text-xs">{label}</span>}
          {showValue && (
            <span className="text-white text-xs font-semibold">{Math.round(pct)}%</span>
          )}
        </div>
      )}
      <div className={`w-full bg-white/5 rounded-full overflow-hidden ${sizes[size]}`}>
        <motion.div
          initial={animated ? { width: 0 } : { width: `${pct}%` }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="h-full rounded-full"
          style={{ background: barColor, boxShadow: `0 0 8px ${barColor}60` }}
        />
      </div>
    </div>
  )
}
