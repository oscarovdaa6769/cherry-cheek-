import { Icon } from "@iconify/react";
import aboutData from "../../data/about.json";
import './About.css';
import '../../App.css';

export default function About() {
  return (
    <main className="about-page container">
      {/* Header: title left, short text right */}
      <section className="about-header">
        <h1 className="about-header__title">About Us</h1>
        <p className="about-header__text">
          We are committed to creating a safe and supportive environment where
          you can explore your thoughts and feelings, develop coping strategies,
          and achieve your goals.
        </p>
      </section>

      {/* Big photo */}
      <div className="about-photo">
        <img src="src/assets/images/fallback.jpg" alt="Our team at work" />
      </div>

      {/* Numbers / Stats */}
      <section className="about-stats">
        {aboutData.stats.map((item) => (
          <div key={item.label} className="about-stat">
            <p className="about-stat__value">{item.value}</p>
            <p className="about-stat__label">{item.label}</p>
          </div>
        ))}
      </section>

      {/* Story + Vision + Mission Grid */}
      <section className="about-story">
        <div className="about-story__left">
          <span className="about-story__eyebrow">Our Journey</span>
          <h2 className="about-story__title">The Cherry Cheek Story</h2>
          <p className="about-story__text">
            Founded with a passion for natural radiance and holistic skincare, Cherry Cheek 
            began as a simple mission: to create clean, plant-powered essentials that fit seamlessly 
            into everyday routines. We believe that caring for your skin should be an enjoyable, 
            grounding ritual free from harsh chemicals.
          </p>
          <p className="about-story__text">
            Today, we continue to craft thoughtful formulations that combine time-tested botanical 
            ingredients with modern scientific precision, ensuring real, glowing results for every skin type.
          </p>
        </div>

        <div className="about-story__right">
          <div className="about-block">
            <h3 className="about-block__title">Our Vision</h3>
            <p className="about-block__text">
              To empower everyone to embrace their natural beauty through ethical, 
              sustainable, and skin-first cosmetics that inspire confidence daily.
            </p>
          </div>

          <div className="about-block">
            <h3 className="about-block__title">Our Mission</h3>
            <p className="about-block__text">
              Delivering high-performance botanical products crafted with transparency, 
              cruelty-free ingredients, and environmentally conscious packaging.
            </p>
          </div>
        </div>
      </section>

      {/* Services / Core Values */}
      <section className="about-services">
        <div className="about-services__header">
          <span className="about-services__eyebrow">What We Offer</span>
          <h2 className="about-services__title">Our Core Values</h2>
          <p className="about-services__subtitle">
            Every product we make is backed by our promise to quality, skin health, and sustainability.
          </p>
        </div>

        <div className="about-services__grid">
          {aboutData.services.map((item) => (
            <article key={item.title} className="about-service">
              <span className="about-icon">
                <Icon icon={item.icon} width="20" height="20" />
              </span>
              <h3 className="about-service__title">{item.title}</h3>
              <p className="about-service__text">{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}