import Header from "../components/layout/Header"
import { Outlet, Link } from "react-router-dom"
import Footer from '../components/layout/Footer'

function UserLayout({ handleLogout }) {
    return (
        <div className="user-container">
            <Header handleLogout={handleLogout} />
            <main className="">
                <Outlet context={{ handleLogout }}/>
            </main>
            <Footer handleLogout={handleLogout} />
        </div>
    )
}

export default UserLayout;