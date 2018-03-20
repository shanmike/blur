import React from 'react';
import {connect} from 'react-redux';
import {getUser} from '../../redux/User/user';
import Toggle from '../Toggle/Toggle';
import SliderOne from '../Sliders/SliderOne/SliderOne';
import SliderTwo from '../Sliders/SliderTwo/SliderTwo';
import axios from 'axios'
import './ChangeSettings.css';

class ChangeSettings extends React.Component{
    constructor(){
        super()
        this.state={
              visible:false,
              show_gender:''
        }
        this.toggleChange = this.toggleChange.bind(this)
        this.handleGender = this.handleGender.bind(this)
    }

    toggleChange(){
        console.log('toggle')
        this.setState({
            visible:!this.state.visible
        },()=>{
            axios.put('/updateUser',this.state)
        })
    }

    componentDidMount(){
        this.props.getUser();
    }

    handleGender(value){
        this.setState({
            show_gender:value
        },()=>{
            axios.put('/updateUser',this.state)
        })
    }
    
    render(){
        console.log(this.state.visible)
        return(
            <div className="change-set-child">
                <div></div>
                <div className="change-set-white-container">
                    <div className="change-set-gray-container">
                        <div className="change-set-gray-box">
                            <div className="change-set-title-container">
                                <div className="change-set-title-buttons">
                                    <div>Show Me</div>
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
                                <Toggle handleChange={this.toggleChange}/>
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

function mapStateToProps(state){
    return{
          user: state.user
    }
}
export default connect(mapStateToProps, {getUser})(ChangeSettings);