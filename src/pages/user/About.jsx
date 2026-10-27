import { Icon } from "@iconify/react";
import aboutData from "../../data/about.json"; // Make sure this path is correct
import './About.css'
import '../../App.css'

/* ---------- Page ---------- */
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

      {/* Big photo - Pulling path from JSON */}
      <div className="about-photo">
        <img src={aboutData.teamImage} alt="Our team at work" />
      </div>

      {/* Numbers */}
      <section className="about-stats">
        {aboutData.stats.map((item) => (
          <div key={item.label} className="about-stat">
            <p className="about-stat__value">{item.value}</p>
            <p className="about-stat__label">{item.label}</p>
          </div>
        ))}
      </section>

      {/* Story + Vision + Mission ... (keep as is) */}
      <section className="about-story">
        {/* ... */}
      </section>

      {/* Services */}
      <section className="about-services">
        {/* ... */}
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