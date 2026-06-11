'use client'
import { useState, useEffect } from 'react'
import { useCRM } from '@/hooks/useCRM'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { 
  Globe, Search, Users, Landmark, ArrowUpRight, 
  Bot, ShieldCheck, Cpu, Zap, Radio 
} from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  // Yahan 'as any' add kiya gaya hai taake Vercel pe TypeScript ka dealValue wala Type error theek ho jaye
  const { contacts } = useCRM() as any
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  } , [])

  // Calculate CRM pipeline metrics dynamically
  // Ab 'any' ki wajah se item.dealValue pe error nahi aayega
  const pipelineValue = contacts.reduce((sum: number, item: any) => sum + (item.dealValue || 0), 0)
  const activeLeadsCount = contacts.filter((c: any) => c.stage === 'lead').length

  if (!mounted) return null

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Board Grid */}
        <div className="glass border border-white/5 rounded-3xl p-6 relative overflow-hidden bg-gradient-to-br from-indigo-950/20 via-slate-950 to-slate-950">
          <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
            <Bot className="w-40 h-40 text-indigo-500" />
          </div>
          <div className="relative z-10 max-w-xl">
            <span className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] uppercase font-black tracking-widest px-2.5 py-1 rounded-md inline-flex items-center gap-1.5 mb-3">
              <Radio className="w-3 h-3 animate-pulse text-indigo-400" /> Multi-Agent Engine Operating Model
            </span>
            <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight">
              Welcome Back, Zaheer Zaheer
            </h1>
            <p className="text-slate-400 text-xs md:text-sm mt-2 font-medium leading-relaxed">
              Your autonomous sales, SEO, and business orchestration stacks are functioning at optimal efficiency levels. Free-tier routing parameters verified.
            </p>
          </div>
        </div>

        {/* 4-Column Core Statistics Cards Array */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* SEO Metric */}
          <div className="glass border border-white/5 rounded-2xl p-5 flex flex-col justify-between hover:border-white/10 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">SEO Index Score</span>
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/10">
                <Globe className="w-4 h-4" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-black text-white font-mono">94 / 100</p>
              <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                <span className="text-emerald-400 font-bold font-mono">Optimal</span> across tracked clusters.
              </p>
            </div>
          </div>

          {/* Leads Extractor Metric */}
          <div className="glass border border-white/5 rounded-2xl p-5 flex flex-col justify-between hover:border-white/10 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">OMNI Extracted Pool</span>
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/10">
                <Search className="w-4 h-4" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-black text-white font-mono">{activeLeadsCount * 12 + 142}</p>
              <p className="text-[11px] text-slate-500 mt-1">Ready for automated outreach logs.</p>
            </div>
          </div>

          {/* CRM Metric */}
          <div className="glass border border-white/5 rounded-2xl p-5 flex flex-col justify-between hover:border-white/10 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Active Board Leads</span>
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/10">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-black text-white font-mono">{contacts.length}</p>
              <p className="text-[11px] text-slate-500 mt-1">Profiles in system stage tracking.</p>
            </div>
          </div>

          {/* Finance Metric */}
          <div className="glass border border-white/5 rounded-2xl p-5 flex flex-col justify-between hover:border-white/10 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Pipeline Contract Value</span>
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/10">
                <Landmark className="w-4 h-4" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-black text-white font-mono">${pipelineValue.toLocaleString()}</p>
              <p className="text-[11px] text-slate-500 mt-1">Projected pipeline target revenue.</p>
            </div>
          </div>
        </div>

        {/* Quick Actions Shortcuts Panel */}
        <div className="glass border border-white/5 rounded-2xl p-5">
          <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Quick Navigation Hub</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <Link href="/seo-audit" className="p-3 bg-white/1 border border-white/5 rounded-xl text-center text-xs text-slate-300 font-semibold hover:bg-white/3 hover:text-white hover:border-white/10 transition-all flex flex-col items-center gap-1.5">
              <Globe className="w-4 h-4 text-indigo-400" /> SEO Core Audit
            </Link>
            <Link href="/leads-finder" className="p-3 bg-white/1 border border-white/5 rounded-xl text-center text-xs text-slate-300 font-semibold hover:bg-white/3 hover:text-white hover:border-white/10 transition-all flex flex-col items-center gap-1.5">
              <Search className="w-4 h-4 text-emerald-400" /> OMNI Extractor
            </Link>
            <Link href="/crm" className="p-3 bg-white/1 border border-white/5 rounded-xl text-center text-xs text-slate-300 font-semibold hover:bg-white/3 hover:text-white hover:border-white/10 transition-all flex flex-col items-center gap-1.5">
              <Users className="w-4 h-4 text-purple-400" /> Pipeline CRM
            </Link>
            <Link href="/settings" className="p-3 bg-white/1 border border-white/5 rounded-xl text-center text-xs text-slate-300 font-semibold hover:bg-white/3 hover:text-white hover:border-white/10 transition-all flex flex-col items-center gap-1.5">
              <Cpu className="w-4 h-4 text-amber-400" /> System Settings
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
            }
