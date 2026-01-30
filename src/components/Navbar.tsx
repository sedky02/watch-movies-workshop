import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-black/90 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 group">
            <span className="text-2xl group-hover:scale-110 transition-transform">
              🎬
            </span>
            <span className="font-bold text-xl tracking-tight text-white group-hover:text-primary transition-colors">
              MovieWatch
            </span>
          </NavLink>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-gray-300"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/watchlist"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-gray-300"
                }`
              }
            >
              Watchlist
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
