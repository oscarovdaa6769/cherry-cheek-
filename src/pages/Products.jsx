
import { useEffect, useState } from "react";
import "./Products.css";
import Card from "../components/Card";

const CATEGORIES = [
  "All",
  "Skincare",
  "Makeup",
  "Hair Care",
  "Body Care",
];

const PAGE_SIZES = [12, 10, 8, 7];
const TOTAL_PAGES = PAGE_SIZES.length;

const sampleImage =
  "https://www.personalcarecouncil.org/wp-content/smush-webp/2025/03/AdobeStock_218950992-square-crop.jpeg.webp";

const normalize = (text = "") =>
  text.toLowerCase().replace(/\s+/g, "");

function ProductSection({ title, products }) {
  if (products.length === 0) return null;

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
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const [productsResponse, categoriesResponse] =
          await Promise.all([
            fetch("/data/products.json"),
            fetch("/data/categories.json"),
          ]);

        if (!productsResponse.ok || !categoriesResponse.ok) {
          throw new Error("Failed to load product data.");
        }

        const productsData = await productsResponse.json();
        const categoriesData = await categoriesResponse.json();

        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const productsWithCategories = products.map((product) => {
    const category = categories.find(
      (item) => item.id === product.categoryId
    );

    return {
      ...product,
      image: sampleImage,
      title: product.name,
      category: category ? category.name : "Other",
      group: category ? category.name : "Other",
      outOfStock: product.stockQuantity <= 0,
    };
  });

  const query = normalize(searchTerm);

  const isFiltering =
    query !== "" || activeCategory !== "All";

  const filteredProducts = productsWithCategories.filter(
    (product) => {
      const matchesCategory =
        activeCategory === "All" ||
        normalize(product.group) === normalize(activeCategory);

      const matchesSearch =
        query === "" ||
        normalize(product.title).includes(query) ||
        normalize(product.category).includes(query) ||
        normalize(product.brand).includes(query) ||
        normalize(product.sku).includes(query);

      return matchesCategory && matchesSearch;
    }
  );

  // Page 1: Skincare, Makeup, and Hair Care
  // Page 2: Fragrance and Body Care
  // Pages 3 and 4: Remaining products, if available
  const pageProducts = {
    1: filteredProducts.filter(
      (product) =>
        !["Fragrance", "Body Care"].includes(product.category)
    ),
    2: filteredProducts.filter((product) =>
      ["Fragrance", "Body Care"].includes(product.category)
    ),
  };

  const productsForPagination =
    pageProducts[currentPage] || filteredProducts;

  const startIndex = PAGE_SIZES
    .slice(0, currentPage - 1)
    .reduce((total, size) => total + size, 0);

  const productsPerPage = PAGE_SIZES[currentPage - 1];

  const currentProducts = isFiltering
    ? filteredProducts.slice(0, PAGE_SIZES[0])
    : currentPage <= 2
      ? productsForPagination.slice(0, productsPerPage)
      : filteredProducts.slice(startIndex, startIndex + productsPerPage);

  const totalPages = TOTAL_PAGES;

  const goToPage = (page) => {
    if (page < 1 || page > TOTAL_PAGES) return;

    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  const clearFilters = () => {
    setSearchTerm("");
    setActiveCategory("All");
    setCurrentPage(1);
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products: {error}</p>;

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
            Thoughtful skin care made with plant-powered
            ingredients, designed to bring out your natural
            radiance.
          </div>

          <div className="category-filters">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                className={`category-pill ${
                  activeCategory === category ? "active" : ""
                }`}
                onClick={() => {
                  setActiveCategory(category);
                  setCurrentPage(1);
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <form
          className="search"
          onSubmit={handleSearchSubmit}
          role="search"
        >
          <input
            type="text"
            placeholder="Find Your Favorite Products here"
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
              setCurrentPage(1);
            }}
            aria-label="Search products"
          />

          <button
            className="search-btn"
            type="submit"
            aria-label="Search"
          >
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

      {/* Product area */}
      {currentProducts.length > 0 ? (
        isFiltering ? (
          <ProductSection
            title={`Results (${filteredProducts.length})`}
            products={currentProducts}
          />
        ) : (
          categories.map((category) => {
            const categoryProducts = currentProducts.filter(
              (product) => product.category === category.name
            );

            return (
              <ProductSection
                key={category.id}
                title={category.name}
                products={categoryProducts}
              />
            );
          })
        )
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
      )}

      {/* Pagination */}
      {!isFiltering && (
        <nav
          className="pagination"
          aria-label="Product pagination"
        >
          <button
            type="button"
            className="page-arrow"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((page) => (
            <button
              key={page}
              type="button"
              className={`page-number ${
                currentPage === page ? "active" : ""
              }`}
              onClick={() => goToPage(page)}
              aria-current={
                currentPage === page ? "page" : undefined
              }
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            className="page-arrow"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
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
