import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import SearchBar from "../components/SearchBar";

export default class Header extends Component {
    render() {
        return (
            <header className="App-header">
                <Link to="/">
                    <Logo />
                </Link>

                <nav className="nav-links">
                    <Link to="/products">Products</Link>
                    <Link to="/login">login</Link>
                </nav>
            </header>
        )
    }
}