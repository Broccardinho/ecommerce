import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class searchBar extends Component {
    constructor(props) {
        super();
        this.state = {
            query: "",
        }
    }

    handleChange = (e) => {
        this.setState({ query: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.query.trim()) {
            console.log("Search query: ", this.state.query);
        }
    }
    render() {
        return (
            <form className="search-bar" onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    placeholder="Search Products"
                    value={this.state.query}
                    onChange={this.handleChange}
                    className="search-input"
                />
                <button type="submit" className="search-button">
                    Search
                </button>
            </form>
        )
    }
}