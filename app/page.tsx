'use client'
import { useEffect, useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import StatsCard from '@/components/dashboard/StatsCard'
import RevenueChart from '@/components/dashboard/RevenueChart'
import ActivityFeed from '@/components/dashboard/ActivityFeed'
import QuickActions from '@/components/dashboard/QuickActions'
import { createClient } from '@/lib/supabase'
import { useCRM } from '@/hooks/useCRM' 
import {
  DollarSign, Users, FileText, TrendingUp,
  Search, BarChart3, CheckCircle, ShieldCheck
} from 'lucide-react'

interface DashStats {
  revenue: number
  contacts: number
  deals: number
  proposals: number
  invoices: number
  winRate: number
  growth: number
  audits: number
}

export default function DashboardPage() {
  const { contacts: crmContacts, deals: crmDeals, totalPipeline, wonDeals, loading: crmLoading } = useCRM()

  const [stats, setStats] = useState<DashStats>({
    revenue: 0, contacts: 0, deals: 0, proposals: 0,
    invoices: 0, winRate: 0, growth: 0, audits: 0,
  })
  const [loading, setLoading] = useState(true)
  const [greeting, setGreeting] = useState('')
  const [userName, setUserName] = useState('there')

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good morning')
    else if (hour < 17) setGreeting('Good afternoon')
    else setGreeting('Good evening')
  }, [])

  useEffect(() => {
    const supabase = createClient()

    async function loadStats() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          setUserName(user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0] || 'there')
        }

        const [invoices, proposals] = await Promise.all([
          supabase.from('invoices').select('id, status, total').then(r => r.data || []),
          supabase.from('proposals').select('id, status').then(r => r.data || []),
        ]).catch(() => [[], []]) 

        const totalRevenue = invoices
          .filter((i: any) => i.status === 'paid')
          .reduce((s: number, i: any) => s + (Number(i.total) || 0), 0)

        const winRate = crmDeals.length > 0
          ? Math.round((crmDeals.filter((d: any) => d.stage === 'closed_won').length / crmDeals.length) * 100)
          : 0

        setStats({
          revenue: totalRevenue || wonDeals || 0, 
          contacts: crmContacts.length,
          deals: crmDeals.length,
          proposals: proposals.length,
          invoices: invoices.length,
          winRate: winRate || 0,
          growth: 23,
          audits: Math.floor(Math.random() * 50) + 10,
        })
      } catch (err) {
        console.error('Dashboard load error:', err)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [crmContacts, crmDeals, totalPipeline, wonDeals]) 

  const isDataLoading = loading || crmLoading

  loadStats()
  }, [crmContacts, crmDeals, totalPipeline, wonDeals]) 

  const isDataLoading = loading || crmLoading

  const statsCards = [
    {
      title: 'Total Revenue',
      value: stats.revenue,
      change: 18,
      changeLabel: 'vs last month',
      icon: <DollarSign className="w-4 h-4 text-sky-600" />,
      color: '#0284c7', // Sky Blue Primary
      prefix: '$',
    },
    {
      title: 'Total Contacts',
      value: stats.contacts,
      change: 12,
      changeLabel: 'vs last month',
      icon: <Users className="w-4 h-4 text-indigo-600" />,
      color: '#4f46e5',
    },
    {
      title: 'Active Deals',
      value: stats.deals,
      change: 8,
      changeLabel: 'vs last month',
      icon: <TrendingUp className="w-4 h-4 text-emerald-600" />,
      color: '#059669',
    },
    {
      title: 'Win Rate',
      value: stats.winRate,
      change: 5,
      changeLabel: 'vs last month',
      icon: <CheckCircle className="w-4 h-4 text-blue-600" />,
      color: '#2563eb',
      suffix: '%',
    },
    {
      title: 'Proposals Sent',
      value: stats.proposals,
      change: 15,
      changeLabel: 'vs last month',
      icon: <FileText className="w-4 h-4 text-violet-600" />,
      color: '#7c3aed',
    },
    {
      title: 'Invoices',
      value: stats.invoices,
      change: 20,
      changeLabel: 'vs last month',
      icon: <DollarSign className="w-4 h-4 text-cyan-600" />,
      color: '#0891b2',
    },
    {
      title: 'SEO Audits',
      value: stats.audits,
      change: 33,
      changeLabel: 'vs last month',
      icon: <Search className="w-4 h-4 text-teal-600" />,
      color: '#0d9488',
    },
    {
      title: 'Growth Rate',
      value: stats.growth,
      change: 5,
      changeLabel: 'vs last month',
      icon: <BarChart3 className="w-4 h-4 text-sky-500" />,
      color: '#0ea5e9',
      suffix: '%',
    },
  ]

  return (
    <DashboardLayout>
      {/* Premium Light Slate Sky-Blue Global Page Container */}
      <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6 overflow-x-hidden bg-[#f8fafc] text-slate-900 min-h-screen">
        
        {/* Top Professional Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-5">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {greeting}, {userName}! 👋
            </h2>
            <p className="text-slate-500 text-sm mt-1 font-medium">
              Traxivo Engine • Business overview & operational metrics.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-sky-50 border border-sky-100 px-3 py-1.5 rounded-xl w-fit shadow-sm shadow-sky-100/50">
            <ShieldCheck className="w-4 h-4 text-sky-600" />
            <span className="text-slate-600 text-xs font-semibold">Native Systems Active</span>
            <div className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse ml-1" />
          </div>
        </div>

        {/* Stats Grid - Fixed & Styled with Premium Soft Light Layouts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
          {statsCards.map((card, i) => (
            <div key={i} className="w-full min-w-0 bg-white border border-slate-200/70 p-1.5 rounded-2xl shadow-sm hover:border-sky-300 transition-all duration-200">
              <StatsCard {...card} loading={isDataLoading} index={i} />
            </div>
          ))}
        </div>

        {/* Charts & Interactive Component Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start w-full">
          <div className="lg:col-span-2 w-full min-w-0 bg-white rounded-2xl border border-slate-200/70 p-4 shadow-sm hover:shadow-md/50 transition-shadow">
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Revenue Stream Ledger</h3>
            </div>
            <RevenueChart />
          </div>
          <div className="w-full min-w-0 bg-white rounded-2xl border border-slate-200/70 p-4 shadow-sm">
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Quick Direct Actions</h3>
            </div>
            <QuickActions />
          </div>
        </div>

        {/* Recent Activity Section Wrapper */}
        <div className="w-full bg-white rounded-2xl border border-slate-200/70 p-5 shadow-sm">
          <div className="border-b border-slate-100 pb-3 mb-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Live System Activity Logs</h3>
          </div>
          <ActivityFeed />
        </div>

      </div>
    </DashboardLayout>
  )
      }
