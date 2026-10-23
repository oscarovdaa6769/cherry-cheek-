import { useState, useEffect } from 'react';
import { Icon } from "@iconify/react";
import Button from '../../components/common/Button';
import './Setting.css';

export default function Settings() {
    const [theme, setTheme] = useState(localStorage.getItem('app-theme') || 'light');
    const [currency, setCurrency] = useState("USD");
    const [notifications, setNotifications] = useState({
        orderUpdates: true,
        promotions: false,
        stockAlerts: false
    });

    const toggleNotification = (key) => {
        setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
        localStorage.setItem('app-theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);

        window.dispatchEvent(new Event('themeChanged'));
    }

    return (
        <main className="settings-page">
            <div className="settings-container">
                <div className="settings-header">
                    <Button name="Back" />
                    <h1 className="settings-title">Settings</h1>
                </div>

                <div className="settings-content">
                    {/* Appearance Section */}
                    <div className="settings-section">
                        <div className="section-title-row">
                            <Icon icon="solar:sun-bold" className="section-icon" />
                            <h2>Appearance</h2>
                        </div>
                        <div className="settings-group">
                            <div className="setting-item">
                                <div className="item-info">
                                    <span className="item-title">Theme Mode</span>
                                    <span className="item-desc">Choose how the app looks to you</span>
                                </div>
                                <div className="theme-toggle-group">
                                    <button 
                                        type="button" 
                                        className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
                                        onClick={() => handleThemeChange('light')}
                                    >
                                        Light
                                    </button>
                                    <button 
                                        type="button" 
                                        className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
                                        onClick={() => handleThemeChange('dark')}
                                    >
                                        Dark
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Regional & Currency Section */}
                    <div className="settings-section">
                        <div className="section-title-row">
                            <Icon icon="solar:global-bold" className="section-icon" />
                            <h2>Region & Currency</h2>
                        </div>
                        <div className="settings-group">
                            <div className="setting-item">
                                <div className="item-info">
                                    <span className="item-title">Display Currency</span>
                                    <span className="item-desc">Select your preferred shopping currency</span>
                                </div>
                                <select 
                                    className="setting-select"
                                    value={currency} 
                                    onChange={(e) => setCurrency(e.target.value)}
                                >
                                    <option value="USD">USD ($)</option>
                                    <option value="EUR">EUR (€)</option>
                                    <option value="KHR">KHR (៛)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Notifications Section */}
                    <div className="settings-section">
                        <div className="section-title-row">
                            <Icon icon="solar:bell-bold" className="section-icon" />
                            <h2>Notifications</h2>
                        </div>
                        <div className="settings-group">
                            <div className="setting-item">
                                <div className="item-info">
                                    <span className="item-title">Order Status Updates</span>
                                    <span className="item-desc">Get notified when your order ships</span>
                                </div>
                                <label className="toggle-switch">
                                    <input 
                                        type="checkbox" 
                                        checked={notifications.orderUpdates}
                                        onChange={() => toggleNotification('orderUpdates')}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>

                            <div className="setting-item">
                                <div className="item-info">
                                    <span className="item-title">Restock & Sale Alerts</span>
                                    <span className="item-desc">Get notified when wishlist items drop in price</span>
                                </div>
                                <label className="toggle-switch">
                                    <input 
                                        type="checkbox" 
                                        checked={notifications.stockAlerts}
                                        onChange={() => toggleNotification('stockAlerts')}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}