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
import Logout from "./components/Logout"
import Footer from "./components/Footer";
import TermsAndConditions from "./components/TermsAndConditions";
import PrivacyPolicy from "./components/PrivacyPolicy";
import ContactUs from "./components/ContactUs";
import AboutUs from "./components/AboutUs";

import "./css/App.css"
import LoggedInAdminRoute from "./components/LoggedInAdminRoute";

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
                        <Route path ="/productsPage/:productId" component={ProductsPage} />
                        <Route path="/Register" component={Register} />
                        <Route path="/Login" component={Login} />
                        <Route path="/Logout" component={Logout} />
                        <Route path="/TermsAndConditions" component={TermsAndConditions} />
                        <Route path="/PrivacyPolicy" component={PrivacyPolicy} />
                        <Route path="/ContactUs" component={ContactUs} />
                        <Route path="/AboutUs" component={AboutUs}/>
                        <Route path="/EditProduct/:productId" component={EditProduct} />
                        <LoggedInAdminRoute exact path="/AdminPage" component={AdminPage} />
                        <LoggedInRoute exact path="/AddProduct" component={AddProduct} />
                        <LoggedInRoute exact path="/EditProduct" component={EditProduct} />
                        <LoggedInRoute exact path="/DeleteProduct" component={DeleteProduct} />
                    </Switch>
                    <Footer />
                </div>
            </BrowserRouter>
        )
    }
}