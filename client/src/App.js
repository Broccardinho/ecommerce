import React, {Component} from "react"
import {BrowserRouter, Switch, Route, Link} from "react-router-dom"
import Home from "./components/Home"
import ProductsPage from "./components/productPage"
import Register from "./components/Register"
import Login from "./components/Login"
import Products from "./components/Products";
import Header from "./components/Header"

import "bootstrap/dist/css/bootstrap.css"
import "./css/App.css"



    
export default class App extends Component 
{
    render() 
    {
        return (
            <BrowserRouter>

                <Header />
                <div className="container">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/Products" component={Products} />
                        <Route path ="/productsPage" component={ProductsPage} />
                        <Route path="/Register" component={Register} />
                        <Route path="/Login" component={Login} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}