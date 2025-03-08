import React, {Component} from "react";
import axios from "axios";
import {SERVER_HOST} from "../config/global_constants";
import {Redirect, withRouter} from "react-router-dom";

class EditProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            category: "",
            imgURL: "",
            price: "",
            brand: "",
            stock: "",
            description: "",
            errorMessage: "",
            redirectToProducts: false,
        }
    }

    componentDidMount() {
        const productId = this.props.match.params.productId

        axios.get(`${SERVER_HOST}/products/${productId}`)
            .then((res) => {
                if (res.data) {
                    this.setState({
                        name: res.data.name,
                        category: res.data.category,
                        imgURL: res.data.imgURL,
                        price: res.data.price,
                        brand: res.data.brand,
                        stock: res.data.stock,
                    })
                }
            })
            .catch((err) => {
                console.log("Error fetching product", err)
                if (err.response && err.response.status === 404) {
                    this.setState({errorMessage: "Product not found"})
                } else {
                    this.setState({errorMessage: "An error occurred while fetching the product"})
                }
            })
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    handleSubmit = (e) => {
        e.preventDefault()

        const token = sessionStorage.getItem("token")
        if(!token){
            console.log("No token found")
            this.setState({errorMessage: "You must be logged in to update a product"})
            return
        }

        const productID = this.props.match.params.productId
        const updatedProduct = {
            name: this.state.name,
            category: this.state.category,
            imgURL: this.state.imgURL,
            price:parseInt(this.state.price),
            brand: this.state.brand,
            stock: parseInt(this.state.stock),
            description: this.state.description,
        }
        axios.put(`${SERVER_HOST}/products/${productID}`, updatedProduct,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
            })
            .then((res) => {
                if (res.data) {
                    if(res.data.errorMessage){
                        console.log(res.data.errorMessage)
                    } else {
                        console.log("Product successfully updated")
                        this.props.history.push("/products")
                    }
                } else {
                    console.log("Error updating product")
                    this.setState({errorMessage: "An error occurred while updating the product"})
                }
            })
            .catch((err) => {
                console.log("Error updating product", err)
                this.setState({errorMessage: "An error occurred while updating the product"})
            })
    }

    render() {
        if (this.state.redirectToProducts) {
            return <Redirect to="/products"/>
        }
        return (
            <div className="form-container">
                <h2>Edit Product</h2>
                {this.state.errorMessage && <div className="error">{this.state.errorMessage}</div>}

                <form onSubmit={this.handleSubmit}>
                    <label>Name: </label>
                    <input
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        required
                    />
                    <label>Category: </label>
                    <input
                        type="text"
                        name="category"
                        value={this.state.category}
                        onChange={this.handleChange}
                        required
                    />
                    <label>Image URL: </label>
                    <input
                        type="text"
                        name="imgURL"
                        value={this.state.imgURL}
                        onChange={this.handleChange}
                        required
                    />
                    <label>Price: </label>
                    <input
                        type="number"
                        name="price"
                        value={this.state.price}
                        onChange={this.handleChange}
                        required
                    />
                    <label>Brand: </label>
                    <input
                        type="text"
                        name="brand"
                        value={this.state.brand}
                        onChange={this.handleChange}
                        required
                    />
                    <label>Stock: </label>
                    <input
                        type="number"
                        name="stock"
                        value={this.state.stock}
                        onChange={this.handleChange}
                        required
                    />
                    <label>Description: </label>
                    <textarea
                        name="description"
                        value={this.state.description}
                        onChange={this.handleChange}
                        required
                    />

                    <button type="submit">Update Product</button>
                </form>
            </div>
        )
    }
}

export default withRouter(EditProduct)