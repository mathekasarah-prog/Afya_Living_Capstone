
import { Link } from 'react-router-dom';
import Newsletter from './Newsletter';

function Footer({ user }) {
  return (
    <footer className="mt-12 border-t border-[#e3e5dc] bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Newsletter />

        <div className="mt-8 flex flex-col gap-5 border-t border-[#edf0e9] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link to="/" className="text-xl font-bold text-[#102a22]">
              Afya <span className="text-[#708c63]">Living</span>
            </Link>
            <p className="mt-2 text-sm text-gray-500">
              Natural wellness & self-care.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
            <Link to="/" className="text-gray-600 hover:text-[#102a22]">
              Shop
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-[#102a22]">
              About
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-[#102a22]">
              Contact
            </Link>
            {user?.isAdmin && (
            <Link to="/admin"className="font-semibold text-[#526f4b] hover:text-[#102A22] transition-colors">
              Admin
            </Link>
          )}
          </nav>
        </div>

        <p className="mt-7 text-xs text-gray-500">
          © {new Date().getFullYear()} Afya Living. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
