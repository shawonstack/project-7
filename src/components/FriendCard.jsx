import { useNavigate } from 'react-router-dom'

const statusConfig = {
  'overdue': { label: 'Overdue', className: 'bg-red-100 text-red-700 border border-red-200' },
  'almost due': { label: 'Almost Due', className: 'bg-amber-100 text-amber-700 border border-amber-200' },
  'on-track': { label: 'On Track', className: 'bg-green-100 text-green-700 border border-green-200' },
}

export default function FriendCard({ friend }) {
  const navigate = useNavigate()
  const status = statusConfig[friend.status] || statusConfig['on-track']

  return (
    <div
      onClick={() => navigate(`/friend/${friend.id}`)}
      className="bg-white border border-gray-100 rounded-2xl p-5 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
    >
      {/* Avatar */}
      <div className="flex flex-col items-center text-center gap-2">
        <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-gray-100 group-hover:ring-brand-light transition-all">
          <img
            src={friend.picture}
            alt={friend.name}
            className="w-full h-full object-cover bg-gray-50"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.name)}&background=2d5a45&color=fff`
            }}
          />
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 text-sm">{friend.name}</h3>
          <p className="text-gray-400 text-xs mt-0.5">{friend.days_since_contact}d ago</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-1">
          {friend.tags.map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full capitalize">
              {tag}
            </span>
          ))}
        </div>

        {/* Status */}
        <span className={`text-xs px-3 py-1 rounded-full font-medium ${status.className}`}>
          {status.label}
        </span>
      </div>
    </div>
  )
}
