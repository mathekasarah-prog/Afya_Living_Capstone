
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '../api';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setSubmitting(true);

    try {
      const data = await apiRequest('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      onLogin(data.user);
      navigate('/');
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-[#fafbf8] px-4 py-12">
      <section className="w-full max-w-md rounded-2xl border border-[#e3e5dc] bg-white p-6 shadow-sm sm:p-9">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#708c63]">
          Welcome back
        </p>
        <h1 className="mt-3 text-3xl font-bold text-[#102a22]">Log in</h1>
        <p className="mt-2 text-sm leading-6 text-gray-600">
          Sign in to your Afya Living account.
        </p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-5">
          <div>
            <label htmlFor="login-email" className="mb-2 block text-sm font-semibold text-[#102a22]">
              Email address
            </label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="min-h-12 w-full rounded-xl border border-[#d5ddcf] px-4 py-3 outline-none focus:border-[#708c63] focus:ring-2 focus:ring-[#e4eadc]"
            />
          </div>

          <div>
            <label htmlFor="login-password" className="mb-2 block text-sm font-semibold text-[#102a22]">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="min-h-12 w-full rounded-xl border border-[#d5ddcf] px-4 py-3 outline-none focus:border-[#708c63] focus:ring-2 focus:ring-[#e4eadc]"
            />
          </div>

          {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="min-h-12 w-full rounded-full bg-[#102a22] px-6 py-3 font-semibold text-white hover:bg-[#244d38] disabled:opacity-60"
          >
            {submitting ? 'Logging in…' : 'Log In'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          New to Afya Living?{' '}
          <Link to="/signup" className="font-semibold text-[#526f4b] hover:underline">
            Create an account
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
