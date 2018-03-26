import React, { Component } from 'react';
import './Login.css'

export default class Login extends Component {
    render() {
        return (
            <div className='box login_container'> 
                <div className="box app-name">Blur</div>          
                <div className="box app-btn-container">
                    <a href={ process.env.REACT_APP_LOGIN}>
                        <button className="login-button">Login / Register</button>
                    </a>
                </div>
            </div> 
        )
    }
}