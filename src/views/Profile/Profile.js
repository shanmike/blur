import React from 'react';
import Navbar from '../../components/Navbar/Navbar'
import ChangeProfile from '../../components/ChangeProfile/ChangeProfile'
import './Profile.css'

export default class Profile extends React.Component{
    render(){
        return(
            <div className="profile-container">
                <Navbar/>
                <div></div>
                <ChangeProfile/>
            </div>
        )
    }
}
