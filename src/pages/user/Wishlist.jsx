import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from "@iconify/react";
import Button from '../../components/common/Button'; // Uses your existing Button component
import './Wishlist.css';
import '../../App.css'
import ProdImg1 from '../../assets/images/product1.jpg'
import ProdImg2 from '../../assets/images/product2.jpg'
import ProdImg3 from '../../assets/images/product3.jpg'
import ProdImg4 from '../../assets/images/product4.jpg'

// Sample saved wishlist items
const initialWishlist = [
    {
        id: 1,
        name: "Botanical Radiance Facial Serum",
        category: "SKINCARE & HYDRATION",
        price: "$18.00",
        oldPrice: "$20.00",
        img: ProdImg1,
        inStock: true
    },
    {
        id: 2,
        name: "Gentle Cleansing Body Wash",
        category: "BODY CARE",
        price: "$24.00",
        oldPrice: "",
        img: ProdImg2,
        inStock: true
    },
    {
        id: 3,
        name: "Hydrating Facial Cleanser",
        category: "SKIN CARE",
        price: "$18.00",
        oldPrice: "$22.00",
        img: ProdImg3,
        inStock: true
    },
    {
        id: 4,
        name: "Vitamin C Brightening Serum",
        category: "SKIN CARE",
        price: "$32.00",
        oldPrice: "",
        img: ProdImg4,
        inStock: true
    },
];

export default function Wishlist() {
    const [wishlist, setWishlist] = useState(initialWishlist);
    const navigate = useNavigate();

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
                                <div className="wishlist-img-box" onClick={() => navigate('/product-detail')}>
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
                                    <div className="button-container">
                                        <Button name="Add to cart" />
                                        <button 
                                            className="remove-btn" 
                                            onClick={() => removeItem(item.id)}
                                            aria-label="Remove item"
                                        >
                                            <Icon icon="at-icons:trash-can" />
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