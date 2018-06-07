import React, { Component } from 'react';
import './Buttons.css'
import Heart from './Images/Inr-heart.svg'
// import Arrow from './Images/lnr-arrow-left-circle.svg'
import Dislike from './Images/lnr-thumbs-down.svg'
import Like from './Images/lnr-thumbs-up.svg'
// import Premium from './Images/lnr-diamond.svg'

export default class Buttons extends Component {
  render() {
    return (
      <div className="buttons-container">
        {/* <div className="bottom-btn">
            <button className="bottom-buttons">
                <img src={Arrow} alt="" className="bottom-btn-img"/>
            </button>
        </div> */}
        <div className="bottom-btn">
            <button onClick={this.props.buttonProps.reject} className="bottom-buttons">
                <img src={Dislike} alt="" className="bottom-btn-img"/>
            </button>
        </div>
        <div className="bottom-btn">
            <button onClick={this.props.buttonProps.accept} className="bottom-buttons">
                <img src={Heart} alt="" className="bottom-btn-img"/>
            </button>
        </div>
        <div className="bottom-btn">
            <button onClick={this.props.buttonProps.accept} className="bottom-buttons">
                <img src={Like} alt="" className="bottom-btn-img"/>
            </button>
        </div>
        {/* <div className="bottom-btn">
            <button className="bottom-buttons">
                <img src={Premium} alt="" className="bottom-btn-img"/>
            </button>
        </div> */}
      </div>
    );
  }
}