import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Logout extends Component{
    handleLogout = (e) => {
        e.preventDefault()
        sessionStorage.clear()
        console.log("User has been logged out")
        this.props.history.push('/login')
    }
    render() {
        return (
            <div className="logout-container">
                <h2>Logout</h2>
                <a href="#" onClick={this.handleLogout}>Logout</a>
            </div>
        )
    }
}
export default Logout;