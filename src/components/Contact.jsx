
import { useState } from 'react';
import { apiRequest } from '../api';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ type: 'error', text: 'Please complete all fields.' });
      return;
    }

    setSubmitting(true);

    try {
      const data = await apiRequest('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      setStatus({
        type: 'success',
        text: data.message || "Your message has been sent successfully.",
      });
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      setStatus({ type: 'error', text: error.message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#fafbf8] px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[0.8fr_1.2fr]">
        <section className="rounded-2xl bg-[#102a22] p-7 text-white sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c4d7b7]">
            We're here to help
          </p>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
            Let's talk.
          </h1>
          <p className="mt-4 text-sm leading-7 text-gray-200">
            Have a question about a product or an order? Send us a message
            and our team will be happy to help.
          </p>
          <div className="mt-8 border-t border-white/20 pt-5">
            <p className="font-semibold">Afya Living</p>
            <p className="mt-2 text-sm text-gray-200">
              Natural wellness & self-care
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-[#e3e5dc] bg-white p-5 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-[#102a22]">
            Send us a message
          </h2>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label htmlFor="contact-name" className="mb-2 block text-sm font-semibold text-[#102a22]">
                Your name
              </label>
              <input
                id="contact-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                required
                maxLength={100}
                className="min-h-12 w-full rounded-xl border border-[#d5ddcf] px-4 py-3 outline-none focus:border-[#708c63] focus:ring-2 focus:ring-[#e4eadc]"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="mb-2 block text-sm font-semibold text-[#102a22]">
                Email address
              </label>
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
                maxLength={254}
                className="min-h-12 w-full rounded-xl border border-[#d5ddcf] px-4 py-3 outline-none focus:border-[#708c63] focus:ring-2 focus:ring-[#e4eadc]"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="mb-2 block text-sm font-semibold text-[#102a22]">
                Message
              </label>
              <textarea
                id="contact-message"
                rows={5}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                required
                maxLength={3000}
                className="w-full resize-y rounded-xl border border-[#d5ddcf] px-4 py-3 outline-none focus:border-[#708c63] focus:ring-2 focus:ring-[#e4eadc]"
              />
            </div>

            {status && (
              <p
                role="status"
                className={`rounded-xl p-3 text-sm ${
                  status.type === 'error'
                    ? 'bg-red-50 text-red-700'
                    : 'bg-green-50 text-green-800'
                }`}
              >
                {status.text}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="min-h-12 w-full rounded-full bg-[#102a22] px-6 py-3 font-semibold text-white hover:bg-[#244d38] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? 'Sending…' : 'Send Message →'}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

export default Contact;
