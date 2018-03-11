import React, { Component } from 'react';
import './Buttons.css'
import Heart from './Images/lnr-heart.svg'
import Arrow from './Images/lnr-arrow-left-circle.svg'
import Dislike from './Images/lnr-thumbs-down.svg'
import Like from './Images/lnr-thumbs-up.svg'
import Premium from './Images/lnr-diamond.svg'

export default class Buttons extends Component {
  render() {
    return (
      <div className="buttons-container">
        <div className="bottom-btn">
            <img src={Arrow} alt="" className="bottom-btn-img"/>
        </div>
        <div className="bottom-btn">
            <img src={Dislike} alt="" className="bottom-btn-img"/>
        </div>
        <div className="bottom-btn">
            <img src={Heart} alt="" className="bottom-btn-img"/>
        </div>
        <div className="bottom-btn">
            <img src={Like} alt="" className="bottom-btn-img"/>
        </div>
        <div className="bottom-btn">
            <img src={Premium} alt="" className="bottom-btn-img"/>
        </div>
      </div>
    );
  }
}