import React from "react"
import { Link } from "react-router-dom"
import "../scss/alex_styles.scss"

const TermsAndConditions = () => {
    return (
        <div className="terms-and-conditions">
            <div className="terms-and-conditions-content">
                <h1>Terms and Conditions</h1>
                <p>
                    Welcome to our e-commerce site. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions.
                </p>
                <h2>1. Use of the Site</h2>
                <p>
                    You agree to use this site only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the site.
                </p>
                <h2>2. Intellectual Property</h2>
                <p>
                    All content on this site, including text, graphics, logos, and images, is the property of our company and is protected by intellectual property laws.
                </p>
                <h2>3. Limitation of Liability</h2>
                <p>
                    We are not liable for any damages arising from the use of this site, including but not limited to direct, indirect, incidental, or consequential damages.
                </p>
                <Link to="/">Back to Home</Link>
            </div>
        </div>
    )
}

export default TermsAndConditions