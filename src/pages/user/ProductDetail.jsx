import "../../App.css";
import { Icon } from "@iconify/react";
import Btn from "../../components/common/Button";
import Review from "../../components/common/Review";
import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import "./ProductDetail.css";

export default function ProductDetail() {
    const navigate = useNavigate();
    const { id: paramId } = useParams();
    const [searchParams] = useSearchParams();
    
    const productId = Number(paramId || searchParams.get('id')) || 101;

    // State for asynchronous data loading
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Asynchronously load JSON data using async/await
    useEffect(() => {
        async function loadProductData() {
            try {
                const [prodModule, catModule] = await Promise.all([
                    import('../../data/products.json'),
                    import('../../data/categories.json')
                ]);

                setProducts(prodModule.default || prodModule);
                setCategories(catModule.default || catModule);
            } catch (err) {
                console.error("Error loading JSON via async/await:", err);
            } finally {
                setLoading(false);
            }
        }
        loadProductData();
    }, []);

    const [selectedSize, setSelectedSize] = useState('50ml');
    const [quantity, setQuantity] = useState(1);
    const [toast, setToast] = useState({ show: false, message: '' });

    const [isWishlisted, setIsWishlisted] = useState(() => {
        try {
            return (JSON.parse(localStorage.getItem('wishlist')) || []).includes(productId);
        } catch {
            return false;
        }
    });

    useEffect(() => {
        try {
            const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            setIsWishlisted(wishlist.includes(productId));
        } catch {
            setIsWishlisted(false);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [productId]);

    if (loading) {
        return (
            <main className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
                <p>Loading product details...</p>
            </main>
        );
    }

    const categoryMap = categories.reduce((acc, cat) => {
        acc[cat.id] = cat.name;
        return acc;
    }, {});

    const rawProduct = products.find((p) => p.id === productId) || products[0];

    if (!rawProduct) {
        return (
            <main className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
                <p>Product not found.</p>
            </main>
        );
    }

    const product = {
        id: rawProduct.id,
        title: rawProduct.name,
        category: categoryMap[rawProduct.categoryId] || "Skincare",
        price: `$${Number(rawProduct.price).toFixed(2)}`,
        image: rawProduct.image || "src/assets/images/fallback.jpg",
        description: `High-quality ${rawProduct.brand || 'Cherry Cheeks'} formulation designed for daily radiance and skin barrier protection (SKU: ${rawProduct.sku}).`,
        sizes: ['50ml', '100ml'],
        features: [
            { icon: "solar:leaf-bold-duotone", label: "100% Natural" },
            { icon: "solar:shield-user-bold-duotone", label: "Dermatologist Tested" },
            { icon: "solar:delivery-bold-duotone", label: "Fast Shipping" },
            { icon: "solar:check-circle-bold", label: "Cruelty Free" }
        ],
        details: `Authentic ${rawProduct.name} crafted under strict quality controls. Stock available: ${rawProduct.stockQuantity} units.`
    };

    const triggerToast = (msg) => {
        setToast({ show: true, message: msg });
        setTimeout(() => setToast({ show: false, message: '' }), 3000);
    };

    const handleWishlist = () => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const nextState = !isWishlisted;
        setIsWishlisted(nextState);

        const updated = nextState
            ? [...wishlist, product.id]
            : wishlist.filter(id => id !== product.id);

        localStorage.setItem('wishlist', JSON.stringify(updated));
        triggerToast(nextState ? 'Added to your wishlist' : 'Removed from your wishlist');
    };

    const handleAddToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const index = cart.findIndex(item => item.id === product.id);

        if (index > -1) {
            cart[index].quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                title: product.title,
                category: product.category,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        window.dispatchEvent(new CustomEvent('cart-added', { detail: `Added "${product.title}" to cart!` }));
        window.dispatchEvent(new Event('storage'));
        triggerToast('Added to cart');
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

                        {toast.show && (
                            <div className="wishlist-toast">
                                <Icon icon="solar:check-circle-bold" />
                                <span>{toast.message}</span>
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