import "../../App.css";
import { Icon } from "@iconify/react";
import Btn from "../../components/common/Button";
import Review from "../../components/common/Review";
import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import "./ProductDetail.css";
import productsData from '../../data/cherry-cheek-JSON-Data/products.json';
import categoriesData from '../../data/cherry-cheek-JSON-Data/categories.json';

const categoryMap = categoriesData.reduce((acc, cat) => {
  acc[cat.id] = cat.name;
  return acc;
}, {});

export default function ProductDetail() {
    const navigate = useNavigate();
    const { id: paramId } = useParams();
    const [searchParams] = useSearchParams();
    
    const productId = Number(paramId || searchParams.get('id')) || 101;
    const rawProduct = productsData.find((p) => p.id === productId) || productsData[0];

    // Map new json structure to display properties safely
    const product = {
        id: rawProduct.id,
        title: rawProduct.name,
        category: categoryMap[rawProduct.categoryId] || "Skincare",
        price: `$${Number(rawProduct.price).toFixed(2)}`,
        rawPrice: rawProduct.price,
        image: rawProduct.image || "src/assets/images/fallback.jpg",
        description: `High-quality ${rawProduct.brand} formulation designed for daily radiance and skin barrier protection (SKU: ${rawProduct.sku}).`,
        sizes: ['50ml', '100ml'],
        features: [
            { icon: "solar:leaf-bold-duotone", label: "100% Natural" },
            { icon: "solar:shield-user-bold-duotone", label: "Dermatologist Tested" },
            { icon: "solar:delivery-bold-duotone", label: "Fast Shipping" },
            { icon: "solar:check-circle-bold", label: "Cruelty Free" }
        ],
        details: `Authentic ${rawProduct.name} crafted under strict quality controls. Stock available: ${rawProduct.stockQuantity} units.`
    };

    const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
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
                title: product.title,
                category: product.category,
                price: product.price,
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
                        <img src={product.image} alt={product.title} />
                    </div>
                </div>
                <div className="product-detail-right">
                    <div className="product-detail-context">
                        <span className="product-detail-category">{product.category}</span>
                        
                        <h1 className="product-detail-name">{product.title}</h1>
                        
                        <div className="product-detail-review">
                            <Review rating={5} />
                            <span className="review-count">24 reviews</span>
                        </div>

                        <div className="product-price-wrapper">
                            <span className="product-detail-price">{product.price}</span>
                        </div>

                        <p className="product-description">{product.description}</p>

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

                        <div className="product-features-grid">
                            {product.features.map((feat, index) => (
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
                            <p className="accordion-body">{product.details}</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}