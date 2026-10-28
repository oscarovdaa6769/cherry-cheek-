import { useState } from "react";
import "./Products.css";
import Card from "../components/Card";

const CATEGORIES = ["All", "Skincare", "Makeup", "Hair Care", "Body Care"];

const sampleImage =
  "https://www.personalcarecouncil.org/wp-content/smush-webp/2025/03/AdobeStock_218950992-square-crop.jpeg.webp";

/* ---------- Data ---------- */

// group = what the top pills filter on, section = the heading shown on the page
const tag = (list, group, section) =>
  list.map((p) => ({ ...p, group, section }));

const popularProducts = tag(
  [
    { id: 1, image: sampleImage, category: "Moisturizers", title: "Hydrating Face Cream", price: 25, outOfStock: true },
    { id: 2, image: sampleImage, category: "Face Essentials", title: "Rose Glow Set", price: 32, outOfStock: true },
    { id: 3, image: sampleImage, category: "Cleansers", title: "Nourishing Cleanser", price: 18, outOfStock: true },
    { id: 4, image: sampleImage, category: "Gift Sets", title: "Daily Ritual Set", price: 40 },
  ],
  "Skincare",
  "Popular Product"
);

const skinCareProducts = tag(
  [
    { id: 5, image: sampleImage, category: "Moisturizers", title: "Hydrating Face Cream", price: 25 },
    { id: 6, image: sampleImage, category: "Face Essentials", title: "Rose Glow Set", price: 32 },
    { id: 7, image: sampleImage, category: "Cleansers", title: "Nourishing Cleanser", price: 18 },
    { id: 8, image: sampleImage, category: "Gift Sets", title: "Daily Ritual Set", price: 40 },
  ],
  "Skincare",
  "Skin Care"
);

const makeUpProducts = tag(
  [
    { id: 9, image: sampleImage, category: "Lips", title: "Cherry Lip Tint", price: 12 },
    { id: 10, image: sampleImage, category: "Face", title: "Rose Blush", price: 20 },
    { id: 11, image: sampleImage, category: "Eyes", title: "Soft Eye Palette", price: 28 },
    { id: 12, image: sampleImage, category: "Face", title: "Glow Foundation", price: 35 },
  ],
  "Makeup",
  "Makeup"
);

const extraProducts = Array.from({ length: 25 }, (_, index) => ({
  id: index + 13,
  image: sampleImage,
  category: "Skincare",
  title: `Beauty Product ${index + 13}`,
  price: 15 + index,
  group: "Skincare",
  section: "More Products",
}));

const allProducts = [
  ...popularProducts,
  ...skinCareProducts,
  ...makeUpProducts,
];

const productsForPagination = [...allProducts, ...extraProducts];

// Products per page (12 + 10 + 8 + 7 = 37 total)
const PAGE_SIZES = {
  1: 12,
  2: 10,
  3: 8,
  4: 7,
};

const TOTAL_PAGES = Object.keys(PAGE_SIZES).length;

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

function Products() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  /* ----- Search + category filtering ----- */
  // ignore spaces and capitals so "skin care", "Skincare" and "make up" all match
  const normalize = (text) => text.toLowerCase().replace(/\s+/g, "");

  const query = normalize(searchTerm);
  const isFiltering = query !== "" || activeCategory !== "All";

  const filteredProducts = productsForPagination.filter((product) => {
    const matchesCategory =
      activeCategory === "All" || product.group === activeCategory;

    const matchesSearch =
      query === "" ||
      normalize(product.title).includes(query) ||
      normalize(product.category).includes(query) ||
      normalize(product.section).includes(query);

    return matchesCategory && matchesSearch;
  });

  /* ----- Pagination (only used when not filtering) ----- */
  const startIndex = Object.entries(PAGE_SIZES)
    .filter(([page]) => Number(page) < currentPage)
    .reduce((total, [, size]) => total + size, 0);

  const currentProducts = productsForPagination.slice(
    startIndex,
    startIndex + PAGE_SIZES[currentPage]
  );

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // search is live; Enter / button just prevents a page reload
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
                onClick={() => setActiveCategory(cat)}
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
              <button type="button" onClick={clearFilters}>
                Clear filters
              </button>
            </p>
          </>
        )
      ) : currentPage === 1 ? (
        <>
          <ProductSection title="Popular Product" products={popularProducts} />
          <ProductSection title="Skin Care" products={skinCareProducts} />
          <ProductSection title="Makeup" products={makeUpProducts} />
        </>
      ) : (
        <ProductSection title="More Products" products={currentProducts} />
      )}

      {/* Pagination is hidden while searching or filtering */}
      {!isFiltering && (
        <nav className="pagination" aria-label="Product pagination">
          <button
            type="button"
            className="page-arrow"
            onClick={() => goToPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((page) => (
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
            onClick={() => goToPage(Math.min(TOTAL_PAGES, currentPage + 1))}
            disabled={currentPage === TOTAL_PAGES}
            aria-label="Next page"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </nav>
      )}
    </div>
  );
}

export default Products;