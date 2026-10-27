import { useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import "./Contact.css";
import "../../App.css";

const PLACEHOLDER =
  "https://www.personalcarecouncil.org/wp-content/smush-webp/2025/03/AdobeStock_218950992-square-crop.jpeg.webp";
const journalImages = [PLACEHOLDER, PLACEHOLDER, PLACEHOLDER, PLACEHOLDER, PLACEHOLDER];

const contactDetails = [
  {
    icon: "solar:letter-bold-duotone",
    title: "Email Us",
    lines: ["info@cherrycheek.com"],
    note: "For product questions and skin advice.",
  },
  {
    icon: "solar:map-point-bold-duotone",
    title: "Visit Our Office",
    lines: ["Phnom Penh, Cambodia"],
    note: "Main Headquarters",
  },
  {
    icon: "solar:phone-bold-duotone",
    title: "Call Us",
    lines: ["+855 (0) 12 345 678"],
    note: "Monday–Friday · 9am–5pm ICT",
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
    setSent(true);
    setForm({ name: "", email: "", comment: "", save: false });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <main className="contact-page">
      <div className="contact-container">
        
        {/* Contact Hero */}
        <section className="contact-hero">
          <span className="contact-eyebrow">We're Here For You</span>
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-description">A little care, a conversation away.</p>
          <div className="contact-breadcrumb">
            <Link to="/home">Home</Link>
            <Icon icon="solar:alt-arrow-right-linear" />
            <span>Contact</span>
          </div>
        </section>

        {/* Main Section */}
        <section className="contact-main">
          {/* Branch Info */}
          <div className="contact-branch">
            <span className="contact-label">Get In Touch</span>
            <h2 className="contact-heading">Branch Office</h2>
            <p className="contact-office">Cambodia Head Office</p>

            <ul className="contact-list">
              {contactDetails.map((item) => (
                <li key={item.title} className="contact-item">
                  <div className="contact-icon-box">
                    <Icon icon={item.icon} className="contact-icon" />
                  </div>
                  <div className="contact-item-info">
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

          {/* Form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <h2 className="contact-heading">Enquiries & Feedback</h2>
            <p className="contact-form-intro">
              Have a question about an order or a product? Send us a message and our team will respond shortly.
            </p>

            <div className="contact-row">
              <label className="contact-field">
                <span>Name *</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Your full name"
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
              <span>Message *</span>
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
              <span>Save my name and email in this browser for next time.</span>
            </label>

            <button type="submit" className="contact-submit-btn">
              <span>Send Message</span>
              <Icon icon="solar:plain-3-linear" className="send-icon" />
            </button>

            {sent && (
              <div className="contact-success" role="status">
                <Icon icon="solar:check-circle-bold" />
                <span>Thank you! Your message has been sent successfully.</span>
              </div>
            )}
          </form>
        </section>

        {/* Location Map */}
        <section className="contact-map" aria-label="Location map">
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

        {/* Gallery */}
        <section className="contact-gallery" aria-label="Skincare photo journal">
          {journalImages.map((src, i) => (
            <div key={i} className="gallery-item">
              <img src={src} alt={`Skincare journal ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </section>

      </div>
    </main>
  );
}

export default Contact;