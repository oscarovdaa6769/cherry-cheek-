import { Icon } from "@iconify/react";

// Your image (src/assets/images). Replace with the real team photo later.
import img7 from "./assets/images/img7.jpg";

/* ---------- Data ---------- */
// Icon names come from the Solar set: https://icon-sets.iconify.design/solar/
const stats = [
  { value: "1000+", label: "Client helped globally" },
  { value: "200+", label: "Licensed professionals" },
  { value: "95%", label: "Client satisfaction rate" },
  { value: "15+", label: "Years of experience" },
];

const services = [
  {
    icon: "solar:bag-linear",
    title: "Cosmetic product",
    text: "Discover high-quality makeup and beauty products for your everyday look and special occasions.",
  },
  {
    icon: "solar:leaf-linear",
    title: "Skin Care",
    text: "Find skincare products such as cleansers, moisturizers, serums, and other beauty essentials.",
  },
  {
    icon: "solar:delivery-linear",
    title: "Fast Delivery",
    text: "We deliver your orders safely and conveniently to your doorstep.",
  },
  {
    icon: "solar:headphones-round-linear",
    title: "Customer Support",
    text: "Our friendly team is ready to help you choose the right products and answer your questions.",
  },
];

/* ---------- Page ---------- */
export default function About() {
  return (
    <main className="about-page">
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
        <img src={img7} alt="Our team at work" />
      </div>

      {/* Numbers */}
      <section className="about-stats">
        {stats.map((item) => (
          <div key={item.label} className="about-stat">
            <p className="about-stat__value">{item.value}</p>
            <p className="about-stat__label">{item.label}</p>
          </div>
        ))}
      </section>

      {/* Story + Vision + Mission */}
      <section className="about-story">
        <div className="about-story__left">
          <p className="about-story__eyebrow">Our Story</p>
          <h2 className="about-story__title">From passion to purpose</h2>
          <p className="about-story__text">
            Our journey began with a simple passion for beauty and skincare. We
            wanted to make quality cosmetic products easier to discover and
            accessible to everyone. Today, we continue to grow while keeping our
            focus on quality, trust, and customer satisfaction.
          </p>
        </div>

        <div className="about-story__right">
          <div className="about-block">
            <h3 className="about-block__title">Our Vision</h3>
            <p className="about-block__text">
              To become a trusted beauty brand that inspires confidence and helps
              people discover quality products for their beauty and skin care
              needs.
            </p>
          </div>

          <div className="about-block">
            <h3 className="about-block__title">Our Mission</h3>
            <p className="about-block__text">
              To provide high-quality cosmetic products, make beauty shopping
              simple and enjoyable, and deliver a trusted experience for every
              customer.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="about-services">
        <p className="about-services__eyebrow">Our Services</p>
        <h2 className="about-services__title">What we offer</h2>
        <p className="about-services__subtitle">
          We provide everything we need for you beauty and skin care journey
        </p>

        <div className="about-services__grid">
          {services.map((item) => (
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