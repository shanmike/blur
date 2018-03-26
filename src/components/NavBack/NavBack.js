import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './NavBack.css'
import imguser from './Images/backbutton.svg'

export default class Navbar extends Component {
  render() {
    return (
      <div className="navbar-container">
        <div className="nav-btn">
          <Link to="/matches"><img src={imguser} alt="" className="user-img"/></Link>    
        </div>
        <div className="f-logo-btn">
          <Link to='/home' className="f-btn">B</Link>
        </div>
        <div className="nav-btn">
            
        </div>
      </div>
    );
  }
}