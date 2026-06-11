'use client'
import { Zap, Mail, Phone, Globe, ExternalLink } from 'lucide-react'
import { Lead } from '@/lib/lead-scraper'

interface LeadCardProps {
  lead: Lead
  onStatusChange: (id: string, status: Lead['status']) => void
}

export default function LeadCard({ lead, onStatusChange }: LeadCardProps) {
  return (
    <div className="glass border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all group">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="text-white font-semibold text-base group-hover:text-indigo-400 transition-colors">
            {lead.companyName}
          </h4>
          <span className="inline-block text-[10px] uppercase font-bold tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md mt-1">
            {lead.industry}
          </span>
        </div>
        
        <select
          value={lead.status}
          onChange={(e) => onStatusChange(lead.id, e.target.value as Lead['status'])}
          className="text-xs bg-white/5 border border-white/10 rounded-xl px-2 py-1 text-slate-300 focus:outline-none focus:border-indigo-500"
        >
          <option value="new" className="bg-slate-900 text-white">New Lead</option>
          <option value="contacted" className="bg-slate-900 text-white">Contacted</option>
          <option value="qualified" className="bg-slate-900 text-white">Qualified</option>
          <option value="rejected" className="bg-slate-900 text-white">Archive</option>
        </select>
      </div>

      <div className="space-y-2 text-xs text-slate-400 mb-4 border-t border-white/5 pt-3">
        <div className="flex items-center gap-2">
          <Mail className="w-3.5 h-3.5 text-indigo-400" />
          <span className="truncate">{lead.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-3.5 h-3.5 text-emerald-400" />
          <span>{lead.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <Globe className="w-3.5 h-3.5 text-sky-400" />
          <a 
            href={lead.website} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="truncate hover:underline flex items-center gap-1"
          >
            {lead.website.replace('https://www.', '')}
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>

      <div className="text-[10px] text-slate-600 flex items-center justify-between">
        <span>Source: {lead.source}</span>
      </div>
    </div>
  )
}

