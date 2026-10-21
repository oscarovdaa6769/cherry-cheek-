import "../../App.css"
import { Icon } from "@iconify/react"
import Btn from "../../components/common/Button"
import Review from "../../components/common/Review"
import { useState } from 'react';
import "./ProductDetail.css"
import productImgFile from "../../assets/images/product-detail-1.jpg"

const ProductDatas = [
    {
        id: 1,
        prodImg: productImgFile,
        prodCate: "SKINCARE & HYDRATION",
        prodName: "Botanical Radiance Facial Serum",
        prodRev: {
            rating: 4,
            count: 214
        },
        prodPrice: "$18.00",
        prodOldPrice: "$20.00",
        prodDiscount: "20%",
        prodDesc: "A lightweight, deeply hydrating facial serum formulated with organic botanical extracts to restore your skin's natural glow, lock in essential moisture, and smooth out fine lines for a radiant, youthful complexion.",
        sizes: ["50ml", "100ml"],
        features: [
            { icon: "solar:dropper-bold", label: "Pure Botanical Extract" },
            { icon: "solar:leaf-bold", label: "100% Organic Formula" },
            { icon: "solar:health-bold", label: "Dermatologist Approved" },
            { icon: "solar:shield-check-bold", label: "Eco-Friendly Packaging" }
        ],
        details: "Formulated with clean, sustainably sourced ingredients. Free from parabens, sulfates, and synthetic fragrances. Suitable for all skin types, including sensitive skin. Apply 3-4 drops morning and evening onto cleansed skin before moisturizing."
    }
];

export default function ProductDetail() {
    const [selectedSize, setSelectedSize] = useState('50ml');
    const [quantity, setQuantity] = useState(1);
    const product = ProductDatas[0];
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
                        <img src={product.prodImg} alt={product.prodName} />
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

                            <button type="button" className="wishlist-btn" aria-label="Save to wishlist">
                                <Icon icon="solar:heart-linear" />
                            </button>
                        </div>

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
    )
}