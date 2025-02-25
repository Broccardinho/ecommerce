import React, {Component} from "react"
import axios from "axios"
import { ACCESS_LEVEL_GUEST , SERVER_HOST } from "../config/global_constants"
import {Redirect} from "react-router-dom"

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: "",
            isLoggedIn: false,
            errorMessage: "",
        }
        // this.handleSubmit = this.handleSubmit.bind(this)
        // this.handleChange = this.handleChange.bind(this)
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) =>
    {
        e.preventDefault()

        const credentials = {
            email: this.state.email,
            password: this.state.password,
            redirect: sessionStorage.redirect || '/',
        }
        console.log(credentials)

        axios.post(`${SERVER_HOST}/users/login`, credentials)
            .then(res => {
                sessionStorage.setItem("token", res.data.token)
                sessionStorage.setItem("accessLevel", res.data.accessLevel || ACCESS_LEVEL_GUEST)

                sessionStorage.firstName = res.data.firstName
                sessionStorage.lastName = res.data.lastName
                sessionStorage.email = res.data.email
                this.setState({ isLoggedIn: true })
            })
            .catch(error =>{
                this.setState({errorMessage: error.response?.data?.message || 'Login failed'})
            })
    }

    render() {
        if(this.state.isLoggedIn){
            return <Redirect to='/' />
        }
        return (
            <div className="login-container">
                <h2>Login</h2>

                {this.state.isLoggedIn ? <Redirect to="/"/> : null}

                {this.state.errorMessage && <p className="errorMessage">{this.state.errorMessage}</p>}
                <form onSubmit={this.handleSubmit} noValidate>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            required
                            />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                        type="password"
                        id="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        )
    }
}