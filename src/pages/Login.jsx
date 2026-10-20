
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import "../App.css"

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const normalizedEmail = email.trim().toLowerCase();

    let loggedInUser = null;

    // Demo admin account
    if (
      normalizedEmail === "admin@cherrycheek.com" &&
      password === "admin123"
    ) {
      loggedInUser = {
        name: "Admin",
        email: normalizedEmail,
        role: "admin",
      };
    }

    // Demo customer account
    else if (
      normalizedEmail === "user@cherrycheek.com" &&
      password === "user123"
    ) {
      loggedInUser = {
        name: "Customer",
        email: normalizedEmail,
        role: "user",
      };
    }

    if (!loggedInUser) {
      setError("Invalid email or password.");
      return;
    }

    // Update authentication state in App.jsx
    onLogin(loggedInUser);

    // Redirect according to role
    if (loggedInUser.role === "admin") {
      navigate("/admin/dashboard", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }

  return (
    <div className="login-container container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-heading">Welcome Back</h2>
        <p>Sign in to your Cherry Cheek account.</p>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            autoComplete="username"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
          />
        </div>

        {error && (
          <p className="login-error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" className="submit-btn">
          Login
        </button>

        <p className="guest-message">
          Just browsing?{" "}
          <a href="/">Continue as a guest</a>
        </p>
      </form>
    </div>
  );
}
