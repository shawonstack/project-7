import { useState } from 'react'
import { Users, Filter } from 'lucide-react'
import { useTimeline } from '../context/TimelineContext'
import Footer from '../components/Footer'

const typeConfig = {
  call: {
    label: 'Call',
    icon: <img src="/icons/call.png" alt="Call" className="w-4 h-4 object-contain" style={{ mixBlendMode: 'multiply' }} />,
    color: 'bg-white',
    badge: 'bg-green-100 text-green-700',
  },
  text: {
    label: 'Text',
    icon: <img src="/icons/text.png" alt="Text" className="w-4 h-4 object-contain" style={{ mixBlendMode: 'multiply' }} />,
    color: 'bg-white',
    badge: 'bg-blue-100 text-blue-700',
  },
  video: {
    label: 'Video',
    icon: <img src="/icons/video.png" alt="Video" className="w-4 h-4 object-contain" style={{ mixBlendMode: 'multiply' }} />,
    color: 'bg-white',
    badge: 'bg-purple-100 text-purple-700',
  },
  meetup: {
    label: 'Meetup',
    icon: <Users size={15} />,
    color: 'bg-amber-100',
    badge: 'bg-amber-100 text-amber-700',
  },
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default function Timeline() {
  const { entries } = useTimeline()
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? entries : entries.filter(e => e.type === filter)

  return (
    <div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Timeline</h1>

        {/* Filter */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <Filter size={15} className="text-gray-400" />
          {['all', 'call', 'text', 'video', 'meetup'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`btn btn-sm rounded-xl capitalize font-medium border ${
                filter === f
                  ? 'bg-brand-dark text-white border-brand-dark'
                  : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {f === 'all' ? 'Filter: All' : f}
            </button>
          ))}
        </div>

        {/* Entries */}
        <div className="flex flex-col gap-2">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p>No interactions yet</p>
            </div>
          ) : (
            filtered.map(entry => {
              const config = typeConfig[entry.type] || typeConfig.call
              return (
                <div
                  key={entry.id}
                  className="bg-white border border-gray-100 rounded-xl px-5 py-4 flex items-center gap-4 hover:shadow-sm transition-shadow"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border border-gray-100 ${config.color}`}>
                    {config.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      <span className="capitalize">{config.label}</span>{' '}
                      <span className="text-gray-500">with</span>{' '}
                      {entry.friendName}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{formatDate(entry.date)}</p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${config.badge} flex-shrink-0`}>
                    {config.label}
                  </span>
                </div>
              )
            })
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
