import { useState } from 'react';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (!email.includes('@')) {
      setStatus({ type: 'error', message: 'Please enter a valid email.' });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('http://localhost:3000/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Subscription failed');

      setStatus({ type: 'success', message: data.message || 'Subscribed successfully!' });
      setEmail('');
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="newsletter">
      <h3>Join our newsletter</h3>
      <p>Get updates on new products and offers.</p>
      <form onSubmit={handleSubmit} className="newsletter-form">
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" disabled={submitting}>
          {submitting ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      {status && (
        <p className={status.type === 'error' ? 'checkout-error' : 'newsletter-success'}>
          {status.message}
        </p>
      )}
    </div>
  );
}

export default Newsletter;