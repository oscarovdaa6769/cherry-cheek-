
import { useMemo, useState } from "react";
import {
  Truck,
  MapPin,
  CreditCard,
  Store,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  X,
  TicketPercent,
} from "lucide-react";
import "./Checkout.css";

const initialProducts = [
  {
    id: 1,
    name: "Rom&nd Juicy Lasting Tint",
    detail: "#06 Figfig",
    price: 12,
    image:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=180&h=180&fit=crop",
    quantity: 1,
  },
  {
    id: 2,
    name: "3CE Take A Layer Multi Pot",
    detail: "#Rosy",
    price: 18,
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=180&h=180&fit=crop",
    quantity: 1,
  },
  {
    id: 3,
    name: "SKIN1004 Madagascar Centella",
    detail: "Toning Toner",
    price: 16,
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=180&h=180&fit=crop",
    quantity: 1,
  },
];

const paymentMethods = [
  { id: "card", title: "Credit / Debit Card", detail: "Visa, Mastercard, JCB" },
  { id: "aba", title: "ABA PAY", detail: "ABA Mobile" },
  { id: "cash", title: "Cash on Delivery", detail: "Pay when you receive" },
  { id: "bank", title: "Bank Transfer", detail: "Direct bank transfer" },
];

export default function Checkout() {
  const [products, setProducts] = useState(initialProducts);
  const [delivery, setDelivery] = useState("standard");
  const [payment, setPayment] = useState("card");
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [message, setMessage] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postal: "",
  });

  const subtotal = useMemo(
    () =>
      products.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
      ),
    [products]
  );

  const deliveryFee = delivery === "standard" ? 2.5 : 0;
  const total = Math.max(0, subtotal + deliveryFee - discount);
  const itemCount = products.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  function updateForm(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function updateQuantity(id, amount) {
    setProducts((current) =>
      current
        .map((product) =>
          product.id === id
            ? {
                ...product,
                quantity: product.quantity + amount,
              }
            : product
        )
        .filter((product) => product.quantity > 0)
    );

    setDiscount(0);
    setMessage("");
  }

  function removeProduct(id) {
    setProducts((current) =>
      current.filter((product) => product.id !== id)
    );
    setDiscount(0);
    setMessage("");
  }

  function applyPromo(event) {
    event.preventDefault();

    if (!products.length) {
      setMessage("Your cart is empty.");
      return;
    }

    if (promo.trim().toUpperCase() === "BEAUTY10") {
      setDiscount(Number((subtotal * 0.1).toFixed(2)));
      setMessage("BEAUTY10 applied successfully!");
    } else {
      setDiscount(0);
      setMessage("Invalid code. Try BEAUTY10.");
    }
  }

  function placeOrder(event) {
    event.preventDefault();

    if (!products.length) {
      setMessage("Please add products to your cart.");
      return;
    }

    setMessage("");
    setOrderPlaced(true);
  }

  if (orderPlaced) {
    return (
      <main className="checkout-page">
        <section className="checkout-success">
          <div className="success-icon">
            <ShieldCheck size={40} />
          </div>

          <p className="checkout-eyebrow">CHERRY CHEEK</p>
          <h1>Thank You!</h1>
          <p>
            Your checkout details have been submitted.
            Connect a backend and payment gateway to confirm
            and save real orders.
          </p>

          <div className="success-total">
            Total: ${total.toFixed(2)}
          </div>

          <button
            type="button"
            className="checkout-primary-button"
            onClick={() => {
              setOrderPlaced(false);
              setProducts(initialProducts);
              setForm({
                name: "",
                phone: "",
                email: "",
                address: "",
                city: "",
                postal: "",
              });
              setDiscount(0);
              setPromo("");
              setMessage("");
            }}
          >
            Continue Shopping <ArrowRight size={17} />
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        {/* Page heading */}
        <div className="checkout-page-heading">
          <p className="checkout-eyebrow">YOUR BEAUTY, YOUR WAY</p>
          <h1>Checkout</h1>
          <p>Almost yours. Let's get your beauty essentials to you.</p>
        </div>

       

        <form className="checkout-layout" onSubmit={placeOrder}>
          {/* LEFT: Checkout form */}
          <div className="checkout-main">
            {/* Shipping */}
            <section className="checkout-card">
              <div className="checkout-section-title">
                <div className="checkout-section-icon">
                  <Truck size={23} />
                </div>

                <div>
                  <h2>Shipping Information</h2>
                  <p>Please enter your shipping details.</p>
                </div>
              </div>

              <div className="checkout-form-grid">
                <label className="checkout-field">
                  <span>Full Name <b>*</b></span>
                  <input
                    name="name"
                    value={form.name}
                    onChange={updateForm}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    required
                  />
                </label>

                <label className="checkout-field">
                  <span>Phone Number <b>*</b></span>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={updateForm}
                    placeholder="+855 12 345 678"
                    autoComplete="tel"
                    required
                  />
                </label>

                <label className="checkout-field full-width">
                  <span>Email Address</span>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={updateForm}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </label>

                <label className="checkout-field full-width">
                  <span>Address <b>*</b></span>
                  <input
                    name="address"
                    value={form.address}
                    onChange={updateForm}
                    placeholder="House number, street, building"
                    autoComplete="street-address"
                    required
                  />
                </label>

                <label className="checkout-field">
                  <span>City / Province <b>*</b></span>
                  <input
                    name="city"
                    value={form.city}
                    onChange={updateForm}
                    placeholder="e.g. Phnom Penh"
                    autoComplete="address-level2"
                    required
                  />
                </label>

                <label className="checkout-field">
                  <span>Postal Code</span>
                  <input
                    name="postal"
                    value={form.postal}
                    onChange={updateForm}
                    placeholder="Enter postal code"
                    autoComplete="postal-code"
                  />
                </label>
              </div>
            </section>

            {/* Delivery */}
            <section className="checkout-card">
              <div className="checkout-section-title">
                <div className="checkout-section-icon">
                  <MapPin size={23} />
                </div>

                <div>
                  <h2>Delivery Method</h2>
                  <p>Choose how you want your order delivered.</p>
                </div>
              </div>

              <div className="checkout-delivery-grid">
                <label
                  className={`checkout-choice ${
                    delivery === "standard" ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    value="standard"
                    checked={delivery === "standard"}
                    onChange={(event) => setDelivery(event.target.value)}
                  />

                  <Truck size={24} />

                  <span className="checkout-choice-info">
                    <strong>Standard Delivery</strong>
                    <small>3–5 business days</small>
                  </span>

                  <strong className="checkout-choice-price">$2.50</strong>
                </label>

                <label
                  className={`checkout-choice ${
                    delivery === "pickup" ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    value="pickup"
                    checked={delivery === "pickup"}
                    onChange={(event) => setDelivery(event.target.value)}
                  />

                  <Store size={24} />

                  <span className="checkout-choice-info">
                    <strong>Pick Up at Store</strong>
                    <small>Collect your order in person</small>
                  </span>

                  <strong className="checkout-choice-price">Free</strong>
                </label>
              </div>
            </section>

            {/* Payment */}
            <section className="checkout-card">
              <div className="checkout-section-title">
                <div className="checkout-section-icon">
                  <CreditCard size={23} />
                </div>

                <div>
                  <h2>Payment Method</h2>
                  <p>Select your preferred payment method.</p>
                </div>
              </div>

              <div className="checkout-payment-grid">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`checkout-payment-option ${
                      payment === method.id ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={payment === method.id}
                      onChange={(event) => setPayment(event.target.value)}
                    />

                    <CreditCard size={23} />

                    <strong>{method.title}</strong>
                    <small>{method.detail}</small>
                  </label>
                ))}
              </div>

              <p className="checkout-payment-note">
                {payment === "cash"
                  ? "Pay when your order is delivered."
                  : payment === "pickup"
                    ? "Choose a pickup location with your store."
                    : payment === "aba"
                      ? "ABA Pay requires payment-provider integration."
                      : payment === "bank"
                        ? "Bank transfer instructions must be provided by the store."
                        : "Secure card processing requires a payment gateway."}
              </p>
            </section>

            {message && (
              <p className="checkout-message" role="status">
                {message}
              </p>
            )}

            {/* Actions */}
            <div className="checkout-actions">
              <a href="/Cart" className="checkout-back-link">
                <ArrowLeft size={17} />
                Back to Cart
              </a>

              <button
                type="submit"
                className="checkout-primary-button"
                disabled={!products.length}
              >
                Continue to Payment
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* RIGHT: Order summary */}
          <aside className="checkout-summary">
            <div className="checkout-summary-heading">
              <h2>Order Summary</h2>
              <span>{itemCount} items</span>
            </div>

            <div className="checkout-products">
              {products.map((product) => (
                <article className="checkout-product" key={product.id}>
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                  />

                  <div className="checkout-product-info">
                    <strong>{product.name}</strong>
                    <small>{product.detail}</small>

                    <div className="checkout-quantity">
                      <button
                        type="button"
                        aria-label={`Decrease ${product.name} quantity`}
                        disabled={product.quantity <= 1}
                        onClick={() => updateQuantity(product.id, -1)}
                      >
                        <Minus size={13} />
                      </button>

                      <span>{product.quantity}</span>

                      <button
                        type="button"
                        aria-label={`Increase ${product.name} quantity`}
                        onClick={() => updateQuantity(product.id, 1)}
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>

                  <div className="checkout-product-end">
                    <button
                      type="button"
                      className="checkout-remove"
                      aria-label={`Remove ${product.name}`}
                      onClick={() => removeProduct(product.id)}
                    >
                      <X size={16} />
                    </button>

                    <strong>
                      ${(product.price * product.quantity).toFixed(2)}
                    </strong>
                  </div>
                </article>
              ))}

              {products.length === 0 && (
                <p className="checkout-empty">
                  Your cart is empty. Add some beauty essentials!
                </p>
              )}
            </div>

            {/* Promo code */}
            <form className="checkout-promo" onSubmit={applyPromo}>
              <label htmlFor="checkout-promo">
                <TicketPercent size={16} />
                Discount Code
              </label>

              <div className="checkout-promo-input">
                <input
                  id="checkout-promo"
                  value={promo}
                  onChange={(event) => setPromo(event.target.value)}
                  placeholder="Enter discount code"
                />
                <button type="submit">Apply</button>
              </div>

              <small>Try BEAUTY10 for 10% off.</small>
            </form>

            {/* Totals */}
            <div className="checkout-totals">
              <div>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div>
                <span>Delivery Fee</span>
                <span>
                  {deliveryFee === 0 ? "Free" : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>

              <div className="checkout-discount">
                <span>Discount</span>
                <span>-${discount.toFixed(2)}</span>
              </div>

              <div className="checkout-total">
                <strong>Total</strong>
                <strong>${total.toFixed(2)}</strong>
              </div>
            </div>

            {/* Security notice */}
            <div className="checkout-security">
              <ShieldCheck size={26} />

              <div>
                <strong>Your information is safe and secure</strong>
                <p>
                  Your personal details should be protected during checkout.
                </p>
              </div>
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
}
