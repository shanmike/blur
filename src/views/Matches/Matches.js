import React from 'react';
import Navbar from '../../components/Navbar/Navbar'
import './Matches.css'

export default class Matches extends React.Component{
    render(){
        return(
            <div className="matches-container">
                <Navbar/>
                <div></div>
                <div className="matches-child">
                    <div></div>
                    <div className="matches-white-container">Matches</div>
                    <div></div>
                </div>
            </div>
        )
    }
}