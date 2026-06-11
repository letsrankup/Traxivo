'use client'
import { useState, useEffect } from 'react'

export interface Contact {
  id: string
  name: string
  email: string
  phone: string
  company: string
  website: string
  status: 'lead' | 'prospect' | 'customer' | 'churned'
  tags: string[]
  notes: string
  value: number
  created_at: string
}

export interface Deal {
  id: string
  title: string
  contact_id: string
  value: number
  stage: 'prospecting' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost'
  probability: number
  expected_close: string
  notes: string
  created_at: string
  contacts?: { name: string; email: string }
}

export function useCRM() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(false)

  const fetchContacts = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/crm?type=contacts')
      const data = await res.json()
      if (data.success) setContacts(data.data)
    } finally { setLoading(false) }
  }

  const fetchDeals = async () => {
    const res = await fetch('/api/crm?type=deals')
    const data = await res.json()
    if (data.success) setDeals(data.data)
  }

  useEffect(() => { fetchContacts(); fetchDeals() }, [])

  const addContact = async (contact: Omit<Contact, 'id' | 'created_at'>) => {
    const res = await fetch('/api/crm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'contact', ...contact }),
    })
    const data = await res.json()
    if (data.success) { setContacts(prev => [data.data, ...prev]); return data.data }
  }

  const updateContact = async (id: string, updates: Partial<Contact>) => {
    const res = await fetch('/api/crm', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'contact', id, ...updates }),
    })
    const data = await res.json()
    if (data.success) setContacts(prev => prev.map(c => c.id === id ? data.data : c))
  }

  const deleteContact = async (id: string) => {
    await fetch(`/api/crm?type=contact&id=${id}`, { method: 'DELETE' })
    setContacts(prev => prev.filter(c => c.id !== id))
  }

  const addDeal = async (deal: Omit<Deal, 'id' | 'created_at'>) => {
    const res = await fetch('/api/crm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'deal', ...deal }),
    })
    const data = await res.json()
    if (data.success) { setDeals(prev => [data.data, ...prev]); return data.data }
  }

  const updateDeal = async (id: string, updates: Partial<Deal>) => {
    const res = await fetch('/api/crm', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'deal', id, ...updates }),
    })
    const data = await res.json()
    if (data.success) setDeals(prev => prev.map(d => d.id === id ? data.data : d))
  }

  const totalPipeline = deals.filter(d => !d.stage.includes('closed')).reduce((s, d) => s + d.value, 0)
  const wonDeals = deals.filter(d => d.stage === 'closed_won').reduce((s, d) => s + d.value, 0)

  return { contacts, deals, loading, addContact, updateContact, deleteContact, addDeal, updateDeal, fetchContacts, fetchDeals, totalPipeline, wonDeals }
                                                   }
