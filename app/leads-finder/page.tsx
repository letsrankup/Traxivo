'use client'
import { useState } from 'react'
import { useLeads } from '@/hooks/useLeads'
import LeadCard from '@/components/leads/LeadCard'
import LeadTable from '@/components/leads/LeadTable'
import { Search, Loader2, Sparkles, Building2, MapPin } from 'lucide-react'

export default function LeadsFinderPage() {
  const [industry, setIndustry] = useState('')
  const [location, setLocation] = useState('')
  const { loading, leads, searchLeads, updateLeadStatus } = useLeads()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (industry && location) {
      searchLeads(industry, location)
    }
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4 md:p-6">
      {/* Header Panel */}
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">OMNI Lead Extractor</h1>
        <p className="text-slate-400 text-xs mt-1">Discover high-intent cold outreach business leads using open maps intelligence scraping loops.</p>
      </div>

      {/* Search Input Forms */}
      <div className="glass border border-white/5 rounded-2xl p-4 md:p-6">
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Building2 className="absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Industry (e.g., Tech, Agency)..."
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div className="relative">
            <MapPin className="absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Location (e.g., Islamabad, London)..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !industry || !location}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-sm h-full py-3 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Scraping Web Data...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Extract Fresh Leads
              </>
            )}
          </button>
        </form>
      </div>

      {/* Conditional Output Panel Rendering */}
      {loading ? (
        <div className="text-center py-20">
          <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-400 font-medium">Executing Search Routines...</p>
          <p className="text-xs text-slate-600 mt-0.5">Filtering emails, scraping domains and cataloging telephone tags.</p>
        </div>
      ) : leads.length > 0 ? (
        <div>
          {/* Mobile Grid Layout / Fallback */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {leads.map(lead => (
              <LeadCard key={lead.id} lead={lead} onStatusChange={updateLeadStatus} />
            ))}
          </div>

          {/* Large Desktop Spreadsheet Matrix */}
          <div className="hidden md:block">
            <LeadTable leads={leads} onStatusChange={updateLeadStatus} />
          </div>
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-white/5 rounded-2xl">
          <Search className="w-8 h-8 text-slate-600 mx-auto mb-2 opacity-50" />
          <p className="text-slate-400 text-sm font-medium">No leads compiled yet</p>
          <p className="text-slate-600 text-xs mt-0.5">Input targeted categories to construct an automated lead channel.</p>
        </div>
      )}
    </div>
  )
              }
                  
