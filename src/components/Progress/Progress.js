import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import { blueGrey50} from 'material-ui/styles/colors';
import './Progress.css'

const CircularProgressExampleSimple = () => (
  <div className="loading">
    <div className="landing-welcome">Welcome to Blur!</div>
    <div className="landing-gps">
      <div>Your Card is Hidden</div>
      <div>Enable Discovery to meet new people</div>
    </div>
    <div className = "loading-user-image">
      <CircularProgress size={190} thickness={5} color={blueGrey50} />
    </div>
  </div>
);

export default CircularProgressExampleSimple;