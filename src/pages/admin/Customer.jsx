import { Icon } from "@iconify/react";
import { useState } from "react";
import accountsData from "../../data/accounts.json";
import "../../App.css";
import "./Customer.css";

const PER_PAGE = 6;

// Map accounts with role 'CUSTOMER' from accounts.json
const initialCustomers = (accountsData || [])
  .filter((acc) => acc.role === "CUSTOMER")
  .map((acc) => ({
    id: acc.id,
    name: acc.fullName,
    email: acc.email,
    phone: "+855 12 345 678", // Default sample phone placeholder
    status: acc.active ? "Active" : "Inactive",
  }));

const ICONS = {
  total: "solar:users-group-rounded-bold-duotone",
  active: "solar:user-check-rounded-bold-duotone",
  newCustomer: "solar:user-plus-rounded-bold-duotone",
  inactive: "solar:user-block-rounded-bold-duotone",
  trend: "solar:trending-up-linear",
  search: "solar:magnifer-linear",
  add: "solar:add-circle-bold",
  edit: "solar:pen-bold",
  remove: "solar:trash-bin-trash-bold",
  filter: "solar:filter-bold-duotone",
  arrowDown: "solar:alt-arrow-down-linear",
  close: "solar:close-circle-bold",
};

function filterCustomers(customers, search, category) {
  const text = search.toLowerCase();

  return customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(text) ||
      customer.email.toLowerCase().includes(text) ||
      customer.phone.includes(search);

    const matchesCategory =
      category === "All Customers" || customer.status === category;

    return matchesSearch && matchesCategory;
  });
}

function StatCard({ title, icon, value, note }) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <span>{title}</span>
        <span className="stat-icon">
          <Icon icon={icon} />
        </span>
      </div>
      <h2>{value}</h2>
      <p>
        <Icon icon={ICONS.trend} />
        {note}
      </p>
    </div>
  );
}

const emptyForm = { name: "", email: "", phone: "", status: "Active" };

export default function Customer() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Customers");
  const [page, setPage] = useState(1);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filteredCustomers = filterCustomers(customers, search, category);
  const totalPages = Math.max(1, Math.ceil(filteredCustomers.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);

  const currentCustomers = filteredCustomers.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  function openAddModal() {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEditModal(customer) {
    setEditingId(customer.id);
    setForm({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      status: customer.status,
    });
    setModalOpen(true);
  }

  function handleSaveCustomer(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;

    if (editingId !== null) {
      setCustomers((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...item, ...form } : item
        )
      );
    } else {
      setCustomers((prev) => [
        { ...form, id: Date.now() },
        ...prev,
      ]);
      setPage(1);
    }

    setModalOpen(false);
    setForm(emptyForm);
  }

  function deleteCustomer(id) {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;

    const updated = customers.filter((customer) => customer.id !== id);
    setCustomers(updated);

    const remaining = filterCustomers(updated, search, category);
    setPage(Math.min(currentPage, Math.max(1, Math.ceil(remaining.length / PER_PAGE))));
  }

  return (
    <div className="customer-page">
      <main className="customer-content">
        
        {/* Header */}
        <div className="customer-page-header">
          <div>
            <span className="customer-eyebrow">CHERRY CHEEK ADMIN</span>
            <h1 className="customer-title">Customer Management</h1>
            <p className="customer-description">
              View registered users, track customer activity, and manage profiles.
            </p>
          </div>
          <button type="button" className="new-customer-btn" onClick={openAddModal}>
            <Icon icon={ICONS.add} width="20" height="20" />
            New Customer
          </button>
        </div>

        {/* Stats */}
        <section className="customer-stats">
          <StatCard
            title="Total Customers"
            icon={ICONS.total}
            value={customers.length}
            note="Registered users"
          />
          <StatCard
            title="Active Customers"
            icon={ICONS.active}
            value={customers.filter((c) => c.status === "Active").length}
            note="Active accounts"
          />
          <StatCard
            title="New Customers"
            icon={ICONS.newCustomer}
            value={customers.filter((c) => c.id > 200).length}
            note="Added this session"
          />
          <StatCard
            title="Inactive Customers"
            icon={ICONS.inactive}
            value={customers.filter((c) => c.status === "Inactive").length}
            note="Suspended accounts"
          />
        </section>

        {/* Toolbar */}
        <section className="customer-toolbar">
          <div className="toolbar-left">
            <div className="select-wrapper">
              <Icon icon={ICONS.filter} className="filter-icon" />
              <select
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value);
                  setPage(1);
                }}
                aria-label="Customer category"
              >
                <option value="All Customers">All Customers</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <Icon icon={ICONS.arrowDown} className="arrow-icon" />
            </div>

            <div className="table-search">
              <Icon icon={ICONS.search} className="search-icon" />
              <input
                placeholder="Search name, email, phone..."
                aria-label="Search customers"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>
        </section>

        {/* Table */}
        <section className="customer-table-wrapper">
          <div className="table-scroll">
            <table className="customer-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td>
                      <div className="customer-avatar">
                        {customer.name.charAt(0).toUpperCase()}
                      </div>
                    </td>
                    <td className="customer-name">{customer.name}</td>
                    <td className="customer-email">{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          customer.status === "Active"
                            ? "status-active"
                            : "status-inactive"
                        }`}
                      >
                        {customer.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          type="button"
                          className="edit-btn"
                          onClick={() => openEditModal(customer)}
                          aria-label="Edit customer"
                          title="Edit"
                        >
                          <Icon icon={ICONS.edit} />
                        </button>
                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() => deleteCustomer(customer.id)}
                          aria-label="Delete customer"
                          title="Delete"
                        >
                          <Icon icon={ICONS.remove} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {currentCustomers.length === 0 && (
                  <tr>
                    <td colSpan="6" className="empty-state">
                      <div className="empty-state-content">
                        <Icon icon="solar:user-block-rounded-linear" className="empty-icon" />
                        <p>No customers found matching your filters.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="customer-pagination">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setPage((previous) => Math.max(1, previous - 1))}
            >
              <Icon icon="solar:alt-arrow-left-linear" />
              <span>Previous</span>
            </button>

            <span>
              Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
            </span>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setPage((previous) => Math.min(totalPages, previous + 1))}
            >
              <span>Next</span>
              <Icon icon="solar:alt-arrow-right-linear" />
            </button>
          </div>
        </section>

      </main>

      {/* Add / Edit Customer Modal */}
      {modalOpen && (
        <div
          className="customer-modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
        >
          <form className="customer-modal" onSubmit={handleSaveCustomer}>
            <div className="customer-modal-header">
              <div>
                <span className="customer-eyebrow">USER PROFILE</span>
                <h2>{editingId !== null ? "Edit Customer" : "New Customer"}</h2>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setModalOpen(false)}
              >
                <Icon icon={ICONS.close} />
              </button>
            </div>

            <label className="customer-modal-field">
              <span>Full Name *</span>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Nora Customer"
              />
            </label>

            <label className="customer-modal-field">
              <span>Email Address *</span>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="nora@example.com"
              />
            </label>

            <label className="customer-modal-field">
              <span>Phone Number</span>
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+855 12 345 678"
              />
            </label>

            <label className="customer-modal-field">
              <span>Account Status</span>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </label>

            <div className="customer-modal-actions">
              <button
                type="button"
                className="modal-cancel-btn"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button type="submit" className="new-customer-btn">
                <span>{editingId !== null ? "Save Changes" : "Add Customer"}</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}