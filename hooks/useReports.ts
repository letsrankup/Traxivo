'use client'
import { useState } from 'react'

export function useReports() {
  const [generating, setGenerating] = useState(false)

  const exportReportData = async (reportType: string) => {
    setGenerating(true)
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        setGenerating(false)
        resolve(true)
      }, 1500)
    })
  }

  return { generating, exportReportData }
}
