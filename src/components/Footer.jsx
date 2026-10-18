import { Link } from 'react-router-dom';
import Newsletter from './Newsletter';

function Footer({ user }) {
  return (
    <footer className="site-footer">
      <Newsletter />
      <p>&copy; {new Date().getFullYear()} Afya Living. All rights reserved.</p>
      <div className="footer-links">
        <a href="#privacy">Privacy</a>
        <a href="#terms">Terms</a>
        <Link to="/contact">Contact</Link>
        {user?.isAdmin && <Link to="/admin">Admin</Link>}
      </div>
    </footer>
  );
}

export default Footer;