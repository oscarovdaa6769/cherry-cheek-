import { Icon } from "@iconify/react";
import { useState } from "react";
import "./App.css";

const initialCustomers = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  name: "Veasna Sithul",
  email: "veasna@example.com",
  phone: "012 7777 67",
  status: "Active",
}));

function Customer() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Customers");
  const [page, setPage] = useState(1);

  const perPage = 6;

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase()) ||
      customer.phone.includes(search);

    const matchesCategory =
      category === "All Customers" || customer.status === category;

    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCustomers.length / perPage)
  );

  const currentCustomers = filteredCustomers.slice(
    (page - 1) * perPage,
    page * perPage
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

    const remaining = updated.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(search.toLowerCase()) ||
        customer.email.toLowerCase().includes(search.toLowerCase()) ||
        customer.phone.includes(search);

      return (
        matchesSearch &&
        (category === "All Customers" || customer.status === category)
      );
    });

    setPage(Math.min(page, Math.max(1, Math.ceil(remaining.length / perPage))));
  }

  return (
    <div className="customer-page">
      <header className="customer-header">
        <div className="top-search">
          <span className="search-icon">⌕</span>
          <input
            placeholder="Search Here"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="header-icons">
          <button aria-label="Settings">⚙</button>
          <button aria-label="Messages">✉</button>
          <button aria-label="Notifications">♟</button>
          <div className="profile-avatar">C</div>
        </div>
      </header>

      <main className="customer-content">
        <section className="customer-stats">
          <div className="stat-card">
            <div className="stat-top">
              <span>Total Customers</span>
              <span className="stat-icon">♧</span>
            </div>
            <h2>{customers.length}</h2>
            <p>↗ + 10 This Week</p>
          </div>

          <div className="stat-card">
            <div className="stat-top">
              <span>Active Customers</span>
              <span className="stat-icon">♧</span>
            </div>
            <h2>{customers.filter((c) => c.status === "Active").length}</h2>
            <p>↗ Active accounts</p>
          </div>

          <div className="stat-card">
            <div className="stat-top">
              <span>New Customers</span>
              <span className="stat-icon">♧</span>
            </div>
            <h2>{customers.filter((c) => c.id > 10).length}</h2>
            <p>↗ Added this session</p>
          </div>

          <div className="stat-card">
            <div className="stat-top">
              <span>Inactive Customers</span>
              <span className="stat-icon">♧</span>
            </div>
            <h2>{customers.filter((c) => c.status === "Inactive").length}</h2>
            <p>↗ Inactive accounts</p>
          </div>
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
            <span className="search-icon">⌕</span>
            <input
              placeholder="Search Here"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
            />
          </div>

          <button className="new-customer-btn" onClick={addCustomer}>
            <span>⊕</span> New Customer
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
                        <Icon icon="solar:pen-2-bold"/>
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => deleteCustomer(customer.id)}
                        aria-label="Delete customer"
                        title="Delete"
                      >
                        <Icon icon="solar:trash-bin-2-bold"/>
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

            <span>{page} of {totalPages}</span>

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
