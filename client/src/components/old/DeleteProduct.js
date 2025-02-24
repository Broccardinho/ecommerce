import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import axios from "axios"

import {SERVER_HOST} from "../../config/global_constants"

export default class DeleteProduct extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            redirectToDisplayAllProduct:false
        }
    }

    componentDidMount()
    {
        axios.delete(`${SERVER_HOST}/products/${this.props.id}`)
            .then((res)=> {
                if (res.data) {
                    if (res.data.errorMessage)
                    {
                        console.log(res.data.errorMessage)
                    }
                    else
                    {
                        this.setState({redirectToDisplayAllProduct:true})
                    }
                }
                else
                {
                    console.log("Error deleting product")
                }
            })

        render()
        {
            return (
                <div>
                    {this.state.redirectToDisplayAllProduct ? <Redirect to="/DisplayallProducts"/> : null}
                </div>
            )
        }
    }
}