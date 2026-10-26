import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from "@iconify/react";
import Button from '../../components/common/Button'; 
import './Wishlist.css';
import '../../App.css';
import productsData from '../../data/products.json';

export default function Wishlist({ user }) {
    const navigate = useNavigate();

    // Verify both state prop and localStorage
    const getStoredUser = () => {
        try {
            const item = localStorage.getItem('user');
            if (!item || item === 'null' || item === 'undefined' || item === '{}') return null;
            return JSON.parse(item);
        } catch {
            return null;
        }
    };

    const activeUser = user && Object.keys(user).length > 0 ? user : getStoredUser();
    const isLoggedOut = !activeUser || Object.keys(activeUser).length === 0;

    const [wishlist, setWishlist] = useState(() => {
        const savedWishlistIds = JSON.parse(localStorage.getItem('wishlist')) || [];
        return productsData.filter(product => savedWishlistIds.includes(product.id));
    });

    const removeItem = (id) => {
        const updatedWishlist = wishlist.filter(item => item.id !== id);
        setWishlist(updatedWishlist);
        
        const updatedIds = updatedWishlist.map(item => item.id);
        localStorage.setItem('wishlist', JSON.stringify(updatedIds));
    };

    return (
        <main className="wishlist-page">
            <div className="wishlist-container">
                <div className="wishlist-header">
                    <Button name="Back" onClick={() => navigate(-1)} />
                    <div className="wishlist-header-title-group">
                        <h1 className="wishlist-title">My Wishlist</h1>
                        {!isLoggedOut && <span className="wishlist-count">{wishlist.length} Saved Items</span>}
                    </div>
                </div>

                {/* 1. GUEST VIEW */}
                {isLoggedOut ? (
                    <div className="auth-guard-card">
                        <div className="auth-guard-icon-box">
                            <Icon icon="solar:lock-keyhole-bold-duotone" className="auth-guard-icon" />
                        </div>
                        <h2 className="auth-guard-title">Authentication Required</h2>
                        <p className="auth-guard-subtitle">
                            Log in to view your saved favorites, sync your wishlist across devices, and seamlessly add items to your cart.
                        </p>
                        <button 
                            type="button" 
                            className="auth-guard-btn"
                            onClick={() => navigate('/login')}
                        >
                            <Icon icon="solar:login-2-linear" className="btn-icon" />
                            Login to Access Wishlist
                        </button>
                    </div>
                ) : wishlist.length === 0 ? (
                    /* 2. LOGGED-IN BUT EMPTY WISHLIST */
                    <div className="empty-wishlist">
                        <Icon icon="solar:bookmark-linear" className="empty-icon" />
                        <h2>Your wishlist is empty</h2>
                        <p>Explore our products and save your favorites here for quick access later.</p>
                        <button 
                            type="button" 
                            className="browse-products-btn"
                            onClick={() => navigate('/products')}
                        >
                            Explore Products
                        </button>
                    </div>
                ) : (
                    /* 3. LOGGED-IN WITH ITEMS */
                    <div className="wishlist-grid">
                        {wishlist.map((item) => (
                            <div key={item.id} className="wishlist-card">
                                <div className="wishlist-img-box" onClick={() => navigate(`/product-detail?id=${item.id}`)}>
                                    <img src={item.image} alt={item.prodName} />
                                </div>

                                <div className="wishlist-details">
                                    <span className="wishlist-category">{item.prodCate}</span>
                                    <h3 className="wishlist-item-name">{item.prodName}</h3>
                                    
                                    <div className="wishlist-price-row">
                                        <span className="wishlist-price">{item.prodPrice}</span>
                                        {item.prodOldPrice && (
                                            <span className="wishlist-old-price">{item.prodOldPrice}</span>
                                        )}
                                    </div>
                                    <div className="button-container">
                                        <Button name="Add to cart" />
                                        <button 
                                            className="remove-btn" 
                                            onClick={() => removeItem(item.id)}
                                            aria-label="Remove item"
                                        >
                                            <Icon icon="solar:trash-bin-trash-linear" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}