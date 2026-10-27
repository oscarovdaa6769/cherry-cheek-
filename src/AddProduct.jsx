
import { useRef, useState, useEffect } from "react";
import {
  ImagePlus,
  Plus,
  X,
  Package,
  CheckCircle2,
  Trash2,
  Search,
  Pencil,
} from "lucide-react";
import "./AddProduct.css";

const STORAGE_KEY = "cherrycheek-products";

const emptyForm = {
  name: "",
  category: "",
  price: "",
  stock: "",
  description: "",
};

export default function AddProduct() {
  const fileRef = useRef(null);

  const [products, setProducts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  });

  const [form, setForm] = useState(emptyForm);
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("Active");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch {
      setMessage("Storage is full. Try using a smaller product image.");
    }
  }, [products]);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const uploadImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Please choose a valid image.");
      event.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setMessage("Please choose an image smaller than 2 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
    setMessage("");
  };

  const resetForm = () => {
    setForm(emptyForm);
    setImage("");
    setStatus("Active");
    setEditingId(null);
    setMessage("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const product = {
      id: editingId ?? Date.now(),
      name: form.name.trim(),
      category: form.category,
      price: Number(form.price),
      stock: Number(form.stock),
      description: form.description.trim(),
      status,
      image,
    };

    if (
      !product.name ||
      !product.category ||
      form.price === "" ||
      !Number.isFinite(product.price) ||
      product.price < 0 ||
      form.stock === "" ||
      !Number.isInteger(product.stock) ||
      product.stock < 0 ||
      !product.description
    ) {
      setMessage("Please complete every required field correctly.");
      return;
    }

    setProducts((prev) =>
      editingId !== null
        ? prev.map((item) => item.id === editingId ? product : item)
        : [product, ...prev]
    );

    setMessage(editingId !== null
      ? "Product updated successfully!"
      : "Product added successfully!"
    );

    setForm(emptyForm);
    setImage("");
    setStatus("Active");
    setEditingId(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const deleteProduct = (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    setProducts((prev) => prev.filter((product) => product.id !== id));

    if (editingId === id) resetForm();

    setMessage("Product deleted successfully!");
  };

  const editProduct = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      category: product.category,
      price: String(product.price),
      stock: String(product.stock),
      description: product.description,
    });
    setImage(product.image || "");
    setStatus(product.status || "Active");
    setMessage("");

    if (fileRef.current) fileRef.current.value = "";

    document.getElementById("add-product-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      filter === "All" || product.category === filter;

    return matchesSearch && matchesCategory;
  });

  const totalStock = products.reduce(
    (sum, product) => sum + product.stock,
    0
  );

  const categories = [
    "Skincare",
    "Makeup",
    "Lip Care",
    "Hair Care",
    "Body Care",
    "Accessories",
  ];

  return (
    <div className="add-product-content">
      <header className="ap-heading">
        <div>
          <div className="ap-breadcrumb">Dashboard / Products / Add Product</div>
          <h1>Product Management</h1>
          <p>Add, edit, and manage your beauty products.</p>
        </div>
        
      </header>

      {message && (
        <div className="ap-message" role="status">
          <CheckCircle2 size={18} />
          <span>{message}</span>
          <button type="button" onClick={() => setMessage("")}>
            <X size={16} />
          </button>
        </div>
      )}

      <section className="ap-summary">
        <div className="ap-summary-card">
          <span className="ap-summary-icon purple"><Package /></span>
          <div>
            <p>Total products</p>
            <strong>{products.length}</strong>
          </div>
        </div>
        <div className="ap-summary-card">
          <span className="ap-summary-icon pink"><ImagePlus /></span>
          <div>
            <p>Active products</p>
            <strong>{products.filter(p => p.status === "Active").length}</strong>
          </div>
        </div>
        <div className="ap-summary-card">
          <span className="ap-summary-icon green"><CheckCircle2 /></span>
          <div>
            <p>Total stock</p>
            <strong>{totalStock}</strong>
          </div>
        </div>
      </section>

      <form
        className="ap-card"
        id="add-product-form"
        onSubmit={handleSubmit}
      >
        <div className="ap-card-header">
          <div>
            <h2>{editingId !== null ? "Edit Product" : "Add New Product"}</h2>
            <p>Enter product information below.</p>
          </div>
          <span className="ap-required">* Required fields</span>
        </div>

        <div className="ap-content-grid">
          <div className="ap-fields">
            <label className="ap-field">
              <span>Product Name <b>*</b></span>
              <input
                required
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Enter product name"
              />
            </label>

            <label className="ap-field">
              <span>Category <b>*</b></span>
              <select
                required
                value={form.category}
                onChange={(e) => updateField("category", e.target.value)}
              >
                <option value="">Select category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </label>

            <div className="ap-row">
              <label className="ap-field">
                <span>Price (USD) <b>*</b></span>
                <input
                  required
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => updateField("price", e.target.value)}
                  placeholder="0.00"
                />
              </label>

              <label className="ap-field">
                <span>Stock Quantity <b>*</b></span>
                <input
                  required
                  type="number"
                  min="0"
                  step="1"
                  value={form.stock}
                  onChange={(e) => updateField("stock", e.target.value)}
                  placeholder="Enter quantity"
                />
              </label>
            </div>

            <label className="ap-field">
              <span>Description <b>*</b></span>
              <textarea
                required
                rows={5}
                maxLength={500}
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Describe your product..."
              />
              <small>{form.description.length}/500 characters</small>
            </label>

            <div className="ap-field">
              <span>Status</span>
              <div className="ap-status">
                {["Active", "Inactive"].map(item => (
                  <button
                    type="button"
                    key={item}
                    className={status === item ? "selected" : ""}
                    onClick={() => setStatus(item)}
                  >
                    <span className="ap-radio" />
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <aside className="ap-image-section">
            <div className="ap-image-title">
              <h3>Product Image</h3>
              <span>Optional</span>
            </div>
            <p>Upload a clear photo of your beauty product.</p>

            <input
              ref={fileRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              hidden
              onChange={uploadImage}
            />

            <button
              type="button"
              className={`ap-upload ${image ? "has-image" : ""}`}
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files?.[0];
                if (!file) return;

                const transfer = new DataTransfer();
                transfer.items.add(file);
                fileRef.current.files = transfer.files;
                fileRef.current.dispatchEvent(
                  new Event("change", { bubbles: true })
                );
              }}
            >
              {image ? (
                <img src={image} alt="Product preview" />
              ) : (
                <>
                  <span className="ap-upload-icon"><ImagePlus size={28} /></span>
                  <strong>Upload product image</strong>
                  <span>Drag and drop your image here</span>
                  <span>or <b>browse files</b></span>
                  <small>JPG, PNG, WEBP · Max 2 MB</small>
                </>
              )}
            </button>

            {image && (
              <button
                type="button"
                className="ap-remove"
                onClick={() => {
                  setImage("");
                  if (fileRef.current) fileRef.current.value = "";
                }}
              >
                <X size={15} /> Remove image
              </button>
            )}

            <div className="ap-image-tip">
              <ImagePlus size={22} />
              <div>
                <strong>Image preview</strong>
                <p>Your selected image appears here before saving.</p>
              </div>
            </div>
          </aside>
        </div>

        <div className="ap-actions">
          <button type="button" className="ap-cancel" onClick={resetForm}>
            Cancel
          </button>
          <button type="submit" className="ap-submit">
            <Plus size={18} />
            {editingId !== null ? "Save Changes" : "Add Product"}
          </button>
        </div>
      </form>

      <section className="ap-added-products">
        <div className="ap-list-heading">
          <div>
            <h2>Product Catalog</h2>
            <p>Manage your saved products.</p>
          </div>
          <span>{products.length} products</span>
        </div>

        <div className="ap-toolbar">
          <label className="ap-search">
            <Search size={18} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
            />
          </label>

          <select
            className="ap-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            aria-label="Filter by category"
          >
            <option value="All">All categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="ap-empty">
            <Package size={32} />
            <h3>{products.length ? "No matching products" : "No products yet"}</h3>
            <p>
              {products.length
                ? "Try changing your search or category."
                : "Add your first product using the form above."}
            </p>
          </div>
        ) : (
          <div className="ap-product-list">
            {filteredProducts.map(product => (
              <article className="ap-product-item" key={product.id}>
                <div className="ap-product-image">
                  {product.image
                    ? <img src={product.image} alt={product.name} />
                    : <ImagePlus size={22} />}
                </div>

                <div className="ap-product-info">
                  <strong>{product.name}</strong>
                  <span>{product.category} · Stock: {product.stock}</span>
                  <span className={`ap-product-status ${product.status.toLowerCase()}`}>
                    {product.status}
                  </span>
                </div>

                <strong className="ap-product-price">
                  ${product.price.toFixed(2)}
                </strong>

                <div className="ap-product-actions">
                  <button
                    type="button"
                    className="ap-edit-btn"
                    title="Edit product"
                    aria-label={`Edit ${product.name}`}
                    onClick={() => editProduct(product)}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    type="button"
                    className="ap-delete-btn"
                    title="Delete product"
                    aria-label={`Delete ${product.name}`}
                    onClick={() => deleteProduct(product.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
