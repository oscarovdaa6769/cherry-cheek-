import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout"

import AdminDashboard from "./pages/admin/Dashboard";
import { Home } from "./pages/user/Home";
import { Product } from "./pages/user/Product";
import ProductDetail from "./pages/user/ProductDetail";
import Profile from "./pages/user/Profile"
import Login from "./pages/Login";
import React, { useState } from 'react';

import "./App.css"
import Wishlist from "./pages/user/Wishlist";


function App() {

    const [user, setUser] = useState(null);
    const handleLogout = () => {
        setUser(null);
    };
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
            </Route>

            {/* Login */}
            <Route path="/login" element={<Login onLogin={setUser} />}/>

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