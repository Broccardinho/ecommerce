import React, { Component} from "react";
import {Link} from "react-router-dom";

export default class Productspage extends Component {
    render(){
        return (
            <div>
                <h1>Products Page</h1>
                <Link to="/">Go Home</Link>
            </div>
        )
    }
}