'use client'
import { useState, useEffect } from 'react'
import { Bell, Search, User, ChevronDown } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { usePathname } from 'next/navigation'

const pageTitles: Record<string, { title: string; desc: string }> = {
  '/dashboard':           { title: 'Dashboard',          desc: 'Business overview & KPIs' },
  '/seo-audit':           { title: 'SEO Audit',           desc: 'Technical SEO analysis' },
  '/website-analyzer':    { title: 'Website Analyzer',    desc: 'Full site performance' },
  '/leads-finder':        { title: 'Leads Finder',        desc: 'AI-powered prospect discovery' },
  '/competitor-analysis': { title: 'Competitor Analysis', desc: 'Market intelligence' },
  '/rank-tracker':        { title: 'Rank Tracker',        desc: 'SERP position monitoring' },
  '/crm':                 { title: 'CRM',                 desc: 'Contacts & pipeline' },
  '/proposal-builder':    { title: 'Proposal Builder',    desc: 'AI-generated proposals' },
  '/invoice-system':      { title: 'Invoice System',      desc: 'Billing & payments' },
  '/reports':             { title: 'Reports',             desc: 'Analytics & insights' },
  '/settings':            { title: 'Settings',            desc: 'Account & preferences' },
}

export default function TopNav() {
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)
  const [notifications] = useState(3)
  const page = pageTitles[pathname] || { title: 'Traxivo', desc: '' }

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [])

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'
  const initials = userName.slice(0, 2).toUpperCase()

  return (
    <header className="h-16 glass border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Left - Page Title */}
      <div>
        <h1 className="text-white font-bold text-lg leading-none">{page.title}</h1>
        <p className="text-slate-500 text-xs mt-0.5">{page.desc}</p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/8 rounded-xl px-3 py-2 w-48">
          <Search className="w-3.5 h-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Quick search..."
            className="bg-transparent text-sm text-slate-400 placeholder-slate-600 outline-none w-full"
          />
        </div>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
          <Bell className="w-4 h-4" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold">
              {notifications}
            </span>
          )}
        </button>

        {/* User */}
        <div className="flex items-center gap-2 bg-white/5 border border-white/8 rounded-xl px-3 py-1.5 cursor-pointer hover:bg-white/8 transition-colors">
          <div className="w-6 h-6 rounded-lg bg-brand-gradient flex items-center justify-center text-white text-xs font-bold">
            {initials}
          </div>
          <span className="text-slate-300 text-sm font-medium hidden md:block max-w-24 truncate">
            {userName}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden md:block" />
        </div>
      </div>
    </header>
  )
      }
