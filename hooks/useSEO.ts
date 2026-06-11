'use client'
import { useState } from 'react'

export function useSEO() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const runAudit = async (url: string) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/seo-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
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

  const analyzeWebsite = async (url: string) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/website-analyzer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
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

  const checkRankings = async (domain: string, keywords: string[]) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/rank-tracker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain, keywords }),
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

  return { loading, error, runAudit, analyzeWebsite, checkRankings }
        }
