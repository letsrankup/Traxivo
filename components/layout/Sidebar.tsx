'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Search, Globe, Zap, BarChart3,
  TrendingUp, Users, FileText, DollarSign, PieChart,
  Settings, ChevronLeft, ChevronRight, LogOut, Bell
} from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const navItems = [
  { href: '/dashboard',           icon: LayoutDashboard, label: 'Dashboard',          color: '#6366f1' },
  { href: '/seo-audit',           icon: Search,          label: 'SEO Audit',           color: '#8b5cf6' },
  { href: '/website-analyzer',    icon: Globe,           label: 'Website Analyzer',    color: '#06b6d4' },
  { href: '/leads-finder',        icon: Zap,             label: 'Leads Finder',        color: '#f59e0b' },
  { href: '/competitor-analysis', icon: BarChart3,       label: 'Competitor Analysis', color: '#ec4899' },
  { href: '/rank-tracker',        icon: TrendingUp,      label: 'Rank Tracker',        color: '#10b981' },
  { href: '/crm',                 icon: Users,           label: 'CRM',                 color: '#3b82f6' },
  { href: '/proposal-builder',    icon: FileText,        label: 'Proposal Builder',    color: '#a78bfa' },
  { href: '/invoice-system',      icon: DollarSign,      label: 'Invoice System',      color: '#14b8a6' },
  { href: '/reports',             icon: PieChart,        label: 'Reports',             color: '#f97316' },
  { href: '/settings',            icon: Settings,        label: 'Settings',            color: '#64748b' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-full z-40 flex flex-col glass border-r border-white/5 overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-white/5">
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center gap-2"
            >
              <div className="w-7 h-7 rounded-lg bg-brand-gradient flex items-center justify-center flex-shrink-0">
                <Zap className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-lg font-black gradient-text">Traxivo</span>
            </motion.div>
          )}
        </AnimatePresence>
        {collapsed && (
          <div className="w-7 h-7 rounded-lg bg-brand-gradient flex items-center justify-center mx-auto">
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
        )}
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="text-slate-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: collapsed ? 0 : 4 }}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200
                  ${active
                    ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/10 border border-indigo-500/20 text-indigo-300'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    background: active ? `${item.color}25` : 'transparent',
                    border: active ? `1px solid ${item.color}40` : '1px solid transparent',
                  }}
                >
                  <item.icon
                    className="w-4 h-4"
                    style={{ color: active ? item.color : undefined }}
                  />
                </div>
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -5 }}
                      className="text-sm font-medium whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {active && !collapsed && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400"
                  />
                )}
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-white/5 p-3 space-y-1">
        {collapsed && (
          <button
            onClick={() => setCollapsed(false)}
            className="w-full flex items-center justify-center p-2 rounded-xl text-slate-500 hover:text-white hover:bg-white/5 transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
            <LogOut className="w-4 h-4" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm font-medium"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  )
              }
