import React, {Component} from "react";
import {Link} from "react-router-dom";
import Logo from "./Logo";
import "../scss/alex_styles.scss"
import {ACCESS_LEVEL_ADMIN} from "../config/global_constants";

export default class Header extends Component {

    render() {
        const isLoggedIn = sessionStorage.getItem("email");
        {console.log(isLoggedIn)}
        const accessLevel = sessionStorage.getItem("accessLevel");

        return (
            <header className="App-header">
                <Link to="/">
                    <Logo/>
                </Link>

                <div className="title">
                    <h1><Link to="/">PianoVibe</Link></h1>
                </div>

                <nav className="nav-links">
                    <Link to="/products">Products</Link>
                    <Link to="/aboutus">About Us</Link>
                    <Link to="/contactus">Contact Us</Link>

                    {!isLoggedIn && (
                        <>
                        <Link to="/login">login</Link>
                        <Link to="/register">register</Link>
                        </>
                    )}
                    {accessLevel === ACCESS_LEVEL_ADMIN.toString() && (
                        <Link to="/admin">Admin Page</Link>
                    )}

                    {isLoggedIn && (
                        <Link to="/logout">logout</Link>
                    )}
                </nav>
            </header>
        )
    }
}