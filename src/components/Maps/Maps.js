import React from 'react';
import {geolocated, geoPropTypes} from 'react-geolocated';
import axios from 'axios'
import Progress from '../Progress/Progress'


class Maps extends React.Component {
  render() {
    return !this.props.isGeolocationAvailable
      ? <div>Your browser does not support Geolocation</div>
      : !this.props.isGeolocationEnabled
        ? <div>Geolocation is not enabled</div>
        : this.props.coords
          ? <table>
              <tbody>
                <tr><td>Latitude:</td><td>{this.props.coords.latitude}</td></tr>
                <tr><td>Longitude:</td><td>{this.props.coords.longitude}</td></tr>
              </tbody>
            </table>
          : <div className="getting-location">
          <div>
            Waiting to get the Location&hellip;
          </div>
            <Progress/>
          </div>;
  
  }
}
Maps.propTypes = Object.assign({}, Maps.propTypes, geoPropTypes);

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: Infinity,
  },
  userDecisionTimeout: null,
  suppressLocationOnMount: true
})(Maps);