import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  Phone,
  MessageSquare,
  Video,
  Clock,
  Archive,
  Trash2,
  Pencil,
} from 'lucide-react';
import { useTimeline } from '../context/TimelineContext';
import Footer from '../components/Footer';

const statusConfig = {
  overdue: {
    label: 'Overdue',
    className: 'bg-red-100 text-red-700 border border-red-200',
  },
  'almost due': {
    label: 'Almost Due',
    className: 'bg-amber-100 text-amber-700 border border-amber-200',
  },
  'on-track': {
    label: 'On Track',
    className: 'bg-green-100 text-green-700 border border-green-200',
  },
};

export default function FriendDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addEntry } = useTimeline();
  const [friend, setFriend] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import('../data/friends.json').then(data => {
      const found = data.default.find(f => f.id === parseInt(id));
      setFriend(found || null);
      setLoading(false);
    });
  }, [id]);

  const handleCheckIn = type => {
    addEntry(type, friend.name);
    const labels = { call: 'Call', text: 'Text', video: 'Video call' };
    toast.success(`${labels[type]} with ${friend.name} logged!`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-brand-dark"></span>
      </div>
    );
  }

  if (!friend) {
    navigate('/404');
    return null;
  }

  const status = statusConfig[friend.status] || statusConfig['on-track'];

  const formatDate = dateStr => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            {/* Profile Card */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm">
              <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-brand-pale">
                <img
                  src={friend.picture}
                  alt={friend.name}
                  className="w-full h-full object-cover bg-gray-50"
                  onError={e => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.name)}&background=2d5a45&color=fff`;
                  }}
                />
              </div>
              <h2 className="font-semibold text-gray-900 text-lg">
                {friend.name}
              </h2>

              {/* Status */}
              <span
                className={`inline-block text-xs px-3 py-1 rounded-full font-medium mt-2 ${status.className}`}
              >
                {status.label}
              </span>

              {/* Tags */}
              <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                {friend.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-0.5 bg-brand-pale text-brand-dark rounded-full capitalize font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Bio */}
              <p className="text-gray-500 text-xs mt-4 leading-relaxed italic">
                "{friend.bio}"
              </p>

              {/* Email */}
              <p className="text-gray-400 text-xs mt-3">{friend.email}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              <button className="btn btn-outline border-gray-200 rounded-xl gap-2 text-gray-600 hover:bg-gray-50 hover:border-gray-300 justify-start">
                <Clock size={15} />
                Snooze 2 Weeks
              </button>
              <button className="btn btn-outline border-gray-200 rounded-xl gap-2 text-gray-600 hover:bg-gray-50 hover:border-gray-300 justify-start">
                <Archive size={15} />
                Archive
              </button>
              <button className="btn btn-outline border-red-200 rounded-xl gap-2 text-red-500 hover:bg-red-50 hover:border-red-300 justify-start">
                <Trash2 size={15} />
                Delete
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-sm">
                <div className="text-3xl font-bold text-gray-900">
                  {friend.days_since_contact}
                </div>
                <div className="text-xs text-gray-400 mt-1 font-medium">
                  Days Since Contact
                </div>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-sm">
                <div className="text-3xl font-bold text-gray-900">
                  {friend.goal}
                </div>
                <div className="text-xs text-gray-400 mt-1 font-medium">
                  Goal (Days)
                </div>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-sm">
                <div className="text-xl font-bold text-gray-900">
                  {formatDate(friend.next_due_date)}
                </div>
                <div className="text-xs text-gray-400 mt-1 font-medium">
                  Next Due
                </div>
              </div>
            </div>

            {/* Relationship Goal */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800">
                  Relationship Goal
                </h3>
                <button className="btn btn-ghost btn-xs text-brand-dark gap-1 rounded-lg">
                  <Pencil size={12} />
                  Edit
                </button>
              </div>
              <p className="text-gray-600 text-sm">
                Connect every{' '}
                <span className="font-bold text-gray-900">
                  {friend.goal} days
                </span>
              </p>
            </div>

            {/* Quick Check-In */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4">
                Quick Check-In
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleCheckIn('call')}
                  className="flex flex-col items-center gap-2 py-4 rounded-xl border border-gray-100 hover:bg-brand-pale hover:border-brand-light transition-all cursor-pointer"
                >
                  <Phone size={20} className="text-brand-dark" />
                  <span className="text-xs font-medium text-gray-600">
                    Call
                  </span>
                </button>
                <button
                  onClick={() => handleCheckIn('text')}
                  className="flex flex-col items-center gap-2 py-4 rounded-xl border border-gray-100 hover:bg-brand-pale hover:border-brand-light transition-all cursor-pointer"
                >
                  <MessageSquare size={20} className="text-brand-dark" />
                  <span className="text-xs font-medium text-gray-600">
                    Text
                  </span>
                </button>
                <button
                  onClick={() => handleCheckIn('video')}
                  className="flex flex-col items-center gap-2 py-4 rounded-xl border border-gray-100 hover:bg-brand-pale hover:border-brand-light transition-all cursor-pointer"
                >
                  <Video size={20} className="text-brand-dark" />
                  <span className="text-xs font-medium text-gray-600">
                    Video
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
