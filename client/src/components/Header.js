import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import SearchBar from "../components/SearchBar";
import CartIcon from "./CartIcon";
import Profile from "./Profile";

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
                    <Link to="/register">register</Link>
                    <Link to="/logout">logout</Link>
                    <Link to="/profile">profile</Link>
                    <Link to="/checkout">Cart</Link>
                    <h1>Title</h1>

                    <SearchBar />

                    {/*<Link to="/cart">*/}
                    {/*    <CartIcon />*/}
                    {/*</Link>*/}
                </nav>
            </header>
        )
    }
}