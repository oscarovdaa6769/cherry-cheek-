import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Icon } from "@iconify/react";
import Button from '../../components/common/Button';
import './Profile.css';
import '../../App.css'

export default function Profile() {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if a user is logged in
        const storedUser = JSON.parse(localStorage.getItem('current_user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('current_user');
        setUser(null);
        navigate('/');
    };

    const handleSaveChanges = () => {
        setIsEditing(false);
        localStorage.setItem('current_user', JSON.stringify(user));
    };

    // If the user is browsing as a guest, show a professional sign-in prompt
    if (!user) {
        return (
            <main className="profile-page">
                <div className="profile-container" style={{ textAlign: "center", padding: "4rem 2rem" }}>
                    <div className="avatar-box" style={{ margin: "0 auto 1.5rem auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Icon icon="solar:user-bold" className="avatar-icon" style={{ fontSize: "3rem" }} />
                    </div>
                    <h1 className="profile-title">Welcome, Guest!</h1>
                    <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
                        Sign in to view your profile, track orders, and manage your saved wishlist.
                    </p>
                    <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
                        <Link to="/login" className="submit-btn" style={{ textDecoration: "none", padding: "0.75rem 1.5rem" }}>
                            Sign In
                        </Link>
                        <Link to="/register" className="theme-btn" style={{ textDecoration: "none", padding: "0.75rem 1.5rem" }}>
                            Create Account
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    // Render normal profile view for logged-in users
    return (
        <main className="profile-page">
            <div className="profile-container">
                <div className="profile-header">
                    <Button name="Back" />
                    <h1 className="profile-title">Account Profile</h1>
                </div>

                <div className="profile-content-grid">
                    <div className="profile-card">
                        <div className="avatar-section">
                            <div className="avatar-box">
                                <Icon icon="solar:user-bold" className="avatar-icon" />
                            </div>
                            <h2 className="user-name">{user.name}</h2>
                            <span className="user-email">{user.email}</span>
                        </div>

                        <div className="profile-nav-links">
                            <a href="/orders" className="profile-link-item">
                                <Icon icon="solar:cart-3-bold" />
                                <span>Order History</span>
                                <Icon icon="solar:alt-arrow-right-linear" className="arrow-icon" />
                            </a>
                            <a href="/wishlist" className="profile-link-item">
                                <Icon icon="solar:bookmark-bold" />
                                <span>Saved Wishlist</span>
                                <Icon icon="solar:alt-arrow-right-linear" className="arrow-icon" />
                            </a>
                            <a href="/settings" className="profile-link-item">
                                <Icon icon="solar:settings-bold" />
                                <span>Account Settings</span>
                                <Icon icon="solar:alt-arrow-right-linear" className="arrow-icon" />
                            </a>
                            <a href="/" onClick={handleLogout} className='profile-logout-btn'>
                                <Icon icon="solar:logout-2-bold" />
                                <span>Logout</span>
                            </a>
                        </div>
                    </div>

                    <div className="profile-details-card">
                        <div className="details-header">
                            <h3>Personal Information</h3>
                            <button 
                                type="button"
                                className="edit-toggle-btn"
                                onClick={() => setIsEditing(!isEditing)}
                            >
                                {isEditing ? "Cancel" : "Edit Profile"}
                            </button>
                        </div>

                        <div className="info-grid">
                            <div className="info-group">
                                <label>Full Name</label>
                                <input 
                                    type="text" 
                                    value={user.name || ""} 
                                    disabled={!isEditing}
                                    onChange={(e) => setUser({...user, name: e.target.value})}
                                />
                            </div>
                            <div className="info-group">
                                <label>Email Address</label>
                                <input 
                                    type="email" 
                                    value={user.email || ""} 
                                    disabled={!isEditing}
                                    onChange={(e) => setUser({...user, email: e.target.value})}
                                />
                            </div>
                        </div>

                        {isEditing && (
                            <button 
                                type="button" 
                                className="save-btn" 
                                onClick={handleSaveChanges}
                            >
                                Save Changes
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}