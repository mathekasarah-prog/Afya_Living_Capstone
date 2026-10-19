
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="overflow-hidden bg-[#f7f4ec]">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">

        {/* Hero text */}
        <div className="min-w-0">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#708c63] sm:text-sm">
            Natural · Simple · Beautiful
          </p>

          <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-[#102a22] sm:text-5xl lg:text-6xl">
            Wellness,
            <span className="block font-normal italic text-[#708c63]">
              Naturally.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
            Thoughtfully chosen skincare, hair care and wellness essentials
            to make your everyday self-care feel special.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#102a22] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#244d38] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#102a22]"
            >
              Explore the collection
              <span className="ml-2" aria-hidden="true">→</span>
            </Link>

            <Link
              to="/about"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#cbd4c4] px-6 py-3 text-sm font-semibold text-[#102a22] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#102a22]"
            >
              Our story
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-3 border-t border-[#dce2d5] pt-6">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e4eadc] text-xl" aria-hidden="true">
              🌿
            </span>
            <div>
              <p className="font-semibold text-[#102a22]">
                Your daily moment of care
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Discover products for your self-care ritual.
              </p>
            </div>
          </div>
        </div>

        {/* Hero image */}
        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -inset-3 rounded-[2rem] bg-[#e5eadc] sm:-inset-5" />

          <img
            src="src/assets/Afyahero2.jpeg"
            alt="Natural wellness and skincare products arranged with botanical leaves"
            className="relative aspect-[4/3] w-full rounded-[1.5rem] object-cover shadow-lg sm:rounded-[2rem]"
            onError={(event) => {
              event.currentTarget.style.display = 'none';
            }}
          />
        </div>

      </div>
    </section>
  );
}

export default Hero;
