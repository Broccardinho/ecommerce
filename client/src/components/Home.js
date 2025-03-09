import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component {
    render() {
        return (
            <div>
                {/* Parallax Section */}
                <div className="parallax">
                    <div className="parallax-content">
                        <h1>PianoVibe</h1>
                    </div>
                </div>

                {/* Cards Section */}
                <div className="home-cards-container">
                    <div className="home-card">
                        <Link to="/Products">
                            <img src="https://pianocentre.com/wp-content/uploads/images/products/products-yam-u1-super_c.jpg" alt="Product 1" />
                            <p>Check out our latest products!</p>
                        </Link>
                    </div>
                    <div className="home-card">
                        <Link to="/Products">
                            <img src="https://www.coachhousepianos.co.uk/wp-content/uploads/2024/07/Steinway-D-2.jpg" alt="Product 2" />
                            <p>Exclusive deals available now!</p>
                        </Link>
                    </div>
                    <div className="home-card">
                        <Link to="/Products">
                            <img src="https://promusica.ie/wp-content/uploads/2023/01/fp30xbk_angle_gal.jpg" alt="Product 3" />
                            <p>Shop the best quality items!</p>
                        </Link>
                    </div>
                </div>

                {/* About Section */}
                <div className="about-section">
                    <h2>Read More About Us Here</h2>
                    <Link to="/AboutUs" className="about-link">Learn More</Link>
                </div>
            </div>
        );
    }
}