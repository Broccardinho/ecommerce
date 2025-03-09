import React from "react";
import "../scss/alex_styles.scss"


const AboutUs = () => {
    return (
        <div className="about-us">
            <div className="about-us-content">
                <h1>About Us</h1>
                <p className="tagline">Your Trusted Source for Musical Excellence</p>

                <div className="about-section">
                    <h2>Who We Are</h2>
                    <p>
                        Welcome to <strong>Melody Mart</strong>, Ireland's premier destination for high-quality musical instruments.
                        Based in the heart of Dublin, we are passionate about bringing the joy of music to everyone.
                        Whether you're a beginner picking up your first instrument or a seasoned musician looking for an upgrade,
                        we’ve got you covered.
                    </p>
                </div>

                <div className="about-section">
                    <h2>Our Mission</h2>
                    <p>
                        At Melody Mart, our mission is simple: to provide the finest musical instruments and accessories
                        at affordable prices. We believe that music is a universal language, and everyone deserves access
                        to the tools they need to express themselves. From pianos and guitars to violins and beyond,
                        we curate our collection with care to ensure every product meets our high standards.
                    </p>
                </div>

                <div className="about-section">
                    <h2>Why Choose Us?</h2>
                    <ul>
                        <li>
                            <strong>Wide Selection</strong>: From classical to contemporary, we offer a diverse range of
                            instruments to suit every style and skill level.
                        </li>
                        <li>
                            <strong>Expert Advice</strong>: Our team of music enthusiasts is here to guide you, whether
                            you're choosing your first guitar or upgrading your piano.
                        </li>
                        <li>
                            <strong>Fast Delivery</strong>: We deliver across Ireland and beyond, ensuring your instrument
                            arrives safely and on time.
                        </li>
                        <li>
                            <strong>Customer Satisfaction</strong>: Your happiness is our priority. We offer hassle-free
                            returns and a 1-year warranty on all products.
                        </li>
                    </ul>
                </div>

                <div className="about-section">
                    <h2>Our Story</h2>
                    <p>
                        Melody Mart was founded in 2015 by a group of musicians who wanted to create a one-stop shop
                        for all things music. What started as a small store in Dublin has grown into a thriving online
                        business, serving customers across Ireland and Europe. We’re proud to be part of Ireland’s
                        vibrant music scene and are committed to supporting local artists and communities.
                    </p>
                </div>

                <div className="about-section">
                    <h2>Visit Us</h2>
                    <p>
                        If you're in Dublin, come visit our store! Our friendly staff would love to help you find the
                        perfect instrument. You can also join us for free workshops and events to connect with fellow
                        music lovers.
                    </p>
                    <p>
                        <strong>Address</strong>: 123 Music Lane, Dublin, Ireland<br />
                        <strong>Phone</strong>: +353 1 234 5678<br />
                        <strong>Email</strong>: info@melodymart.com
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AboutUs