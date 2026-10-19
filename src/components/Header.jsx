import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

function Header({ cartCount, onCartClick, user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleShopClick(e) {
    closeMenu();
    if (pathname === '/') {
      e.preventDefault();
      document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const linkClass = ({ isActive }) =>
    `block rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive
        ? 'bg-[#e8efe5] text-[#102a22]'
        : 'text-gray-600 hover:bg-[#f0f3eb] hover:text-[#102a22]'
    }`;

      const desktopLinkClass = ({ isActive }) =>
    `relative rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200
     after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full
     after:bg-[#7b956e] after:transition-transform after:duration-300 ${
       isActive
         ? 'text-[#102a22] after:scale-x-100'
         : 'text-gray-600 after:scale-x-0 hover:text-[#102a22] hover:after:scale-x-100'
     }`;

  return (
    //<header className="sticky top-0 z-50 border-b border-[#e3e5dc] bg-white/95 shadow-sm backdrop-blur">
    <header
     className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur transition-all duration-300 ${
     scrolled ? 'border-transparent shadow-md' : 'border-[#e3e5dc] shadow-none'
     }`}
>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">

        {/* Brand */}
        <Link
          to="/"
          onClick={closeMenu}
          className="shrink-0 text-2xl font-bold tracking-tight text-[#102a22] sm:text-3xl"
        >
          Afya <span className="text-[#7b956e] font-['Dancing_Script']">Living</span>
          <span className="mt-0.5 block text-[9px] font-medium uppercase tracking-[0.25em] text-gray-500">
            Natural wellness
          </span>
        </Link>

        {/* Desktop navigation */}
      <nav className="hidden items-center gap-1 md:flex">
      <NavLink to="/" end className={desktopLinkClass} onClick={handleShopClick}>
       Shop
      </NavLink>
      <NavLink to="/about" className={desktopLinkClass}>
       About
      </NavLink>
      <NavLink to="/contact" className={desktopLinkClass}>
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
            <NavLink to="/" end className={linkClass} onClick={handleShopClick}>
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
