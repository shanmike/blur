import React from 'react';
import {geolocated} from 'react-geolocated';
import axios from 'axios'


class Maps extends React.Component {
  constructor() {
    super()
    this.state = {
      latitude:0
      , longitude:0
    }
  }

  handleCoords = (value, prop)=>{
    this.setState=({[prop]:value})
  }

  render() {
    return !this.props.isGeolocationAvailable
      ? <div>Your browser does not support Geolocation</div>
      : !this.props.isGeolocationEnabled
        ? <div>Geolocation is not enabled</div>
        : this.props.coords
          ? <table>
              <tbody>
                <tr><td>Latitude:</td><td>{e=>{this.props.coords.latitude}}</td></tr>
                <tr><td>Longitude:</td><td>{this.props.coords.longitude}</td></tr>
              </tbody>
            </table>
          : <div>Getting the Location&hellip; </div>;
  
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
  watchPosition: true
})(Maps);