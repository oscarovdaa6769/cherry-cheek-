import "../../App.css";
import { Icon } from "@iconify/react";
import logoLight from '../../assets/images/logo.png'
import logoDark from '../../assets/images/logo2.png'
import { useEffect, useState } from "react";

function Header() {
    const [theme, setTheme] = useState(localStorage.getItem('app-theme') || 'light');

    useEffect(() => {
        const updateTheme = () => {
            setTheme(localStorage.getItem('app-theme') || 'light');
        };

        window.addEventListener('themeChanged', updateTheme);
        return () => window.removeEventListener('themeChanged', updateTheme);
    }, []);
    return (
        <header>
            <nav>
                <a href="/">
                    <img src={theme === 'dark' ? logoDark : logoLight} alt="Cherry Cheek" />
                </a>
                <ul>
                    <li><a className="nav-btn" href="/">Home</a></li>
                    <li><a className="nav-btn" href="/products">Product</a></li>
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