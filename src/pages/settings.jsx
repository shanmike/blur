import React from "react";
import { connect } from "react-redux";
import { getUser, updateUser } from "../redux";
import Toggle from "../components/Toggle/Toggle";
import axios from "axios";
import styled from "styled-components";
import config from "../config";

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      show_gender: ""
    };
    this.toggleChange = this.toggleChange.bind(this);
    this.handleGender = this.handleGender.bind(this);
    this.sliderChange = this.sliderChange.bind(this);
  }

  toggleChange(updates) {
    this.props.updateUser(updates);
  }

  sliderChange(updates) {
    this.props.updateUser(updates);
  }
  handleGender(value) {
    this.setState(
      {
        show_gender: value
      },
      () => {
        axios.put("/updateUser", this.state);
      }
    );
  }

  render() {
    const {
      discovery,
      lookingFor,
      distance,
      ageRange,
      showOnBlur,
      premium,
      version
    } = config.settings;
    return (
      <Container>
        <Title>{discovery}</Title>

        <Subtitle>{lookingFor.title}</Subtitle>
        <Options>
          <Gender onClick={() => this.handleGender("male")}>Men</Gender>
          <Gender onClick={() => this.handleGender("female")}>Women</Gender>
        </Options>
        <Subtitle>{distance.title}</Subtitle>
        <Options>
          <Text>{distance.minimum}</Text>
          <Text>{distance.maximum}</Text>
   
        </Options>
        <Subtitle>{ageRange.title}</Subtitle>
        <Options>
          <Text>{ageRange.minimum}</Text>
          <Text>{ageRange.maximum}</Text>
         
        </Options>
        <Subtitle>{showOnBlur.title}</Subtitle>
        <Options>
          <Text>{showOnBlur.description}</Text>
          <Toggle
            handleChange={this.toggleChange}
            visible={this.props.user.visible}
          />
        </Options>
        <Subtitle>{premium.title}</Subtitle>
        <Options>
          <Text>{premium.description}</Text>
        </Options>
        <Version>{version}</Version>
      </Container>
    );
  }
}
// ==== STYLES ====
const Container = styled.div`
  border-radius: 30px;
  display: grid;
  max-height: 800px;
  height: 100%;
`;

const Title = styled.h3`
  color: #fa6469;
  text-align: center;
  border-bottom: 1px solid #eee;
`;
const Subtitle = styled.h4`
  text-indent: 1em;
  color: #1a1a1a;
`;
const Options = styled.div`
  background-color: #f7f7f7;
  display: grid;
  grid-template-columns: 50% 50%;
`;
const Text = styled.p`
  font-size: 0.8em;
  text-align: center;
  color: #7d7d7d;
`;
const Version = styled(Text)`
  text-align: center;
`;

const Gender = styled.button`
  background: none;
  border-radius: 30px;
  margin: 5px 10px;
`;

function mapStateToProps(state) {
  return {
    user: state.user
  };
}
export default connect(
  mapStateToProps,
  { getUser, updateUser }
)(Settings);
