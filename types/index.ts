export interface BaseUser {
  id: string
  email: string
  name?: string
  role?: string
}

export interface SystemAudit {
  id: string
  targetUrl: string
  globalScore: number
  timestamp: string
}

export interface BusinessInvoice {
  id: string
  clientName: string
  issueDate: string
  dueDate: string
  totalAmount: number
  status: 'draft' | 'sent' | 'paid' | 'overdue'
}

