import React, {Component} from "react"
import axios from "axios"
import {Redirect} from "react-router-dom"
import {SANDBOX_CLIENT_ID, SERVER_HOST} from "../config/global_constants"
import PayPalMessage from "./PayPalMessage"
import {PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js"


export default class Checkout extends Component
{
    createOrder = (data, actions) =>
    {
        return actions.order.create({purchase_units:[{amount:{value:this.props.price}}]})
    }


    onApprove = paymentData =>
    {
        console.log("PayPal payment successful")
    }


    onError = errorData =>
    {
        console.log("PayPal payment error")
    }


    onCancel = cancelData =>
    {
        console.log("PayPal payment cancelled")
    }


    render()
    {
        return (
            <div>
                <PayPalScriptProvider options={{currency:"EUR", "client-id":SANDBOX_CLIENT_ID }}>
                    <PayPalButtons style={{layout: "horizontal"}} createOrder={this.createOrder} onApprove={this.onApprove} onError={this.onError} onCancel={this.onCancel}/>
                </PayPalScriptProvider>
            </div>
        )}
}