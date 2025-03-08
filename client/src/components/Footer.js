import React from "react"
import { Link } from "react-router-dom"
import Logo from "../components/Logo"

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <Logo />
                </div>

                <div className="footer-links">
                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/ContactUs">Contact us</Link>
                    <Link to="/PrivacyPolicy">Privacy Policy</Link>
                    <Link to="/TermsAndConditions">Terms and Conditions</Link>
                </div>
                <div className="social-media">
                    <a href="https://facebook.com" target ="_blank" rel = "noopener">Facebook</a>
                    <a href="https://x.com/RMA_Bek/status/1891250846769320299" target ="_blank" rel = "noopener">Twitter</a>
                    <a href="https://instagram.com" target ="_blank" rel = "noopener">Instagram</a>
            </div>
                <p>&copy; {new Date().getFullYear()} INSERT NAME. All rights reserved</p>
        </div>
        </footer>
    )
}
export default Footer