import Sidebar from "../components/layout/Sidebar";
import "./AdminLayout.css"

function AdminLayout({ children }) {
    return (
        <div className="admin-layout">
            <Sidebar />

            <main className="admin-main">

            <section className="admin-content">
                { children }
            </section>
            </main>
        </div>
    )
}

export default AdminLayout;