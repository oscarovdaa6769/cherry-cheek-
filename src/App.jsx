import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout"

import AdminDashboard from "./pages/admin/Dashboard";
import { Home } from "./pages/user/Home";
import { Product } from "./pages/user/Product";
import ProductDetail from "./pages/user/ProductDetail";
import Profile from "./pages/user/Profile"
import Login from "./pages/Login";
import { useState, useEffect } from 'react';

import "./App.css"
import Wishlist from "./pages/user/Wishlist";
import OrderHistory from "./pages/user/OrderHistory";
import Settings from "./pages/user/Setting";
import Register from "./pages/Register";
import AdminSettings from "./pages/admin/AdminSettings";


function App() {

    const [user, setUser] = useState(() => {
        try {
            const savedUser = JSON.parse(localStorage.getItem('user'));
            return (savedUser && typeof savedUser === 'object' && Object.keys(savedUser).length > 0) ? savedUser : null;
        } catch {
            return null;
        }
    });

    // FIX: Added 'userData' parameter here so it receives the login info properly
    const handleLogin = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('app-theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);

        const handleThemeChange = () => {
            const currentTheme = localStorage.getItem('app-theme') || 'light';
            document.documentElement.setAttribute('data-theme', currentTheme);
        };

        window.addEventListener('themeChanged', handleThemeChange);
        return () => window.removeEventListener('themeChanged', handleThemeChange);
    }, []);

    return (
        <Routes>
            {/* Normal User Routes */}
            <Route element={<UserLayout handleLogout={handleLogout} />}>
                <Route index element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="products" element={<Product />} />
                <Route path="product-detail" element={<ProductDetail />} />
                <Route path="wishlist" element={<Wishlist user={user} />} />
                <Route path="profile" element={<Profile user={user} />} />
                <Route path="orders" element={<OrderHistory user={user} />} />
                <Route path="settings" element={<Settings handleLogout={handleLogout} />} />
            </Route>

            {/* Login */}
            <Route path="/login" element={<Login onLogin={handleLogin} />}/>
            
            {/* Register */}
            <Route path="register" element={<Register />} />

            {/* Admin */}
            <Route element={<ProtectedRoute user={user} allowedRole="admin" />}>
                <Route element={<AdminLayout handleLogout={handleLogout}/>}>
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/settings" element={<AdminSettings />} />
                </Route>
            </Route>

            {/* Access denied */}
            <Route path="/unauthorized" element={<h1>Access Denied</h1>} />

            {/* Unknown URLs */}
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
    );
}

export default App;