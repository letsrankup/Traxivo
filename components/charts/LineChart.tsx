'use client'
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface LineChartProps {
  data?: any[]
  dataKey?: string
  xKey?: string
}

export default function LineChart({ data = [], dataKey = 'value', xKey = 'name' }: LineChartProps) {
  const fallbackData = data.length ? data : [
    { [xKey]: 'Mon', [dataKey]: 10 },
    { [xKey]: 'Tue', [dataKey]: 25 },
    { [xKey]: 'Wed', [dataKey]: 18 },
    { [xKey]: 'Thu', [dataKey]: 45 }
  ]

  return (
    <div className="w-full h-full min-h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={fallbackData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
          <XAxis dataKey={xKey} tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip 
            contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
            itemStyle={{ color: '#fff', fontSize: '11px' }}
            labelStyle={{ color: '#64748b', fontSize: '10px' }}
          />
          <Line type="monotone" dataKey={dataKey} stroke="#6366f1" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  )
                                       }
            
