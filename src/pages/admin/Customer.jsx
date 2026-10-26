import { Icon } from "@iconify/react";
import { useState } from "react";
import "./App.css";

const PER_PAGE = 6;

const initialCustomers = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  name: "Veasna Sithul",
  email: "veasna@example.com",
  phone: "012 7777 67",
  status: "Active",
}));

// Icon names come from the Solar set: https://icon-sets.iconify.design/solar/
const ICONS = {
  total: "solar:users-group-rounded-bold",
  active: "solar:user-check-rounded-bold",
  newCustomer: "solar:user-plus-rounded-bold",
  inactive: "solar:user-block-rounded-bold",
  trend: "solar:arrow-right-up-linear",
  search: "solar:magnifer-linear",
  add: "solar:add-circle-linear",
  edit: "solar:pen-2-bold",
  remove: "solar:trash-bin-2-bold",
};

// One place for the search + category rule (used by the table and after deleting)
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
          <Icon icon={icon} width="16" height="16" />
        </span>
      </div>
      <h2>{value}</h2>
      <p>
        <Icon icon={ICONS.trend} width="14" height="14" />
        {note}
      </p>
    </div>
  );
}

function Customer() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Customers");
  const [page, setPage] = useState(1);

  const filteredCustomers = filterCustomers(customers, search, category);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCustomers.length / PER_PAGE)
  );

  const currentCustomers = filteredCustomers.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );

  function addCustomer() {
    const name = prompt("Enter customer name:");
    if (!name?.trim()) return;

    const email = prompt("Enter customer email:");
    if (!email?.trim()) return;

    const phone = prompt("Enter customer phone:") || "-";

    setCustomers((previous) => [
      ...previous,
      {
        id: Date.now(),
        name: name.trim(),
        email: email.trim(),
        phone,
        status: "Active",
      },
    ]);

    setPage(1);
  }

  function editCustomer(customer) {
    const name = prompt("Customer name:", customer.name);
    if (!name?.trim()) return;

    const email = prompt("Customer email:", customer.email);
    if (!email?.trim()) return;

    const phone = prompt("Customer phone:", customer.phone);
    if (phone === null) return;

    setCustomers((previous) =>
      previous.map((item) =>
        item.id === customer.id
          ? { ...item, name: name.trim(), email: email.trim(), phone }
          : item
      )
    );
  }

  function deleteCustomer(id) {
    if (!window.confirm("Delete this customer?")) return;

    const updated = customers.filter((customer) => customer.id !== id);
    setCustomers(updated);

    const remaining = filterCustomers(updated, search, category);
    setPage(Math.min(page, Math.max(1, Math.ceil(remaining.length / PER_PAGE))));
  }

  return (
    <div className="customer-page">
      <main className="customer-content">
        <section className="customer-stats">
          <StatCard
            title="Total Customers"
            icon={ICONS.total}
            value={customers.length}
            note="+ 10 This Week"
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
            value={customers.filter((c) => c.id > 10).length}
            note="Added this session"
          />
          <StatCard
            title="Inactive Customers"
            icon={ICONS.inactive}
            value={customers.filter((c) => c.status === "Inactive").length}
            note="Inactive accounts"
          />
        </section>

        <section className="customer-toolbar">
          <select
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
              setPage(1);
            }}
            aria-label="Customer category"
          >
            <option>All Customers</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <div className="table-search">
            <Icon icon={ICONS.search} className="search-icon" />
            <input
              placeholder="Search Here"
              aria-label="Search customers"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
            />
          </div>

          <button className="new-customer-btn" onClick={addCustomer}>
            <Icon icon={ICONS.add} width="22" height="22" />
            New Customer
          </button>
        </section>

        <section className="customer-table-wrapper">
          <table className="customer-table">
            <thead>
              <tr>
                <th>image</th>
                <th>name</th>
                <th>email</th>
                <th>phone</th>
                <th>status</th>
                <th>action</th>
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
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
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
                        className="edit-btn"
                        onClick={() => editCustomer(customer)}
                        aria-label="Edit customer"
                        title="Edit"
                      >
                        <Icon icon={ICONS.edit} />
                      </button>
                      <button
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
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="customer-pagination">
            <button
              disabled={page === 1}
              onClick={() => setPage((previous) => previous - 1)}
            >
              previous
            </button>

            <span>
              {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((previous) => previous + 1)}
            >
              next
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Customer;  