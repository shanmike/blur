import React, { Component } from 'react';

import Navbar from '../../components/Navbar/Navbar'
import Buttons from '../../components/Buttons/Buttons'
import List from '../../components/List/List'
import './Home.css'

export default class Home extends Component {
    

    render() {
        
        return (
            <div className="home-container">
                <Navbar/>
                <div></div>
                <List/>
                <div></div>
                <Buttons/>  
            </div> 
        )
    }
}

