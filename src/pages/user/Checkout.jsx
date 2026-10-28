import { useMemo, useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import fallbackImg from "../../assets/images/fallback.jpg";
import "./Checkout.css";
import "../../App.css";

const paymentMethods = [
  { id: "card", title: "Credit / Debit Card", detail: "Visa, Mastercard, JCB", icon: "solar:card-bold-duotone" },
  { id: "aba", title: "ABA PAY", detail: "ABA Mobile", icon: "solar:smartphone-bold-duotone" },
  { id: "cash", title: "Cash on Delivery", detail: "Pay when you receive", icon: "solar:wallet-money-bold-duotone" },
  { id: "bank", title: "Bank Transfer", detail: "Direct bank transfer", icon: "solar:buildings-2-bold-duotone" },
];

export default function Checkout() {
  const navigate = useNavigate();

  // Load cart items dynamically from localStorage
  const [products, setProducts] = useState(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      return savedCart.map((item) => ({
        id: item.id,
        name: item.title || item.name || "Cosmetic Product",
        detail: item.category || "Skincare",
        price: typeof item.price === 'number' ? item.price : parseFloat(String(item.price).replace('$', '')) || 0,
        image: item.image || fallbackImg,
        quantity: item.quantity || 1,
      }));
    } catch {
      return [];
    }
  });

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

  // Keep localStorage cart synchronized when quantities or items change
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(products));
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.error("Failed to update cart in localStorage", err);
    }
  }, [products]);

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
            ? { ...product, quantity: product.quantity + amount }
            : product
        )
        .filter((product) => product.quantity > 0)
    );
    setDiscount(0);
    setMessage("");
  }

  function removeProduct(id) {
    setProducts((current) => current.filter((product) => product.id !== id));
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

    // Clear cart upon successful order placement
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("storage"));

    setMessage("");
    setOrderPlaced(true);
  }

  if (orderPlaced) {
    return (
      <main className="checkout-page">
        <section className="checkout-success">
          <div className="success-icon">
            <Icon icon="solar:shield-check-bold-duotone" width="48" />
          </div>

          <p className="checkout-eyebrow">CHERRY CHEEK</p>
          <h1>Thank You For Your Order!</h1>
          <p>
            Your order has been received and is being processed. A confirmation
            email has been sent to your inbox.
          </p>

          <div className="success-total">Total Paid: ${total.toFixed(2)}</div>

          <button
            type="button"
            className="checkout-primary-button"
            onClick={() => {
              setOrderPlaced(false);
              setProducts([]);
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
              navigate("/products");
            }}
          >
            <span>Continue Shopping</span>
            <Icon icon="solar:alt-arrow-right-linear" width="18" />
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        {/* Page Heading */}
        <div className="checkout-page-heading">
          <p className="checkout-eyebrow">YOUR BEAUTY, YOUR WAY</p>
          <h1>Checkout</h1>
          <p>Almost yours. Let's get your beauty essentials to you.</p>
        </div>

        <form className="checkout-layout" onSubmit={placeOrder}>
          {/* LEFT: Checkout Form */}
          <div className="checkout-main">
            {/* Shipping */}
            <section className="checkout-card">
              <div className="checkout-section-title">
                <div className="checkout-section-icon">
                  <Icon icon="solar:delivery-bold-duotone" width="24" />
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
                  <Icon icon="solar:map-point-bold-duotone" width="24" />
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

                  <Icon icon="solar:delivery-bold-duotone" className="choice-icon" width="24" />

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

                  <Icon icon="solar:shop-bold-duotone" className="choice-icon" width="24" />

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
                  <Icon icon="solar:card-bold-duotone" width="24" />
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

                    <Icon icon={method.icon} width="24" className="payment-icon" />

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
                  ? "Bank transfer instructions will be provided after checkout."
                  : "Secure card processing via standard payment gateway."}
              </p>
            </section>

            {message && (
              <p className="checkout-message" role="status">
                {message}
              </p>
            )}

            {/* Actions */}
            <div className="checkout-actions">
              <Link to="/cart" className="checkout-back-link">
                <Icon icon="solar:alt-arrow-left-linear" width="18" />
                <span>Back to Cart</span>
              </Link>

              <button
                type="submit"
                className="checkout-primary-button"
                disabled={!products.length}
              >
                <span>Place Order</span>
                <Icon icon="solar:alt-arrow-right-linear" width="18" />
              </button>
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <aside className="checkout-summary">
            <div className="checkout-summary-heading">
              <h2>Order Summary</h2>
              <span>{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
            </div>

            <div className="checkout-products">
              {products.map((product) => (
                <article className="checkout-product" key={product.id}>
                  <img
                    src={product.image || fallbackImg}
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
                        <Icon icon="solar:minus-linear" width="14" />
                      </button>

                      <span>{product.quantity}</span>

                      <button
                        type="button"
                        aria-label={`Increase ${product.name} quantity`}
                        onClick={() => updateQuantity(product.id, 1)}
                      >
                        <Icon icon="solar:add-linear" width="14" />
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
                      <Icon icon="solar:trash-bin-trash-linear" width="18" />
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

            {/* Promo Code */}
            <div className="checkout-promo">
              <label htmlFor="checkout-promo">
                <Icon icon="solar:sale-square-bold-duotone" width="18" />
                <span>Discount Code</span>
              </label>

              <div className="checkout-promo-input">
                <input
                  id="checkout-promo"
                  value={promo}
                  onChange={(event) => setPromo(event.target.value)}
                  placeholder="Enter discount code"
                />
                <button type="button" onClick={applyPromo}>Apply</button>
              </div>

              <small>Try <strong>BEAUTY10</strong> for 10% off.</small>
            </div>

            {/* Totals */}
            <div className="checkout-totals">
              <div>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div>
                <span>Delivery Fee</span>
                <span>
                  {deliveryFee === 0 ? <strong className="free-tag">Free</strong> : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>

              {discount > 0 && (
                <div className="checkout-discount">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}

              <div className="checkout-total">
                <span>Total</span>
                <strong>${total.toFixed(2)}</strong>
              </div>
            </div>

            {/* Security Notice */}
            <div className="checkout-security">
              <Icon icon="solar:shield-check-bold-duotone" width="28" className="security-icon" />

              <div>
                <strong>Safe &amp; Secure Checkout</strong>
                <p>
                  Your personal information is encrypted and protected.
                </p>
              </div>
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
}