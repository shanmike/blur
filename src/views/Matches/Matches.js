import React from 'react';
import Navbar from '../../components/Navbar/Navbar'
import './Matches.css'
import Match from '../../components/Match/Match'

export default class Matches extends React.Component{
    render(){
        return(
            <div className="matches-container">
                <Navbar/>
                <Match/>
            </div>
        )
    }
}