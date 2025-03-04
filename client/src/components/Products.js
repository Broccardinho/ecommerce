import React, { Component} from "react";
import {Link, withRouter} from "react-router-dom";
import axios from "axios";
import { SERVER_HOST, ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN} from "../config/global_constants";
class Products extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: [],
            originalProducts: []
        }

    }

    componentDidMount()
    {
        axios.get(`${SERVER_HOST}/products`).then(res => {
            if (res.data) {
                if (res.data.errorMessage) {
                    console.log(res.data.errorMessage)
                } else {
                    console.log("Products have been successfully retrieved/read")

                    this.setState({
                        products: res.data,
                        originalProducts: res.data
                    })
                }
            }
        })
            .catch(error =>{
                console.log("Error retrieving products")
                console.log(error)
            })
    }
    handleProductClick = (productId) => {
        console.log("Product clicked: ", productId)
        this.props.history.push(`/productsPage/${productId}`)
    }
        render()
        {
            return (
                <div>
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