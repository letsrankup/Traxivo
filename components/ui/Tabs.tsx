'use client'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface Tab {
  id: string
  label: string
  icon?: ReactNode
  count?: number
}

interface TabsProps {
  tabs: Tab[]
  active: string
  onChange: (id: string) => void
  className?: string
}

export default function Tabs({ tabs, active, onChange, className = '' }: TabsProps) {
  return (
    <div className={`flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/8 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`
            relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
            transition-colors duration-200 flex-1 justify-center
            ${active === tab.id ? 'text-white' : 'text-slate-400 hover:text-slate-200'}
          `}
        >
          {active === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-brand-gradient rounded-xl"
              style={{ zIndex: 0 }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            {tab.icon}
            {tab.label}
            {tab.count !== undefined && (
              <span className={`
                px-1.5 py-0.5 rounded-full text-xs font-bold
                ${active === tab.id ? 'bg-white/20' : 'bg-white/8 text-slate-500'}
              `}>
                {tab.count}
              </span>
            )}
          </span>
        </button>
      ))}
    </div>
  )
              }
