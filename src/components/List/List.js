import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getUser} from '../../redux/User/user';
import MyCards from '../Cards/MyCards';
import Progress from '../Progress/Progress'
import axios from 'axios';
import './List.css'

class List extends Component {
  constructor(){
    super()
    this.state={
      fetching: false,

    }
  }
  async componentDidMount(){
      await this.props.getUser();
      if(this.props.user.visible){
        navigator.geolocation.getCurrentPosition(
            (position)=>{
              axios.put('/updateUser',{latitude:position.coords.latitude,longitude:position.coords.longitude})}
          , (error)=>{console.log("Could not get location")}
          , {
            enableHighAccuracy:true
          }
        )
      }else{
        axios.put('/updateUser',{latitude:null,longitude:null} )
      }
  }

  render(props) {
    return (
      <div className="list-container"> 
        {this.props.user.visible? <MyCards/> : <Progress/>}      
      </div>
    );
  }
}

function mapStateToProps(state){
    return{
        user: state.user
    }
}
export default connect(mapStateToProps, {getUser})(List);