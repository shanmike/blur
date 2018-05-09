import React from 'react';
import ProfileInputStyle from '../ProfileInputStyle/ProfileInputStyle'
import {connect} from 'react-redux';
import {getUser} from '../../redux/User/user';
import axios from 'axios'
import './Imformation.css'

class Information extends React.Component{
    constructor(){
        super()
        this.state = {
              hobbies:''
            , inspirations:''
            , coffeetea:''
            , favfood:''
            , travelbeen:''
            , travelto:''
            , bestdone:''
            , worstdone:''
            , work:''
            , school:''
            , goodat:''
            , suckat:''
            , songs:''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(value, key){
        this.setState({
            [key]:value
        })
    }

    async componentDidMount(){
        await this.props.getUser();
        
        axios.get('/getProfileInfo').then((res)=>{
            this.setState({
                  hobbies:res.data.hobbies
                , inspirations:res.data.inspirations
                , coffeetea:res.data.coffeetea
                , favfood:res.data.favfood
                , travelbeen:res.data.travelbeen
                , travelto:res.data.travelto
                , bestdone:res.data.bestdone
                , worstdone:res.data.worstdone
                , work:res.data.work
                , school:res.data.school
                , goodat:res.data.goodat
                , suckat:res.data.suckat
                , songs:res.data.songs
            })
        })
    }

    updateInformation(){
        let body = {
              hobbies:this.state.hobbies
            , inspirations:this.state.inspirations
            , coffeetea:this.state.coffeetea
            , favfood:this.state.favfood
            , travelbeen:this.state.travelbeen
            , travelto:this.state.travelto
            , bestdone:this.state.bestdone
            , worstdone:this.state.worstdone
            , work:this.state.work
            , school:this.state.school
            , goodat:this.state.goodat
            , suckat:this.state.suckat
            , songs:this.state.songs
        }
        axios.put(`/updateProfile`,body)
    }

    render(){
        const user = this.props.user;
        return(
            <div className="information-child">
                <div className="information-white-container"> 
                    <div className="profile-image-container">
                        <img className="information-profile-image"src={user.picture} alt=""/>
                    </div>
                    <div className="about-container">
                        <div className="about-me-button-container">
                            <div className="about-me">About Me:</div> 
                            <button className="about-me-button" onClick={()=>this.updateInformation()}>Save</button>
                        </div>
                        <ProfileInputStyle keyValue={"hobbies"} val = {this.state.hobbies} handleChange={this.handleChange} name="Hobbies" />
                        <ProfileInputStyle keyValue={"inspirations"} val = {this.state.inspirations} handleChange={this.handleChange} name="Inspirations" />
                        <ProfileInputStyle keyValue={"coffeetea"} val = {this.state.coffeetea} handleChange={this.handleChange} name="Coffee or Tea" />
                        <ProfileInputStyle keyValue={"favfood"} val = {this.state.favfood} handleChange={this.handleChange} name="What do you like to eat" />
                        <ProfileInputStyle keyValue={"travelbeen"} val = {this.state.travelbeen} handleChange={this.handleChange} name="Where have you been" />
                        <ProfileInputStyle keyValue={"travelto"} val = {this.state.travelto} handleChange={this.handleChange} name="Where do you want to go" />
                        <ProfileInputStyle keyValue={"bestdone"} val = {this.state.bestdone} handleChange={this.handleChange} name="Best thing you've done"  />
                        <ProfileInputStyle keyValue={"worstdone"} val = {this.state.worstdone} handleChange={this.handleChange} name="Worst thing you've done"/>
                        <ProfileInputStyle keyValue={"work"} val = {this.state.work} handleChange={this.handleChange} name="What do you do for work"  />
                        <ProfileInputStyle keyValue={"school"} val = {this.state.school} handleChange={this.handleChange} name="What did you study in school" />
                        <ProfileInputStyle keyValue={"goodat"} val = {this.state.goodat} handleChange={this.handleChange} name="What are you good at" />
                        <ProfileInputStyle keyValue={"suckat"} val = {this.state.suckat} handleChange={this.handleChange} name="What do you suck at" />
                        <ProfileInputStyle keyValue={"songs"} val = {this.state.songs}  handleChange={this.handleChange} name="Favorite bands" />
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
export default connect(mapStateToProps, {getUser})(Information);