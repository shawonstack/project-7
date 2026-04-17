import { useNavigate } from 'react-router-dom'
import { Home } from 'lucide-react'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="text-8xl font-display font-bold text-brand-pale select-none">404</div>
      <h2 className="text-2xl font-bold text-gray-800 mt-4">Page Not Found</h2>
      <p className="text-gray-400 text-sm mt-2 max-w-xs">
        Looks like this friendship link is broken. Let's get you back on track.
      </p>
      <button
        onClick={() => navigate('/')}
        className="btn bg-brand-dark text-white border-none rounded-xl gap-2 mt-8 hover:bg-brand-light"
      >
        <Home size={15} />
        Back to Home
      </button>
    </div>
  )
}
