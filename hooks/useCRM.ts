'use client'
import { useState } from 'react'

interface Contact {
  id: string
  name: string
  company: string
  email: string
  dealValue: number
  stage: 'lead' | 'contacted' | 'proposal' | 'won'
}

export function useCRM() {
  const [contacts, setContacts] = useState<Contact[]>([
    { id: '1', name: 'Zeeshan Khan', company: 'Apex Media', email: 'zee@apex.io', dealValue: 1200, stage: 'lead' },
    { id: '2', name: 'Sara Ahmed', company: 'Vortex Tech', email: 'sara@vortex.com', dealValue: 3500, stage: 'proposal' }
  ])

  const moveStage = (id: string, newStage: Contact['stage']) => {
    setContacts(prev => prev.map(c => c.id === id ? { ...c, stage: newStage } : c))
  }

  const addContact = (contact: Omit<Contact, 'id'>) => {
    const newContact = { ...contact, id: `c_${Date.now()}` }
    setContacts(prev => [...prev, newContact])
  }

  return { contacts, moveStage, addContact }
}
