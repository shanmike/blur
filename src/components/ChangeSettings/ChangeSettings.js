import React from 'react';
import {connect} from 'react-redux';
import {getUser, updateUser} from '../../redux/User/user';
import Toggle from '../Toggle/Toggle';
import SliderOne from '../Sliders/SliderOne/SliderOne';
import SliderTwo from '../Sliders/SliderTwo/SliderTwo';
import axios from 'axios'
import './ChangeSettings.css';

class ChangeSettings extends React.Component{
    constructor(){
        super()
        this.state={
              show_gender:''
        }
        this.toggleChange = this.toggleChange.bind(this)
        this.handleGender = this.handleGender.bind(this)
        this.sliderChange = this.sliderChange.bind(this)
    }

    toggleChange(updates){
        this.props.updateUser(updates)
    }

    sliderChange(updates){
        this.props.updateUser(updates)
      }

    // componentWillMount(){
    //     this.props.getUser();
    // }

    handleGender(value){
        this.setState({
            show_gender:value
        },()=>{
            axios.put('/updateUser',this.state)
        })
    }
    
    render(){

        return(
            <div className="change-set-child">
                <div className="change-set-white-container">
                    <div className="change-set-gray-container">
                        <div className="change-set-gray-box">
                            <div className="change-set-title-container">
                            <div className="change-set-orange-title">Show Me</div>
                                <div className="change-set-title-buttons">
                                    <div className="show-me-buttons">
                                        <button onClick = {()=>this.handleGender('male')} className="show-me-buttons-both">Men</button>
                                        <button onClick = {()=>this.handleGender('female')} className="show-me-buttons-both">Women</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="change-set-gray-container">
                        <div className="change-set-gray-box">
                            <div className="change-set-title-container" id="settings-age">
                                <div className="change-set-orange-title"> Maximum Distance</div>
                                <div className="change-set-distance-slider-container">
                                    <SliderOne handleSlider={this.sliderChange} distance_range={this.props.user.distance_range}/>
                                </div>   
                            </div>   
                        </div>
                    </div>
                    <div className="change-set-gray-container">
                        <div className="change-set-gray-box">
                            <div className="change-set-title-container" id="settings-age">
                                <div className="change-set-orange-title">Age Range</div>
                                <div className="change-set-distance-slider-container">
                                    <SliderTwo handleSlider={this.sliderChange} age_max={this.props.user.age_max} age_min={this.props.user.age_min}/>
                                </div>  
                            </div>    
                        </div>
                    </div>
                    <div className="change-set-gray-container">
                        <div className="change-set-gray-box">
                            <div className="change-set-title-container" id="settings-gps">
                                <div className="change-set-orange-title">Show me on Blur</div>
                                <div className="notifications">
                                    <div className="change-set-grey-title">Use GPS</div>
                                    <Toggle handleChange={this.toggleChange} visible={this.props.user.visible}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="change-set-gray-container">
                        <div className="change-set-gray-box">
                            <div className="change-set-title-container" id="notifications-box">
                                <div className="change-set-orange-title">Notifications</div>
                                <div className="notifications">
                                    <div className="change-set-grey-title">New Match</div>
                                    <Toggle placeholder/>
                                </div>
                                <div className="notifications">
                                    <div className="change-set-grey-title">New Message</div>
                                    <Toggle/>
                                </div>
                                <div className="notifications">
                                    <div className="change-set-grey-title">New Likes</div>
                                    <Toggle className="toggle-style"/>
                                </div>
                                <div className="notifications">
                                    <div className="change-set-grey-title">New Loves</div>
                                    <Toggle/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state){
    return{
          user: state.user
    }
}
export default connect(mapStateToProps, {getUser, updateUser})(ChangeSettings);