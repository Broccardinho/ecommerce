import React, {Component} from "react"
import axios from "axios"
import { SERVER_HOST } from "../config/global_constants";

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            errorMessage: "",
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    handleSubmit = async (e) => {
        e.preventDefault();

        const {email, password} = this.state;

        if (!email || !password) {
            this.setState({errorMessage: "Please fill in all fields"});
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.setState({errorMessage: "Please enter a valid email address"});
            return;
        }

        try {
            const response = await axios.post(`${SERVER_HOST}/login`, email, password);

            sessionStorage.setItem("authToken", response.data.token);
            sessionStorage.setItem("user", JSON.stringify(response.data.user));

            window.location.href = "/"
        } catch (err) {
            this.setState({errorMessage: "Invalid email address or password"});
        }

        console.log("Form submitted", {email, password});

        this.setState({email: "", password: ""});
    }


    render() {
        return (
            <div className="login-container">
                <h2>Login</h2>
                {this.state.errorMessage && <p className="errorMessage">{this.state.errorMessage}</p>}
                <form onSubmit={this.handleSubmit}>
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