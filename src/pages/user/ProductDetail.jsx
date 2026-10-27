import "../../App.css";
import { Icon } from "@iconify/react";
import Btn from "../../components/common/Button";
import Review from "../../components/common/Review";
import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import "./ProductDetail.css";
import productsData from '../../data/products.json';

export default function ProductDetail() {
    const navigate = useNavigate();
    const { id: paramId } = useParams();
    const [searchParams] = useSearchParams();
    
    // Read product ID either from URL query string ?id=X or param /:id
    const productId = Number(paramId || searchParams.get('id')) || 1;
    const product = productsData.find((p) => p.id === productId) || productsData[0];

    const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '50ml');
    const [quantity, setQuantity] = useState(1);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const [isWishlisted, setIsWishlisted] = useState(() => {
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        return savedWishlist.includes(product.id);
    });

    useEffect(() => {
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setIsWishlisted(savedWishlist.includes(product.id));
        if (product.sizes?.length > 0) {
            setSelectedSize(product.sizes[0]);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [product.id]);

    const handleWishlist = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);

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

        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    };

    const handleAddToCart = () => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingIndex = savedCart.findIndex(item => item.id === product.id);

        if (existingIndex > -1) {
            savedCart[existingIndex].quantity += quantity;
        } else {
            savedCart.push({
                id: product.id,
                title: product.prodName,
                category: product.prodCate,
                price: product.prodPrice,
                image: product.image,
                quantity: quantity
            });
        }

        localStorage.setItem('cart', JSON.stringify(savedCart));
        setToastMessage('Added to cart');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <main className="container" style={{ paddingBottom: '60px' }}>
            <div className="product-detail-header">
                <div>
                    <Btn name="Back" onClick={() => navigate(-1)} />
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
                            <Review rating={product.prodRev?.rating || 5} />
                            <span className="review-count">{product.prodRev?.count || 0} reviews</span>
                        </div>

                        <div className="product-price-wrapper">
                            <span className="product-detail-price">{product.prodPrice}</span>
                            {product.prodOldPrice && <span className="product-old-price">{product.prodOldPrice}</span>}
                            {product.prodDiscount && <span className="discount-badge">{product.prodDiscount}</span>}
                        </div>

                        <p className="product-description">{product.prodDesc}</p>

                        {product.sizes && product.sizes.length > 0 && (
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
                        )}

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

                            <button type="button" className="add-to-cart-btn" onClick={handleAddToCart}>
                                ADD TO CART
                            </button>

                            <button type="button" className={`wishlist-btn ${isWishlisted ? 'active' : ''}`} aria-label="Save to wishlist" onClick={handleWishlist}>
                                <Icon icon={isWishlisted ? "solar:heart-bold" : "solar:heart-linear"} />
                            </button>
                        </div>

                        {showToast && (
                            <div className="wishlist-toast">
                                <Icon icon="solar:check-circle-bold" />
                                <span>{toastMessage}</span>
                            </div>
                        )}

                        {product.features && product.features.length > 0 && (
                            <div className="product-features-grid">
                                {product.features.map((feat, index) => (
                                    <div key={index} className="feature-card">
                                        <Icon icon={feat.icon} />
                                        <span>{feat.label}</span>
                                    </div>
                                ))}
                            </div>
                        )}

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
    );
}