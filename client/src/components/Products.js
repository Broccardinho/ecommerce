import React, { Component} from "react";
import {Link, withRouter} from "react-router-dom";
import axios from "axios";
import { SERVER_HOST, ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN} from "../config/global_constants";

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            originalProducts: [],
            searchInput: '',
            sortOrder: 'none',
            sortField: 'none',
            brandFilter: '',
            categoryFilter: ''
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
    handleProductClick = (productId) => {
        console.log("Product clicked: ", productId)
        this.props.history.push(`/productsPage/${productId}`)
    }
    handleSearchChange = e => {
        this.setState({ searchInput: e.target.value.toLowerCase() });
    };

    handleSortOrderChange = e => {
        const [sortOrder, sortField] = e.target.value.split('-');
        this.setState({ sortOrder, sortField });
    };

    handleBrandChange = e => {
        this.setState({ brandFilter: e.target.value });
    };

    handleCategoryChange = e => {
        this.setState({ categoryFilter: e.target.value });
    };

    getFilteredProducts = () => {
        const { originalProducts, searchInput, sortOrder, sortField, brandFilter, categoryFilter } = this.state;

        let filteredProducts = originalProducts.filter(product =>
            (product.name.toLowerCase().includes(searchInput) ||
                product.category.toLowerCase().includes(searchInput) ||
                product.brand.toLowerCase().includes(searchInput)) &&
            (brandFilter === '' || product.brand === brandFilter) &&
            (categoryFilter === '' || product.category === categoryFilter)
        );

        if (sortField !== 'none' && sortOrder !== 'none') {
            filteredProducts.sort((a, b) => {
                if (sortOrder === 'asc') {
                    return a[sortField] - b[sortField];
                } else {
                    return b[sortField] - a[sortField];
                }
            });
        }

        return filteredProducts;
    };
    render()
    {
        const filteredProducts = this.getFilteredProducts();
        const uniqueBrands = [...new Set(this.state.originalProducts.map(product => product.brand))];
        const uniqueCategories = [...new Set(this.state.originalProducts.map(product => product.category))];

        return (
            <div>
            <input type="text" placeholder="Search products..." onChange={this.handleSearchChange} />

        {/* Brand Filter by Cal */}
        <select onChange={this.handleBrandChange}>
            <option value="">All Brands</option>
            {uniqueBrands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
            ))}
        </select>

        {/*Filter by Cal*/}
        <select onChange={this.handleCategoryChange}>
            <option value="">All Categories</option>
            {uniqueCategories.map(category => (
                <option key={category} value={category}>{category}</option>
            ))}
        </select>

        {/*Sorting by Cal*/}
        <select onChange={this.handleSortOrderChange}>
            <option value="none-none">Default Sorting</option>
            <option value="asc-price">Price: Low to High</option>
            <option value="desc-price">Price: High to Low</option>
            <option value="asc-stock">Stock: Low to High</option>
            <option value="desc-stock">Stock: High to Low</option>
        </select>

                {sessionStorage.accesslevel !== ACCESS_LEVEL_GUEST ?
                    <div className="cards-container">
                        {this.state.products.map((product, index) =>
                            <div className="card" key={index} onClick={() => this.handleProductClick(product._id)}>
                                <p>{product["name"]}</p>
                                <p>{product["category"]}</p>
                                <img src={product.imgURL} alt={product.name} width="200"/>
                                <p>{product["price"]}</p>
                                <p>{product["brand"]}</p>
                                <p>{product["stock"]}</p>
                            </div>
                        )}</div>:null
                }
                {sessionStorage.accesslevel < ACCESS_LEVEL_ADMIN ?
                    <div className="AddProduct">
                        <Link className="btn btn-primary" to={"/AddProduct"}>ADD PRODUCT</Link>
                    </div>
                    : null
                }

                <h1>----------</h1>
                <Link to="/">Go Home</Link>
            </div>
        )
    }
}
export default withRouter(Products);