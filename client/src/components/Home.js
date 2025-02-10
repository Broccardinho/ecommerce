import React, {Component} from "react"
import {BrowserRouter, Link} from "react-router-dom";

export default class Home extends Component {
    render() {
        return (
            <div>
                <nav>
                    <Link to="/Products" className="btn btn-primary">Go to products</Link>
                    <Link to="/register" className="btn btn-primary">Register</Link>
                </nav>
                <h1>Welcome to the Home Page!</h1>
                <p>Explore our products and enjoy shopping!!!</p>
            </div>
        );
    }
}