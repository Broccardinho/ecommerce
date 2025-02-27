import React, { Component} from "react";
import {Link} from "react-router-dom";

export default class Productspage extends Component {
    render(){
        return (
            <div>
                    <div className="cards-container" >
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
                        )}</div>

                <h1>----------</h1>
                <Link to="/">Go Home</Link>
            </div>
        )
    }
}