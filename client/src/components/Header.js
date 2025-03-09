import React, {Component} from "react";
import {Link} from "react-router-dom";
import Logo from "./Logo";
import "../scss/alex_styles.scss"
import {ACCESS_LEVEL_GUEST} from "../config/global_constants";

export default class Header extends Component {

    render() {
        return (
            <header className="App-header">
                <Link to="/">
                    <Logo/>
                </Link>

                <div className="title">
                    <h1><Link to="/">Title</Link></h1>
                </div>

                <nav className="nav-links">
                    <Link to="/products">Products</Link>
                    <Link to="/aboutus">About Us</Link>
                    <Link to="/contactus">Contact Us</Link>
                    <Link to="/login">login</Link>
                    <Link to="/register">register</Link>
                    <Link to="/logout">logout</Link>
                </nav>
            </header>
        )
    }
}