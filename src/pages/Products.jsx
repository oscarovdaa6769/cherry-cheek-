import React, { useState } from "react";
import "./Products.css";

const CATEGORIES = ["All", "Skincare", "Makeup", "Hair Care", "Body Care"];

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
        </div>
         <div className="search">
          <input
            type="text"
            placeholder="Search products..."
          />

          <button
            className="search-btn"
            type="button"
            aria-label="Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              width="24"
              height="24"
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
  );
}

export default Products;