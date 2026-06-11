'use client'
import { useState } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

const generateData = () => {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return months.map((month, i) => ({
    month,
    revenue: Math.floor(3000 + Math.random() * 8000 + i * 400),
    leads: Math.floor(20 + Math.random() * 60 + i * 3),
    deals: Math.floor(5 + Math.random() * 20 + i * 1),
  }))
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="glass border border-white/10 rounded-xl p-3 shadow-glass">
      <p className="text-slate-400 text-xs mb-2 font-medium">{label}</p>
      {payload.map((entry: any, i: number) => (
        <div key={i} className="flex items-center gap-2 text-xs">
          <div className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
          <span className="text-slate-300 capitalize">{entry.name}:</span>
          <span className="text-white font-semibold">
            {entry.name === 'revenue' ? `$${entry.value.toLocaleString()}` : entry.value}
          </span>
        </div>
      ))}
    </div>
  )
}

const periods = ['6M', '1Y', 'ALL']

export default function RevenueChart() {
  const [data] = useState(generateData)
  const [period, setPeriod] = useState('1Y')

  const sliced = period === '6M' ? data.slice(-6) : data

  const totalRevenue = sliced.reduce((s, d) => s + d.revenue, 0)
  const growth = Math.round(
    ((sliced[sliced.length - 1]?.revenue - sliced[0]?.revenue) / sliced[0]?.revenue) * 100
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass rounded-2xl p-6 border border-white/5"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-white font-semibold text-base mb-1">Revenue Overview</h3>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black text-white">
              ${totalRevenue.toLocaleString()}
            </span>
            <span className="flex items-center gap-1 text-emerald-400 text-sm font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-lg">
              <TrendingUp className="w-3.5 h-3.5" />
              +{growth}%
            </span>
          </div>
          <p className="text-slate-500 text-xs mt-0.5">Total this period</p>
        </div>

        {/* Period Selector */}
        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/8">
          {periods.map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                period === p
                  ? 'bg-brand-gradient text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sliced} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradLeads" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis
              dataKey="month"
              tick={{ fill: '#64748b', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#64748b', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={v => `$${(v/1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#6366f1"
              strokeWidth={2}
              fill="url(#gradRevenue)"
            />
            <Area
              type="monotone"
              dataKey="leads"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#gradLeads)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
      }
