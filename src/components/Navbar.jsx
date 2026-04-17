import { NavLink } from 'react-router-dom';
import { Home, Clock, BarChart2, Bold } from 'lucide-react';

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'bg-brand-dark text-white shadow-sm'
        : 'text-gray-600 hover:text-brand-dark hover:bg-brand-pale'
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo — text based to match Figma (dark green + navy two-tone) */}
          <NavLink to="/" className="text-3xl tracking-tight  select-none">
            <span
              style={{
                color: '#1a3a2e',
                fontWeight: 400,
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              Keen
            </span>
            <span
              style={{
                color: '#1a3a2e',
                fontWeight: 700,
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              Keeper
            </span>
          </NavLink>

          {/* Nav Links */}
          <div className="flex items-center gap-1">
            <NavLink to="/" end className={linkClass}>
              <Home size={15} />
              <span>Home</span>
            </NavLink>
            <NavLink to="/timeline" className={linkClass}>
              <Clock size={15} />
              <span>Timeline</span>
            </NavLink>
            <NavLink to="/stats" className={linkClass}>
              <BarChart2 size={15} />
              <span>Stats</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
