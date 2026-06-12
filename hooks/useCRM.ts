'use client'
import { useState, useEffect } from 'react'

export interface Contact {
  id: string
  name: string
  email: string
  phone: string
  company: string
  website: string
  status: 'lead' | 'prospect' | 'customer' | 'churned' | string // Fallback matching string handles added
  tags: string[]
  notes: string
  value: number
  dealValue?: number // Mapping CRM page data variables safely
  stage?: string      // Mapping pipeline drag-and-drop safely
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
      if (data.success) {
        // Data format normalization layer
        const normalized = (data.data || []).map((c: any) => ({
          ...c,
          dealValue: c.dealValue || c.value || 0,
          stage: c.stage || c.status || 'lead'
        }))
        setContacts(normalized)
      }
    } catch (e) {
      console.error(e)
    } finally { setLoading(false) }
  }

  const fetchDeals = async () => {
    try {
      const res = await fetch('/api/crm?type=deals')
      const data = await res.json()
      if (data.success) setDeals(data.data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => { fetchContacts(); fetchDeals() }, [])

  const addContact = async (contact: Omit<Contact, 'id' | 'created_at'>) => {
    // Mapping keys safely between client pages and database endpoints
    const payload = {
      type: 'contact',
      name: contact.name,
      email: contact.email,
      phone: contact.phone || '',
      company: contact.company,
      website: contact.website || '',
      status: (contact as any).stage || contact.status || 'lead',
      value: contact.value || (contact as any).dealValue || 0,
      tags: contact.tags || [],
      notes: contact.notes || ''
    }

    const res = await fetch('/api/crm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    if (data.success) {
      const savedNode = {
        ...data.data,
        dealValue: data.data.value || 0,
        stage: data.data.status || 'lead'
      }
      setContacts(prev => [savedNode, ...prev])
      return savedNode
    }
  }

  // CRM Page dynamically requires a moveStage function for Kanban dragging workflows
  const moveStage = async (contactId: string, newStage: string) => {
    // Locally optimistically update state first for high performance speed
    setContacts(prev => prev.map(c => c.id === contactId ? { ...c, stage: newStage, status: newStage } : c))
    
    // Send state mutation down to server core API endpoints
    await fetch('/api/crm', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'contact', id: contactId, status: newStage, stage: newStage }),
    })
  }

  const updateContact = async (id: string, updates: Partial<Contact>) => {
    const res = await fetch('/api/crm', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'contact', id, ...updates }),
    })
    const data = await res.json()
    if (data.success) {
      setContacts(prev => prev.map(c => c.id === id ? {
        ...data.data,
        dealValue: data.data.value || 0,
        stage: data.data.status || 'lead'
      } : c))
    }
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

  return { 
    contacts, 
    deals, 
    loading, 
    addContact, 
    moveStage, // Exposed mapping for Kanban UI nodes
    updateContact, 
    deleteContact, 
    addDeal, 
    updateDeal, 
    fetchContacts, 
    fetchDeals, 
    totalPipeline, 
    wonDeals 
  }
}
