'use client'
import { useState } from 'react'
import { analyzeWebsiteSEO, AuditResult } from '@/lib/seo-analyzer'

export function useSEO() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<AuditResult | null>(null)

  const runAudit = async (url: string) => {
    if (!url) {
      setError('Please provide a valid website URL.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const data = await analyzeWebsiteSEO(url)
      setResult(data)
    } catch (err) {
      setError('Failed to analyze the website structure.')
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, result, runAudit }
        }
