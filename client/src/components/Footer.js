import React from "react"
import {Link} from "react-router-dom"
import Logo from "../components/Logo"

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <Link to="/">
                        <Logo/>
                    </Link>
                </div>
                <div className="footer-links">
                    <div className="left-links">
                        <Link to="/">Home</Link>
                        <Link to="/products">Products</Link>
                    </div>
                    <div className="middle-links">
                        <Link to="/ContactUs">Contact us</Link>
                        <Link to="/PrivacyPolicy">Privacy Policy</Link>
                        <Link to="/TermsAndConditions">Terms and Conditions</Link>
                    </div>
                    <div className="right-links">
                        <a href="https://facebook.com" target="_blank" rel="noopener">Facebook</a>
                        <a href="https://x.com/RMA_Bek/status/1891250846769320299" target="_blank"
                           rel="noopener">Twitter</a>
                        <a href="https://instagram.com" target="_blank" rel="noopener">Instagram</a>
                    </div>
                </div>
                <p className="copyright">
                    &copy; {new Date().getFullYear()} INSERT NAME. All rights reserved
                </p>
            </div>
        </footer>
    )
}
export default Footer