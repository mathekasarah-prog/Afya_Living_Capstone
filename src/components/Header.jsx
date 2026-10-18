import { Link } from 'react-router-dom';

function Header({ cartCount, onCartClick, user, onLogout }) {
  return (
    <header className="site-header">
      <Link to="/" className="logo">Afya Living</Link>
      <nav>
        <Link to="/">Shop</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <div className="header-actions">
        {user ? (
          <>
            <span className="user-greeting">Hi, {user.name}</span>
            <button className="auth-btn" onClick={onLogout}>Log Out</button>
          </>
        ) : (
          <>
            <Link to="/login" className="auth-btn">Log In</Link>
            <Link to="/signup" className="auth-btn">Sign Up</Link>
          </>
        )}
        <button className="cart-btn" onClick={onCartClick}>
          🛒 Cart ({cartCount})
        </button>
      </div>
    </header>
  );
}

export default Header;