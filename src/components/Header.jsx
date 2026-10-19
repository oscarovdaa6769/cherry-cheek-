import "../App.css";
import { Icon } from "@iconify/react";

function Header() {
    return (
        <header>
            <nav>
                <img src="public/logo.png" alt="" />
                <ul>
                    <li><a className="nav-btn" href="/">Home</a></li>
                    <li><a className="nav-btn" href="/product">Product</a></li>
                    <li><a className="nav-btn" href="/about">About</a></li>
                    <li><a className="nav-btn" href="/contact">Contact</a></li>
                </ul>
                <div className="mini-icon">
                    <a href="/profile">
                        <Icon icon="solar:user-bold" className="icon"/>
                    </a>
                    <a href="/cart">
                        <Icon icon="solar:cart-3-bold" className="icon"/>
                    </a>
                    <a href="/wishlist">
                        <Icon icon="solar:bookmark-bold" className="icon"/>
                    </a>
                </div>
            </nav>
        </header>
    )
}

export default Header;