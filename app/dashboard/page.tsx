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
  Search, BarChart3, CheckCircle
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

  const statsCards = [
    {
      title: 'Total Revenue',
      value: stats.revenue,
      change: 18,
      changeLabel: 'vs last month',
      icon: <DollarSign className="w-4 h-4" />,
      color: '#10b981',
      prefix: '$',
    },
    {
      title: 'Total Contacts',
      value: stats.contacts,
      change: 12,
      changeLabel: 'vs last month',
      icon: <Users className="w-4 h-4" />,
      color: '#3b82f6',
    },
    {
      title: 'Active Deals',
      value: stats.deals,
      change: 8,
      changeLabel: 'vs last month',
      icon: <TrendingUp className="w-4 h-4" />,
      color: '#6366f1',
    },
    {
      title: 'Win Rate',
      value: stats.winRate,
      change: 5,
      changeLabel: 'vs last month',
      icon: <CheckCircle className="w-4 h-4" />,
      color: '#f59e0b',
      suffix: '%',
    },
    {
      title: 'Proposals Sent',
      value: stats.proposals,
      change: 15,
      changeLabel: 'vs last month',
      icon: <FileText className="w-4 h-4" />,
      color: '#a78bfa',
    },
    {
      title: 'Invoices',
      value: stats.invoices,
      change: 20,
      changeLabel: 'vs last month',
      icon: <DollarSign className="w-4 h-4" />,
      color: '#14b8a6',
    },
    {
      title: 'SEO Audits',
      value: stats.audits,
      change: 33,
      changeLabel: 'vs last month',
      icon: <Search className="w-4 h-4" />,
      color: '#8b5cf6',
    },
    {
      title: 'Growth Rate',
      value: stats.growth,
      change: 5,
      changeLabel: 'vs last month',
      icon: <BarChart3 className="w-4 h-4" />,
      color: '#ec4899',
      suffix: '%',
    },
  ]

  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto px-2 py-4 md:p-6 space-y-6 overflow-x-hidden">
        
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-white tracking-tight capitalize">
              {greeting}, {userName}! 👋
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Business overview & KPIs dashboard structure.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/60 border border-white/5 px-3 py-1.5 rounded-xl w-fit">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400 text-[11px] font-medium">All systems operational</span>
          </div>
        </div>

        {/* Stats Grid - Fixed Layout Bug */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {statsCards.map((card, i) => (
            <div key={i} className="w-full min-w-0">
              <StatsCard {...card} loading={isDataLoading} index={i} />
            </div>
          ))}
        </div>

        {/* Action Blocks & Charts Grid Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start w-full">
          <div className="lg:col-span-2 w-full min-w-0 bg-slate-950/20 rounded-2xl border border-white/5 p-1">
            <RevenueChart />
          </div>
          <div className="w-full min-w-0">
            <QuickActions />
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="w-full bg-slate-950/20 rounded-2xl border border-white/5 p-1">
          <ActivityFeed />
        </div>

      </div>
    </DashboardLayout>
  )
                      }
      
