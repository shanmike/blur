import React from 'react';
import Navbar from '../../components/Navbar/Navbar'
import ProfileInputStyle from '../ProfileInputStyle/ProfileInputStyle'
import Search from './Images/lnr-magnifier-orange.svg'
import './Match.css'

export default class Match extends React.Component{
    render(){
        return(
            <div className="match-child">
                <div></div>
                <div className="match-white-container">
                    <div className="match-search-container">
                        <img className="search-img" src={Search} alt=""/>
                        <ProfileInputStyle name="Search New Matches" />
                    </div>
                    <div className="new-match-container">
                        <div className="match-title">New Matches</div>
                        <div className="new-matches">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <div className="match-message-container">
                         <div className="match-title">Message</div>
                         <div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                         </div>
                    </div>
                </div>
                <div></div>
            </div>
        )
    }
}