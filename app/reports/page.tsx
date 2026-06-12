'use client'
import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { BarChart2, TrendingUp, DollarSign, Users, Download } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export default function ReportsPage() {
  const [data, setData] = useState<any>(null)
  const [range, setRange] = useState('30d')
  const [loading, setLoading] = useState(false)

  useEffect(() => { loadReport() }, [range])

  const loadReport = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'overview', dateRange: range }),
      })
      const d = await res.json()
      if (d.success) setData(d)
    } finally { setLoading(false) }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
            <p className="text-gray-500 text-sm mt-0.5">Business performance insights</p>
          </div>
          <div className="flex gap-2">
            {['7d', '30d', '90d'].map(r => (
              <button key={r} onClick={() => setRange(r)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition ${range === r ? 'gradient-brand text-white shadow-purple' : 'bg-white border border-gray-200 text-gray-600 hover:border-purple-300'}`}>
                {r}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-400 text-sm">Loading report...</div>
        ) : data ? (
          <div className="space-y-4">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: DollarSign, label: 'Total Revenue', value: formatCurrency(data.totalRevenue || 0), color: 'text-green-600 bg-green-50' },
                { icon: TrendingUp, label: 'Pending Revenue', value: formatCurrency(data.pendingRevenue || 0), color: 'text-blue-600 bg-blue-50' },
                { icon: Users, label: 'Total Contacts', value: data.totalContacts || 0, color: 'text-purple-600 bg-purple-50' },
                { icon: BarChart2, label: 'Win Rate', value: `${data.winRate || 0}%`, color: 'text-orange-600 bg-orange-50' },
              ].map(s => (
                <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${s.color}`}>
                    <s.icon size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">{s.label}</div>
                    <div className="text-xl font-bold text-gray-900">{s.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts */}
            {data.monthlyRevenue?.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Revenue Trend</h2>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={data.monthlyRevenue}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} />
                    <Tooltip formatter={(v: any) => formatCurrency(v)} contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: '12px' }} />
                    <Line type="monotone" dataKey="revenue" stroke="#9333ea" strokeWidth={2.5} dot={{ fill: '#9333ea', r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {data.dealsByStage?.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Deals by Stage</h2>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={data.dealsByStage}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="stage" tick={{ fontSize: 11, fill: '#9ca3af' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: '12px' }} />
                    <Bar dataKey="count" fill="#9333ea" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400 text-sm">No data available</div>
        )}
      </div>
    </DashboardLayout>
  )
}
