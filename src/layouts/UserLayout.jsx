import Header from "../components/layout/Header"
import { Outlet, Link } from "react-router-dom"

function UserLayout({ handleLogout }) {
    return (
        <div className="user-container">
            <Header handleLogout={handleLogout} />
            <main className="">
                <Outlet context={{ handleLogout }}/>
            </main>
        </div>
    )
}

export default UserLayout;