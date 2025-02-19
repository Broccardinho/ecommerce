import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";

export default class Products extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            originalProducts: [],
            search: "",
            selectedCategory: "",
            sortBy: "",
        };
    }

    // Fetch all products from API
    componentDidMount() {
        axios.get(`${SERVER_HOST}/Products`).then((res) => {
            if (res.data) {
                if (res.data.errorMessage) {
                    console.error(res.data.errorMessage);
                } else {
                    console.log("Products have been successfully retrieved!");
                    this.setState({
                        products: res.data,
                        originalProducts: res.data,
                    });
                }
            }
        });
    }

    // Handle input changes for search field
    handleSearchChange = (event) => {
        const search = event.target.value;
        this.setState({ search }, this.filterProducts);
    };

    // Handle changes for category dropdown
    handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        this.setState({ selectedCategory }, this.filterProducts);
    };

    // Handle changes for sort dropdown
    handleSortChange = (event) => {
        const sortBy = event.target.value;
        this.setState({ sortBy }, this.filterProducts);
    };

    // Filter & sort the products based on user input
    filterProducts = () => {
        const { originalProducts, search, selectedCategory, sortBy } = this.state;

        let filteredProducts = originalProducts;

        // Filter by search value
        if (search) {
            filteredProducts = filteredProducts.filter((product) =>
                product.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Filter by category
        if (selectedCategory) {
            filteredProducts = filteredProducts.filter(
                (product) => product.category === selectedCategory
            );
        }

        // Sort by price or name
        if (sortBy) {
            filteredProducts = filteredProducts.sort((a, b) => {
                if (sortBy === "price") {
                    return a.price - b.price;
                } else if (sortBy === "name") {
                    return a.name.localeCompare(b.name);
                }
                return 0; // Default case
            });
        }

        // Set the state with the final result
        this.setState({ products: filteredProducts });
    };

    render() {
        const { products, search, selectedCategory, sortBy } = this.state;

        return (
            <div>
                <h1>Products</h1>

                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={this.handleSearchChange}
                />

                {/* Category Dropdown */}
                <select value={selectedCategory} onChange={this.handleCategoryChange}>
                    <option value="">All Categories</option>
                    <option value="Guitars">Guitars</option>
                    <option value="Pianos">Pianos</option>
                    <option value="Drums">Drums</option>
                </select>

                {/* Sort Dropdown */}
                <select value={sortBy} onChange={this.handleSortChange}>
                    <option value="">Sort By</option>
                    <option value="price">Price</option>
                    <option value="name">Name</option>
                </select>

                {/* Product List */}
                <div>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product._id}>
                                <p>Name: {product.name}</p>
                                <p>Category: {product.category}</p>
                                <p>Price: ${product.price}</p>
                                <p>Brand: {product.brand}</p>
                                <p>Stock: {product.stock}</p>
                                <p>Description: {product.description}</p>
                            </div>
                        ))
                    ) : (
                        <p>No products found.</p>
                    )}
                </div>
            </div>
        );
    }
}