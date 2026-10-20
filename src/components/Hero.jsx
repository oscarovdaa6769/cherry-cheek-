import cherryCheek from '../assets/images/cherryCheek.png';

function Hero() {
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${cherryCheek})`,
      }}
    >
      <div className="hero-content">
        <p className="hero-label">
          CHERRY CHEEK · SKINCARE COLLECTION
        </p>

        <h1>Your Skin, Your Natural Glow.</h1>

        <p className="hero-description">
          Discover gentle skincare made to nourish
          your skin and bring out your natural
          beauty, every day.
        </p>

        <a href="#products" className="hero-button">
          Shop Now
        </a>
      </div>
    </section>
  );
}

export default Hero;