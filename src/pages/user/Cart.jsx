import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Button from '../../components/common/Button';
import './Cart.css';
import '../../App.css';

export default function Cart() {
    const navigate = useNavigate();

    // Initial cart load from localStorage
    const [cartItems, setCartItems] = useState(() => {
        try {
            const savedCart = localStorage.getItem('cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch {
            return [];
        }
    });

    // Save to localStorage whenever cart changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Update Item Quantity
    const updateQuantity = (id, delta) => {
        setCartItems(prev =>
            prev.map(item => {
                if (item.id === id) {
                    const newQty = item.quantity + delta;
                    return newQty > 0 ? { ...item, quantity: newQty } : item;
                }
                return item;
            })
        );
    };

    // Remove Single Item
    const removeItem = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    // Clear Whole Cart
    const clearCart = () => {
        setCartItems([]);
    };

    // Calculate Totals
    const subtotal = cartItems.reduce((acc, item) => {
        const priceNum = parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 0;
        return acc + priceNum * item.quantity;
    }, 0);

    const shipping = subtotal > 50 || cartItems.length === 0 ? 0 : 5.00;
    const total = subtotal + shipping;

    return (
        <main className="cart-page">
            <div className="cart-container">
                
                {/* Header */}
                <div className="cart-header">
                    <Button name="Back" onClick={() => navigate(-1)} />
                    <div className="cart-header-title-group">
                        <h1 className="cart-title">Your Shopping Cart</h1>
                        {cartItems.length > 0 && (
                            <span className="cart-count">({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</span>
                        )}
                    </div>
                </div>

                {/* Empty State */}
                {cartItems.length === 0 ? (
                    <div className="empty-cart-card">
                        <div className="empty-cart-icon-box">
                            <Icon icon="solar:cart-large-minimalistic-linear" className="empty-cart-icon" />
                        </div>
                        <h2>Your cart is empty</h2>
                        <p>Looks like you haven't added any skincare favorites to your cart yet.</p>
                        <button 
                            type="button" 
                            className="continue-shopping-btn"
                            onClick={() => navigate('/products')}
                        >
                            <Icon icon="solar:bag-3-linear" />
                            Explore Products
                        </button>
                    </div>
                ) : (
                    /* Main Cart Content */
                    <div className="cart-layout">
                        
                        {/* Cart Items List */}
                        <div className="cart-items-section">
                            <div className="cart-items-header">
                                <span>Product</span>
                                <button type="button" className="clear-all-btn" onClick={clearCart}>
                                    Clear Cart
                                </button>
                            </div>

                            <div className="cart-items-list">
                                {cartItems.map((item) => {
                                    const priceNum = parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 0;
                                    
                                    return (
                                        <div key={item.id} className="cart-item-card">
                                            <div 
                                                className="cart-item-img-box"
                                                onClick={() => navigate(`/product-detail?id=${item.id}`)}
                                            >
                                                <img src={item.image} alt={item.title || item.prodName} />
                                            </div>

                                            <div className="cart-item-info">
                                                <span className="cart-item-cate">{item.category || item.prodCate}</span>
                                                <h3 className="cart-item-title">{item.title || item.prodName}</h3>
                                                <span className="cart-item-unit-price">{item.price}</span>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="cart-item-controls">
                                                <div className="quantity-selector">
                                                    <button 
                                                        type="button" 
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Icon icon="solar:minus-linear" />
                                                    </button>
                                                    <span>{item.quantity}</span>
                                                    <button 
                                                        type="button" 
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                    >
                                                        <Icon icon="solar:add-linear" />
                                                    </button>
                                                </div>

                                                <span className="cart-item-total-price">
                                                    ${(priceNum * item.quantity).toFixed(2)}
                                                </span>

                                                <button 
                                                    type="button" 
                                                    className="cart-item-remove-btn"
                                                    onClick={() => removeItem(item.id)}
                                                    aria-label="Remove item"
                                                >
                                                    <Icon icon="solar:trash-bin-trash-linear" />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="cart-summary-card">
                            <h2 className="summary-title">Order Summary</h2>

                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>

                            <div className="summary-row">
                                <span>Shipping</span>
                                <span>{shipping === 0 ? <strong className="free-shipping">FREE</strong> : `$${shipping.toFixed(2)}`}</span>
                            </div>

                            {shipping > 0 && (
                                <p className="free-shipping-note">
                                    Add <strong>${(50 - subtotal).toFixed(2)}</strong> more for FREE shipping!
                                </p>
                            )}

                            <div className="summary-divider"></div>

                            <div className="summary-row summary-total">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>

                            <button 
                                type="button" 
                                className="checkout-btn"
                                onClick={() => navigate('/checkout')}
                            >
                                <span>Proceed to Checkout</span>
                                <Icon icon="solar:alt-arrow-right-linear" />
                            </button>

                            <div className="summary-features">
                                <div>
                                    <Icon icon="solar:shield-check-bold-duotone" />
                                    <span>Secure Checkout</span>
                                </div>
                                <div>
                                    <Icon icon="solar:box-bold-duotone" />
                                    <span>Free Returns</span>
                                </div>
                            </div>
                        </div>

                    </div>
                )}

            </div>
        </main>
    );
}