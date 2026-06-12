'use client'
import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { useAppStore } from '@/store'
import { createClientSupabaseClient } from '@/lib/supabase'
import { Settings, User, Bell, Shield, LogOut } from 'lucide-react'

export default function SettingsPage() {
  const { companyName, currency, setCompanyName, setCurrency } = useAppStore()
  const [user, setUser] = useState<any>(null)
  const [saved, setSaved] = useState(false)
  const supabase = createClientSupabaseClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [])

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  const signOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500 text-sm mt-0.5">Manage your account and preferences</p>
        </div>

        {/* Profile */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <User size={18} className="text-purple-600" />
            <h2 className="font-semibold text-gray-900">Profile</h2>
          </div>
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="text-xs text-gray-400 mb-0.5">Email</div>
              <div className="text-sm font-medium text-gray-800">{user?.email || '—'}</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="text-xs text-gray-400 mb-0.5">Name</div>
              <div className="text-sm font-medium text-gray-800">{user?.user_metadata?.name || '—'}</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="text-xs text-gray-400 mb-0.5">Member Since</div>
              <div className="text-sm font-medium text-gray-800">
                {user?.created_at ? new Date(user.created_at).toLocaleDateString() : '—'}
              </div>
            </div>
          </div>
        </div>

        {/* Business */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Settings size={18} className="text-purple-600" />
            <h2 className="font-semibold text-gray-900">Business Settings</h2>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Company Name</label>
              <input value={companyName} onChange={e => setCompanyName(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Currency</label>
              <select value={currency} onChange={e => setCurrency(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-400">
                {['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'PKR', 'INR'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <button onClick={save}
              className={`w-full py-2.5 rounded-xl text-sm font-semibold transition ${saved ? 'bg-green-500 text-white' : 'gradient-brand text-white shadow-purple hover:opacity-90'}`}>
              {saved ? '✓ Saved!' : 'Save Settings'}
            </button>
          </div>
        </div>

        {/* Danger */}
        <div className="bg-white rounded-2xl border border-red-100 shadow-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield size={18} className="text-red-500" />
            <h2 className="font-semibold text-gray-900">Account</h2>
          </div>
          <button onClick={signOut}
            className="flex items-center gap-2 text-sm font-medium text-red-500 bg-red-50 px-4 py-2.5 rounded-xl hover:bg-red-100 transition">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
            }
