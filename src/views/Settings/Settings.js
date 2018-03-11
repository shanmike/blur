import React from 'react';
import Navbar from '../../components/Navbar/Navbar'
import ChangeSettings from '../../components/ChangeSettings/ChangeSettings'
import './Settings.css'

export default class Settings extends React.Component{
    render(){
        return(
            <div className="settings-container">
                <Navbar/>
                <div></div>
                <ChangeSettings/>
            </div>
        )
    }
}