import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

import LinkInClass from "../components/LinkInClass";
import { ACCESS_LEVEL_NORMAL_USER, SERVER_HOST } from "../config/global_constants";

export default class EditCar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            category: "",
            brand: "",
            price: "",
            stock: "",
            description: "",
            redirectToDisplayAllProducts: sessionStorage.accessLevel < ACCESS_LEVEL_NORMAL_USER,
        };
    }

    componentDidMount() {
        this.inputToFocus.focus();

        axios.get(`${SERVER_HOST}/products/${this.props.match.params.id}`).then((res) => {
            if (res.data) {
                if (res.data.errorMessage) {
                    console.log(res.data.errorMessage);
                } else {
                    this.setState({
                        name: res.data.name,
                        category: res.data.category,
                        brand: res.data.brand,
                        price: res.data.price,
                        stock: res.data.stock,
                        description: res.data.description,
                    });
                }
            } else {
                console.log(`Record Not Found`);
            }
        });
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const productObject = {
            name: this.state.name,
            category: this.state.category,
            brand: this.state.brand,
            price: this.state.price,
            stock: this.state.stock,
            description: this.state.description,
        };

        axios.put(`${SERVER_HOST}/products/${this.props.match.params.id}`, productObject).then((res) => {
            if (res.data) {
                if (res.data.errorMessage) {
                    console.log(res.data.errorMessage);
                } else {
                    console.log(`Record Updated`);
                    this.setState({ redirectToDisplayAllProducts: true });
                }
            } else {
                console.log(`Record Not Updated`);
            }
        });
    };

    render() {
        return (
            <div className="form-container">
                {this.state.redirectToDisplayAllProducts ? <Redirect to="/products" /> : null}
                <Form>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control ref={(input) => (this.inputToFocus = input)} type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" name="category" value={this.state.category} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="brand">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type="text" name="brand" value={this.state.brand} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" name="price" value={this.state.price} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="stock">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control type="text" name="stock" value={this.state.stock} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" name="description" value={this.state.description} onChange={this.handleChange} />
                    </Form.Group>

                    <LinkInClass value="Update" className="green-button" onClick={this.handleSubmit} />

                    <Link className="red-button" to="/products">Cancel</Link>
                </Form>
            </div>
        );
    }
}
