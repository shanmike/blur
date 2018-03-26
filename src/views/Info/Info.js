import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Information from '../../components/Information/Information'
import './Info.css'


export default class Info extends React.Component{
    render(){
        return(
            <div className="info-container">
                <Navbar/>
                <Information/>
            </div>
        )
    }
}
