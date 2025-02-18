import React, {Component} from "react"
import axios from "axios"
import { SERVER_HOST } from "../config/global_constants";
import {Redirect} from "react-router-dom";

export default class Login extends Component {
    constructor(props){
        super(props);
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
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = (e) =>
    {
        e.preventDefault()

        const credentials = {
            email: this.state.email,
            password: this.state.password,
            // redirect: "/"
        }

        // axios.post('http://localhost:4000/users/login', credentials)
        //     .then(response => {
        //         console.log(response.data);
        //         if (response.data) {
        //             this.setState({isLoggedIn: true})
        //         }
        //
        //     })
        //     .catch(error => {
        //         console.error(error);
        //     });
        axios.post('http://localhost:4000/users/login', credentials)
            .then(res => {
                localStorage.setItem("token", res.data.token)
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