import React, { Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants";

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
    }
        render()
        {
            return (
                <div>
                    {sessionStorage.accesslevel > ACCESS_LEVEL_GUEST ?
                    <div className="cards-container">
                    {this.state.products.map(product =>

                        <div className="card" key={product.id}>
                        <p>{product["name"]}</p>
                        <p>{product["category"]}</p>
                        <img src={product.imgURL} alt={product.name} width="200" />
                        <p>{product["price"]}</p>
                        <p>{product["brand"]}</p>
                        <p>{product["stock"]}</p>
                        {/*<p>{product["description"]}</p>*/}
                        </div>
                    )}</div>:null
                    }
                    {sessionStorage.accesslevel < ACCESS_LEVEL_ADMIN ?
                        <div className="AddProduct">
                            <LINK className="btn btn-primary" to={"/AddProduct"}>ADD PRODUCT</LINK>
                        </div>
                        : null
                    }

                    <h1>----------</h1>
                    <Link to="/">Go Home</Link>
                </div>
            )
        }
}