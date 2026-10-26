import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import "../App.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleRegister(e) {
    e.preventDefault();
    setError("");

    const normalizedEmail = email.trim().toLowerCase();

    // Get existing users from localStorage or initialize empty array
    const existingUsers = JSON.parse(localStorage.getItem("registered_users")) || [];

    // Check if user already exists
    const userExists = existingUsers.some((u) => u.email === normalizedEmail);
    if (userExists) {
      setError("An account with this email already exists.");
      return;
    }

    // Save new user
    const newUser = { name, email: normalizedEmail, password, role: "user" };
    existingUsers.push(newUser);
    localStorage.setItem("registered_users", JSON.stringify(existingUsers));
    localStorage.setItem('current_user', JSON.stringify(newUser));

    // Automatically log them in or redirect to login
    navigate("/profile");
  }

  return (
    <div className="login-container container">
      <form className="login-form" onSubmit={handleRegister}>
        <h2 className="login-heading">Create Account</h2>
        <p>Sign up to start shopping with Cherry Cheek.</p>

        <div className="input-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
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
            placeholder="Create a password"
            required
          />
        </div>

        {error && (
          <p className="login-error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" className="submit-btn">
          Sign Up
        </button>

        <p className="guest-message">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
}