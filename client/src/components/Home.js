import React, {Component} from "react"
import {BrowserRouter, Link} from "react-router-dom";

export default class Home extends Component {
    constructor(props) {
        super(props);
        console.log(sessionStorage)
    }


    render() {
        return (
            <div>
                <nav>
                    <Link to="/Products" className="btn btn-primary">Go to products</Link>
                    {/*<Link to="/register" className="btn btn-primary">Register</Link>*/}
                    <Link to="/login" className="btn btn-primary">Login</Link>
                </nav>
                <h1>Welcome to the Home Page!</h1>
                <p>Explore our products and enjoy shopping!!!</p>
            </div>
        );
    }
}