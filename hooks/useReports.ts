'use client'
import { useState } from 'react'

export function useReports() {
  const [loading, setLoading] = useState(false)
  const [reportData, setReportData] = useState<any>(null)

  const generateReport = async (type: string, dateRange: string) => {
    setLoading(true)
    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, dateRange }),
      })
      const data = await res.json()
      if (data.success) setReportData(data)
      return data
    } finally { setLoading(false) }
  }

  const exportReport = (data: any, format: 'csv' | 'json') => {
    const content = format === 'json'
      ? JSON.stringify(data, null, 2)
      : Object.entries(data).map(([k, v]) => `${k},${v}`).join('\n')
    const blob = new Blob([content], { type: format === 'json' ? 'application/json' : 'text/csv' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `report.${format}`
    a.click()
  }

  return { loading, reportData, generateReport, exportReport }
      }
