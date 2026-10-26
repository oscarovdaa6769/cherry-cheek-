import { useState } from "react";
import "./Order.css";

const initialProducts = [
  {
    id: 1,
    name: "Hydrating Face Cream",
    price: 18,
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=300&auto=format&fit=crop",
    quantity: 1,
  },
  {
    id: 2,
    name: "Rose Lipstick",
    price: 16,
    image:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&auto=format&fit=crop",
    quantity: 1,
  },
  {
    id: 3,
    name: "Vitamin C Sheet Mask",
    price: 12,
    image:
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=300&auto=format&fit=crop",
    quantity: 1,
  },
];

const DELIVERY_FEE = 2;

function Order() {
  const [products, setProducts] = useState(initialProducts);
  const [delivery, setDelivery] = useState("deliver"); // "deliver" | "pickup"

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  /* ----- Totals ----- */
  const subtotal = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
  const deliveryFee = delivery === "deliver" ? DELIVERY_FEE : 0;
  const discount = 0;
  const total = subtotal + deliveryFee - discount;

  /* ----- Form handling ----- */
  function handleChange(event) {
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
      next = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
    }

    if (name === "cvc") {
      next = value.replace(/\D/g, "").slice(0, 4);
    }

    if (name === "phone") {
      next = value.replace(/[^\d+\s]/g, "");
    }

    setForm((current) => ({ ...current, [name]: next }));
  }

  /* ----- Cart handling ----- */
  function changeQuantity(id, amount) {
    setProducts((current) =>
      current.map((product) =>
        product.id === id
          ? { ...product, quantity: Math.max(1, product.quantity + amount) }
          : product
      )
    );
  }

  function removeProduct(id) {
    setProducts((current) => current.filter((product) => product.id !== id));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (products.length === 0) {
      alert("Your order is empty.");
      return;
    }

    alert(
      `Order placed!\nName: ${form.firstName} ${form.lastName}\nMethod: ${
        delivery === "deliver" ? "Delivery" : "Pick up"
      }\nTotal: $${total.toFixed(2)}`
    );
  }

  return (
    <div className="checkout-page">
      <form className="checkout-layout" onSubmit={handleSubmit}>
        {/* ---------- LEFT: form ---------- */}
        <div className="checkout-left">
          <div className="checkout-form">
            <h2 className="checkout-heading">Deliver</h2>

            <div className="delivery-toggle">
              <button
                type="button"
                className={`delivery-option ${
                  delivery === "deliver" ? "active" : ""
                }`}
                onClick={() => setDelivery("deliver")}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                </svg>
                Deliver It
              </button>

              <button
                type="button"
                className={`delivery-option ${
                  delivery === "pickup" ? "active" : ""
                }`}
                onClick={() => setDelivery("pickup")}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                Pick It Up
              </button>
            </div>

            <div className="field">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First name"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last name"
                required
              />
            </div>

            {delivery === "deliver" && (
              <div className="field">
                <label htmlFor="address">Address</label>
                <div className="input-with-icon">
                  <input
                    id="address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="House number, street, city"
                    required
                  />
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </div>
              </div>
            )}

            <div className="field">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+855 12 345 6789"
                required
              />
            </div>

            <h2 className="checkout-heading payment-heading">Payment</h2>

            <div className="field">
              <label htmlFor="cardName">Cardholder Name</label>
              <input
                id="cardName"
                name="cardName"
                value={form.cardName}
                onChange={handleChange}
                placeholder="Name on card"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                id="cardNumber"
                name="cardNumber"
                inputMode="numeric"
                value={form.cardNumber}
                onChange={handleChange}
                placeholder="0000 0000 0000 0000"
                required
              />
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="expiry">MM/YY</label>
                <input
                  id="expiry"
                  name="expiry"
                  inputMode="numeric"
                  value={form.expiry}
                  onChange={handleChange}
                  placeholder="00/00"
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="cvc">Security Code</label>
                <input
                  id="cvc"
                  name="cvc"
                  inputMode="numeric"
                  value={form.cvc}
                  onChange={handleChange}
                  placeholder="000"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="place-order"
              disabled={products.length === 0}
            >
              Place Order
            </button>
          </div>
        </div>

        {/* ---------- RIGHT: order summary ---------- */}
        <aside className="checkout-right">
          <div className="summary">
            <h2 className="summary-title">Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Discount</span>
              <span>${discount.toFixed(2)}</span>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            {products.length === 0 && (
              <p className="summary-empty">
                Your order is empty. Go back to the shop to add products.
              </p>
            )}

            {products.map((product) => (
              <div className="summary-item" key={product.id}>
                <img src={product.image} alt={product.name} />

                <div className="summary-item-info">
                  <p className="summary-item-name">{product.name}</p>
                  <p className="summary-item-price">
                    ${(product.price * product.quantity).toFixed(2)}
                  </p>

                  <div className="qty">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => changeQuantity(product.id, -1)}
                    >
                      −
                    </button>
                    <span>{product.quantity}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => changeQuantity(product.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className="remove-item"
                  aria-label={`Remove ${product.name}`}
                  onClick={() => removeProduct(product.id)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </aside>
      </form>
    </div>
  );
}

export default Order;