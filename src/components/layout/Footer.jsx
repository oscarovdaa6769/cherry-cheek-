import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import './Footer.css';
import LogoFooter from '../../assets/images/logo.png'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <img src={LogoFooter} alt="" />
                    <p className="footer-description">
                        Your go-to destination for premium skincare and cosmetic products.
                    </p>
                </div>

                <div className="footer-links">
                    <div className="footer-col">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><Link to="/home">Home</Link></li>
                            <li><Link to="/products">Products</Link></li>
                            <li><Link to="/wishlist">Wishlist</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Customer Care</h4>
                        <ul>
                            <li><Link to="/profile">My Account</Link></li>
                            <li><Link to="/orders">Order History</Link></li>
                            <li><Link to="/settings">Settings</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Connect</h4>
                        <div className="footer-socials">
                            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                                <Icon icon="akar-icons:instagram-fill" />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                                <Icon icon="akar-icons:facebook-fill" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
                                <Icon icon="bi:twitter-x" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Cherry Cheek. All rights reserved.</p>
            </div>
        </footer>
    );
}