import CherryCheek from '../../assets/images/cherryCheek.png';
import Btn from "../common/Button"

function Hero() {
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${CherryCheek})`,
      }}
    >
      <div className="hero-content">
        <p className="hero-label small-1">
          CHERRY CHEEK · SKINCARE COLLECTION
        </p>

        <h1 className='hero-heading'>Your Skin, Your Natural Glow.</h1>

        <p className="hero-description">
          Discover gentle skincare made to nourish
          your skin and bring out your natural
          beauty, every day.
        </p>

        <Btn name="Shop now"/>
      </div>
    </section>
  );
}

export default Hero;