import { useState } from "react";
import "./Products.css";
import Card from "../components/Card";

const CATEGORIES = ["All", "Skincare", "Makeup", "Hair Care", "Body Care"];

// Test image. Later, replace it with your own images, for example "/images/cream.jpg"
const sampleImage =
  "https://www.personalcarecouncil.org/wp-content/smush-webp/2025/03/AdobeStock_218950992-square-crop.jpeg.webp";

// ---------- Product data (edit your products here) ----------
const popularProducts = [
  { 
    id: 1, 
    image: sampleImage, 
    category: "Moisturizers", 
    title: "Hydrating Face Cream", 
    price: 25, 
    outOfStock: true },
  { 
    id: 2, 
    image: sampleImage, 
    category: "Face Essentials", 
    title: "Rose Glow Set", 
    price: 32, 
    outOfStock: true },
  { 
    id: 3, 
    image: sampleImage, 
    category: "Cleansers", 
    title: "Nourishing Cleanser", 
    price: 18, 
    outOfStock: true },
  { 
    id: 4, 
    image: sampleImage, 
    category: "Gift Sets", 
    title: "Daily Ritual Set", 
    price: 40 },
];

const skinCareProducts = [
  { 
    id: 5, 
    image: sampleImage, 
    category: "Moisturizers", 
    title: "Hydrating Face Cream", 
    price: 25 },
  { 
    id: 6, 
    image: sampleImage, 
    category: "Face Essentials", 
    title: "Rose Glow Set", 
    price: 32 },
  { 
    id: 7, 
    image: sampleImage, 
    category: "Cleansers", 
    title: "Nourishing Cleanser", 
    price: 18 },
  { 
    id: 8, 
    image: sampleImage, 
    category: "Gift Sets", 
    title: "Daily Ritual Set", 
    price: 40 },
];

const makeUpProducts = [
  { 
    id: 9, 
    image: sampleImage, 
    category: "Lips", 
    title: "Cherry Lip Tint", 
    price: 12 },
  { 
    id: 10, 
    image: sampleImage, 
    category: "Face", 
    title: "Rose Blush", 
    price: 20 },
  { 
    id: 11, 
    image: sampleImage, 
    category: "Eyes", 
    title: "Soft Eye Palette", 
    price: 28 },
  { 
    id: 12, 
    image: sampleImage, 
    category: "Face", 
    title: "Glow Foundation", 
    price: 35 },
];

// ---------- A title + a grid of cards ----------
function ProductSection({ title, products }) {
  return (
    <>
      <h2 className="section-title">{title}</h2>

      <section className="products-list">
        {products.map((product) => (
          <Card
            key={product.id}
            image={product.image}
            category={product.category}
            title={product.title}
            price={product.price}
            outOfStock={product.outOfStock}
          />
        ))}
      </section>
    </>
  );
}

// ---------- The page ----------
function Products() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="main-products-page">
      <section className="products-hero">
        <div className="title">
          <div className="title-our-products">Our Products</div>

          <div className="title-natural">
            NATURAL CARE. <br />
            <span className="green">REAL BEAUTY.</span>
          </div>

          <div className="title-description">
            Thoughtful skin care made with plant-powered ingredients,
            designed to bring out your natural radiance.
          </div>

          <div className="category-filters">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`category-pill ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="search">
          <input type="text" placeholder="Find Your Favorite Products here" />
          <button className="search-btn" type="button" aria-label="Search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              width="32"
              height="32"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>
      </section>

      <ProductSection title="Popular Product" products={popularProducts} />
      <ProductSection title="Skin Care" products={skinCareProducts} />
      <ProductSection title="Makeup" products={makeUpProducts} />
    </div>
  );
}

export default Products;