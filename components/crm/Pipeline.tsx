'use client'
import { motion } from 'framer-motion'
import { Plus, DollarSign, ArrowRight } from 'lucide-react'

interface Contact {
  id: string
  name: string
  company: string
  email: string
  dealValue: number
  stage: 'lead' | 'contacted' | 'proposal' | 'won' | string
}

interface PipelineProps {
  contacts: any[] 
  onMoveStage: any
}

const STAGES: { id: string; label: string; color: string }[] = [
  { id: 'lead', label: 'Prospects', color: 'border-amber-500/20 text-amber-400 bg-amber-500/5' },
  { id: 'contacted', label: 'Contacted', color: 'border-blue-500/20 text-blue-400 bg-blue-500/5' },
  { id: 'proposal', label: 'Proposal Sent', color: 'border-purple-500/20 text-purple-400 bg-purple-500/5' },
  { id: 'won', label: 'Deals Closed', color: 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5' }
]

export default function Pipeline({ contacts, onMoveStage }: PipelineProps) {
  // Database arrays ki safety validation loop
  const safeContacts = contacts || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
      {STAGES.map((stage) => {
        // Safe mapping fallback logic nodes handles for old vs new stages keys
        const stageContacts = safeContacts.filter((c: any) => {
          const targetStage = (c.stage || c.status || 'lead').toLowerCase();
          if (stage.id === 'lead') {
            return targetStage === 'lead' || targetStage === 'prospect' || targetStage === 'prospecting';
          }
          if (stage.id === 'won') {
            return targetStage === 'won' || targetStage === 'closed_won' || targetStage === 'customer';
          }
          return targetStage === stage.id;
        });

        const totalValue = stageContacts.reduce((sum: number, c: any) => sum + (Number(c.dealValue || c.value) || 0), 0)

        return (
          <div key={stage.id} className="glass border border-white/5 rounded-2xl p-4 flex flex-col min-h-[400px]">
            {/* Stage Header */}
            <div className={`border p-3 rounded-xl mb-4 ${stage.color} flex items-center justify-between`}>
              <span className="text-xs font-bold uppercase tracking-wider">{stage.label}</span>
              <span className="text-xs font-mono font-black">(${totalValue})</span>
            </div>

            {/* Stage Cards Stack */}
            <div className="space-y-2 flex-1 overflow-y-auto">
              {stageContacts.map((contact: any) => (
                <motion.div
                  key={contact.id}
                  layoutId={contact.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 border border-white/5 rounded-xl p-3 hover:border-white/10 transition-all text-left"
                >
                  <p className="text-white text-sm font-semibold">{contact.name}</p>
                  <p className="text-slate-500 text-xs truncate mb-2">{contact.company || contact.website || 'No Company'}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                    <span className="text-emerald-400 font-bold font-mono">${contact.dealValue || contact.value || 0}</span>
                    
                    {stage.id !== 'won' && (
                      <button
                        onClick={() => {
                          const nextStages: Record<string, string> = {
                            lead: 'contacted',
                            contacted: 'proposal',
                            proposal: 'won',
                            won: 'won'
                          }
                          if (typeof onMoveStage === 'function') {
                            onMoveStage(contact.id, nextStages[stage.id])
                          }
                        }}
                        className="p-1 rounded bg-white/5 border border-white/5 hover:bg-indigo-500/20 hover:border-indigo-500/30 text-slate-400 hover:text-white transition-all"
                      >
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
              {stageContacts.length === 0 && (
                <div className="text-slate-600 text-xs text-center py-8 border border-dashed border-white/5 rounded-xl my-auto">
                  No records
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
