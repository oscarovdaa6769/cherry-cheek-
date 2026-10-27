import { useState } from "react";
import "./Order.css";

// ---------- All icons in one place ----------
const ICON_PATHS = {
  card:
    "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z",
  check: "m4.5 12.75 6 6 9-13.5",
  box: "m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9",
  pin: "M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z",
  search:
    "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z",
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
  const [delivery, setDelivery] = useState("standard"); // "standard" | "pickup"
  const [payment, setPayment] = useState("card");
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    province: "",
    postcode: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const subtotal = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  const shipping = delivery === "standard" ? 3 : 0;
  const discount = 0;
  const total = subtotal + shipping - discount;

  function updateForm(event) {
    const { name, value } = event.target;
    let next = value;

    if (name === "cardNumber") {
      next = value
        .replace(/\D/g, "")
        .slice(0, 16)
        .replace(/(.{4})/g, "$1 ")
        .trim();
    }

    if (name === "expiry") {
      const digits = value.replace(/\D/g, "").slice(0, 4);
      next =
        digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
    }

    if (name === "cvc") {
      next = value.replace(/\D/g, "").slice(0, 4);
    }

    setForm((current) => ({ ...current, [name]: next }));
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
                    <h2>Deliver</h2>
                  </div>

                  <div className="delivery-toggle">
                    <button
                      type="button"
                      className={`delivery-option ${
                        delivery === "standard" ? "active" : ""
                      }`}
                      onClick={() => setDelivery("standard")}
                    >
                      <Icon name="box" size="20px" /> Deliver It
                    </button>

                    <button
                      type="button"
                      className={`delivery-option ${
                        delivery === "pickup" ? "active" : ""
                      }`}
                      onClick={() => setDelivery("pickup")}
                    >
                      <Icon name="pin" size="20px" /> Pick It Up
                    </button>
                  </div>

                  <p className="delivery-note">
                    {delivery === "standard"
                      ? "Standard Delivery · 3–5 business days · $3.00"
                      : "Collect your order from our store · Free"}
                  </p>
                </section>

                <section className="order-card">
                  <div className="section-heading">
                    <h2>Shipping Information</h2>
                  </div>

                  <div className="order-field">
                    <label htmlFor="name">Full Name</label>
                    <input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={updateForm}
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div className="order-field-grid">
                    <div className="order-field">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={updateForm}
                        placeholder="+855 12 345 678"
                        required
                      />
                    </div>

                    <div className="order-field">
                      <label htmlFor="email">Email Address</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={updateForm}
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>

                  {delivery === "standard" && (
                    <>
                      <div className="order-field">
                        <label htmlFor="address">Address</label>
                        <div className="input-with-icon">
                          <input
                            id="address"
                            name="address"
                            value={form.address}
                            onChange={updateForm}
                            placeholder="House number, street, village"
                            required
                          />
                          <Icon name="search" size="18px" />
                        </div>
                      </div>

                      <div className="order-field-grid">
                        <div className="order-field">
                          <label htmlFor="province">City / Province</label>
                          <select
                            id="province"
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
                          <label htmlFor="postcode">Postcode</label>
                          <input
                            id="postcode"
                            name="postcode"
                            value={form.postcode}
                            onChange={updateForm}
                            placeholder="e.g. 12000"
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}
                </section>
              </>
            )}

            {step === 2 && (
              <section className="order-card">
                <div className="section-heading">
                  <h2>Payment</h2>
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

                {payment === "card" && (
                  <div className="card-fields">
                    <div className="order-field">
                      <label htmlFor="cardName">Cardholder Name</label>
                      <input
                        id="cardName"
                        name="cardName"
                        value={form.cardName}
                        onChange={updateForm}
                        placeholder="Name on card"
                        required
                      />
                    </div>

                    <div className="order-field">
                      <label htmlFor="cardNumber">Card Number</label>
                      <input
                        id="cardNumber"
                        name="cardNumber"
                        inputMode="numeric"
                        value={form.cardNumber}
                        onChange={updateForm}
                        placeholder="0000 0000 0000 0000"
                        required
                      />
                    </div>

                    <div className="order-field-grid">
                      <div className="order-field">
                        <label htmlFor="expiry">MM/YY</label>
                        <input
                          id="expiry"
                          name="expiry"
                          inputMode="numeric"
                          value={form.expiry}
                          onChange={updateForm}
                          placeholder="00/00"
                          required
                        />
                      </div>

                      <div className="order-field">
                        <label htmlFor="cvc">Security Code</label>
                        <input
                          id="cvc"
                          name="cvc"
                          inputMode="numeric"
                          value={form.cvc}
                          onChange={updateForm}
                          placeholder="000"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                <p className="payment-note">
                  This is a front-end demo. No payment will be
                  processed.
                </p>
              </section>
            )}

            {step === 3 && (
              <section className="order-card">
                <div className="section-heading">
                  <h2>Review & Confirm</h2>
                  <p>Please check your details before continuing.</p>
                </div>

                <div className="review-section">
                  <h3>{delivery === "standard" ? "Delivery Address" : "Contact"}</h3>
                  <p>{form.name}</p>
                  <p>{form.phone}</p>
                  <p>{form.email}</p>
                  {delivery === "standard" && (
                    <p>
                      {form.address}, {form.province}, {form.postcode}
                    </p>
                  )}
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
                      ? `Credit / Debit Card${
                          form.cardNumber
                            ? ` · •••• ${form.cardNumber.slice(-4)}`
                            : ""
                        }`
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
                    Place Order <Icon name="check" size="14px" />
                  </>
                )}
              </button>
            </div>
          </div>

          <aside className="order-summary">
            <h2 className="summary-title">Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Discount</span>
              <span>${discount.toFixed(2)}</span>
            </div>
            <div className="summary-row grand-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            {products.length === 0 && (
              <p className="summary-empty">
                Your order is empty. Return to the shop to add products.
              </p>
            )}

            {products.map((product) => (
              <div className="summary-item" key={product.id}>
                <img src={product.image} alt={product.name} />

                <div className="summary-item-info">
                  <p className="summary-item-name">{product.name}</p>
                  <p className="summary-item-desc">{product.description}</p>
                  <p className="summary-item-price">
                    ${(product.price * product.quantity).toFixed(2)}
                  </p>

                  <div className="qty">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => changeQuantity(product.id, -1)}
                    >
                      <Icon name="minus" size="12px" />
                    </button>
                    <span>{product.quantity}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => changeQuantity(product.id, 1)}
                    >
                      <Icon name="plus" size="12px" />
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className="remove-item"
                  aria-label={`Remove ${product.name}`}
                  onClick={() => removeProduct(product.id)}
                >
                  <Icon name="close" size="16px" />
                </button>
              </div>
            ))}

            <div className="secure-note">
              <span>
                <Icon name="check" />
              </span>
              <div>
                <strong>Your information is safe</strong>
                <small>Checkout design demo · No real payment</small>
              </div>
            </div>
          </aside>
        </form>
      </main>
    </div>
  );
}

export default Order;