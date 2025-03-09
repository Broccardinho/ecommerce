import React, { Component } from "react";
import { Link } from "react-router-dom";
import { SERVER_HOST } from "../config/global_constants";
import axios from "axios";

export default class ProductsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
            loading: true,
        };
    }

    componentDidMount() {
        const { productId } = this.props.match.params;

        axios
            .get(`${SERVER_HOST}/products/${productId}`)
            .then((res) => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage);
                    } else {
                        console.log("Product has been successfully retrieved/read");
                        this.setState({
                            product: res.data,
                            loading: false,
                        });
                    }
                }
            })
            .catch((error) => {
                console.log("Error retrieving product");
                console.log(error);
                this.setState({ loading: false });
            });
    }

    render() {
        const { product, loading } = this.state;
        if (loading) {
            return <div>Loading...</div>;
        }
        if (!product) {
            return <div>Product not found</div>;
        }
        return (
            <div className="product-page-container">
                <div className="product-image-section">
                    <img src={product.imgURL} alt={product.name} />
                </div>
                <div className="product-details-section">
                    <h1>{product.name}</h1>
                    <p className="price">${product.price}</p>
                    <p className="brand">Brand: {product.brand}</p>
                    <p className="category">Category: {product.category}</p>
                    <p className="stock">Stock: {product.stock}</p>
                    <p className="description">{product.description}</p>
                    <div className="actions">
                        <button>Add to Cart</button>
                        <button>Buy Now</button>
                    </div>
                </div>
            </div>
        );
    }
}