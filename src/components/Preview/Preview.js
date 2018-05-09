import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'
import './Preview.css'

export default class Preview extends Component {
    constructor(){
        super()
        this.state={
            userMatches:[]
        }
    }
    componentDidMount(){
        axios.get('/getMatches').then(res=>{
            // console.log('Get Matches', res.data)
            this.setState({
                userMatches:res.data
            })
        })
    }
  render() {
    // console.log("MATCHES FOR USER", this.state.userMatches)
    const matches = this.state.userMatches.map((e,i)=>{
        return (
            <div className="preview-user-match" key={i}>
                <Link to='/message' className="preview-btn">
                    <img className="preview-image" src={e.picture} alt=""/>
                    <div className="preview-name">{e.name}</div>
                </Link>
            </div>
        )
    })
    return (
      <div className="preview-container">
            {matches}                  
      </div>
    );
  }
}

