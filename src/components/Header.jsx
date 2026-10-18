
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Header({ cartCount, onCartClick, user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <Link to="/" className="logo" onClick={closeMenu}>
        Afya <span>Living</span>
      </Link>

      <button
        type="button"
        className="menu-toggle"
        onClick={() => setMenuOpen((previous) => !previous)}
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      <nav
        id="main-navigation"
        className={`main-navigation ${menuOpen ? 'menu-open' : ''}`}
      >
        <NavLink to="/" end onClick={closeMenu}>
          Shop
        </NavLink>
        <NavLink to="/about" onClick={closeMenu}>
          About
        </NavLink>
        <NavLink to="/contact" onClick={closeMenu}>
          Contact
        </NavLink>
      </nav>

      <div className="header-actions">
        {user ? (
          <>
            <span className="user-greeting">
              Hi, {user.name || user.email || 'there'}!
            </span>
            <button
              type="button"
              className="auth-btn"
              onClick={() => {
                onLogout();
                closeMenu();
              }}
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="auth-btn" onClick={closeMenu}>
              Log In
            </Link>
            <Link to="/signup" className="auth-btn signup-btn" onClick={closeMenu}>
              Sign Up
            </Link>
          </>
        )}

        <button
          type="button"
          className="cart-btn"
          onClick={() => {
            onCartClick();
            closeMenu();
          }}
          aria-label={`Open shopping cart with ${cartCount} items`}
        >
          🛒 Cart <span className="cart-count">{cartCount}</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
