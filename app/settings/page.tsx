'use client'
import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Key, Save, CheckCircle, Database, ShieldAlert, Sliders } from 'lucide-react'

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState('sk-or-v1-••••••••••••••••••••••••••••••••')
  const [saved, setSaved] = useState(false)

  const handleConfigSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">System Engine Control</h1>
          <p className="text-slate-400 text-xs mt-1">Manage API routing parameters, local environment states, and platform access keys.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Fields Configuration Card */}
          <div className="md:col-span-2 glass border border-white/5 rounded-2xl p-5 h-fit">
            <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-indigo-400" /> Core Routing Credentials
            </h3>

            <form onSubmit={handleConfigSave} className="space-y-4">
              <div>
                <label className="text-slate-400 text-[11px] uppercase font-bold tracking-wider block mb-1.5">Decentralized Model API Key (OpenRouter)</label>
                <div className="relative">
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                  <Key className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                </div>
                <p className="text-slate-600 text-[10px] mt-1">Utilizes open-source layers to maintain completely free tools processing streams.</p>
              </div>

              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                Commit Parameters File
              </button>
            </form>

            {saved && (
              <div className="mt-3 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl flex items-center gap-2 animate-fadeIn">
                <CheckCircle className="w-4 h-4" /> System credentials committed to local state memory.
              </div>
            )}
          </div>

          {/* Right Architecture Blueprint Card */}
          <div className="glass border border-white/5 rounded-2xl p-5 space-y-4 text-xs">
            <h3 className="text-white font-semibold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Database className="w-4 h-4 text-indigo-400" /> Platform Mapping
            </h3>
            <div className="space-y-2 text-slate-400">
              <p><strong>Deployment Mode:</strong> <span className="text-indigo-400 font-mono">Edge Production</span></p>
              <p><strong>Client Version:</strong> <span className="text-slate-300 font-mono">v1.0.2-Stable</span></p>
              <p><strong>Database Tier:</strong> <span className="text-emerald-400 font-mono">Supabase (SSL On)</span></p>
            </div>
            <div className="p-3 bg-white/1 border border-white/5 rounded-xl text-slate-500 text-[11px] leading-relaxed">
              Ensure proper row levels policies are activated inside the cloud cluster console before invoking remote database pools.
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
