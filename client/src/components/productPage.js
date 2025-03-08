import React, { Component} from "react";
import {Link} from "react-router-dom";
import { SERVER_HOST } from "../config/global_constants";
import axios from "axios";

export default class ProductsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
            loading: true,
        }
    }

    componentDidMount() {
        const { productId } = this.props.match.params;

        axios.get(`${SERVER_HOST}/products/${productId}`).then(res => {
            if(res.data) {
                if(res.data.errorMessage){
                    console.log(res.data.errorMessage)
                }else {
                    console.log("Product has been successfully retrieved/read")
                    this.setState({
                        product: res.data,
                        loading: false
                    })
                }
            }
        })
        .catch(error => {
            console.log("Error retrieving product")
            console.log(error)
            this.setState({loading: false})
        })
    }

    render(){
        const { product, loading } = this.state;
        if(loading){
            return <div>Loading...</div>
        }
        if(!product){
            return <div>Product not found</div>
        }
        return (
            <div>
                <div className="cards-container">
                    <div className="card" key={product.id}>
                        <p>{product.name}</p>
                        <p>{product.category}</p>
                        <img src={product.imgURL} alt={product.name} width="200" />
                        <p>{product.price}</p>
                        <p>{product.brand}</p>
                        <p>{product.stock}</p>
                        <p>{product.description}</p>
                        {/*<p><Checkout price={product.price} /></p>*/}
                    </div>
                </div>
                <h1>----------</h1>
                <Link to="/">Go Home</Link>
            </div>
        )
    }
}