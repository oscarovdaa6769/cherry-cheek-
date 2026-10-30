import { Icon } from "@iconify/react";
import logoImage from '../../assets/images/logo2.png';
import miniLogoImage from '../../assets/images/mini-logo2.png'; // 1. Import mini logo
import { NavLink } from "react-router-dom";
import logoLight from '../../assets/images/logo2.png';
import logoDark from '../../assets/images/logo.png';
import miniLogoLight from '../../assets/images/mini-logo2.png';
import miniLogoDark from '../../assets/images/mini-logo1.png';
import { useEffect, useState } from "react";

function Sidebar({ onLogout }) {
    const [theme, setTheme] = useState(localStorage.getItem('app-theme') || 'light');
    const menuItems = [
        { icon: "solar:home-2-bold", label: "Dashboard", href: "/admin/dashboard"},
        { icon: "solar:cart-3-bold", label: "Orders", href: "/admin/orders"},
        { icon: "solar:users-group-two-rounded-bold", label: "Customers", href: "/admin/customers"},
        { icon: "solar:settings-bold", label: "Settings", href: "/admin/settings"},
    ];

    return (
        <aside className="admin-sidebar">
            <div className="sidebar-brand">
                {/* 2. Render both logos */}
                <img src={theme === 'dark' ? logoDark : logoLight} alt="Cherry Cheek" />
                <img src={theme === 'dark' ? miniLogoDark : miniLogoLight} alt="Cherry Cheek" className="logo-mini"/>
            </div>
            <nav className="sidebar-menu">
                {menuItems.map((item) => (
                    <NavLink 
                      to={item.href} 
                      key={item.label} 
                      end 
                      className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
                    >
                        <span className="sidebar-icon">
                            <Icon icon={item.icon} />
                        </span>
                        <span className="sidebar-label">{item.label}</span>
                    </NavLink>
                ))}
            </nav>
            <div className="sidebar-footer">
                <button type="button" className="sidebar-link logout-btn" onClick={onLogout}>
                    <span className="sidebar-icon">
                        <Icon icon="solar:logout-3-bold" />
                    </span>
                    <span className="sidebar-label">Logout</span>
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;