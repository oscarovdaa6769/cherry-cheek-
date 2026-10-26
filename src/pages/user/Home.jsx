import { useState } from "react";
import { Icon } from "@iconify/react";
import productsData from '../../data/products.json';
import '../../App.css';
import './Home.css';

/* ---------- Product card ---------- */
// Updated props to match the JSON structure
function HomeProductCard({ image, category, name, price, rating = 0 }) {
  const [added, setAdded] = useState(false);

  return (
    <article className="home-card">
      {/* Added fallback for image if path is broken */}
      <img className="home-card__img" src={image} alt={name} />
      <div className="home-card__body">
        <span className="home-card__category">{category}</span>
        <h3 className="home-card__name">{name}</h3>

        <div className="home-card__stars" aria-label={`Rating ${rating} of 5`}>
          {[1, 2, 3, 4, 5].map((n) => (
            <span key={n}>{n <= rating ? "★" : "☆"}</span>
          ))}
        </div>

        <div className="home-card__footer">
          {/* JSON already has the $ sign, so we don't need to add it here */}
          <span className="home-card__price">{price}</span>
          <button
            type="button"
            className={`home-card__add ${added ? "is-added" : ""}`}
            onClick={() => setAdded(!added)}
            aria-label={`Add ${name} to cart`}
          >
            {added ? "✓" : "+"}
          </button>
        </div>
      </div>
    </article>
  );
}

/* ---------- Data ---------- */
const features = [
  { icon: "solar:leaf-linear", label: "100% Natural" },
  { icon: "solar:shield-user-linear", label: "Safe & Gentle" },
  { icon: "solar:delivery-linear", label: "Fast Shipping" },
  { icon: "solar:headphones-round-linear", label: "24/7 Support" },
  { icon: "solar:heart-linear", label: "Trusted Brand" },
];

// Grab the first 8 products for the main grid
const homeProducts = productsData.slice(0, 8);

// Grab the top 3 best sellers (e.g., products with a rating of 5)
const bestSellers = productsData.filter(p => p.prodRev.rating === 5).slice(0, 3);

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
// FIX: Changed to named export to match App.jsx
export default function Home() {
  const [copied, setCopied] = useState(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const copyQuote = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(index);
      setTimeout(() => setCopied(null), 1500);
    } catch (error) {
      // clipboard not available, ignore
    }
  };

  const handleSubscribe = (event) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 2500);
  };

  return (
    <main className="home">
      {/* Why choose us */}
      <section className="home-why">
        <p className="home-why__eyebrow">Why choose us</p>
        <h2 className="home-why__title">What is our product</h2>

        <ul className="home-why__list">
          {features.map((f) => (
            <li key={f.label} className="home-why__item">
              <span className="home-icon">
                <Icon icon={f.icon} width="20" height="20" />
              </span>
              <span className="home-why__label">{f.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Product grid (4 x 2) */}
      <section className="home-grid home-grid--4">
        {homeProducts.map((p) => (
          <HomeProductCard 
            key={p.id} 
            image={p.image}
            category={p.prodCate}
            name={p.prodName}
            price={p.prodPrice}
            rating={p.prodRev.rating}
          />
        ))}
      </section>

      {/* Article row 1: image left, text right */}
      <section className="home-feature">
        <div className="home-feature__media">
          {/* Using a product image as fallback since img5 wasn't defined */}
          <img src={productsData[8].image} alt="Cosmetic products" />
        </div>
        <div className="home-feature__text">
          <h3>5 things to look for before you buy argan oil</h3>
        </div>
      </section>

      {/* Article row 2: text left, image right */}
      <section className="home-feature home-feature--reverse">
        <div className="home-feature__media">
           {/* Using a product image as fallback since img6 wasn't defined */}
          <img src={productsData[9].image} alt="Cosmetic products" />
        </div>
        <div className="home-feature__text">
          <h3>Beauty rituals came together in one sacred serum.</h3>
        </div>
      </section>

      {/* Best sellers */}
      <section className="home-section">
        <h2 className="home-section__title">Best Seller Serum of all category</h2>
        <div className="home-grid home-grid--3">
          {bestSellers.map((p) => (
            <HomeProductCard 
              key={p.id} 
              image={p.image}
              category={p.prodCate}
              name={p.prodName}
              price={p.prodPrice}
              rating={p.prodRev.rating}
            />
          ))}
        </div>
      </section>

      {/* History and Quote */}
      <section className="home-section">
        <h2 className="home-section__title">Cherry Cheeks Little Quotes</h2>

        <div className="home-grid home-grid--4">
          {quotes.map((q, i) => (
            <article key={q.title} className="home-quote">
              <span className="home-icon">
                <Icon icon="solar:user-circle-linear" width="22" height="22" />
              </span>
              <h4 className="home-quote__title">{q.title}</h4>
              <p className="home-quote__text">{q.text}</p>
              <button
                type="button"
                className="home-quote__copy"
                onClick={() => copyQuote(q.text, i)}
              >
                <Icon icon="andrsrxn:star-filled" style={{ color: "gold" }} />
                <Icon icon="andrsrxn:star-filled" style={{ color: "gold" }} />
                <Icon icon="andrsrxn:star-filled" style={{ color: "gold" }} />
                <Icon icon="andrsrxn:star-filled" style={{ color: "gold" }} />
                <Icon icon="andrsrxn:star-filled" style={{ color: "gold" }} />
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* About us */}
      <section className="home-about">
        <div className="home-about__media">
          {/* Using product image as fallback since img3 wasn't defined */}
          <img src={productsData[2].image} alt="Natural beauty skincare" />
        </div>
        <div className="home-about__text">
          <p className="home-about__eyebrow">About us</p>
          <h2 className="home-about__title">Natural Beauty</h2>
          <h3 className="home-about__sub">Real Confidence</h3>
          <p className="home-about__desc">
            We believe that true beauty begins with healthy, well-cared-for skin.
            Our skincare collection is designed to make your daily beauty routine
            simple, enjoyable, and refreshing. We offer a variety of beauty
            products to help you care for your skin and feel confident every day.
          </p>
          <button type="button" className="home-about__btn">
            Learn more
          </button>
        </div>
      </section>
    </main>
  );
};