import { Icon } from "@iconify/react";

function Sidebar() {
    const menuItems = [
        { icon: "solar:home-2-bold", label: "Dashboard", href: "#dashboard"},
        { icon: "solar:cart-3-bold", label: "Orders", href: "#orders"},
        { icon: "solar:users-group-two-rounded-bold", label: "Customers", href: "#customers"},
        { icon: "solar:settings-bold", label: "Settings", href: "#settings"},
    ];
    return (
        <aside className="admin-sidebar">
            <div className="sidebar-brand">
                <img src="src/assets/images/logo2.png" alt="" />
            </div>
            <nav className="sidebar-menu">
                {menuItems.map((item, index) => 
                <a href={item.href} key={item.label} className={`sidebar-link ${ index === 0 ?  "active" : ""}`}>
                    <span className="sidebar-icon">
                        <Icon icon={item.icon}/>
                    </span>
                    <span>{item.label}</span>
                </a> )}
            </nav>
            <div className="sidebar-bottom">
                <p>Cherry Cheek © 2026</p>
            </div>
        </aside>
    )
}

export default Sidebar;