import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import { useTimeline } from '../context/TimelineContext'
import Footer from '../components/Footer'

const COLORS = {
  text: '#6c63ff',
  call: '#2d5a45',
  video: '#22c55e',
  meetup: '#f59e0b',
}

export default function Stats() {
  const { entries } = useTimeline()

  const counts = entries.reduce((acc, e) => {
    acc[e.type] = (acc[e.type] || 0) + 1
    return acc
  }, {})

  const chartData = Object.entries(counts).map(([type, count]) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    value: count,
    type,
  }))

  return (
    <div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Friendship Analytics</h1>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-500 mb-6">By Interaction Type</h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={3}
                dataKey="value"
              >
                {chartData.map((entry) => (
                  <Cell
                    key={entry.type}
                    fill={COLORS[entry.type] || '#94a3b8'}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [value, name]}
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '13px',
                }}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(value) => <span style={{ fontSize: '13px', color: '#6b7280' }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <Footer />
    </div>
  )
}
