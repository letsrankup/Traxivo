'use client'
import { Mail, Phone, Globe, ExternalLink, ArrowUpRight } from 'lucide-react'
import { Lead } from '@/lib/lead-scraper'

interface LeadTableProps {
  leads: Lead[]
  onStatusChange: (id: string, status: Lead['status']) => void
}

export default function LeadTable({ leads, onStatusChange }: LeadTableProps) {
  if (!leads.length) return null

  return (
    <div className="glass border border-white/5 rounded-2xl overflow-hidden mt-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-white/5 bg-white/3 text-slate-400 uppercase tracking-wider font-semibold">
              <th className="p-4">Company Name</th>
              <th className="p-4">Industry</th>
              <th className="p-4">Contact Details</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Website</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-white/2 transition-colors group">
                <td className="p-4 font-semibold text-white">{lead.companyName}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-[10px] uppercase font-bold">
                    {lead.industry}
                  </span>
                </td>
                <td className="p-4 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3 h-3 text-slate-500" />
                    <span>{lead.email}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-slate-500" />
                    <span>{lead.phone}</span>
                  </div>
                </td>
                <td className="p-4">
                  <select
                    value={lead.status}
                    onChange={(e) => onStatusChange(lead.id, e.target.value as Lead['status'])}
                    className="bg-slate-900 border border-white/10 rounded-lg px-2 py-1 text-slate-300 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="rejected">Archived</option>
                  </select>
                </td>
                <td className="p-4 text-right">
                  <a
                    href={lead.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-indigo-400 hover:underline group-hover:text-indigo-300"
                  >
                    Visit
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

