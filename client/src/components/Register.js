import React, {Component} from "react"
import {Redirect, Link, withRouter} from "react-router-dom"
import axios from "axios"
import {SERVER_HOST} from "../config/global_constants"

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName:"",
            lastName:"",
            email:"",
            password:"",
            confirmPassword:"",
            errors:{},
            isRegistered:false,
        }
    }

    handleChange = (e) =>
    {
        this.setState({[e.target.name]: e.target.value,
        errors:{...this.state.errors, [e.target.name]: ""}})
    }

    validate = () =>{
        const errors = {}
        const {firstName, lastName, email, password, confirmPassword} = this.state
        let vaidateEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        console.log({
            "First name":firstName,
            "Last name": lastName,
        })
        if(!firstName.trim()){
            errors.firstName = "First name is required"
        }
        if(!lastName.trim()){
            errors.lastName = "Last name is required"
        }
        if(!email.trim()){
            errors.email = "Email is required"
        }
        if(!email.trim() && !email.match(vaidateEmail)){
            errors.email = "Please enter a valid email"
        }
        if(!password.trim()){
            errors.password = "Password is required"
        }
        if(password.length < 7){
            errors.password = "Password must be at least 7 characters"
        }
        if(!confirmPassword.trim()){
            errors.confirmPassword = "Confirm password is required"
        }
        if(password !== confirmPassword){
            errors.confirmPassword = "Passwords do not match"
        }
        return errors
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const errors = this.validate()
        if(Object.keys(errors).length > 0){
            this.setState({errors})
            return
        }

        const userData={
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
        }


        axios.post('http://localhost:4000/users/register', userData)
        .then(response => {
            if (response.status === 200){
                this.setState({isRegistered:true})
            }
        })
        .catch(error => {
            this.setState({errorMessage: error.response?.data?.message || 'Registration failed' })
        })
    }

    render()
    {
        if(this.state.isRegistered){
            return(<Redirect to='/login' />)
        }
        return (
            <form className="form-container" noValidate = {true} id = "loginOrRegistrationForm">
                <h2>New User Registration</h2>
                <input
                    name = "firstName"
                    type = "text"
                    placeholder = "firstName"
                    autoComplete="firstName"
                    value = {this.state.firstName}
                    onChange = {this.handleChange}
                    ref = {(input) => { this.inputToFocus = input }}
                /><br/>
                <input
                    name = "lastName"
                    type = "text"
                    placeholder = "lastName"
                    autoComplete="lastName"
                    value = {this.state.lastName}
                    onChange = {this.handleChange}
                    ref = {(input) => { this.inputToFocus = input }}
                /><br/>

                <input
                    name = "email"
                    type = "email"
                    placeholder = "Email"
                    autoComplete="email"
                    value = {this.state.email}
                    onChange = {this.handleChange}
                /><br/>

                <input
                    name = "password"
                    type = "password"
                    placeholder = "Password"
                    autoComplete="password"
                    title = "*****"
                    value = {this.state.password}
                    onChange = {this.handleChange}
                /><br/>

                <input
                    name = "confirmPassword"
                    type = "password"
                    placeholder = "Confirm password"
                    autoComplete="confirmPassword"
                    value = {this.state.confirmPassword}
                    onChange = {this.handleChange}
                /><br/><br/>

                <button type="submit" className="green-button" onClick={this.handleSubmit}>Register</button>
                <Link className="green-button" to={"/login"}>Cancel</Link>
            </form>
        )
    }
}
export default withRouter(Register)