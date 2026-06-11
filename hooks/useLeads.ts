'use client'
import { useState } from 'react'
import type { Lead } from '@/lib/lead-scraper'

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const findLeads = async (query: string, location: string, limit = 20) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/leads-finder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, location, limit }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error)
      setLeads(data.leads)
      return data
    } catch (err: any) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  const analyzeCompetitors = async (competitors: string[], myUrl?: string) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/competitor-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ competitors, myUrl }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error)
      return data
    } catch (err: any) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  const exportLeads = (leadsToExport: Lead[]) => {
    const csv = [
      'Name,Website,Email,Phone,Address,Category,Rating,Score',
      ...leadsToExport.map(l =>
        `"${l.name}","${l.website}","${l.email}","${l.phone}","${l.address}","${l.category}",${l.rating},${l.score}`
      ),
    ].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'leads.csv'
    a.click()
  }

  return { leads, loading, error, findLeads, analyzeCompetitors, exportLeads }
    }
