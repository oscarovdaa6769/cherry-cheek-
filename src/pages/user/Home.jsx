import { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import productsData from '../../data/products.json';
import '../../App.css';
import './Home.css';
import Hero from '../../components/layout/Hero';

/* ---------- Product Card Component ---------- */
function HomeProductCard({ id, image, category, name, price, rating = 5 }) {
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();

  return (
    <article className="home-card" onClick={() => navigate(`/product-detail?id=${id}`)}>
      <div className="home-card__img-box">
        <img className="home-card__img" src={image} alt={name} loading="lazy" />
        <button 
          type="button" 
          className="home-card__heart"
          onClick={(e) => {
            e.stopPropagation();
            // Wishlist toggle handler can go here
          }}
          aria-label="Save to wishlist"
        >
          <Icon icon="solar:heart-linear" />
        </button>
      </div>
      <div className="home-card__body">
        <span className="home-card__category">{category}</span>
        <h3 className="home-card__name">{name}</h3>

        <div className="home-card__stars" aria-label={`Rating ${rating} of 5`}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Icon 
              key={star} 
              icon="solar:star-bold" 
              className={star <= rating ? "star-active" : "star-inactive"} 
            />
          ))}
        </div>

        <div className="home-card__footer">
          <span className="home-card__price">{price}</span>
          <button
            type="button"
            className={`home-card__add ${added ? "is-added" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setAdded(!added);
            }}
            aria-label={`Add ${name} to cart`}
          >
            <Icon icon={added ? "solar:check-read-linear" : "solar:add-circle-bold"} />
          </button>
        </div>
      </div>
    </article>
  );
}

/* ---------- Data ---------- */
const features = [
  { icon: "solar:leaf-bold-duotone", label: "100% Natural" },
  { icon: "solar:shield-user-bold-duotone", label: "Safe & Gentle" },
  { icon: "solar:delivery-bold-duotone", label: "Fast Shipping" },
  { icon: "solar:headphones-round-bold-duotone", label: "24/7 Support" },
  { icon: "solar:heart-bold-duotone", label: "Trusted Brand" },
];

const homeProducts = productsData.slice(0, 8);
const bestSellers = productsData.filter(p => p.prodRev && p.prodRev.rating === 5).slice(0, 3);

const quotes = [
  {
    title: "Your Skin, Your Natural Glow",
    text: "Discover gentle skincare that nourishes your skin and celebrates your natural beauty.",
  },
  {
    title: "Glow Naturally, Every Day",
    text: "Make every day special with skincare that brings comfort, care, and confidence to your routine.",
  },
  {
    title: "Soft Skin, Gentle Moments",
    text: "Make space for peaceful moments with a skincare routine designed around your daily needs.",
  },
  {
    title: "A Fresh Start for Your Skin",
    text: "Begin each morning with a moment of care and a routine that feels right for you.",
  },
];

/* ---------- Page ---------- */
export default function Home() {
  const [copied, setCopied] = useState(null);
  const navigate = useNavigate();

  const copyQuote = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(index);
      setTimeout(() => setCopied(null), 1500);
    } catch (error) {
      // Ignore clipboard error
    }
  };

  return (
    <main className="home-page">
      <Hero />

      {/* Why Choose Us */}
      <section className="home-why container">
        <div className="home-why-header">
          <span className="home-why__eyebrow">Why Choose Us</span>
          <h2 className="home-why__title">The Cherry Cheek Standard</h2>
        </div>

        <ul className="home-why__list">
          {features.map((f) => (
            <li key={f.label} className="home-why__item">
              <span className="home-icon">
                <Icon icon={f.icon} width="24" height="24" />
              </span>
              <span className="home-why__label">{f.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Product Grid */}
      <section className="home-section container">
        <div className="section-header-row">
          <h2 className="home-section__title">Featured Products</h2>
          <button type="button" className="view-all-btn" onClick={() => navigate('/products')}>
            <span>View All</span>
            <Icon icon="solar:alt-arrow-right-linear" />
          </button>
        </div>
        <div className="home-grid home-grid--4">
          {homeProducts.map((p) => (
            <HomeProductCard 
              key={p.id} 
              id={p.id}
              image={p.image}
              category={p.prodCate}
              name={p.prodName}
              price={p.prodPrice}
              rating={p.prodRev?.rating || 5}
            />
          ))}
        </div>
      </section>

      {/* Article Row 1 */}
      <section className="home-feature container">
        <div className="home-feature__media">
          <img src={productsData[8]?.image || productsData[0].image} alt="Cosmetic products" loading="lazy" />
        </div>
        <div className="home-feature__text">
          <span className="feature-eyebrow">Expert Skincare Guide</span>
          <h3>5 things to look for before you buy argan oil</h3>
          <p>Learn how to identify pure, cold-pressed oils that deeply hydrate without clogging your pores.</p>
          <button type="button" className="feature-read-btn" onClick={() => navigate('/products')}>Read Article</button>
        </div>
      </section>

      {/* Article Row 2 */}
      <section className="home-feature home-feature--reverse container">
        <div className="home-feature__media">
          <img src={productsData[9]?.image || productsData[1].image} alt="Cosmetic products" loading="lazy" />
        </div>
        <div className="home-feature__text">
          <span className="feature-eyebrow">Sacred Formulas</span>
          <h3>Beauty rituals came together in one sacred serum.</h3>
          <p>Combining ancient botanical extracts with modern dermatological science for ultimate radiance.</p>
          <button type="button" className="feature-read-btn" onClick={() => navigate('/products')}>Discover Serum</button>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="home-section container">
        <h2 className="home-section__title">Best Seller Serums</h2>
        <div className="home-grid home-grid--3">
          {bestSellers.map((p) => (
            <HomeProductCard 
              key={p.id} 
              id={p.id}
              image={p.image}
              category={p.prodCate}
              name={p.prodName}
              price={p.prodPrice}
              rating={p.prodRev?.rating || 5}
            />
          ))}
        </div>
      </section>

      {/* Quotes Section */}
      <section className="home-section container">
        <h2 className="home-section__title">Cherry Cheek Daily Reflections</h2>

        <div className="home-grid home-grid--4">
          {quotes.map((q, i) => (
            <article key={q.title} className="home-quote">
              <span className="home-icon">
                <Icon icon="solar:chat-square-code-bold-duotone" width="24" height="24" />
              </span>
              <h4 className="home-quote__title">{q.title}</h4>
              <p className="home-quote__text">"{q.text}"</p>
              <button
                type="button"
                className="home-quote__copy"
                onClick={() => copyQuote(q.text, i)}
              >
                <Icon icon={copied === i ? "solar:check-circle-bold" : "solar:copy-linear"} />
                <span>{copied === i ? "Copied!" : "Copy quote"}</span>
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* About Us Banner */}
      <section className="home-about container">
        <div className="home-about__media">
          <img src={productsData[2]?.image || productsData[0].image} alt="Natural beauty skincare" loading="lazy" />
        </div>
        <div className="home-about__text">
          <p className="home-about__eyebrow">Our Philosophy</p>
          <h2 className="home-about__title">Natural Beauty</h2>
          <h3 className="home-about__sub">Real Confidence</h3>
          <p className="home-about__desc">
            We believe that true beauty begins with healthy, well-cared-for skin.
            Our skincare collection is designed to make your daily beauty routine
            simple, enjoyable, and refreshing.
          </p>
          <button type="button" className="home-about__btn" onClick={() => navigate('/about')}>
            Learn more
          </button>
        </div>
      </section>
    </main>
  );
}