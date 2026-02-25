import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
          <NavLink to="/" className="navbar-logo">
            <span className="navbar-logo-icon">
              🎬
            </span>
            <span className="navbar-logo-text">
              MovieWatch
            </span>
          </NavLink>

          {/* Navigation Links */}
          <div className="navbar-links">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `navbar-link ${isActive ? "navbar-link-active" : ""}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/watchlist"
              className={({ isActive }) =>
                `navbar-link ${isActive ? "navbar-link-active" : ""}`
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
