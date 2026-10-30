import { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import Button from '../../components/common/Button';
import './AdminSettings.css';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [showToast, setShowToast] = useState(false);

  const [generalSettings, setGeneralSettings] = useState({
    storeName: 'Cherry Cheek',
    contactEmail: 'support@cherrycheek.com',
    currency: 'USD ($)',
    lowStockThreshold: 5,
    timezone: '(GMT+07:00) Phnom Penh',
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    lowStockAlerts: true,
    newOrderAlerts: false,
    weeklyReport: true,
  });

  // Custom Dropdown open states
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  // Close custom dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectChange = (field, value) => {
    setGeneralSettings((prev) => ({ ...prev, [field]: value }));
    setOpenDropdown(null);
  };

  const handleGeneralChange = (e) => {
    const { name, value } = e.target;
    setGeneralSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('admin_settings', JSON.stringify({ generalSettings, notifications }));
    
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const currencyOptions = ['USD ($)', 'EUR (€)', 'GBP (£)', 'KHR (៛)'];
  const timezoneOptions = [
    '(GMT+07:00) Phnom Penh, Bangkok, Hanoi',
    '(GMT+00:00) UTC',
  ];

  return (
    <div className="admin-settings-container" ref={dropdownRef}>
      <div className="settings-header">
        <div>
          <h1>Store Settings</h1>
          <p>Manage your admin preferences, store configurations, and alert behaviors.</p>
        </div>
        {showToast && (
          <div className="settings-toast">
            <Icon icon="solar:check-circle-bold" />
            <span>Settings saved successfully!</span>
          </div>
        )}
      </div>

      {/* Upgraded Consistent Tabs Navigation */}
      <div className="settings-tabs">
        <button
          type="button"
          className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          <Icon icon="solar:shop-bold" />
          General Store
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          <Icon icon="solar:bell-bold" />
          Notifications
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          <Icon icon="solar:shield-keyhole-bold" />
          Security
        </button>
      </div>

      <form onSubmit={handleSave} className="settings-form-card">
        {activeTab === 'general' && (
          <div className="settings-section">
            <div className="section-title">
              <h3>General Configuration</h3>
              <p>Basic information and operational parameters for Cherry Cheek.</p>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="storeName">Store Name</label>
                <div className="input-wrapper">
                  <Icon icon="solar:shop-linear" className="input-icon" />
                  <input
                    type="text"
                    id="storeName"
                    name="storeName"
                    value={generalSettings.storeName}
                    onChange={handleGeneralChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="contactEmail">Support Email</label>
                <div className="input-wrapper">
                  <Icon icon="solar:letter-linear" className="input-icon" />
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    value={generalSettings.contactEmail}
                    onChange={handleGeneralChange}
                  />
                </div>
              </div>

              {/* Custom Dropdown: Display Currency */}
              <div className="form-group">
                <label>Display Currency</label>
                <div className="custom-dropdown-container">
                  <div 
                    className={`custom-dropdown-header ${openDropdown === 'currency' ? 'open' : ''}`}
                    onClick={() => setOpenDropdown(openDropdown === 'currency' ? null : 'currency')}
                  >
                    <Icon icon="solar:wad-of-money-linear" className="input-icon" />
                    <span className="dropdown-selected-text">{generalSettings.currency}</span>
                    <Icon icon="solar:alt-arrow-down-linear" className={`dropdown-chevron ${openDropdown === 'currency' ? 'rotate' : ''}`} />
                  </div>
                  
                  {openDropdown === 'currency' && (
                    <div className="custom-dropdown-list">
                      {currencyOptions.map((opt) => (
                        <div 
                          key={opt}
                          className={`custom-dropdown-item ${generalSettings.currency === opt ? 'selected' : ''}`}
                          onClick={() => handleSelectChange('currency', opt)}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="lowStockThreshold">Low Stock Alert Quantity</label>
                <div className="input-wrapper">
                  <Icon icon="solar:box-minimalistic-linear" className="input-icon" />
                  <input
                    type="number"
                    id="lowStockThreshold"
                    name="lowStockThreshold"
                    value={generalSettings.lowStockThreshold}
                    onChange={handleGeneralChange}
                  />
                </div>
              </div>

              {/* Custom Dropdown: Store Timezone */}
              <div className="form-group full-width">
                <label>Store Timezone</label>
                <div className="custom-dropdown-container">
                  <div 
                    className={`custom-dropdown-header ${openDropdown === 'timezone' ? 'open' : ''}`}
                    onClick={() => setOpenDropdown(openDropdown === 'timezone' ? null : 'timezone')}
                  >
                    <Icon icon="solar:globus-linear" className="input-icon" />
                    <span className="dropdown-selected-text">{generalSettings.timezone}</span>
                    <Icon icon="solar:alt-arrow-down-linear" className={`dropdown-chevron ${openDropdown === 'timezone' ? 'rotate' : ''}`} />
                  </div>
                  
                  {openDropdown === 'timezone' && (
                    <div className="custom-dropdown-list">
                      {timezoneOptions.map((tz) => (
                        <div 
                          key={tz}
                          className={`custom-dropdown-item ${generalSettings.timezone === tz ? 'selected' : ''}`}
                          onClick={() => handleSelectChange('timezone', tz)}
                        >
                          {tz}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="settings-section">
            <div className="section-title">
              <h3>Notification Preferences</h3>
              <p>Choose what alerts and system updates you want to receive.</p>
            </div>

            <div className="toggle-list">
              <div className="toggle-group">
                <div className="toggle-info">
                  <Icon icon="solar:letter-unread-linear" className="toggle-icon" />
                  <div>
                    <h4>Email Alerts</h4>
                    <p>Receive critical system updates and customer inquiry summaries.</p>
                  </div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={notifications.emailAlerts}
                    onChange={() => handleToggle('emailAlerts')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="toggle-group">
                <div className="toggle-info">
                  <Icon icon="solar:danger-triangle-linear" className="toggle-icon" />
                  <div>
                    <h4>Low Stock Warning</h4>
                    <p>Get alerted immediately when product variants drop below the threshold.</p>
                  </div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={notifications.lowStockAlerts}
                    onChange={() => handleToggle('lowStockAlerts')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="toggle-group">
                <div className="toggle-info">
                  <Icon icon="solar:cart-large-2-linear" className="toggle-icon" />
                  <div>
                    <h4>New Order Placement</h4>
                    <p>Real-time notifications when a user checks out an order.</p>
                  </div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={notifications.newOrderAlerts}
                    onChange={() => handleToggle('newOrderAlerts')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="toggle-group">
                <div className="toggle-info">
                  <Icon icon="solar:chart-square-linear" className="toggle-icon" />
                  <div>
                    <h4>Weekly Performance Summary</h4>
                    <p>Receive a digest of weekly store sales and user visits.</p>
                  </div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={notifications.weeklyReport}
                    onChange={() => handleToggle('weeklyReport')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="settings-section">
            <div className="section-title">
              <h3>Admin Security</h3>
              <p>Update your password and manage session privileges.</p>
            </div>

            <div className="form-grid">
              <div className="form-group full-width">
                <label>Current Password</label>
                <div className="input-wrapper">
                  <Icon icon="solar:lock-password-linear" className="input-icon" />
                  <input type="password" placeholder="••••••••••••" />
                </div>
              </div>

              <div className="form-group">
                <label>New Password</label>
                <div className="input-wrapper">
                  <Icon icon="solar:key-linear" className="input-icon" />
                  <input type="password" placeholder="At least 8 characters" />
                </div>
              </div>

              <div className="form-group">
                <label>Confirm New Password</label>
                <div className="input-wrapper">
                  <Icon icon="solar:key-minimalistic-linear" className="input-icon" />
                  <input type="password" placeholder="Re-enter new password" />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="settings-actions">
          <Button name="Save Changes" type="submit" />
        </div>
      </form>
    </div>
  );
}