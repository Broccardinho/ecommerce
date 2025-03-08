import React from "react"
import { Link } from "react-router-dom"

const PrivacyPolicy = () => {
    return(
        <div className="privacy-policy">
            <h1>Privacy Policy</h1>
            <p>
                Your privacy is important to us. This privacy policy explains how we collect, use, and protect your personal information.
            </p>
            <h2>1. Information We Collect</h2>
            <p>
                We may collect personal information such as your name, email address, and payment details when you make a purchase or create an account.
            </p>
            <h2>2. How We Use Your Information</h2>
            <p>
                We use your information to process orders, improve our services, and communicate with you about your account or orders.
            </p>
            <h2>3. Data Security</h2>
            <p>
                We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure.
            </p>
            <Link to="/">Back to Home</Link>
        </div>
    )
}
export default PrivacyPolicy