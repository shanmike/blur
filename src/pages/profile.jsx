// import axios from 'axios';
import React from "react";
import { connect } from "react-redux";
import { getUser } from "../redux";
import styled from "styled-components";
import config from "../config";

const Wrapper = styled.div`
  border-radius: 30px;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 40% auto;
  overflow: scroll;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Label = styled.label`
  padding: 9px 17px;
  font-size: 0.9em;
  font-weight: 600;
  color: #1a1a1a;
  background-color: #f8f8f8;
  border-bottom: 1px solid #e8e8e8;
  border-top: 1px solid #e8e8e8;
`;

const Icebreakers = styled(Label)`
  background-color: #4c68d7;
  color: #fff;
  border-top: none;
`;
const Instagram = styled(Label)`
  background-color: #cd486b;
  color: #fff;
`;

const Spotify = styled(Label)`
  background-color: #1db954;
  color: #fff;
`;
const Description = styled.div`
  padding: 9px 17px;
  font-size: 0.9em;
  color: #1a1a1a;
`;
const SmallDescription = styled(Description)`
  text-align: center;
  font-size: 0.7em;
`;

const Image = styled.div`
    background-color: #EEE;
    background-size: cover;
    background-position: 50% 50%;
    background-image: url('${props => props.img}');
`;

class Profile extends React.Component {
  render() {
    const user = this.props.user;
    const { profile } = config;
    return (
      <Wrapper>
        <Image img={user.picture} />
        <Form>
          {/* Icebreakers */}
          <Icebreakers>{profile.icebreakers.title}</Icebreakers>
          <Description>{profile.icebreakers.question}</Description>
          {/* About Me */}
          <Label>{profile.about.title}</Label>
          <Description>{profile.about.description}</Description>
          {/* Work and Education */}
          <Label>{profile.job.title}</Label>
          <Description>{profile.job.description}</Description>
          {/* The basic info */}
          <Label>{profile.basics.title}</Label>
          <Description>{profile.basics.height.title}</Description>
          <Description>{profile.basics.drinking.title}</Description>
          <Description>{profile.basics.smoking.title}</Description>
          <Description>{profile.basics.pets.title}</Description>
          <Description>{profile.basics.religion.title}</Description>
          <Description>{profile.basics.politics.title}</Description>
          {/* Connect Your Instagram */}
          <Instagram>{profile.instagram.title}</Instagram>
          <SmallDescription>{profile.instagram.description}</SmallDescription>
          {/* Connect Your Spotify */}
          <Spotify>{profile.spotify.title}</Spotify>
          <SmallDescription>{profile.spotify.description}</SmallDescription>
        </Form>
      </Wrapper>
    );
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
)(Profile);
