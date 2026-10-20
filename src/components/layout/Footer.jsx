
import './Footer.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Newsletter */}
      <div className="footer-newsletter">
        <div>
          <span className="footer-eyebrow">A LITTLE SELF-CARE</span>
          <h2>A little beauty in your inbox.</h2>
          <p>
            Discover beauty tips, new arrivals, and
            exclusive offers made just for you.
          </p>
        </div>

        <form
          className="newsletter-form"
          onSubmit={(e) => {
            e.preventDefault();
            alert('Thank you for subscribing!');
          }}
        >
          <input
            type="email"
            placeholder="Enter your email address"
            aria-label="Email address"
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>

      {/* Footer content */}
      <div className="footer-main">
        <div className="footer-brand">
          <a href="/" className="footer-logo">
            cherry<span>cheek.</span>
          </a>

          <p>
            Your everyday beauty ritual,
            thoughtfully made to help you feel
            confident in your own skin.
          </p>

          <div className="footer-socials">
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer"
              >
                <img src="/images/instagram.png" alt="Instagram" />
              </a>

              <a
                href="https://facebook.com"
                aria-label="Facebook"
                target="_blank"
                rel="noreferrer"
              >
                <img src="/images/facebook.png" alt="Facebook" />
              </a>

              <a
                href="https://tiktok.com"
                aria-label="TikTok"
                target="_blank"
                rel="noreferrer"
              >
                <img src="/images/tiktok.png" alt="TikTok" />
              </a>
            </div>
        </div>

        <div className="footer-column">
          <h3>Shop</h3>
          <a href="/skincare">Skincare</a> 
          <a href="/makeup">Makeup</a>
          <a href="/bestsellers">Best Sellers</a>
          <a href="/new-arrivals">New Arrivals</a>
        </div>

        <div className="footer-column">
          <h3>Customer Care</h3>
          <a href="/contact">Contact Us</a>
          <a href="/shipping">Shipping & Returns</a>
          <a href="/faqs">FAQs</a>
          <a href="/Cart">Shopping Cart</a>
        </div>

        <div className="footer-column">
          <h3>Our Company</h3>
          <a href="/about">Our Story</a>
          <a href="/ingredients">Our Ingredients</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms & Conditions</a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p>
          © {year} Cherry Cheek. All rights reserved.
        </p>

        <p className="footer-tagline">
          Made with care, for your beauty.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
