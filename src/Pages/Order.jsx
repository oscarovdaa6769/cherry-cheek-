import { useState } from "react";
import "./Order.css";

// ---------- All icons in one place ----------
const ICON_PATHS = {
  leaf: "M5 19c0-9 5-14 15-14 0 9-5 14-13 14M5 19 15 9",
  heart:
    "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z",
  card:
    "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z",
  check: "m4.5 12.75 6 6 9-13.5",
  refresh:
    "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99",
  home:
    "m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
  close: "M6 18 18 6M6 6l12 12",
  plus: "M12 4.5v15m7.5-7.5h-15",
  minus: "M5 12h14",
  arrowLeft: "M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18",
  arrowRight: "M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3",
};

function Icon({ name, size = "1em" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
      aria-hidden="true"
    >
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

const initialProducts = [
  {
    id: 1,
    name: "Hydrating Face Cream",
    description: "Moisturizer · 50ml",
    price: 18,
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=200&auto=format&fit=crop",
    quantity: 1,
  },
  {
    id: 2,
    name: "Rose Lipstick",
    description: "Rose Petal · 3.5g",
    price: 16,
    image:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=200&auto=format&fit=crop",
    quantity: 1,
  },
  {
    id: 3,
    name: "Vitamin C Sheet Mask",
    description: "Brightening · 5pcs",
    price: 12,
    image:
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=200&auto=format&fit=crop",
    quantity: 1,
  },
];

function Order() {
  const [products, setProducts] = useState(initialProducts);
  const [delivery, setDelivery] = useState("standard");
  const [payment, setPayment] = useState("card");
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    province: "",
    postcode: "",
  });

  const subtotal = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  const shipping = delivery === "standard" ? 3 : 0;
  const total = subtotal + shipping;

  function updateForm(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function changeQuantity(id, amount) {
    setProducts((current) =>
      current.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity: Math.max(1, product.quantity + amount),
            }
          : product
      )
    );
  }

  function removeProduct(id) {
    setProducts((current) =>
      current.filter((product) => product.id !== id)
    );
  }

  function continueOrder(event) {
    event.preventDefault();

    if (products.length === 0) {
      alert("Your order is empty.");
      return;
    }

    if (step === 1) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (step === 2) {
      setStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    alert(
      `Order ready for review!\nName: ${form.name}\nTotal: $${total.toFixed(2)}\nPayment: ${payment}`
    );
  }

  return (
    <div className="order-page">
      <section className="order-hero">
        <div>
          <span className="order-eyebrow">CHECKOUT</span>
          <h1>Order</h1>
          <p>
            Complete your purchase and get your favorite
            beauty products delivered to your door.
          </p>
        </div>
      </section>

      <main className="order-container">
        <div className="order-steps">
          {["Shipping", "Payment", "Review & Confirm"].map(
            (label, index) => (
              <div
                className={`order-step ${
                  step === index + 1 ? "active" : ""
                } ${step > index + 1 ? "completed" : ""}`}
                key={label}
              >
                <span>
                  {step > index + 1 ? (
                    <Icon name="check" size="16px" />
                  ) : (
                    index + 1
                  )}
                </span>
                <p>{label}</p>
              </div>
            )
          )}
        </div>

        <form className="order-layout" onSubmit={continueOrder}>
          <div className="order-left">
            {step === 1 && (
              <>
                <section className="order-card">
                  <div className="section-heading">
                    <span className="section-icon">
                      <Icon name="leaf" />
                    </span>
                    <div>
                      <h2>Shipping Information</h2>
                      <p>Enter your delivery details</p>
                    </div>
                  </div>

                  <div className="order-field">
                    <label>Full Name *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={updateForm}
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div className="order-field-grid">
                    <div className="order-field">
                      <label>Phone Number *</label>
                      <input
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={updateForm}
                        placeholder="+855 12 345 678"
                        required
                      />
                    </div>

                    <div className="order-field">
                      <label>Email Address *</label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={updateForm}
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="order-field">
                    <label>Address *</label>
                    <input
                      name="address"
                      value={form.address}
                      onChange={updateForm}
                      placeholder="House number, street, village"
                      required
                    />
                  </div>

                  <div className="order-field-grid">
                    <div className="order-field">
                      <label>City / Province *</label>
                      <select
                        name="province"
                        value={form.province}
                        onChange={updateForm}
                        required
                      >
                        <option value="">Select province</option>
                        <option>Phnom Penh</option>
                        <option>Kandal</option>
                        <option>Siem Reap</option>
                        <option>Battambang</option>
                        <option>Kampong Cham</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div className="order-field">
                      <label>Postcode *</label>
                      <input
                        name="postcode"
                        value={form.postcode}
                        onChange={updateForm}
                        placeholder="e.g. 12000"
                        required
                      />
                    </div>
                  </div>
                </section>

                <section className="order-card">
                  <div className="section-heading">
                    <span className="section-icon">
                      <Icon name="leaf" />
                    </span>
                    <div>
                      <h2>Delivery Method</h2>
                      <p>Choose how you want your order delivered</p>
                    </div>
                  </div>

                  <label className={`choice-card ${delivery === "standard" ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name="delivery"
                      checked={delivery === "standard"}
                      onChange={() => setDelivery("standard")}
                    />
                    <span className="choice-icon">
                      <Icon name="leaf" />
                    </span>
                    <span className="choice-details">
                      <strong>Standard Delivery</strong>
                      <small>3–5 business days</small>
                    </span>
                    <strong>$3.00</strong>
                  </label>

                  <label className={`choice-card ${delivery === "pickup" ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name="delivery"
                      checked={delivery === "pickup"}
                      onChange={() => setDelivery("pickup")}
                    />
                    <span className="choice-icon">
                      <Icon name="home" />
                    </span>
                    <span className="choice-details">
                      <strong>Pick Up at Store</strong>
                      <small>Collect your order from our store</small>
                    </span>
                    <strong>Free</strong>
                  </label>
                </section>
              </>
            )}

            {step === 2 && (
              <section className="order-card">
                <div className="section-heading">
                  <span className="section-icon">
                    <Icon name="card" />
                  </span>
                  <div>
                    <h2>Payment Method</h2>
                    <p>Select your preferred payment method</p>
                  </div>
                </div>

                {[
                  ["card", "Credit / Debit Card", "VISA · Mastercard"],
                  ["aba", "ABA Bank", "ABA"],
                  ["cod", "Cash on Delivery", "Pay upon delivery"],
                ].map(([value, label, detail]) => (
                  <label
                    className={`choice-card ${payment === value ? "selected" : ""}`}
                    key={value}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={payment === value}
                      onChange={() => setPayment(value)}
                    />
                    <span className="choice-icon">
                      <Icon name="card" />
                    </span>
                    <span className="choice-details">
                      <strong>{label}</strong>
                      <small>{detail}</small>
                    </span>
                  </label>
                ))}

                <p className="payment-note">
                  This is a front-end demo. No payment will be
                  processed.
                </p>
              </section>
            )}

            {step === 3 && (
              <section className="order-card">
                <div className="section-heading">
                  <span className="section-icon">
                    <Icon name="check" />
                  </span>
                  <div>
                    <h2>Review & Confirm</h2>
                    <p>Please check your details before continuing.</p>
                  </div>
                </div>

                <div className="review-section">
                  <h3>Delivery Address</h3>
                  <p>{form.name}</p>
                  <p>{form.phone}</p>
                  <p>{form.email}</p>
                  <p>
                    {form.address}, {form.province}, {form.postcode}
                  </p>
                </div>

                <div className="review-section">
                  <h3>Delivery & Payment</h3>
                  <p>
                    {delivery === "standard"
                      ? "Standard Delivery · $3.00"
                      : "Pick Up at Store · Free"}
                  </p>
                  <p>
                    Payment:{" "}
                    {payment === "card"
                      ? "Credit / Debit Card"
                      : payment === "aba"
                      ? "ABA Bank"
                      : "Cash on Delivery"}
                  </p>
                </div>

                <p className="payment-note">
                  Demo only: confirming displays your order details
                  but does not submit an order to a server.
                </p>
              </section>
            )}

            <section className="order-card payment-card">
              <div className="section-heading">
                <span className="section-icon">
                  <Icon name="heart" />
                </span>
                <div>
                  <h2>Shop With Confidence</h2>
                  <p>We care about your beauty and your experience.</p>
                </div>
              </div>
              <div className="trust-grid">
                <span>
                  <Icon name="leaf" /> <small>Natural beauty</small>
                </span>
                <span>
                  <Icon name="refresh" /> <small>Easy returns</small>
                </span>
                <span>
                  <Icon name="heart" /> <small>Customer care</small>
                </span>
              </div>
            </section>

            <div className="order-actions">
              {step > 1 && (
                <button
                  type="button"
                  className="back-button"
                  onClick={() => setStep(step - 1)}
                >
                  <Icon name="arrowLeft" size="14px" /> Back
                </button>
              )}

              <button
                type="submit"
                className="continue-button"
                disabled={products.length === 0}
              >
                {step === 1 ? (
                  <>
                    Continue to Payment <Icon name="arrowRight" size="14px" />
                  </>
                ) : step === 2 ? (
                  <>
                    Review Order <Icon name="arrowRight" size="14px" />
                  </>
                ) : (
                  <>
                    Confirm Order <Icon name="check" size="14px" />
                  </>
                )}
              </button>
            </div>
          </div>

          <aside className="order-summary">
            <div className="summary-heading">
              <h2>
                <Icon name="leaf" /> Order Summary
              </h2>
              <span>{products.length} items</span>
            </div>

            {products.map((product) => (
              <div className="summary-product" key={product.id}>
                <img src={product.image} alt={product.name} />

                <div className="summary-product-info">
                  <div className="product-title-row">
                    <strong>{product.name}</strong>
                    <button
                      type="button"
                      className="remove-product"
                      aria-label={`Remove ${product.name}`}
                      onClick={() => removeProduct(product.id)}
                    >
                      <Icon name="close" size="16px" />
                    </button>
                  </div>

                  <small>{product.description}</small>
                  <strong>${product.price.toFixed(2)}</strong>

                  <div className="quantity-control">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => changeQuantity(product.id, -1)}
                    >
                      <Icon name="minus" size="14px" />
                    </button>
                    <span>{product.quantity}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => changeQuantity(product.id, 1)}
                    >
                      <Icon name="plus" size="14px" />
                    </button>
                  </div>
                </div>

                <strong className="product-line-total">
                  ${(product.price * product.quantity).toFixed(2)}
                </strong>
              </div>
            ))}

            {products.length === 0 && (
              <p className="empty-order">
                Your order is empty. Return to the shop to add products.
              </p>
            )}

            <div className="summary-totals">
              <div>
                <span>Subtotal</span>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>
              <div>
                <span>Shipping</span>
                <strong>${shipping.toFixed(2)}</strong>
              </div>
              <div>
                <span>Tax</span>
                <strong>$0.00</strong>
              </div>
              <div className="grand-total">
                <span>Total</span>
                <strong>${total.toFixed(2)}</strong>
              </div>
            </div>

            <div className="secure-note">
              <span>
                <Icon name="check" />
              </span>
              <div>
                <strong>Your information is safe</strong>
                <small>Checkout design demo · No real payment</small>
              </div>
            </div>

            <div className="summary-benefits">
              <span>
                <Icon name="leaf" /> <small>Beauty care</small>
              </span>
              <span>
                <Icon name="refresh" /> <small>Easy returns</small>
              </span>
              <span>
                <Icon name="heart" /> <small>Natural products</small>
              </span>
            </div>
          </aside>
        </form>
      </main>
    </div>
  );
}

export default Order;