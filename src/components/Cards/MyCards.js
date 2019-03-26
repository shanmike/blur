import React from "react";
import MotionStack from "react-motion-stack";
import Buttons from "../Buttons/Buttons";
import axios from "axios";
// import styled from 'styled-components';

export default class MyCards extends React.Component {
  constructor() {
    super();
    this.state = {
      usersList: []
    };
  }
  onSwipeEnd = ({ data }) => {};

  renderButtons(props) {
    return <Buttons buttonProps={props} />;
  }

  componentDidMount() {
    axios
      .get("/getLocalUsers")
      .then(res => this.setState({ usersList: res.data }));
  }

  render() {
    const data = Array.from(this.state.usersList, user => ({
      id: user.user_id,
      element: <div>{user.name}</div>
    }));

    return this.state.usersList.length ? (
      <MotionStack
        data={data}
        onSwipeEnd={this.onSwipeEnd}
        render={props => props.element}
        renderButtons={this.renderButtons}
      />
    ) : (
      "No users around you"
    );
  }
}
