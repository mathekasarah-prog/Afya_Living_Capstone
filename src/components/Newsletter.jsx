
import { useState } from 'react';
import { apiRequest } from '../api';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(null);

    if (!email.trim()) {
      setStatus({ type: 'error', text: 'Please enter your email address.' });
      return;
    }

    setSubmitting(true);

    try {
      const data = await apiRequest('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      setStatus({
        type: 'success',
        text: data.message || 'Thank you for subscribing!',
      });
      setEmail('');
    } catch (error) {
      setStatus({ type: 'error', text: error.message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="rounded-2xl bg-[#f0f3eb] p-5 sm:p-7">
      <h2 className="text-xl font-bold text-[#102a22]">
        A little wellness in your inbox
      </h2>
      <p className="mt-2 text-sm leading-6 text-gray-600">
        Sign up for product updates, self-care inspiration and special offers.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          className="min-h-12 min-w-0 flex-1 rounded-full border border-[#d5ddcf] bg-white px-5 py-3 outline-none focus:border-[#708c63] focus:ring-2 focus:ring-[#e4eadc]"
        />
        <button
          type="submit"
          disabled={submitting}
          className="min-h-12 rounded-full bg-[#102a22] px-6 py-3 text-sm font-semibold text-white hover:bg-[#244d38] disabled:opacity-60"
        >
          {submitting ? 'Subscribing…' : 'Subscribe'}
        </button>
      </form>

      {status && (
        <p
          role="status"
          className={`mt-3 text-sm ${
            status.type === 'error' ? 'text-red-700' : 'text-green-800'
          }`}
        >
          {status.text}
        </p>
      )}
    </section>
  );
}

export default Newsletter;
