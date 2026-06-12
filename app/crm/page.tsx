'use client'
import { useState } from 'react'
import { useCRM } from '@/hooks/useCRM'
import Pipeline from '@/components/crm/Pipeline'
import { Users, Plus, DollarSign, Briefcase, UserPlus } from 'lucide-react'

export default function CrmPage() {
  // Client engine integration hook sync completely free of any type casting
  const { contacts, moveStage, addContact } = useCRM()
  const [showForm, setShowForm] = useState(false)
  
  // New entry local state handlers
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [value, setValue] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (name && company && email && value) {
      if (typeof addContact === 'function') {
        // Safe object injection syncing with database hook payloads schema
        await addContact({
          name,
          company,
          email,
          phone: '',
          website: '',
          status: 'lead',
          value: Number(value),
          tags: [],
          notes: ''
        })
      }
      
      // Clear forms
      setName('')
      setCompany('')
      setEmail('')
      setValue('')
      setShowForm(false)
    }
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4 md:p-6">
      {/* Upper Title Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">Enterprise CRM</h1>
          <p className="text-slate-400 text-xs mt-1">Track strategic target pipelines, client accounts, and dynamic sales milestones.</p>
        </div>
        
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 self-end sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          {showForm ? 'Close Board' : 'Add New Profile'}
        </button>
      </div>

      {/* Conditional Injection Form Panel */}
      {showForm && (
        <div className="glass border border-white/10 rounded-2xl p-5 max-w-xl transition-all">
          <h3 className="text-white font-semibold text-sm mb-4">Create New Lead Profile</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Contact Person Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-slate-900 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <input
              type="text"
              placeholder="Company Brand Name"
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="bg-slate-900 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <input
              type="email"
              placeholder="Email Endpoint Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-900 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <input
              type="number"
              placeholder="Est. Deal Value ($)"
              required
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="bg-slate-900 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="sm:col-span-2 w-full bg-indigo-600 text-white font-bold text-xs py-2.5 rounded-xl hover:bg-indigo-500 transition-colors"
            >
              Commit Profile to Database Stack
            </button>
          </form>
        </div>
      )}

      {/* Main Kanban Workspace Array - Cleanly integrated nodes routing */}
      <Pipeline contacts={contacts || []} onMoveStage={moveStage} />
    </div>
  )
}
