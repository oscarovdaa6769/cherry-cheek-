import { useState } from 'react';
import { Icon } from "@iconify/react";
import Button from '../../components/common/Button'; // Uses your existing Button component
import './Wishlist.css';
import '../../App.css'

// Sample saved wishlist items
const initialWishlist = [
    {
        id: 1,
        name: "Botanical Radiance Facial Serum",
        category: "SKINCARE & HYDRATION",
        price: "$18.00",
        oldPrice: "$20.00",
        img: "/assets/images/product-detail-1.jpg",
        inStock: true
    },
    {
        id: 2,
        name: "Gentle Cleansing Body Wash",
        category: "BODY CARE",
        price: "$24.00",
        oldPrice: "",
        img: "/assets/images/product-detail-2.jpg",
        inStock: true
    }
];

export default function Wishlist() {
    const [wishlist, setWishlist] = useState(initialWishlist);

    const removeItem = (id) => {
        setWishlist(wishlist.filter(item => item.id !== id));
    };

    return (
        <main className="wishlist-page">
            <div className="wishlist-container">
                <div className="wishlist-header">
                    <Button name="Back" />
                    <h1 className="wishlist-title">My Wishlist</h1>
                    <span className="wishlist-count">{wishlist.length} Saved Items</span>
                </div>

                {wishlist.length === 0 ? (
                    <div className="empty-wishlist">
                        <Icon icon="solar:bookmark-linear" className="empty-icon" />
                        <p>Your wishlist is currently empty.</p>
                    </div>
                ) : (
                    <div className="wishlist-grid">
                        {wishlist.map((item) => (
                            <div key={item.id} className="wishlist-card">
                                <button 
                                    className="remove-btn" 
                                    onClick={() => removeItem(item.id)}
                                    aria-label="Remove item"
                                >
                                    <Icon icon="solar:close-circle-bold" />
                                </button>
                                
                                <div className="wishlist-img-box">
                                    <img src={item.img} alt={item.name} />
                                </div>

                                <div className="wishlist-details">
                                    <span className="wishlist-category">{item.category}</span>
                                    <h3 className="wishlist-item-name">{item.name}</h3>
                                    
                                    <div className="wishlist-price-row">
                                        <span className="wishlist-price">{item.price}</span>
                                        {item.oldPrice && (
                                            <span className="wishlist-old-price">{item.oldPrice}</span>
                                        )}
                                    </div>

                                    <Button name="Add to cart" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}