import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './Navbar.css'
import imguser from './Images/lnr-user.svg'
import imgmsg from './Images/lnr-bubble.svg'

export default class Navbar extends Component {
  render() {
    return (
      <div className="navbar-container">
        <div className="nav-btn">
          <Link to="/profile"><img src={imguser} alt="" className="user-img"/></Link>    
        </div>
        <div className="f-logo-btn">
          <Link to='/home' className="f-btn">B</Link>
        </div>
        <div className="nav-btn">
            <Link to="/matches"><img src={imgmsg} alt="" className="user-img"/></Link>
        </div>
      </div>
    );
  }
}

