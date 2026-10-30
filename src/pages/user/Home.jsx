import { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import productsData from '../../data/products.json';
import categoriesData from '../../data/categories.json';
import '../../App.css';
import './Home.css';
import Hero from '../../components/layout/Hero';

/* Category Lookup Map */
const categoryMap = categoriesData.reduce((acc, cat) => {
  acc[cat.id] = cat.name;
  return acc;
}, {});

/* Default Placeholder Image */
const DEFAULT_IMAGE = "src/assets/images/fallback.jpg";

/* ---------- Product Card Component ---------- */
function HomeProductCard({ id, image, category, name, price, rating = 5 }) {
  const navigate = useNavigate();

  // Initialize wishlist state from localStorage
  const [isLiked, setIsLiked] = useState(() => {
    try {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      return wishlist.some((item) => (typeof item === 'object' ? item.id === id : item === id));
    } catch {
      return false;
    }
  });

  // Initialize cart state from localStorage
  const [added, setAdded] = useState(() => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      return cart.some((item) => item.id === id);
    } catch {
      return false;
    }
  });

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    try {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      let updatedWishlist;
      if (isLiked) {
        updatedWishlist = wishlist.filter((item) => (typeof item === 'object' ? item.id !== id : item !== id));
      } else {
        updatedWishlist = [...wishlist, id];
      }
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setIsLiked(!isLiked);
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      console.error("Error updating wishlist", error);
    }
  };

  const handleCartClick = (e) => {
    e.stopPropagation();
    try {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      let updatedCart;
      if (added) {
        updatedCart = cart.filter((item) => item.id !== id);
        setAdded(false);
      } else {
        const existingIndex = cart.findIndex((item) => item.id === id);
        if (existingIndex >= 0) {
          cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
          updatedCart = [...cart];
        } else {
          updatedCart = [...cart, { id, image, category, title: name, price, quantity: 1, rating }];
        }
        setAdded(true);
      }
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      console.error("Error updating cart", error);
    }
  };

  const formattedPrice = typeof price === 'number' ? `$${price.toFixed(2)}` : price;

  return (
    <article className="home-card" onClick={() => navigate(`/product-detail?id=${id}`)}>
      <div className="home-card__img-box">
        <img className="home-card__img" src={image || DEFAULT_IMAGE} alt={name} loading="lazy" />
        <button 
          type="button" 
          className="home-card__heart"
          onClick={handleWishlistClick}
          aria-label="Save to wishlist"
          style={{ color: isLiked ? "var(--error-color)" : undefined }}
        >
          <Icon icon={isLiked ? "solar:heart-bold" : "solar:heart-linear"} />
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
          <span className="home-card__price">{formattedPrice}</span>
          <button
            type="button"
            className={`home-card__add ${added ? "is-added" : ""}`}
            onClick={handleCartClick}
            aria-label={`Add ${name} to cart`}
          >
            <Icon icon={added ? "solar:check-read-linear" : "solar:add-circle-bold"} />
          </button>
        </div>
      </div>
    </article>
  );
}

/* ---------- Static Data ---------- */
const features = [
  { icon: "solar:leaf-bold-duotone", label: "100% Natural" },
  { icon: "solar:shield-user-bold-duotone", label: "Safe & Gentle" },
  { icon: "solar:delivery-bold-duotone", label: "Fast Shipping" },
  { icon: "solar:headphones-round-bold-duotone", label: "24/7 Support" },
  { icon: "solar:heart-bold-duotone", label: "Trusted Brand" },
];

const homeProducts = productsData.slice(0, 8);
const bestSellers = productsData.filter(p => p.categoryId === 1 || p.categoryId === 2).slice(0, 3);

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
              image={p.image || DEFAULT_IMAGE}
              category={categoryMap[p.categoryId] || "Skincare"}
              name={p.name}
              price={p.price}
              rating={5}
            />
          ))}
        </div>
      </section>

      {/* Article Row 1 */}
      <section className="home-feature container">
        <div className="home-feature__media">
          <img src={productsData[1]?.image || DEFAULT_IMAGE} alt="Cosmetic products" loading="lazy" />
        </div>
        <div className="home-feature__text">
          <span className="feature-eyebrow">Expert Skincare Guide</span>
          <h3>5 things to look for before you buy vitamin C serum</h3>
          <p>Learn how to identify pure, antioxidant-rich serums that deeply hydrate without irritating sensitive skin.</p>
          <button type="button" className="feature-read-btn" onClick={() => navigate('/products')}>Read Article</button>
        </div>
      </section>

      {/* Article Row 2 */}
      <section className="home-feature home-feature--reverse container">
        <div className="home-feature__media">
          <img src={productsData[2]?.image || DEFAULT_IMAGE} alt="Cosmetic products" loading="lazy" />
        </div>
        <div className="home-feature__text">
          <span className="feature-eyebrow">Sacred Formulas</span>
          <h3>Beauty rituals came together in one daily sunscreen.</h3>
          <p>Combining botanical skin care with lightweight broad spectrum SPF 50 protection for natural glow.</p>
          <button type="button" className="feature-read-btn" onClick={() => navigate('/products')}>Discover Sunscreen</button>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="home-section container">
        <h2 className="home-section__title">Best Seller Skincare</h2>
        <div className="home-grid home-grid--3">
          {bestSellers.map((p) => (
            <HomeProductCard 
              key={p.id} 
              id={p.id}
              image={p.image || DEFAULT_IMAGE}
              category={categoryMap[p.categoryId] || "Skincare"}
              name={p.name}
              price={p.price}
              rating={5}
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
          <img src={productsData[3]?.image || DEFAULT_IMAGE} alt="Natural beauty skincare" loading="lazy" />
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