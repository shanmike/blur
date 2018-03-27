import React from 'react';
// import ProfileInputStyle from '../ProfileInputStyle/ProfileInputStyle'
// import Search from './Images/lnr-magnifier-orange.svg'
import './Match.css'
import Preview from '../Preview/Preview'

export default class Match extends React.Component{
    constructor(){
        super()
        this.state = {
            search: ''
        }
    }
        handleChange(value, key){
            this.setState({
                [key]:value
            })
        }
    render(){
        return(
            <div className="match-child">
                <div className="match-white-container">
                    <div className="match-search-container">
                       
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