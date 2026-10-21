import Sidebar from "../components/admin/Sidebar";
import "./AdminLayout.css"
import { Outlet } from "react-router-dom"

function AdminLayout({ handleLogout }) {
    return (
        <div className="admin-layout">
            <Sidebar onLogout={handleLogout} />

            <main className="admin-main">

            <section className="admin-content">
                <Outlet />  
            </section>
            </main>
        </div>
    )
}

export default AdminLayout;