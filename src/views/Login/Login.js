import React, { Component } from 'react';
import './Login.css'

export default class Login extends Component {
    render() {
        return (
            <div className='box login_container'> 
                <div></div>
                <div className="box app-logo"></div>
                <div></div>
                <div></div>
                <div className="box app-name">Blur</div>
                <div></div>
                <div></div>
                <div className="box app-btn-container">
                    <a href={ process.env.REACT_APP_LOGIN_DEV}>
                                <button className="login-button">Login / Register</button>
                    </a>
                </div>
            </div> 
        )
    }
}