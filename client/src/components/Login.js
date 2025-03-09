import React, {Component} from "react"
import axios from "axios"
import {ACCESS_LEVEL_GUEST, SERVER_HOST} from "../config/global_constants"
import {Redirect} from "react-router-dom"
import "../scss/alex_styles.scss"

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            isLoggedIn: false,
            errorMessage: "",
            errors: {}, // Add errors to state
        }
    }

    validate = () => {
        const errors = {}
        const {email, password} = this.state
        let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        if (!email.trim()) {
            errors.email = "Email is required"
        } else if (!emailRegex.test(email)) {
            errors.email = "Invalid email format"
        }
        if (!password.trim()) {
            errors.password = "Password is required"
        }
        return errors
    }
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const errors = this.validate()
        if (Object.keys(errors).length > 0) {
            this.setState({errors})
            return
        }

        const credentials = {
            email: this.state.email,
            password: this.state.password,
            redirect: sessionStorage.redirect || "/",
        }
        console.log(credentials)

        axios
            .post(`${SERVER_HOST}/users/login`, credentials)
            .then((res) => {
                sessionStorage.setItem("token", res.data.token)
                sessionStorage.setItem("accessLevel", res.data.accessLevel.toString() || ACCESS_LEVEL_GUEST)

                sessionStorage.firstName = res.data.firstName
                sessionStorage.lastName = res.data.lastName
                sessionStorage.email = res.data.email

                this.setState({isLoggedIn: true}, () => {
                    window.location.reload()
                    window.location.href = "/"
                })
            })
            .catch((error) => {
                this.setState({errorMessage: error.response?.data?.message || "Login failed"})
            })
    }

    render() {
        if (this.state.isLoggedIn) {
            return <Redirect to="/"/>
        }
        return (
            <div className="auth-container">
                <div className="auth-card">
                    <h2>Login</h2>
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
                            {this.state.errors?.email && <div className="error">{this.state.errors.email}</div>}
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
                            {this.state.errors?.password && <div className="error">{this.state.errors.password}</div>}
                        </div>
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        )
    }
}