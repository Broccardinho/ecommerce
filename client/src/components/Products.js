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
        }
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

    render() {
        const accessLevel = parseInt(sessionStorage.accessLevel, 10) || ACCESS_LEVEL_GUEST

        // Debugging logs
        console.log("Access Level in Products:", accessLevel)
        console.log("ACCESS_LEVEL_ADMIN:", ACCESS_LEVEL_ADMIN)

        return (
            <div>
                    <div className="cards-container">
                        {this.state.products.map((product, index) => (
                            <div
                                className="card"
                                key={index}
                                onClick={() => this.handleProductClick(product._id)}
                            >
                                <p>{product["name"]}</p>
                                <p>{product["category"]}</p>
                                <img src={product.imgURL} alt={product.name} width="200"/>
                                <p>{product["price"]}</p>
                                <p>{product["brand"]}</p>
                                <p>{product["stock"]}</p>
                                {accessLevel === ACCESS_LEVEL_ADMIN ? (
                                    <div>
                                        <button className="btn btn-warning"
                                                onClick={() => this.props.history.push(`/EditProduct/${product._id}`)}>
                                            Edit Product
                                        </button>
                                        <button className="btn btn-danger"
                                                onClick={(e) => {e.stopPropagation(); this.deleteProduct(product._id)}}>
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
        )
    }
}

export default withRouter(Products)