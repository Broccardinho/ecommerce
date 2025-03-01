import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { SERVER_HOST, ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN } from "../config/global_constants";

export default class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            originalProducts: [], // Stores the unfiltered products
            searchInput: '',
            sortOrder: 'none',
            sortField: 'none' // NEW: Determines whether sorting is by "price" or "stock"
        };
    }

    componentDidMount() {
        axios.get(`${SERVER_HOST}/Products`)
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage);
                    } else {
                        console.log("Products have been successfully retrieved/read");
                        this.setState({
                            products: res.data,
                            originalProducts: res.data
                        });
                    }
                }
            })
            .catch(error => {
                console.log("Error retrieving products");
                console.log(error);
            });
    }

    handleSearchChange = e => {
        this.setState({ searchInput: e.target.value.toLowerCase() });
    };

    handleSortOrderChange = e => {
        const [sortOrder, sortField] = e.target.value.split('-');
        this.setState({ sortOrder, sortField });
    };

    getFilteredProducts = () => {
        const { originalProducts, searchInput, sortOrder, sortField } = this.state;

        let filteredProducts = originalProducts.filter(product =>
            product.name.toLowerCase().includes(searchInput) ||
            product.category.toLowerCase().includes(searchInput) ||
            product.brand.toLowerCase().includes(searchInput)
        );

        if (sortField !== 'none' && sortOrder !== 'none') {
            filteredProducts.sort((a, b) => {
                if (sortOrder === 'asc') {
                    return a[sortField] - b[sortField]; // Ascending
                } else {
                    return b[sortField] - a[sortField]; // Descending
                }
            });
        }

        return filteredProducts;
    };

    render() {
        const filteredProducts = this.getFilteredProducts();

        return (
            <div>
                <input type="text" placeholder="Search products..." onChange={this.handleSearchChange} />

                <select onChange={this.handleSortOrderChange}>
                    <option value="none-none">Default Sorting</option>
                    <option value="asc-price">Price: Low to High</option>
                    <option value="desc-price">Price: High to Low</option>
                    <option value="asc-stock">Stock: Low to High</option>
                    <option value="desc-stock">Stock: High to Low</option>
                </select>

                {sessionStorage.accesslevel !== ACCESS_LEVEL_GUEST ? (
                    <div className="cards-container">
                        {filteredProducts.map((product, index) => (
                            <div className="card" key={index}>
                                <p>{product.name}</p>
                                <p>{product.category}</p>
                                <img src={product.imgURL} alt={product.name} width="200"/>
                                <p>Price: €{product.price}</p>
                                <p>Brand: {product.brand}</p>
                                <p>Stock: {product.stock}</p>
                            </div>
                        ))}
                    </div>
                ) : null}

                <h1>----------</h1>
                <Link to="/">Go Home</Link>
            </div>
        );
    }
}
