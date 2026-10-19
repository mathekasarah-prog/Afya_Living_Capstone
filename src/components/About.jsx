
import { Link } from 'react-router-dom';

function About() {
  return (
    <main className="min-h-screen bg-[#fafbf8]">
      <section className="bg-[#f7f4ec] px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#708c63]">
            Our story
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#102a22] sm:text-6xl">
            Self-care, made meaningful.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
            Afya Living is dedicated to natural-inspired skincare, hair care,
            wellness essentials and thoughtfully curated gift sets.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[#102a22] px-6 py-3 font-semibold text-white hover:bg-[#244d38]"
          >
            Explore our collection →
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:px-6 sm:py-16 md:grid-cols-3">
        {[
          {
            icon: '🌿',
            title: 'Inspired by nature',
            text: 'Explore products inspired by botanical ingredients and everyday wellness rituals.',
          },
          {
            icon: '♡',
            title: 'Care in every routine',
            text: 'Make space for simple, thoughtful moments of personal care.',
          },
          {
            icon: '🎁',
            title: 'Made for sharing',
            text: 'Discover self-care essentials and gift ideas for people you care about.',
          },
        ].map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-[#e3e5dc] bg-white p-6 shadow-sm"
          >
            <span className="text-3xl" aria-hidden="true">{item.icon}</span>
            <h2 className="mt-4 text-xl font-bold text-[#102a22]">
              {item.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-gray-600">
              {item.text}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}

export default About;
