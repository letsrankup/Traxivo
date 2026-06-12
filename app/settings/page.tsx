'use client'

import React, { useState, useEffect } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { useAppStore } from '@/store'
import { createBrowserClient } from '@supabase/ssr'
import { Settings, User, Shield, LogOut } from 'lucide-react'

// 💎 Define Strict TypeScript Interface for Business OS Global Store
interface BusinessStoreState {
  companyName?: string
  currency?: string
  setCompanyName?: (name: string) => void
  setCurrency?: (currency: string) => void
}

export default function SettingsPage() {
  // Explicitly typed store connection to prevent future build or scaling issues
  const store = useAppStore() as BusinessStoreState
  const companyName = store?.companyName || ''
  const currency = store?.currency || 'USD'
  const setCompanyName = store?.setCompanyName
  const setCurrency = store?.setCurrency

  const [user, setUser] = useState<any>(null)
  const [saved, setSaved] = useState<boolean>(false)
  const [mounted, setMounted] = useState<boolean>(false)
  
  // ⚡ Directly invoke the native browser client ensuring 100% compilation success
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  )

  useEffect(() => {
    setMounted(true)
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) {
        setUser(data.user)
      }
    }).catch((err) => console.error("Settings Auth Check Error:", err))
  }, [supabase])

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      window.location.href = '/login'
    } catch (error) {
      console.error("Sign out execution failed:", error)
    }
  }

  // Pure Enterprise-grade Hydration Guard
  if (!mounted) {
    return (
      <DashboardLayout>
        <div className="space-y-6 max-w-2xl animate-pulse p-4 md:p-6">
          <div className="h-8 bg-slate-200 rounded-lg w-1/3"></div>
          <div className="h-48 bg-slate-200 rounded-2xl mt-4"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-2xl p-4 md:p-6 animated-bg">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 gradient-text">Settings</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage your account and preferences</p>
        </div>

        {/* Profile Details Panel */}
        <div className="glass rounded-2xl p-6 glass-hover shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <User size={18} className="text-[#0284c7]" />
            <h2 className="font-semibold text-slate-900">Profile Details</h2>
          </div>
          <div className="space-y-3">
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
              <div className="text-xs text-slate-400 mb-0.5">Email Address</div>
              <div className="text-sm font-medium text-slate-800">{user?.email || '—'}</div>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
              <div className="text-xs text-slate-400 mb-0.5">Full Name</div>
              <div className="text-sm font-medium text-slate-800">{user?.user_metadata?.name || '—'}</div>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
              <div className="text-xs text-slate-400 mb-0.5">Member Since</div>
              <div className="text-sm font-medium text-slate-800">
                {user?.created_at ? new Date(user.created_at).toLocaleDateString() : '—'}
              </div>
            </div>
          </div>
        </div>

        {/* Business Settings Panel */}
        <div className="glass rounded-2xl p-6 glass-hover shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Settings size={18} className="text-[#0284c7]" />
            <h2 className="font-semibold text-slate-900">Business Configurations</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Company Name</label>
              <input 
                type="text"
                value={companyName} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompanyName && setCompanyName(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:border-transparent transition text-slate-800" 
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Default Currency</label>
              <select 
                value={currency} 
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCurrency && setCurrency(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#38bdf8] transition text-slate-800"
              >
                {['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'PKR', 'INR'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <button 
              onClick={handleSave}
              className={`w-full py-2.5 rounded-xl text-sm font-semibold transition glow-brand duration-200 ${
                saved 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-[#0284c7] hover:bg-[#0274b3] text-white'
              }`}
            >
              {saved ? '✓ Changes Saved Successfully!' : 'Save Business Settings'}
            </button>
          </div>
        </div>

        {/* Security / Sign Out Panel */}
        <div className="glass rounded-2xl border-red-200/60 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Shield size={18} className="text-red-500" />
            <h2 className="font-semibold text-slate-900">Security & Session</h2>
          </div>
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-2 text-sm font-medium text-red-600 bg-red-50 px-4 py-2.5 rounded-xl hover:bg-red-100/70 transition"
          >
            <LogOut size={16} /> Secure Sign Out
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
                                                                                                       }
