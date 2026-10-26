import "../../App.css"
import { Icon } from "@iconify/react"
import Btn from "../../components/common/Button"
import Review from "../../components/common/Review"
import { useState, useEffect } from 'react';
import "./ProductDetail.css"
import productsData from '../../data/products.json'
import { useParams } from "react-router-dom";

export default function ProductDetail() {
    const { id } = useParams();
    const product = productsData.find((p) => p.id === Number(id)) || productsData[0];

    const [selectedSize, setSelectedSize] = useState('50ml');
    const [quantity, setQuantity] = useState(1);
    const [showToast, setShowToast] = useState(false);
    
    // Check localStorage on load/route change to see if this product is already wishlisted
    const [isWishlisted, setIsWishlisted] = useState(() => {
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        return savedWishlist.includes(product.id);
    });
    const [toastMessage, setToastMessage] = useState('');

    // Keep wishlist state synced if the product ID changes via route params
    useEffect(() => {
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setIsWishlisted(savedWishlist.includes(product.id));
    }, [product.id]);

    const handleWishlist = () => {
        setShowToast(true);

        setTimeout(() => {
            setShowToast(false);
        }, 3000);

        const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const nextWishlistState = !isWishlisted;
        setIsWishlisted(nextWishlistState);

        let updatedWishlist;
        if (nextWishlistState) {
            updatedWishlist = [...savedWishlist, product.id];
            setToastMessage('Added to your wishlist');
        } else {
            updatedWishlist = savedWishlist.filter(itemId => itemId !== product.id);
            setToastMessage('Removed from your wishlist');
        }

        // Save changes to localStorage so Wishlist.jsx can read them
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    }

    return (
        <main>
            <div className="product-detail-header">
                <div>
                    <Btn name="Back"/>
                </div>
            </div>
            <section className="product-detail-section">
                <div className="product-detail-left">
                    <div className="product-detail-img">
                        <img src={product.image} alt={product.prodName} />
                    </div>
                </div>
                <div className="product-detail-right">
                    <div className="product-detail-context">
                        <span className="product-detail-category">{product.prodCate}</span>
                        
                        <h1 className="product-detail-name">{product.prodName}</h1>
                        
                        <div className="product-detail-review">
                            <Review rating={product.prodRev.rating} />
                            <span className="review-count">{product.prodRev.count} reviews</span>
                        </div>

                        <div className="product-price-wrapper">
                            <span className="product-detail-price">{product.prodPrice}</span>
                            <span className="product-old-price">{product.prodOldPrice}</span>
                            <span className="discount-badge">{product.prodDiscount}</span>
                        </div>

                        <p className="product-description">{product.prodDesc}</p>

                        <div className="product-size-section">
                            <label className="size-label">Size:</label>
                            <div className="size-options">
                                {product.sizes.map((size) => (
                                    <button 
                                        key={size}
                                        type="button"
                                        className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="product-action-row">
                            <div className="quantity-selector">
                                <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                                    <Icon icon="solar:minus-linear" />
                                </button>
                                <span>{quantity}</span>
                                <button type="button" onClick={() => setQuantity(quantity + 1)}>
                                    <Icon icon="solar:add-linear" />
                                </button>
                            </div>

                            <button type="button" className="add-to-cart-btn">
                                ADD TO CART
                            </button>

                            <button type="button" className={`wishlist-btn ${isWishlisted ? 'active' : ''}`} aria-label="Save to wishlist" onClick={handleWishlist}>
                                <Icon icon={isWishlisted ? "solar:heart-bold" : "solar:heart-linear"} />
                            </button>
                            {showToast && (
                                <div className={`wishlist-toast ${isWishlisted ? 'added' : 'removed'}`}>
                                    <Icon 
                                        icon={isWishlisted ? "solar:check-circle-bold" : "solar:minus-circle-bold"} 
                                    />
                                    <span>{toastMessage}</span>
                                </div>
                            )}
                        </div>

                        <div className="product-features-grid">
                            {(product.features || []).map((feat, index) => (
                                <div key={index} className="feature-card">
                                    <Icon icon={feat.icon} />
                                    <span>{feat.label}</span>
                                </div>
                            ))}
                        </div>

                        <div className="product-accordion">
                            <div className="accordion-header">
                                <span>Detail</span>
                                <Icon icon="solar:minus-linear" />
                            </div>
                            <p className="accordion-body">{product.details || product.prodDesc}</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}