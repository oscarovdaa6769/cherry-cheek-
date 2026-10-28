import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Button from '../../components/common/Button';
import productsData from '../../data/products.json';
import categoriesData from '../../data/categories.json';
import './Wishlist.css';
import '../../App.css';

const categoryMap = categoriesData.reduce((acc, cat) => {
    acc[cat.id] = cat.name;
    return acc;
}, {});

const productMap = productsData.reduce((acc, p) => {
    acc[p.id] = p;
    return acc;
}, {});

export default function Wishlist() {
    const navigate = useNavigate();
    const [wishlistItems, setWishlistItems] = useState([]);

    // Load and normalize wishlist items from localStorage (supports both IDs and objects)
    const loadWishlist = () => {
        try {
            const saved = JSON.parse(localStorage.getItem('wishlist')) || [];
            const normalized = saved.map(item => {
                const id = typeof item === 'object' && item !== null ? item.id : item;
                const prod = productMap[id];
                if (prod) {
                    return {
                        id: prod.id,
                        title: prod.name,
                        category: categoryMap[prod.categoryId] || "Skincare",
                        price: `$${Number(prod.price).toFixed(2)}`,
                        image: prod.image || "src/assets/images/fallback.jpg"
                    };
                }
                // Fallback if item is already a well-formed object
                if (typeof item === 'object' && item !== null) {
                    return {
                        id: item.id,
                        title: item.title || item.name,
                        category: item.category || "Skincare",
                        price: typeof item.price === 'number' ? `$${item.price.toFixed(2)}` : item.price,
                        image: item.image || "src/assets/images/fallback.jpg"
                    };
                }
                return null;
            }).filter(Boolean);

            setWishlistItems(normalized);
        } catch (err) {
            console.error("Error loading wishlist", err);
            setWishlistItems([]);
        }
    };

    useEffect(() => {
        loadWishlist();
        window.addEventListener('storage', loadWishlist);
        return () => window.removeEventListener('storage', loadWishlist);
    }, []);

    // Remove single item from wishlist
    const removeItem = (id) => {
        const updated = wishlistItems.filter(item => item.id !== id);
        setWishlistItems(updated);
        localStorage.setItem('wishlist', JSON.stringify(updated.map(i => i.id)));
        window.dispatchEvent(new Event('storage'));
    };

    // Move item directly to cart
    const moveToCart = (item) => {
        try {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existing = cart.find(c => c.id === item.id);
            if (existing) {
                existing.quantity = (existing.quantity || 1) + 1;
            } else {
                cart.push({ ...item, quantity: 1 });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            removeItem(item.id);
            window.dispatchEvent(new Event('storage'));
        } catch (err) {
            console.error("Error moving item to cart", err);
        }
    };

    return (
        <main className="wishlist-page">
            <div className="wishlist-container">
                
                {/* Header */}
                <div className="wishlist-header">
                    <Button name="Back" onClick={() => navigate(-1)} />
                    <div className="wishlist-header-title-group">
                        <h1 className="wishlist-title">My Wishlist</h1>
                        {wishlistItems.length > 0 && (
                            <span className="wishlist-count">({wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'})</span>
                        )}
                    </div>
                </div>

                {/* Empty State */}
                {wishlistItems.length === 0 ? (
                    <div className="empty-wishlist">
                        <Icon icon="solar:heart-angle-linear" className="empty-icon" />
                        <h2>Your wishlist is empty</h2>
                        <p>Save your favorite skincare products here for quick access later.</p>
                        <button 
                            type="button" 
                            className="browse-products-btn"
                            onClick={() => navigate('/products')}
                        >
                            Explore Products
                        </button>
                    </div>
                ) : (
                    /* Wishlist Grid Layout matching Wishlist.css */
                    <div className="wishlist-grid">
                        {wishlistItems.map((item) => (
                            <article key={item.id} className="wishlist-card">
                                <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', top: '10px', right: '10px' }}>
                                    <button 
                                        type="button" 
                                        className="remove-btn"
                                        onClick={() => removeItem(item.id)}
                                        aria-label="Remove item"
                                    >
                                        <Icon icon="solar:trash-bin-trash-linear" />
                                    </button>
                                </div>

                                <div 
                                    className="wishlist-img-box"
                                    onClick={() => navigate(`/product-detail?id=${item.id}`)}
                                >
                                    <img src={item.image} alt={item.title} />
                                </div>

                                <div className="wishlist-details">
                                    <span className="wishlist-category">{item.category}</span>
                                    <h3 className="wishlist-item-name">{item.title}</h3>
                                    <div className="wishlist-price-row">
                                        <span className="wishlist-price">{item.price}</span>
                                    </div>
                                </div>

                                <div className="button-container">
                                    <button 
                                        type="button" 
                                        className="browse-products-btn"
                                        style={{ width: '100%', marginTop: 0 }}
                                        onClick={() => moveToCart(item)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}

            </div>
        </main>
    );
}