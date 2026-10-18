import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Header({ cartCount, onCartClick, user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  const linkClass = ({ isActive }) =>
    `block rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive
        ? 'bg-[#e8efe5] text-[#102a22]'
        : 'text-gray-600 hover:bg-[#f0f3eb] hover:text-[#102a22]'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-[#e3e5dc] bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">

        {/* Brand */}
        <Link
          to="/"
          onClick={closeMenu}
          className="shrink-0 text-2xl font-bold tracking-tight text-[#102a22] sm:text-3xl"
        >
          Afya <span className="text-[#7b956e]">Living</span>
          <span className="mt-0.5 block text-[9px] font-medium uppercase tracking-[0.25em] text-gray-500">
            Natural wellness
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          <NavLink to="/" end className={linkClass}>
            Shop
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={linkClass}>
            Contact
          </NavLink>
        </nav>

        {/* Account and cart actions */}
        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <>
              <span className="max-w-32 truncate text-sm text-gray-600">
                Hi, {user.name || user.email || 'there'}!
              </span>
              <button
                type="button"
                onClick={onLogout}
                className="rounded-full border border-[#d5ddcf] px-4 py-2 text-sm font-semibold text-[#102a22] transition hover:bg-[#f0f3eb]"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-full px-4 py-2 text-sm font-semibold text-[#102a22] hover:bg-[#f0f3eb]"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="rounded-full bg-[#102a22] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#244d38]"
              >
                Sign Up
              </Link>
            </>
          )}

          <button
            type="button"
            onClick={onCartClick}
            className="rounded-full bg-[#e8efe5] px-4 py-2 text-sm font-semibold text-[#102a22] transition hover:bg-[#dce7d6]"
            aria-label={`Open cart with ${cartCount} items`}
          >
            🛒 Cart ({cartCount})
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#d5ddcf] text-2xl text-[#102a22] hover:bg-[#f0f3eb] md:hidden"
          onClick={() => setMenuOpen((previous) => !previous)}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile navigation panel */}
      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-[#e3e5dc] bg-white px-4 py-4 shadow-lg md:hidden"
        >
          <nav className="mx-auto flex max-w-7xl flex-col gap-1">
            <NavLink to="/" end className={linkClass} onClick={closeMenu}>
              Shop
            </NavLink>
            <NavLink to="/about" className={linkClass} onClick={closeMenu}>
              About
            </NavLink>
            <NavLink to="/contact" className={linkClass} onClick={closeMenu}>
              Contact
            </NavLink>
          </nav>

          <div className="mx-auto mt-4 flex max-w-7xl flex-wrap items-center gap-2 border-t border-gray-100 pt-4">
            {user ? (
              <>
                <span className="mr-auto text-sm text-gray-600">
                  Hi, {user.name || user.email || 'there'}!
                </span>
                <button
                  type="button"
                  onClick={() => {
                    onLogout();
                    closeMenu();
                  }}
                  className="rounded-full border border-[#d5ddcf] px-4 py-2 text-sm font-semibold text-[#102a22]"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="rounded-full border border-[#d5ddcf] px-4 py-2 text-sm font-semibold text-[#102a22]"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  onClick={closeMenu}
                  className="rounded-full bg-[#102a22] px-4 py-2 text-sm font-semibold text-white"
                >
                  Sign Up
                </Link>
              </>
            )}

            <button
              type="button"
              onClick={() => {
                onCartClick();
                closeMenu();
              }}
              className="rounded-full bg-[#e8efe5] px-4 py-2 text-sm font-semibold text-[#102a22]"
            >
              🛒 Cart ({cartCount})
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
