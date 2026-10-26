import { useState } from "react";
import "./Contact.css";

// Replace these with your own images (e.g. import from src/assets)
const PLACEHOLDER =
  "https://www.personalcarecouncil.org/wp-content/smush-webp/2025/03/AdobeStock_218950992-square-crop.jpeg.webp";
const journalImages = [PLACEHOLDER, PLACEHOLDER, PLACEHOLDER, PLACEHOLDER, PLACEHOLDER];

const contactDetails = [
  {
    icon: "✉",
    title: "Visit our office branch",
    lines: ["info@cherrycheek.com"],
    note: "For product questions and a little skin advice.",
  },
  {
    icon: "⌖",
    title: "Chat us",
    lines: ["101 E. Madison Street, Baltimore, MD 21202, USA"],
  },
  {
    icon: "✆",
    title: "Call us",
    lines: ["+1 (410) 555-0130"],
    note: "Monday–Friday · 9am–5pm EST",
  },
];

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    comment: "",
    save: false,
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", form);
    setSent(true);
    setForm({ name: "", email: "", comment: "", save: false });
  };

  return (
    <main className="contact">
      {/* Contact hero */}
      <section className="contact-hero">
        <p className="contact-eyebrow">We're here for you</p>
        <h1 className="contact-title">Contact us</h1>
        <p className="contact-description">A little care, a conversation away.</p>
        <p className="contact-breadcrumb">
          <a href="/">Home</a> / <span>Contact</span>
        </p>
      </section>

      {/* Contact information and enquiry */}
      <section className="contact-main">
        <div className="contact-branch">
          <p className="contact-label">Contact us</p>
          <h2 className="contact-heading">Our branch office</h2>
          <p className="contact-office">USA Head Office</p>

          <ul className="contact-list">
            {contactDetails.map((item) => (
              <li key={item.title} className="contact-item">
                <span className="contact-icon" aria-hidden="true">
                  {item.icon}
                </span>
                <div>
                  <p className="contact-item-title">{item.title}</p>
                  {item.lines.map((line) => (
                    <p key={line} className="contact-item-line">
                      {line}
                    </p>
                  ))}
                  {item.note && <p className="contact-item-note">{item.note}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h2 className="contact-heading">Enquiries &amp; offers</h2>
          <p className="contact-form-intro">
            Get in touch about an order or a product. Have a question? We're always
            happy to help.
          </p>

          <div className="contact-row">
            <label className="contact-field">
              <span>Name *</span>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>
            <label className="contact-field">
              <span>Email *</span>
              <input
                type="email"
                name="email"
                placeholder="Your email address"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <label className="contact-field">
            <span>Comment *</span>
            <textarea
              name="comment"
              rows="4"
              placeholder="How can we help you?"
              value={form.comment}
              onChange={handleChange}
              required
            />
          </label>

          <label className="contact-check">
            <input
              type="checkbox"
              name="save"
              checked={form.save}
              onChange={handleChange}
            />
            <span>Save my name, email, and website in this browser.</span>
          </label>

          <button type="submit" className="btn contact-submit">
            Send message →
          </button>

          {sent && (
            <p className="contact-success" role="status">
              Thanks! Your message has been sent.
            </p>
          )}
        </form>
      </section>

      {/* Location map */}
    <section className="contact-map" aria-label="Phnom Penh location map">
  <div className="contact-map-card">
    <iframe
      title="Phnom Penh, Cambodia map"
      src="https://www.google.com/maps?q=Phnom+Penh,+Cambodia&output=embed"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
    />
  </div>
</section>

      {/* Skincare photo journal */}
      <section className="contact-gallery" aria-label="Skincare photo journal">
        {journalImages.map((src, i) => (
          <img key={i} src={src} alt={`Skincare journal ${i + 1}`} />
        ))}
      </section>
    </main>
  );
}

export default Contact;