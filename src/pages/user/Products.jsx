import { useState } from "react";
import { Icon } from "@iconify/react";
import "./Products.css";
import Card from "../../components/product/Card";
import productsData from '../../data/products.json';
import '../../App.css';

/* ---------- Data Mapping ---------- */
const CATEGORIES = ["All", ...new Set(productsData.map(p => p.prodCate))];

const allProducts = productsData.map((p) => ({
  id: p.id,
  image: p.image,
  category: p.prodCate,
  title: p.prodName,
  price: p.prodPrice, 
  oldPrice: p.prodOldPrice || null,
  rating: p.rating || 5,
  outOfStock: !p.inStock,
  group: p.prodCate
}));

const PRODUCTS_PER_PAGE = 8;

function ProductSection({ title, products }) {
  return (
    <div className="products-section-wrapper">
      <h2 className="section-title">{title}</h2>
      <section className="products-list">
        {products.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            image={product.image}
            category={product.category}
            title={product.title}
            price={product.price}
            oldPrice={product.oldPrice}
            rating={product.rating}
            outOfStock={product.outOfStock}
          />
        ))}
      </section>
    </div>
  );
}

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
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedFilteredProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const totalPagesAll = Math.ceil(allProducts.length / PRODUCTS_PER_PAGE);
  const currentProducts = allProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const activeDisplayProducts = isFiltering ? paginatedFilteredProducts : currentProducts;
  const activeTotalPages = isFiltering ? totalPages : totalPagesAll;

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
      <div className="products-content-container">
        
        {/* ----- Hero Section ----- */}
        <section className="products-hero">
          <div className="title">
            <div className="title-our-products">Our Products</div>

            <h1 className="title-natural">
              NATURAL CARE.<br />
              <span className="green">REAL BEAUTY.</span>
            </h1>

            <p className="title-description">
              Thoughtful skin care made with plant-powered ingredients,
              designed to bring out your natural radiance.
            </p>

            <div className="category-filters" role="tablist" aria-label="Product Categories">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === cat}
                  className={`category-pill ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => {
                    setActiveCategory(cat);
                    setCurrentPage(1);
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
              placeholder="Find your favorite products..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              aria-label="Search products"
            />
            <button className="search-btn" type="submit" aria-label="Submit search">
              <Icon icon="solar:magnifer-linear" />
            </button>
          </form>
        </section>

        {/* ----- Product Area ----- */}
        {isFiltering ? (
          filteredProducts.length > 0 ? (
            <ProductSection
              title={`Search Results (${filteredProducts.length})`}
              products={activeDisplayProducts}
            />
          ) : (
            <div className="no-products-state">
              <Icon icon="solar:box-minimalistic-linear" className="no-products-icon" />
              <h2 className="section-title">No products found</h2>
              <p>We couldn't find anything matching your search. Try adjusting your filters.</p>
              <button type="button" className="clear-filters-btn" onClick={clearFilters}>
                Clear filters
              </button>
            </div>
          )
        ) : (
          <ProductSection title="All Products" products={currentProducts} />
        )}

        {/* ----- Pagination ----- */}
        {activeTotalPages > 1 && (
          <nav className="pagination" aria-label="Product pagination">
            <button
              type="button"
              className="page-arrow"
              onClick={() => goToPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <Icon icon="solar:alt-arrow-left-linear" />
            </button>

            {Array.from({ length: activeTotalPages }, (_, i) => i + 1).map((page) => (
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
              onClick={() => goToPage(Math.min(activeTotalPages, currentPage + 1))}
              disabled={currentPage === activeTotalPages}
              aria-label="Next page"
            >
              <Icon icon="solar:alt-arrow-right-linear" />
            </button>
          </nav>
        )}

      </div>
    </div>
  );
};

export default Product;