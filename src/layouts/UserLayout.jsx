import Header from "../components/layout/Header"
import { Outlet, Link } from "react-router-dom"

function UserLayout() {
    return (
        <div className="user-container">
            <Header />
            <main className="">
                <Outlet />
            </main>
        </div>
    )
}

export default UserLayout;