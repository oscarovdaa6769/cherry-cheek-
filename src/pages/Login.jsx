import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import "../App.css";

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

    // 1. Demo admin account
    if (normalizedEmail === "admin@cherrycheek.com" && password === "admin123") {
      loggedInUser = {
        name: "Admin",
        email: normalizedEmail,
        role: "admin",
      };
    }
    // 2. Demo customer account
    else if (normalizedEmail === "user@cherrycheek.com" && password === "user123") {
      loggedInUser = {
        name: "Customer",
        email: normalizedEmail,
        role: "user",
      };
    }
    // 3. Check locally registered users
    else {
      const registeredUsers = JSON.parse(localStorage.getItem("registered_users")) || [];
      const foundUser = registeredUsers.find(
        (u) => u.email === normalizedEmail && u.password === password
      );
      if (foundUser) {
        loggedInUser = {
          name: foundUser.name,
          email: foundUser.email,
          role: "user",
        };
      }
    }

    if (!loggedInUser) {
      setError("Invalid email or password.");
      return;
    }

    // Save active session to localStorage
    localStorage.setItem("current_user", JSON.stringify(loggedInUser));
    onLogin(loggedInUser);

    // Redirect based on role
    if (loggedInUser.role === "admin") {
      navigate("/admin/dashboard", { replace: true });
    } else {
      navigate("/profile", { replace: true });
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

        <div className="guest-message" style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "1rem", textAlign: "center" }}>
          <p style={{ margin: 0 }}>
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
          <p style={{ margin: 0 }}>
            Just browsing? <Link to="/">Continue as a guest</Link>
          </p>
        </div>
      </form>
    </div>
  );
}