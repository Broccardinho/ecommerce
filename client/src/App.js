import React, {Component} from "react"
import {BrowserRouter, Switch, Route, Link} from "react-router-dom"
import Home from "./components/Home"
import ProductsPage from "./components/productPage"
import Register from "./components/Register"
import Login from "./components/Login"
import Products from "./components/Products";
import Header from "./components/Header"
import LoggedInRoute from "./components/LoggedInRoute";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import DeleteProduct from "./components/DeleteProduct";
import { ACCESS_LEVEL_GUEST } from "./config/global_constants";
import AdminPage from "./components/AdminPage";

import "bootstrap/dist/css/bootstrap.css"
import "./css/App.css"

if (typeof localStorage.accessLevel === "undefined") {
    localStorage.name = "GUEST"
    localStorage.accessLevel = ACCESS_LEVEL_GUEST
    localStorage.token = null
}
    
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
                        <Route path="/AdminPage" component={AdminPage} />
                        <LoggedInRoute exact path="/AddProduct" component={AddProduct} />
                        <LoggedInRoute exact path="/EditProduct" component={EditProduct} />
                        <LoggedInRoute exact path="/DeleteProduct" component={DeleteProduct} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}