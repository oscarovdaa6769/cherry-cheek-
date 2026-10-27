import HeroBanner from '../../assets/images/banner.jpg';
import Btn from "../common/Button";
import './Hero.css';
import '../../App.css';

export default function Hero() {
  return (
    <section
      className="hero"
      aria-label="Cherry Cheek skincare collection"
      style={{
        backgroundImage: `linear-gradient(var(--hero-overlay), var(--hero-overlay)), url(${HeroBanner})`,
      }}
    >
      {/* New wrapper to match header's max-width */}
      <div className="hero-container">
        <div className="hero-content">
          <p className="hero-label">
            CHERRY CHEEK · SKINCARE COLLECTION
          </p>

          <h1 className="hero-heading">Your Skin, Your Natural Glow.</h1>

          <p className="hero-description">
            Discover gentle skincare made to nourish your skin and bring out
            your natural beauty, every day.
          </p>

          <Btn name="Shop now" className="hero-button" />
        </div>
      </div>
    </section>
  );
}