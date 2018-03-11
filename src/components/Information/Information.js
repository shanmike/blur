import React from 'react';
import {connect} from 'react-redux';
import {getUser} from '../../redux/User/user';
import ProfileInputStyle from '../ProfileInputStyle/ProfileInputStyle'
import './Imformation.css'

class Information extends React.Component{
    componentDidMount(){
        this.props.getUser();
    }
    render(){
        const user = this.props.user;
        return(
            <div className="information-child">
                <div></div>
                <div className="information-white-container">
                    <div></div>
                    <div>
                        <img className="change-profile-image"src={user.picture} alt="" width="200px" height="120px"/>
                    </div>
                    <div>About Me:</div>
                    <ProfileInputStyle name="Hobbies" />
                    <ProfileInputStyle name="Inspirations" />
                    <ProfileInputStyle name="Coffee or Tea" />
                    <ProfileInputStyle name="What do you like to eat" />
                    <ProfileInputStyle name="Where have you been" />
                    <ProfileInputStyle name="Where do you want to go" />
                    <ProfileInputStyle name="Best thing you've done" />
                    <ProfileInputStyle name="Worst thing you've done" />
                    <ProfileInputStyle name="What do you do for work" />
                    <ProfileInputStyle name="What did you study in school" />
                    <ProfileInputStyle name="What are you good at" />
                    <ProfileInputStyle name="What do you suck at" />
                    <ProfileInputStyle name="Favorite artists" />
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
export default connect(mapStateToProps, {getUser})(Information);