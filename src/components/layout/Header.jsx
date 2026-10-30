import "../../App.css";
import { Icon } from "@iconify/react";
import logoLight from '../../assets/images/logo.png';
import logoDark from '../../assets/images/logo2.png';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header() {
    const [theme, setTheme] = useState(localStorage.getItem('app-theme') || 'light');
    const [cartCount, setCartCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);

    // Calculate item counts from localStorage
    const updateCounts = () => {
        try {
            const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            const totalCartQty = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
            setCartCount(totalCartQty);

            const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
            setWishlistCount(wishlistItems.length);
        } catch (e) {
            setCartCount(0);
            setWishlistCount(0);
        }
    };

    useEffect(() => {
        // Initial count calculation
        updateCounts();

        // Theme listener
        const updateTheme = () => {
            setTheme(localStorage.getItem('app-theme') || 'light');
        };

        // Listen for storage changes across tabs and custom local events
        window.addEventListener('themeChanged', updateTheme);
        window.addEventListener('storage', updateCounts);
        window.addEventListener('cartUpdated', updateCounts);
        window.addEventListener('wishlistUpdated', updateCounts);

        return () => {
            window.removeEventListener('themeChanged', updateTheme);
            window.removeEventListener('storage', updateCounts);
            window.removeEventListener('cartUpdated', updateCounts);
            window.removeEventListener('wishlistUpdated', updateCounts);
        };
    }, []);

    return (
        <header>
            <nav>
                <Link to="/">
                    <img src={theme === 'dark' ? logoDark : logoLight} alt="Cherry Cheek" />
                </Link>
                <ul>
                    <li><Link className="nav-btn" to="/">Home</Link></li>
                    <li><Link className="nav-btn" to="/products">Product</Link></li>
                    <li><Link className="nav-btn" to="/about">About</Link></li>
                    <li><Link className="nav-btn" to="/contact">Contact</Link></li>
                </ul>
                <div className="mini-icon">
                    <Link to="/profile" aria-label="Profile">
                        <Icon icon="solar:user-bold" className="icon"/>
                    </Link>

                    {/* Cart Icon with Badge */}
                    <Link to="/cart" className="icon-badge-wrapper" aria-label="Cart">
                        <Icon icon="solar:cart-3-bold" className="icon"/>
                        {cartCount > 0 && (
                            <span className="nav-badge">{cartCount > 99 ? '99+' : cartCount}</span>
                        )}
                    </Link>

                    {/* Wishlist Icon with Badge */}
                    <Link to="/wishlist" className="icon-badge-wrapper" aria-label="Wishlist">
                        <Icon icon="solar:bookmark-bold" className="icon"/>
                        {wishlistCount > 0 && (
                            <span className="nav-badge">{wishlistCount > 99 ? '99+' : wishlistCount}</span>
                        )}
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default Header;