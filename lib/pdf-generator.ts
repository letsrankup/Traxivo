import jsPDF from 'jspdf'

export function generateProposalPDF(proposal: {
  clientName: string
  service: string
  content: string
  budget: string
  timeline: string
  companyName?: string
}) {
  const doc = new jsPDF()
  const margin = 20
  let y = margin

  // Header
  doc.setFillColor(15, 23, 42)
  doc.rect(0, 0, 210, 40, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(22)
  doc.text(proposal.companyName || 'Business OS', margin, 25)
  doc.setFontSize(12)
  doc.text('Professional Proposal', 210 - margin, 25, { align: 'right' })

  y = 55
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(18)
  doc.text(`Proposal for ${proposal.clientName}`, margin, y)

  y += 10
  doc.setFontSize(11)
  doc.setTextColor(100, 100, 100)
  doc.text(`Service: ${proposal.service} | Budget: ${proposal.budget} | Timeline: ${proposal.timeline}`, margin, y)

  y += 15
  doc.setDrawColor(200, 200, 200)
  doc.line(margin, y, 210 - margin, y)

  y += 10
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(11)

  const lines = doc.splitTextToSize(proposal.content, 170)
  lines.forEach((line: string) => {
    if (y > 270) { doc.addPage(); y = margin }
    doc.text(line, margin, y)
    y += 7
  })

  return doc
}

export function generateInvoicePDF(invoice: {
  number: string
  clientName: string
  clientEmail: string
  items: { description: string; qty: number; rate: number }[]
  tax: number
  notes?: string
  companyName?: string
}) {
  const doc = new jsPDF()
  const margin = 20
  let y = margin

  // Header
  doc.setFillColor(15, 23, 42)
  doc.rect(0, 0, 210, 40, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(22)
  doc.text(invoice.companyName || 'Business OS', margin, 25)
  doc.setFontSize(14)
  doc.text('INVOICE', 210 - margin, 25, { align: 'right' })

  y = 55
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(12)
  doc.text(`Invoice #: ${invoice.number}`, margin, y)
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 210 - margin, y, { align: 'right' })

  y += 8
  doc.text(`Bill To: ${invoice.clientName}`, margin, y)
  doc.text(invoice.clientEmail, margin, y + 6)

  y += 25
  // Table header
  doc.setFillColor(240, 240, 240)
  doc.rect(margin, y - 5, 170, 10, 'F')
  doc.setFontSize(10)
  doc.text('Description', margin + 2, y + 2)
  doc.text('Qty', 130, y + 2)
  doc.text('Rate', 150, y + 2)
  doc.text('Total', 175, y + 2)

  y += 10
  let subtotal = 0
  invoice.items.forEach(item => {
    const total = item.qty * item.rate
    subtotal += total
    doc.text(item.description.substring(0, 40), margin + 2, y)
    doc.text(String(item.qty), 130, y)
    doc.text(`$${item.rate}`, 150, y)
    doc.text(`$${total.toFixed(2)}`, 175, y)
    y += 8
  })

  y += 5
  doc.line(margin, y, 210 - margin, y)
  y += 8
  const tax = (subtotal * invoice.tax) / 100
  const total = subtotal + tax
  doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 210 - margin, y, { align: 'right' })
  y += 7
  doc.text(`Tax (${invoice.tax}%): $${tax.toFixed(2)}`, 210 - margin, y, { align: 'right' })
  y += 7
  doc.setFontSize(13)
  doc.text(`Total: $${total.toFixed(2)}`, 210 - margin, y, { align: 'right' })

  if (invoice.notes) {
    y += 15
    doc.setFontSize(10)
    doc.text(`Notes: ${invoice.notes}`, margin, y)
  }

  return doc
    }
