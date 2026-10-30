import { useState } from "react";
import { Icon } from "@iconify/react";
import productsData from "../../data/products.json";
import categoriesData from "../../data/categories.json";
import fallbackImg from "../../assets/images/fallback.jpg";
import "./Dashboard.css";
import "../../App.css";

const emptyForm = {
  sku: "",
  name: "",
  categoryId: categoriesData[0]?.id || 1,
  price: "",
  stockQuantity: "",
  image: "",
};

export default function AdminDashboard() {
  const [products, setProducts] = useState(productsData);
  const [categories] = useState(categoriesData);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [viewingProduct, setViewingProduct] = useState(null);

  // Statistics
  const totalStock = products.reduce((sum, p) => sum + Number(p.stockQuantity || 0), 0);
  const lowStockCount = products.filter((p) => Number(p.stockQuantity || 0) < 15).length;

  const stats = [
    { title: "Total Skincare", value: products.length, icon: "solar:box-minimalistic-bold-duotone" },
    { title: "Total Stock", value: totalStock.toLocaleString(), icon: "solar:archive-bold-duotone" },
    { title: "Categories", value: categories.length, icon: "solar:widget-bold-duotone" },
    { title: "Low Stock Items", value: lowStockCount, icon: "solar:danger-triangle-bold-duotone", isWarning: lowStockCount > 0 },
  ];

  // Filtering & Pagination
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || String(p.categoryId) === String(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleProducts = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Modal Handlers
  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (product) => {
    setEditingId(product.id);
    setForm({
      sku: product.sku,
      name: product.name,
      categoryId: product.categoryId,
      price: product.price,
      stockQuantity: product.stockQuantity,
      image: product.image || "",
    });
    setModalOpen(true);
  };

  // Handle local image file selection and convert to Base64
  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProduct = (e) => {
    e.preventDefault();
    const data = {
      sku: form.sku.trim().toUpperCase(),
      name: form.name.trim(),
      categoryId: Number(form.categoryId),
      brand: "Cherry Cheeks",
      price: Number(form.price),
      stockQuantity: Number(form.stockQuantity),
      image: form.image || fallbackImg,
      active: true,
    };

    if (editingId !== null) {
      setProducts((prev) => prev.map((p) => (p.id === editingId ? { ...p, ...data } : p)));
    } else {
      setProducts((prev) => [{ ...data, id: Date.now() }, ...prev]);
      setPage(1);
    }

    setModalOpen(false);
    setForm(emptyForm);
  };

  const deleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <main className="admin-dashboard-page">
      <section className="admin-dashboard-content">
        {/* Page Header */}
        <div className="admin-dashboard-page-heading">
          <div>
            <span className="admin-dashboard-eyebrow">CHERRY CHEEK ADMIN</span>
            <h1 className="admin-dashboard-title">Inventory Dashboard</h1>
            <p className="admin-dashboard-description">
              Manage your skincare catalog, monitor stock levels, and update product pricing.
            </p>
          </div>
          <button type="button" className="admin-primary-btn" onClick={openAdd}>
            <Icon icon="solar:add-circle-bold" />
            <span>New Product</span>
          </button>
        </div>

        {/* Stats Grid */}
        <section className="admin-stats-grid">
          {stats.map((stat) => (
            <article key={stat.title} className={`admin-stat-card ${stat.isWarning ? "warning-card" : ""}`}>
              <div className="admin-stat-header">
                <span className="stat-label">{stat.title}</span>
                <div className="stat-icon-wrapper">
                  <Icon icon={stat.icon} />
                </div>
              </div>
              <strong className="stat-value">{stat.value}</strong>
              <div className="stat-trend">
                <Icon icon="solar:trending-up-linear" />
                <span>Updated in real-time</span>
              </div>
            </article>
          ))}
        </section>

        {/* Toolbar */}
        <section className="admin-toolbar">
          <div className="filter-group">
            <div className="select-wrapper">
              <Icon icon="solar:filter-bold-duotone" className="filter-icon" />
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setPage(1);
                }}
                aria-label="Filter by category"
              >
                <option value="All">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <Icon icon="solar:alt-arrow-down-linear" className="arrow-icon" />
            </div>
          </div>

          <div className="admin-table-search">
            <Icon icon="solar:magnifer-linear" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by name or SKU..."
              aria-label="Search table"
            />
          </div>
        </section>

        {/* Products Table */}
        <section className="admin-table-card">
          <div className="table-scroll">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>SKU & Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {visibleProducts.map((product) => {
                  const catObj = categories.find((c) => c.id === product.categoryId);
                  const isLow = Number(product.stockQuantity) < 15;
                  return (
                    <tr key={product.id}>
                      <td>
                        <div className="product-cell">
                          <img className="product-thumb" src={product.image || fallbackImg} alt={product.name} />
                          <div>
                            <span className="product-sku" style={{ fontSize: "11px", color: "var(--description-color)", display: "block" }}>
                              {product.sku}
                            </span>
                            <span className="product-cell-name">{product.name}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="category-tag">{catObj?.name || "Skincare"}</span>
                      </td>
                      <td className="price-cell">${Number(product.price).toFixed(2)}</td>
                      <td>
                        <span className={`stock-badge ${isLow ? "low-stock" : "in-stock"}`}>
                          <Icon icon={isLow ? "solar:danger-circle-bold" : "solar:check-circle-bold"} />
                          {product.stockQuantity} units
                        </span>
                      </td>
                      <td>
                        <div className="row-actions">
                          <button type="button" className="action-btn view-btn" onClick={() => setViewingProduct(product)} aria-label={`View ${product.name}`}>
                            <Icon icon="solar:eye-bold" />
                          </button>
                          <button type="button" className="action-btn edit-btn" onClick={() => openEdit(product)} aria-label={`Edit ${product.name}`}>
                            <Icon icon="solar:pen-bold" />
                          </button>
                          <button type="button" className="action-btn delete-btn" onClick={() => deleteProduct(product.id)} aria-label={`Delete ${product.name}`}>
                            <Icon icon="solar:trash-bin-trash-bold" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {visibleProducts.length === 0 && (
                  <tr>
                    <td colSpan="5" className="admin-empty-state">
                      <Icon icon="solar:box-minimalistic-linear" className="empty-icon" />
                      <p>No products match your search or filter criteria.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <footer className="admin-pagination">
            <button type="button" className="page-btn" disabled={currentPage === 1} onClick={() => setPage((v) => Math.max(1, v - 1))}>
              <Icon icon="solar:alt-arrow-left-linear" />
              <span>Previous</span>
            </button>
            <span className="page-info">
              Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
            </span>
            <button type="button" className="page-btn" disabled={currentPage >= totalPages} onClick={() => setPage((v) => Math.min(totalPages, v + 1))}>
              <span>Next</span>
              <Icon icon="solar:alt-arrow-right-linear" />
            </button>
          </footer>
        </section>
      </section>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="admin-modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && setModalOpen(false)}>
          <form className="admin-modal" onSubmit={saveProduct}>
            <div className="admin-modal-header">
              <div>
                <span className="admin-eyebrow">PRODUCT EDITOR</span>
                <h2>{editingId !== null ? "Edit Product" : "New Product"}</h2>
              </div>
              <button type="button" className="admin-close-btn" onClick={() => setModalOpen(false)} aria-label="Close modal">
                <Icon icon="solar:close-circle-bold" />
              </button>
            </div>

            <label className="admin-modal-field">
              <span>SKU Code</span>
              <input required value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} placeholder="e.g. SK-101" />
            </label>

            <label className="admin-modal-field">
              <span>Product Name</span>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Gentle Face Cleanser" />
            </label>

            <label className="admin-modal-field">
              <span>Category</span>
              <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </label>

            <label className="admin-modal-field">
              <span>Product Image File</span>
              <input type="file" accept="image/*" onChange={handleImageFileChange} />
              {form.image && (
                <div style={{ marginTop: "8px" }}>
                  <img src={form.image} alt="Preview" style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "8px", border: "1px solid var(--border-color)" }} />
                </div>
              )}
            </label>

            <div className="admin-form-row">
              <label className="admin-modal-field">
                <span>Price ($)</span>
                <input required type="number" min="0" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="19.99" />
              </label>
              <label className="admin-modal-field">
                <span>Stock Quantity</span>
                <input required type="number" min="0" step="1" value={form.stockQuantity} onChange={(e) => setForm({ ...form, stockQuantity: e.target.value })} placeholder="100" />
              </label>
            </div>

            <div className="admin-modal-actions">
              <button type="button" className="admin-cancel-btn" onClick={() => setModalOpen(false)}>Cancel</button>
              <button type="submit" className="admin-primary-btn">
                <span>{editingId !== null ? "Save Changes" : "Add Product"}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* View Modal */}
      {viewingProduct && (
        <div className="admin-modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && setViewingProduct(null)}>
          <div className="admin-modal">
            <div className="admin-modal-header">
              <div>
                <span className="admin-eyebrow">PRODUCT DETAILS</span>
                <h2>{viewingProduct.name}</h2>
              </div>
              <button type="button" className="admin-close-btn" onClick={() => setViewingProduct(null)} aria-label="Close modal">
                <Icon icon="solar:close-circle-bold" />
              </button>
            </div>

            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <img
                src={viewingProduct.image || fallbackImg}
                alt={viewingProduct.name}
                style={{ width: "80px", height: "80px", borderRadius: "12px", objectFit: "cover", border: "1px solid var(--border-color)" }}
              />
              <div>
                <span style={{ fontSize: "12px", color: "var(--description-color)", display: "block" }}>SKU: {viewingProduct.sku}</span>
                <strong style={{ fontSize: "18px", color: "var(--primary-color)" }}>${Number(viewingProduct.price).toFixed(2)}</strong>
              </div>
            </div>

            <div className="admin-modal-field">
              <span>Category</span>
              <input readOnly value={categories.find((c) => c.id === viewingProduct.categoryId)?.name || "Skincare"} />
            </div>

            <div className="admin-form-row">
              <div className="admin-modal-field">
                <span>Brand</span>
                <input readOnly value={viewingProduct.brand || "Cherry Cheeks"} />
              </div>
              <div className="admin-modal-field">
                <span>Stock Quantity</span>
                <input readOnly value={`${viewingProduct.stockQuantity} units`} />
              </div>
            </div>

            <div className="admin-modal-actions">
              <button type="button" className="admin-primary-btn" onClick={() => setViewingProduct(null)}>Done</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}