import React, { Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import { SERVER_HOST, ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN} from "../config/global_constants";
export default class Products extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: [],
            originalProducts: []
        }

    }

    componentDidMount()
    {
        axios.get(`${SERVER_HOST}/Products`).then(res => {
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
        render()
        {
            return (
                <div>
                    {sessionStorage.accesslevel !== ACCESS_LEVEL_GUEST ?
                    <div className="cards-container">
                    {this.state.products.map((product, index) =>
                        <div className="card" key={index}>
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