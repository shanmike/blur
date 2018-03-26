import React from 'react';
import ProfileInputStyle from '../ProfileInputStyle/ProfileInputStyle'
import Search from './Images/lnr-magnifier-orange.svg'
import './Match.css'
import Preview from '../Preview/Preview'

export default class Match extends React.Component{
    render(){
        return(
            <div className="match-child">
                <div className="match-white-container">
                    <div className="match-search-container">
                        <img className="search-img" src={Search} alt=""/>
                        <ProfileInputStyle keyValue={'search'} name="Search New Matches" />
                    </div>
                    <div className="new-match-container">
                        <div className="match-title">New Matches</div>
                        <div className="new-matches">
                            
                        </div>
                    </div>
                    <div className="match-message-container">
                         <div className="match-title">Message</div>
                         <Preview/>
                    </div>
                </div>
            </div>
        )
    }
}