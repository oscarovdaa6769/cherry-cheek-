import { Icon } from "@iconify/react";
import { useState } from "react";
import invoicesData from "../../data/cherry-cheek-JSON-Data/invoices.json";
import accountsData from "../../data/cherry-cheek-JSON-Data/accounts.json";
import productsData from "../../data/cherry-cheek-JSON-Data/products.json";
import "../../App.css";
import "./Order.css";

const PER_PAGE = 6;

// Lookup helper for accounts (customers & staff)
const accountMap = (accountsData || []).reduce((acc, account) => {
  acc[account.id] = account;
  return acc;
}, {});

// Lookup helper for products
const productMap = (productsData || []).reduce((acc, p) => {
  acc[p.id] = p;
  return acc;
}, {});

// Transform invoices.json into structured order records
const initialOrders = invoicesData.map((inv) => {
  const customer = inv.customerId ? accountMap[inv.customerId] : null;
  const itemNames = inv.items
    .map((item) => {
      const prod = productMap[item.productId];
      return prod ? prod.name : `Product #${item.productId}`;
    })
    .join(", ");

  return {
    id: inv.invoiceNumber,
    rawId: inv.id,
    customer: customer ? customer.fullName : "Walk-in Customer",
    email: customer ? customer.email : "N/A",
    date: inv.createdAt ? new Date(inv.createdAt).toISOString().split("T")[0] : "2026-10-24",
    items: itemNames || "Cosmetic items",
    total: Number(inv.total),
    status: inv.status.charAt(0).toUpperCase() + inv.status.slice(1).toLowerCase(),
  };
});

const ICONS = {
  total: "solar:bill-list-bold-duotone",
  completed: "solar:check-read-bold-duotone",
  pending: "solar:clock-circle-bold-duotone",
  revenue: "solar:wallet-money-bold-duotone",
  trend: "solar:trending-up-linear",
  search: "solar:magnifer-linear",
  filter: "solar:filter-bold-duotone",
  arrowDown: "solar:alt-arrow-down-linear",
  view: "solar:eye-bold",
  close: "solar:close-circle-bold",
};

function filterOrders(orders, search, statusFilter) {
  const text = search.toLowerCase();

  return orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(text) ||
      order.customer.toLowerCase().includes(text) ||
      order.email.toLowerCase().includes(text);

    const matchesStatus =
      statusFilter === "All Status" ||
      order.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
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

export default function Orders() {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = filterOrders(orders, search, statusFilter);
  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);

  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  const totalRevenue = orders
    .filter((o) => o.status.toLowerCase() !== "cancelled")
    .reduce((sum, o) => sum + o.total, 0);

  function updateOrderStatus(id, newStatus) {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === id ? { ...ord, status: newStatus } : ord))
    );
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
    }
  }

  return (
    <div className="admin-orders-page">
      <main className="orders-content">
        
        {/* Header */}
        <div className="orders-page-header">
          <div>
            <span className="orders-eyebrow">CHERRY CHEEK ADMIN</span>
            <h1 className="orders-title">Order Management</h1>
            <p className="orders-description">
              Track customer purchases, review order items, and update fulfillment statuses.
            </p>
          </div>
        </div>

        {/* Stats */}
        <section className="orders-stats">
          <StatCard
            title="Total Orders"
            icon={ICONS.total}
            value={orders.length}
            note="All time orders"
          />
          <StatCard
            title="Completed"
            icon={ICONS.completed}
            value={orders.filter((o) => o.status.toLowerCase() === "completed" || o.status.toLowerCase() === "paid").length}
            note="Successfully delivered"
          />
          <StatCard
            title="Pending Orders"
            icon={ICONS.pending}
            value={orders.filter((o) => ["pending", "processing"].includes(o.status.toLowerCase())).length}
            note="Requires fulfillment"
          />
          <StatCard
            title="Total Revenue"
            icon={ICONS.revenue}
            value={`$${totalRevenue.toFixed(2)}`}
            note="Verified sales"
          />
        </section>

        {/* Toolbar */}
        <section className="orders-toolbar">
          <div className="toolbar-left">
            <div className="select-wrapper">
              <Icon icon={ICONS.filter} className="filter-icon" />
              <select
                value={statusFilter}
                onChange={(event) => {
                  setStatusFilter(event.target.value);
                  setPage(1);
                }}
                aria-label="Filter order status"
              >
                <option value="All Status">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Paid">Paid</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <Icon icon={ICONS.arrowDown} className="arrow-icon" />
            </div>

            <div className="table-search">
              <Icon icon={ICONS.search} className="search-icon" />
              <input
                placeholder="Search order ID, customer name..."
                aria-label="Search orders"
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
        <section className="orders-table-wrapper">
          <div className="table-scroll">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Items Summary</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="order-id-cell">{order.id}</td>
                    <td>
                      <div className="customer-info-cell">
                        <span className="customer-name">{order.customer}</span>
                        <span className="customer-email">{order.email}</span>
                      </div>
                    </td>
                    <td className="order-date">{order.date}</td>
                    <td className="order-items">{order.items}</td>
                    <td className="order-total">${order.total.toFixed(2)}</td>
                    <td>
                      <span
                        className={`status-badge status-${order.status.toLowerCase()}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          type="button"
                          className="view-btn"
                          onClick={() => setSelectedOrder(order)}
                          aria-label="View order details"
                          title="View Details"
                        >
                          <Icon icon={ICONS.view} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {currentOrders.length === 0 && (
                  <tr>
                    <td colSpan="7" className="empty-state">
                      <div className="empty-state-content">
                        <Icon icon="solar:bill-cross-linear" className="empty-icon" />
                        <p>No orders found matching your criteria.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="orders-pagination">
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

      {/* Order Detail & Status Modal */}
      {selectedOrder && (
        <div
          className="orders-modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setSelectedOrder(null);
          }}
        >
          <div className="orders-modal">
            <div className="orders-modal-header">
              <div>
                <span className="orders-eyebrow">ORDER DETAILS</span>
                <h2>{selectedOrder.id}</h2>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedOrder(null)}
              >
                <Icon icon={ICONS.close} />
              </button>
            </div>

            <div className="modal-body-content">
              <div className="modal-info-group">
                <span>Customer Name:</span>
                <strong>{selectedOrder.customer}</strong>
              </div>
              <div className="modal-info-group">
                <span>Email Address:</span>
                <strong>{selectedOrder.email}</strong>
              </div>
              <div className="modal-info-group">
                <span>Order Date:</span>
                <strong>{selectedOrder.date}</strong>
              </div>
              <div className="modal-info-group">
                <span>Purchased Items:</span>
                <strong>{selectedOrder.items}</strong>
              </div>
              <div className="modal-info-group">
                <span>Order Total:</span>
                <strong className="modal-price">${selectedOrder.total.toFixed(2)}</strong>
              </div>

              <div className="orders-modal-field">
                <span>Update Status</span>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Paid">Paid</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="orders-modal-actions">
              <button
                type="button"
                className="modal-close-action-btn"
                onClick={() => setSelectedOrder(null)}
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}