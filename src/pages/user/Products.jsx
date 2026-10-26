import { useState } from "react";
import "./Products.css";
import Card from "../../components/Card";
import productsData from '../../data/products.json'; // <-- Import real data
import '../../App.css'

/* ---------- Data Mapping ---------- */

// Dynamically generate categories from your JSON data
const CATEGORIES = ["All", ...new Set(productsData.map(p => p.prodCate))];

// Map JSON data to the format expected by your Card component and filters
const allProducts = productsData.map((p) => ({
  id: p.id,
  image: p.image,
  category: p.prodCate,
  title: p.prodName,
  price: p.prodPrice, 
  outOfStock: !p.inStock,
  group: p.prodCate,
  section: p.prodCate
}));

const PRODUCTS_PER_PAGE = 8; // Adjust based on your layout (e.g., 8 or 12)

/* ---------- Components ---------- */

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

// FIX: Changed to a Named Export to match App.jsx
export const Product = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  /* ----- Search + category filtering ----- */
  const normalize = (text) => text.toLowerCase().replace(/\s+/g, "");
  const query = normalize(searchTerm);
  const isFiltering = query !== "" || activeCategory !== "All";

  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory =
      activeCategory === "All" || product.group === activeCategory;

    const matchesSearch =
      query === "" ||
      normalize(product.title).includes(query) ||
      normalize(product.category).includes(query);

    return matchesCategory && matchesSearch;
  });

  /* ----- Pagination ----- */
  const totalPages = Math.ceil(allProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = allProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const clearFilters = () => {
    setSearchTerm("");
    setActiveCategory("All");
    setCurrentPage(1);
  };

  return (
    <div className="main-products-page">
      <section className="products-hero">
        <div className="title">
          <div className="title-our-products">Our Products</div>

          <div className="title-natural">
            NATURAL CARE.
            <br />
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
                className={`category-pill ${
                  activeCategory === cat ? "active" : ""
                }`}
                onClick={() => {
                  setActiveCategory(cat);
                  setCurrentPage(1); // Reset to page 1 on category change
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <form className="search" onSubmit={handleSearchSubmit} role="search">
          <input
            type="text"
            placeholder="Find Your Favorite Products here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search products"
          />
          <button className="search-btn" type="submit" aria-label="Search">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="32" height="32">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
        </form>
      </section>

      {/* ----- Product area ----- */}
      {isFiltering ? (
        filteredProducts.length > 0 ? (
          <ProductSection
            title={`Results (${filteredProducts.length})`}
            products={filteredProducts}
          />
        ) : (
          <>
            <h2 className="section-title">No products found</h2>
            <p style={{ padding: "12px var(--side-space) 60px" }}>
              Try a different search or category.{" "}
              <button type="button" onClick={clearFilters}>Clear filters</button>
            </p>
          </>
        )
      ) : (
        <ProductSection title="All Products" products={currentProducts} />
      )}

      {/* Pagination (Hidden when filtering) */}
      {!isFiltering && totalPages > 1 && (
        <nav className="pagination" aria-label="Product pagination">
          <button
            type="button"
            className="page-arrow"
            onClick={() => goToPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              type="button"
              className={`page-number ${currentPage === page ? "active" : ""}`}
              onClick={() => goToPage(page)}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            className="page-arrow"
            onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </nav>
      )}
    </div>
  );
};

// Optional: Keep default export just in case you change App.jsx later
export default Product;