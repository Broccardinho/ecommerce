// Reference
// https://derek.comp.dkit.ie/ Client-Side Access Level Control

import React, { Component } from "react";
import axios from "axios";
import { ACCESS_LEVEL_ADMIN, SERVER_HOST } from "../config/global_constants";
import { Redirect } from "react-router-dom";
import Form from "react-bootstrap/Form";
import LinkInClass from "./old/LinkInClass";
import { Link } from "react-router-dom";

export default class AddProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            category: "",
            brand: "",
            price: "",
            stock: "",
            description: "",
            redirectToDisplayAllProducts: sessionStorage.accessLevel < ACCESS_LEVEL_ADMIN
        };
    }

    componentDidMount() {
        this.inputToFocus.focus();
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const product = {
            name: this.state.name,
            category: this.state.category,
            brand: this.state.brand,
            price: this.state.price,
            stock: this.state.stock,
            description: this.state.description
        };

        axios.post(`${SERVER_HOST}/products`, product)
            .then(res => {
                if (res.data.errorMessage) {
                    console.log(res.data.errorMessage);
                } else {
                    console.log("Record added");
                    this.setState({ redirectToDisplayAllProducts: true });
                }
            })
            .catch(err => console.log("Record not added", err));
    };

    render() {
        return (
            <div className="form-container">
                {this.state.redirectToDisplayAllProducts ? <Redirect to="/Products" /> : null}

                <Form>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control ref={(input) => { this.inputToFocus = input }} type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" name="category" value={this.state.category} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="brand">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type="text" name="brand" value={this.state.brand} onChange={this.handleChange} />
                    </Form.Group>

                    <LinkInClass value="Add" className="green-button" onClick={this.handleSubmit} />

                    <Link className="red-button" to="/Products">Cancel</Link>
                </Form>
            </div>
        );
    }
}
