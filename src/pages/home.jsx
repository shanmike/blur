import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import MyCards from "../components/Cards/MyCards";
import { getUser } from "../redux";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      fetching: false
    };
  }
  async componentWillMount() {
    await this.props.getUser();
    if (this.props.user.visible && this.props.user.longitude === null) {
      navigator.geolocation.getCurrentPosition(
        position => {
          console.log({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          axios.put("/updateUser", {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        error => console.log("Could not get location", error),
        { enableHighAccuracy: true }
      );
    } else {
      // axios.put('/updateUser',{ latitude: null, longitude: null} )
    }
  }

  render(props) {
    return <>{this.props.user.visible ? <MyCards /> : "Loading..."}</>;
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}
export default connect(
  mapStateToProps,
  { getUser }
)(Home);
