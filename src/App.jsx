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


function App() {

    const [user, setUser] = useState(null);
    const handleLogout = () => {
        setUser(null);
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
            {/* Normal User */}
            <Route element={<UserLayout />}>
                <Route index element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="products" element={<Product />} />
                <Route path="product-detail" element={<ProductDetail />} />
                <Route path="wishlist" element={<Wishlist />} />
                <Route path="profile" element={<Profile />} />
                <Route path="orders" element={<OrderHistory />} />
                <Route path="settings" element={<Settings />} />
                
            </Route>

            {/* Login */}
            <Route path="/login" element={<Login onLogin={setUser} />}/>
            {/* register */}
            <Route path="register" element={<Register />} />

            {/* Admin */}
            <Route element={<ProtectedRoute user={user} allowedRole="admin" />}>
                <Route element={<ProtectedRoute user={user} allowedRole="admin" />}>
                    <Route element={<AdminLayout handleLogout={handleLogout}/>}>
                        <Route path="/admin/dashboard" element={<AdminDashboard />} />
                        {/* <Route path="/admin/orders" element={<Orders />} />
                        <Route path="/admin/customers" element={<Customers />} />
                        <Route path="/admin/settings" element={<Settings />} /> */}
                    </Route>
                </Route>
            </Route>

            {/* Access denied */}
            <Route path="/unauthorized" element={<h1>Access Denied</h1>} />

            {/* Unknown URLs */}
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
)
}

export default App;