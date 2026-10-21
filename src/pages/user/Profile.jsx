import { useState } from 'react';
import { Icon } from "@iconify/react";
import Button from '../../components/common/Button';
import './Profile.css';
import '../../App.css'

export default function Profile() {
    const [user, setUser] = useState({
        name: "Oudom Veasna",
        email: "oudom@example.com",
        phone: "+855 12 345 678",
    });
    const [isEditing, setIsEditing] = useState(false);

    return (
        <main className="profile-page">
            <div className="profile-container">
                <div className="profile-header">
                    <Button name="Back" />
                    <h1 className="profile-title">Account Profile</h1>
                </div>

                <div className="profile-content-grid">
                    {/* Sidebar Card */}
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
                        </div>
                    </div>

                    {/* Information Editor Card */}
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
                                    value={user.name} 
                                    disabled={!isEditing}
                                    onChange={(e) => setUser({...user, name: e.target.value})}
                                />
                            </div>
                            <div className="info-group">
                                <label>Email Address</label>
                                <input 
                                    type="email" 
                                    value={user.email} 
                                    disabled={!isEditing}
                                    onChange={(e) => setUser({...user, email: e.target.value})}
                                />
                            </div>
                            <div className="info-group">
                                <label>Phone Number</label>
                                <input 
                                    type="text" 
                                    value={user.phone} 
                                    disabled={!isEditing}
                                    onChange={(e) => setUser({...user, phone: e.target.value})}
                                />
                            </div>
                        </div>

                        {isEditing && (
                            <button 
                                type="button" 
                                className="save-btn" 
                                onClick={() => setIsEditing(false)}
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