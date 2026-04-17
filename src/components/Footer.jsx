export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          {/* logo-xl is white text on black — hide the black bg with mix-blend-screen */}
          <div className="flex justify-center mb-3">
            <img
              src="/icons/logo-xl.png"
              alt="KeenKeeper"
              className="h-10 w-auto"
              style={{ mixBlendMode: 'screen' }}
            />
          </div>
          <p className="text-green-200/70 text-sm max-w-sm mx-auto mb-8">
            Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
          </p>

          <div className="mb-8">
            <p className="text-green-200/50 text-xs font-medium uppercase tracking-widest mb-4">Social Links</p>
            <div className="flex justify-center gap-3">
              {/* Instagram — has white circle bg, show as-is */}
              <a href="#" className="w-9 h-9 rounded-full overflow-hidden hover:opacity-80 transition-opacity">
                <img src="/icons/instagram.png" alt="Instagram" className="w-full h-full object-cover" />
              </a>
              {/* Facebook */}
              <a href="#" className="w-9 h-9 rounded-full overflow-hidden hover:opacity-80 transition-opacity">
                <img src="/icons/facebook.png" alt="Facebook" className="w-full h-full object-cover" />
              </a>
              {/* X / Twitter */}
              <a href="#" className="w-9 h-9 rounded-full overflow-hidden hover:opacity-80 transition-opacity">
                <img src="/icons/twitter.png" alt="Twitter/X" className="w-full h-full object-cover" />
              </a>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-green-200/40">
            <span>© 2026 KeenKeeper. All rights reserved.</span>
            <div className="flex gap-5">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
