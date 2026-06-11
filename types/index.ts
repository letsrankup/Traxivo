export interface User {
  id: string
  email: string
  name: string
  company?: string
  avatar?: string
  plan: 'free' | 'pro' | 'enterprise'
  created_at: string
}

export interface SEOAuditResult {
  url: string
  score: { overall: number; technical: number; content: number; onpage: number; ux: number }
  issues: Array<{ type: string; category: string; message: string; fix: string }>
  passed: string[]
  aiInsights: string
}

export interface WebsiteAnalysis {
  url: string
  scores: { performance: number; seo: number; content: number; security: number; overall: number }
  techStack: string[]
  overview: Record<string, any>
  aiAnalysis: string
}

export interface Proposal {
  id: string
  title: string
  clientName: string
  clientEmail: string
  service: string
  budget: string
  timeline: string
  status: 'draft' | 'sent' | 'accepted' | 'rejected'
  content: string
  created_at: string
  updated_at: string
}

export interface Invoice {
  id: string
  number: string
  clientName: string
  clientEmail: string
  items: InvoiceItem[]
  subtotal: number
  tax: number
  total: number
  status: 'draft' | 'sent' | 'paid' | 'overdue'
  due_date: string
  created_at: string
}

export interface InvoiceItem {
  id: string
  description: string
  qty: number
  rate: number
  total: number
}

export interface DashboardStats {
  totalRevenue: number
  pendingRevenue: number
  totalContacts: number
  activeDeals: number
  wonDeals: number
  winRate: number
  monthlyGrowth: number
}

export interface NavItem {
  label: string
  href: string
  icon: string
  badge?: number
  }
