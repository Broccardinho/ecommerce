import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../scss/alex_styles.scss';

class Logout extends Component {
    handleLogout = (e) => {
        e.preventDefault()
        sessionStorage.clear()


        console.log("User has been logged out")
        this.props.history.push('/login')
    }

    render() {
        return (
            <div className="auth-container">
                <div className="auth-card">
                    <h2>Logout</h2>
                    <button className="charcoal-gray-button" onClick={this.handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        )
    }
}

export default Logout;