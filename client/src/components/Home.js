import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component {
    constructor(props) {
        super(props);
        console.log(sessionStorage);
    }

    render() {
        return (
            <div>
                <nav>
                    <Link to="/Products" className="btn btn-primary">Go to products</Link>
                    <Link to="/login" className="btn btn-primary">Login</Link>
                </nav>
                <h1>Welcome to the Home Page!</h1>
                <p>Explore our products and enjoy shopping!!!</p>

                {/* Cards Section */}
                <div className="cards-container">
                    <div className="card">
                        <img src="https://pianocentre.com/wp-content/uploads/images/products/products-yam-u1-super_c.jpg" alt="Product 1" />
                        <p>Check out our latest products!</p>
                    </div>
                    <div className="card">
                        <img src="https://www.coachhousepianos.co.uk/wp-content/uploads/2024/07/Steinway-D-2.jpg" alt="Product 2" />
                        <p>Exclusive deals available now!</p>
                    </div>
                    <div className="card">
                        <img src="https://promusica.ie/wp-content/uploads/2023/01/fp30xbk_angle_gal.jpg" alt="Product 3" />
                        <p>Shop the best quality items!</p>
                    </div>
                </div>
            </div>
        );
    }
}
