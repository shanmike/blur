import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getUser} from '../../redux/User/user';
import Maps from '../Maps/Maps'
// import MyCards from '../Cards/MyCards'

import './List.css'


class List extends Component {
    componentDidMount(){
        this.props.getUser();
    }
  render() {
    const user = this.props.user;
    console.log(user);
    return (
      <div className="list-container">
      <div></div>
        <div className="list-child">
          <h4 className="list-display">Please Enable GPS</h4>
          <Maps/>
        </div>
        <div></div>
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