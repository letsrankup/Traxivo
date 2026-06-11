'use client'
import { useState } from 'react'
import { scrapeTargetLeads, Lead } from '@/lib/lead-scraper'

export function useLeads() {
  const [loading, setLoading] = useState(false)
  const [leads, setLeads] = useState<Lead[]>([])

  const searchLeads = async (industry: string, location: string) => {
    setLoading(true)
    try {
      const results = await scrapeTargetLeads(industry, location)
      setLeads(results)
    } catch (error) {
      console.error('Error finding leads:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateLeadStatus = (id: string, status: Lead['status']) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l))
  }

  return { loading, leads, searchLeads, updateLeadStatus }
                              }
                            
