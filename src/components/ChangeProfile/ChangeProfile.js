import React from 'react';
import {connect} from 'react-redux';
import {getUser} from '../../redux/User/user';
import {Link} from 'react-router-dom';
import settings from './Images/lnr-cog.svg';
import info from './Images/lnr-pencil.svg';
import diamond from './Images/lnr-diamond-gray.svg';
import './ChangeProfile.css';

class ChangeProfile extends React.Component{
    componentDidMount(){
        this.props.getUser();
    }
    render(){
        const user = this.props.user;
        return(
            <div className="change-profile-child">
                <div></div>
                <div className="change-profile-white-container">
                    <div></div>
                    <div className="change-profile-image-container">
                        <img className="change-profile-image"src={user.picture} alt="" />
                    </div>
                    <div className="change-profile-name">{user.name}</div>
                    <div className="change-profile-buttons-container">
                        <div></div>
                        <div className="buttons">
                            <div className="buttons-svg-container">
                                <Link to="/settings">
                                    <img className="buttons-svg" src={settings} alt=""/>
                                </Link>
                                <br/>SETTINGS
                            </div>
                            <div className="buttons-svg-container">
                                <Link to="/info"><img className="buttons-svg" src={info} alt=""/></Link>
                                <br/>INFO
                            </div>    
                        </div>
                        <div className="buttons-svg-container">
                            <img className="buttons-svg" src={diamond} alt=""/>
                            <br/>PREMIUM
                        </div>
                    
                        <div className="change-profile-logout">
                           <div className="change-profile-button">
                                <a href='http://localhost:4567/auth/logout'><button className="logout-button">Log out</button></a>
                           </div>
                           <div className="change-profile-button">
                                <button className="delete-account">Delete Account</button>
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
export default connect(mapStateToProps, {getUser})(ChangeProfile);