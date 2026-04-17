import { useState, useEffect } from 'react';
import { UserPlus, Users, CheckCircle, AlertCircle, Zap } from 'lucide-react';
import FriendCard from '../components/FriendCard';
import Footer from '../components/Footer';

export default function Home() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetch delay
    const timer = setTimeout(() => {
      import('../data/friends.json').then(data => {
        setFriends(data.default);
        setLoading(false);
      });
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const totalFriends = friends.length;
  const onTrack = friends.filter(f => f.status === 'on-track').length;
  const needAttention = friends.filter(
    f => f.status === 'overdue' || f.status === 'almost due',
  ).length;
  const interactions = 12;

  const summaryCards = [
    {
      label: 'Total Friends',
      value: totalFriends,
      icon: <Users size={18} />,
      color: 'text-brand-dark',
    },
    {
      label: 'On Track',
      value: onTrack,
      icon: <CheckCircle size={18} />,
      color: 'text-green-600',
    },
    {
      label: 'Need Attention',
      value: needAttention,
      icon: <AlertCircle size={18} />,
      color: 'text-amber-600',
    },
    {
      label: 'Interactions This Month',
      value: interactions,
      icon: <Zap size={18} />,
      color: 'text-purple-600',
    },
  ];

  return (
    <div>
      {/* Banner */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            Friends to keep close in your life
          </h1>
          <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto mb-7">
            Your personal shelf of meaningful connections. Browse, tend, and
            nurture the relationships that matter most.
          </p>
          <button className="btn bg-brand-dark text-white hover:bg-brand-light border-none rounded-xl gap-2 px-6">
            <UserPlus size={16} />
            Add a Friend
          </button>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 text-left">
            {summaryCards.map(card => (
              <div
                key={card.label}
                className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm"
              >
                <div className={`mb-2 ${card.color}`}>{card.icon}</div>
                <div className="text-2xl font-bold text-gray-900">
                  {loading ? '—' : card.value}
                </div>
                <div className="text-xs text-gray-400 mt-0.5 font-medium">
                  {card.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Friends Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-lg font-semibold text-gray-800 mb-5">
          Your Friends
        </h2>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <span className="loading loading-spinner loading-lg text-brand-dark"></span>
            <p className="text-gray-400 text-sm">Loading your friends...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {friends.map(friend => (
              <FriendCard key={friend.id} friend={friend} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
