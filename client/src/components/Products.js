import React, {Component} from "react"
import {Link, withRouter} from "react-router-dom"
import axios from "axios"
import {SERVER_HOST, ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN} from "../config/global_constants"

class Products extends Component {
    constructor(props) {
        super(props)

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
        axios
            .get(`${SERVER_HOST}/products`)
            .then((res) => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    } else {
                        console.log("Products have been successfully retrieved/read")

                        this.setState({
                            products: res.data,
                            originalProducts: res.data,
                        })
                    }
                }
            })
            .catch((error) => {
                console.log("Error retrieving products")
                console.log(error)
            })
    }

    handleProductClick = (productId) => {
        console.log("Product clicked: ", productId)
        this.props.history.push(`/productsPage/${productId}`)
    }
    handleEditClick = (productId,e) => {
        e.stopPropagation()
        console.log("Edit clicked: ", productId)
        this.props.history.push(`/EditProduct/${productId}`)
    }

    deleteProduct = (productId) => {
        if (window.confirm("Are you sure you want to Delete this Product?")) {
            const token = sessionStorage.getItem("token")

            axios.delete(`${SERVER_HOST}/products/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => {
                    if (res.data) {
                        if (res.data.errorMessage) {
                            console.log(res.data.errorMessage)
                        } else {
                            console.log("Product successfully deleted")
                            this.componentDidMount()
                        }
                    } else {
                        console.log("Error deleting product")
                    }
                })
                .catch((err) => {
                    console.log("Error deleting product", err)
                })
        }
    }

    handleSearchChange = e => {
        this.setState({ searchInput: e.target.value.toLowerCase() }, this.applyFilters);
    };

    handleSortOrderChange = e => {
        const [sortOrder, sortField] = e.target.value.split('-');
        this.setState({ sortOrder, sortField }, this.applyFilters);
    };

    handleBrandChange = e => {
        this.setState({ brandFilter: e.target.value }, this.applyFilters);
    };

    handleCategoryChange = e => {
        this.setState({ categoryFilter: e.target.value }, this.applyFilters);
    };

    applyFilters = () => {
        const { originalProducts, searchInput, sortOrder, sortField, brandFilter, categoryFilter } = this.state;

        let filteredProducts = originalProducts.filter(product =>
            (product.name.toLowerCase().includes(searchInput) ||
                product.category.toLowerCase().includes(searchInput) ||
                product.brand.toLowerCase().includes(searchInput)) &&
            (brandFilter === '' || product.brand === brandFilter) &&
            (categoryFilter === '' || product.category === categoryFilter)
        );
//
        if (sortField !== 'none' && sortOrder !== 'none') {
            filteredProducts.sort((a, b) => {
                const aValue = parseFloat(a[sortField]);
                const bValue = parseFloat(b[sortField]);
                if (sortOrder === 'asc') {
                    return aValue - bValue;
                } else {
                    return bValue - aValue;
                }
            });
        }

        this.setState({ products: filteredProducts });
    };

    render() {
        const accessLevel = parseInt(sessionStorage.accessLevel, 10) || ACCESS_LEVEL_GUEST;
        const { products, searchInput, brandFilter, categoryFilter } = this.state;
        const uniqueBrands = [...new Set(this.state.originalProducts.map(product => product.brand))];
        const uniqueCategories = [...new Set(this.state.originalProducts.map(product => product.category))];

        return (
            <div className="page-container">
                <div className="filters-container">
                    <input
                        type="text"
                        placeholder="Search products..."
                        onChange={this.handleSearchChange}
                    />
                    <select value={brandFilter} onChange={this.handleBrandChange}>
                        <option value="">All Brands</option>
                        {uniqueBrands.map(brand => (
                            <option key={brand} value={brand}>{brand}</option>
                        ))}
                    </select>

                    <select value={categoryFilter} onChange={this.handleCategoryChange}>
                        <option value="">All Categories</option>
                        {uniqueCategories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>

                    <select onChange={this.handleSortOrderChange}>
                        <option value="none-none">Default Sorting</option>
                        <option value="asc-price">Price: Low to High</option>
                        <option value="desc-price">Price: High to Low</option>
                        <option value="asc-stock">Stock: Low to High</option>
                        <option value="desc-stock">Stock: High to Low</option>
                    </select>
                </div>

                <div className="products-container">
                    <div className="cards-container">
                        {this.state.products.map((product, index) => (
                            <div
                                className="card"
                                key={index}
                                onClick={() => this.handleProductClick(product._id)}
                            >
                                <p>{product.name}</p>
                                <p>{product.category}</p>
                                <img src={product.imgURL} alt={product.name} width="200" />
                                <p>{product.price}</p>
                                <p>{product.brand}</p>
                                <p>{product.stock}</p>
                                {accessLevel === ACCESS_LEVEL_ADMIN ? (
                                    <div>
                                        <button
                                            className="btn btn-warning"
                                            onClick={() => this.props.history.push(`/EditProduct/${product._id}`)}
                                        >
                                            Edit Product
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={(e) => { e.stopPropagation(); this.deleteProduct(product._id); }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ) : null}
                            </div>
                        ))}
                    </div>
                    <h1>----------</h1>
                    <Link to="/">Go Home</Link>
                </div>
            </div>
        );
    }
}

export default withRouter(Products)