
import { useState } from "react";
import {
  Search,
  Settings,
  Mail,
  Bell,
  Package,
  TrendingUp,
  PlusCircle,
  Pencil,
  Trash2,
  X,
} from "lucide-react";
import "./Dashboard.css";

const initialProducts = [
  { id: 1, name: "Tiki Tiki", category: "Skincare", price: 99.99, stock: 199 },
  { id: 2, name: "Rose Glow", category: "Serum", price: 24.99, stock: 85 },
  { id: 3, name: "Daily Moisturizer", category: "Skincare", price: 35.00, stock: 120 },
  { id: 4, name: "Gentle Cleanser", category: "Cleanser", price: 18.99, stock: 45 },
  { id: 5, name: "Hydrating Cream", category: "Skincare", price: 29.99, stock: 95 },
  { id: 6, name: "Vitamin C Serum", category: "Serum", price: 39.99, stock: 25 },
  { id: 7, name: "Daily Sunscreen", category: "Skincare", price: 21.50, stock: 76 },
];

const emptyForm = {
  name: "",
  category: "Skincare",
  price: "",
  stock: "",
};

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Category");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const totalStock = products.reduce(
    (sum, product) => sum + Number(product.stock),
    0
  );

  const lowStock = products.filter(
    (product) => Number(product.stock) < 50
  ).length;

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All Category" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  const pageSize = 6;
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / pageSize)
  );
  const currentPage = Math.min(page, totalPages);

  const visibleProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const stats = [
    { title: "Total Skincare", value: products.length },
    { title: "Total Stock", value: totalStock.toLocaleString() },
    {
      title: "Categories",
      value: new Set(products.map((product) => product.category)).size,
    },
    { title: "Low Stock", value: lowStock },
  ];

  function openAdd() {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
    });
    setModalOpen(true);
  }

  function saveProduct(event) {
    event.preventDefault();

    const data = {
      ...form,
      name: form.name.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
    };

    if (editingId !== null) {
      setProducts((previous) =>
        previous.map((product) =>
          product.id === editingId ? { ...product, ...data } : product
        )
      );
    } else {
      setProducts((previous) => [
        { ...data, id: Date.now() },
        ...previous,
      ]);
      setPage(1);
    }

    setModalOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  function deleteProduct(id) {
    if (window.confirm("Delete this product?")) {
      setProducts((previous) =>
        previous.filter((product) => product.id !== id)
      );
    }
  }

  function updateSearch(value) {
    setSearch(value);
    setPage(1);
  }

  return (
    <main className="dashboard">
     

      {/* DASHBOARD CONTENT */}
      <section className="content">
        <div className="page-heading">
          <div>
            <p className="eyebrow">CHERRY CHEEK / INVENTORY</p>
            <h1>Dashboard</h1>
            <p className="page-description">
              Manage your skincare products and inventory.
            </p>
          </div>
        </div>

        {/* STATISTICS */}
        <section className="stats-grid">
          {stats.map((stat) => (
            <article className="stat-card" key={stat.title}>
              <div className="stat-heading">
                <span>{stat.title}</span>
                <div className="stat-icon">
                  <Package size={18} />
                </div>
              </div>

              <strong>{stat.value}</strong>

              <div className="stat-change">
                <span className="trend-icon">
                  <TrendingUp size={14} />
                </span>
                <span>+ 10 This Week</span>
              </div>
            </article>
          ))}
        </section>

        {/* FILTERS AND ACTIONS */}
        <section className="toolbar">
          <label className="category-filter">
            <select
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
                setPage(1);
              }}
              aria-label="Filter by category"
            >
              <option>All Category</option>
              <option>Skincare</option>
              <option>Serum</option>
              <option>Cleanser</option>
            </select>
            <span>⌄</span>
          </label>

          <div className="toolbar-right">
            <div className="table-search">
              <Search size={21} />
              <input
                value={search}
                onChange={(event) => updateSearch(event.target.value)}
                placeholder="Search Here"
                aria-label="Search table"
              />
            </div>

            <button className="primary-btn" onClick={openAdd}>
              <PlusCircle size={19} />
              <span>New Product</span>
            </button>
          </div>
        </section>

        {/* PRODUCT TABLE */}
        <section className="table-card">
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>image</th>
                  <th>name</th>
                  <th>category</th>
                  <th>price</th>
                  <th>in stock</th>
                  <th>action</th>
                </tr>
              </thead>

              <tbody>
                {visibleProducts.map((product, index) => (
                  <tr key={product.id}>
                    <td>
                      <div className="product-image">
                        <img
                          src={`https://images.unsplash.com/photo-${
                            index % 2 === 0
                              ? "1608248543803-ba4f8c70ae0b"
                              : "1601049541289-9b1b7bbbfe19"
                          }?w=100&h=100&fit=crop`}
                          alt={product.name}
                        />
                      </div>
                    </td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>${Number(product.price).toFixed(2)}</td>
                    <td>
                      <span
                        className={
                          product.stock < 50 ? "low-stock" : ""
                        }
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td>
                      <div className="row-actions">
                        <button
                          className="action-btn edit-btn"
                          onClick={() => openEdit(product)}
                          aria-label={`Edit ${product.name}`}
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          className="action-btn delete-btn"
                          onClick={() => deleteProduct(product.id)}
                          aria-label={`Delete ${product.name}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {visibleProducts.length === 0 && (
                  <tr>
                    <td colSpan="6" className="empty-state">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <footer className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setPage((value) => Math.max(1, value - 1))}
            >
              previous
            </button>

            <span>
              {filteredProducts.length === 0
                ? "0 products"
                : `${currentPage} of ${totalPages}`}
            </span>

            <button
              disabled={currentPage >= totalPages}
              onClick={() =>
                setPage((value) => Math.min(totalPages, value + 1))
              }
            >
              next
            </button>
          </footer>
        </section>

       
      </section>

      {/* ADD / EDIT PRODUCT MODAL */}
      {modalOpen && (
        <div
          className="modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setModalOpen(false);
            }
          }}
        >
          <form className="product-modal" onSubmit={saveProduct}>
            <div className="modal-header">
              <div>
                <span className="eyebrow">PRODUCT MANAGEMENT</span>
                <h2>{editingId !== null ? "Edit Product" : "New Product"}</h2>
              </div>
              <button
                type="button"
                className="icon-button"
                onClick={() => setModalOpen(false)}
                aria-label="Close modal"
              >
                <X size={19} />
              </button>
            </div>

            <label>
              Product Name
              <input
                required
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
                placeholder="Enter product name"
              />
            </label>

            <label>
              Category
              <select
                value={form.category}
                onChange={(event) =>
                  setForm({ ...form, category: event.target.value })
                }
              >
                <option>Skincare</option>
                <option>Serum</option>
                <option>Cleanser</option>
              </select>
            </label>

            <div className="form-row">
              <label>
                Price ($)
                <input
                  required
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={(event) =>
                    setForm({ ...form, price: event.target.value })
                  }
                  placeholder="19.99"
                />
              </label>

              <label>
                Stock
                <input
                  required
                  type="number"
                  min="0"
                  step="1"
                  value={form.stock}
                  onChange={(event) =>
                    setForm({ ...form, stock: event.target.value })
                  }
                  placeholder="100"
                />
              </label>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button type="submit" className="primary-btn">
                {editingId !== null ? "Save Changes" : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
