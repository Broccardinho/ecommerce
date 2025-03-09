import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../scss/alex_styles.scss";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thank you for contacting us! We will get back to you soon.");
        setFormData({
            name: "",
            email: "",
            message: "",
        });
    };

    return (
        <div className="contact-us-container">
            <div className="contact-us-card">
                <h1>Contact Us</h1>

                {/* Contact Information Section */}
                <div className="contact-info">
                    <h2>Get in Touch</h2>
                    <p><strong>Phone:</strong> +353 1 234 5678</p>
                    <p><strong>Email:</strong> info@pianovibe.com</p>
                    <p><strong>Address:</strong> 123 quays, Dublin, Ireland</p>
                </div>

                {/* Contact Form */}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message:</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>

                <Link to="/" className="back-home">Back to Home</Link>
            </div>
        </div>
    )
}

export default ContactUs