import React from 'react';
import Toggle from '../Toggle/Toggle';
import SliderOne from '../Sliders/SliderOne/SliderOne';
import SliderTwo from '../Sliders/SliderTwo/SliderTwo'
import './ChangeSettings.css';

export default class ChangeSettings extends React.Component{
    render(){
        return(
            <div className="change-set-child">
                <div></div>
                <div className="change-set-white-container">
                    <div className="change-set-gray-container">
                        <div className="change-set-gray-box">
                            <div className="change-set-title-container">Show Me</div>
                        </div>
                    </div>
                    <div className="change-set-gray-container">
                        <div className="change-set-gray-box">
                            <div className="change-set-title-container">
                                <div> Maximum Distance</div>
                                <div className="change-set-distance-slider-container">
                                    <SliderOne/>
                                </div>   
                            </div>   
                        </div>
                    </div>
                    <div className="change-set-gray-container">
                        <div className="change-set-gray-box">
                            <div className="change-set-title-container">
                                <div>Age Range</div>
                                <div className="change-set-distance-slider-container">
                                    <SliderTwo/>
                                </div>  
                            </div>    
                        </div>
                    </div>
                    <div className="change-set-gray-container">
                        <div className="change-set-gray-box">
                            <div className="change-set-title-container">Show me on Frivoler
                            </div>
                            <div className="notifications">
                                <div>Use GPS</div>
                                <Toggle/>
                            </div>
                        </div>
                    </div>
                    <div className="change-set-gray-container">
                        <div className="change-set-gray-box">
                            <div className="change-set-title-container">Notifications</div>
                            <div className="notifications">
                                <div>New Match</div>
                                <Toggle/>
                            </div>
                            <div className="notifications">
                                <div>New Message</div>
                                <Toggle/>
                            </div>
                            <div className="notifications">
                                <div>New Likes</div>
                                <Toggle className="toggle-style"/>
                            </div>
                            <div className="notifications">
                                <div>New Loves</div>
                                <Toggle/>
                            </div>
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
        )
    }
}