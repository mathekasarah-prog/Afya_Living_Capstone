import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="hero">
      <p className="hero-eyebrow">
        NATURAL • SIMPLE • BEAUTIFUL
      </p>

      <h1>Wellness, Naturally.</h1>

      <p className="hero-description">
        Discover natural beauty, haircare and wellness
        essentials for your everyday self-care ritual.
      </p>

      <Link to="/#shop" className="hero-button">
        Explore Our Collection
      </Link>
    </section>
  );
}

export default Hero;