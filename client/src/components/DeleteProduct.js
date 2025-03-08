import React, {Component} from "react";
import axios from "axios";
import {SERVER_HOST} from "../config/global_constants";
import {withRouter} from "react-router-dom";

class DeleteProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirectToProducts: false,
            errorMessage: "",
        }
    }

    componentDidMount() {
        const productId = this.props.match.params.productId

        axios.delete(`${SERVER_HOST}/products/${productId}`)
            .then((res) => {
                if (res.data) {
                    if (res.data.error) {
                        this.setState({errorMessage: res.data.error})
                    } else {
                        console.log("Product deleted successfully")
                        this.setState({redirectToProducts: true})
                    }
                } else {
                    console.log("Error deleting product")
                }
            })
            .catch((err) => {
                console.log("Error deleting product", err)
                this.setState({errorMessage: "An error occurred while deleting the product"})
            })
    }

    render() {
        return (
            <div>
                {this.state.redirectToProducts ? window.location.href = "/products" : null}
                {this.state.errorMessage &&
                    <div
                        className="error">{this.state.errorMessage}
                    </div>
                }
            </div>
        )
    }
}
export default withRouter(DeleteProduct)