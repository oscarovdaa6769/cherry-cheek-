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
    const [menuOpen, setMenuOpen] = useState(false);

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

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    const closeMenu = () => {
        setMenuOpen(false);
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
            <nav className="header-nav">
                <Link to="/" onClick={closeMenu} className="logo-container">
                    <img src={theme === 'dark' ? logoDark : logoLight} alt="Cherry Cheek" className="header-logo" />
                </Link>

                {/* Desktop Menu */}
                <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    <li><Link className="nav-btn" to="/" onClick={closeMenu}>Home</Link></li>
                    <li><Link className="nav-btn" to="/products" onClick={closeMenu}>Product</Link></li>
                    <li><Link className="nav-btn" to="/about" onClick={closeMenu}>About</Link></li>
                    <li><Link className="nav-btn" to="/contact" onClick={closeMenu}>Contact</Link></li>
                </ul>

                <div className="header-right">
                    {/* Action Icons */}
                    <div className="mini-icon">
                        <Link to="/profile" aria-label="Profile" onClick={closeMenu}>
                            <Icon icon="solar:user-bold" className="icon"/>
                        </Link>

                        {/* Cart Icon with Badge */}
                        <Link to="/cart" className="icon-badge-wrapper" aria-label="Cart" onClick={closeMenu}>
                            <Icon icon="solar:cart-3-bold" className="icon"/>
                            {cartCount > 0 && (
                                <span className="nav-badge">{cartCount > 99 ? '99+' : cartCount}</span>
                            )}
                        </Link>

                        {/* Wishlist Icon with Badge */}
                        <Link to="/wishlist" className="icon-badge-wrapper" aria-label="Wishlist" onClick={closeMenu}>
                            <Icon icon="solar:bookmark-bold" className="icon"/>
                            {wishlistCount > 0 && (
                                <span className="nav-badge">{wishlistCount > 99 ? '99+' : wishlistCount}</span>
                            )}
                        </Link>
                    </div>

                    {/* Hamburger Button for Mobile */}
                    <button className="menu-toggle-btn" onClick={toggleMenu} aria-label="Toggle navigation">
                        <Icon icon={menuOpen ? "solar:close-square-bold" : "solar:hamburger-menu-bold"} />
                    </button>
                </div>
            </nav>
        </header>
    );
}

export default Header;