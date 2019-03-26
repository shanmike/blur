import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import config from "../config";
import { ReactComponent as Settings } from "../images/settings.svg";
import { ReactComponent as Profile } from "../images/user.svg";
import { getUser } from "../redux/";

class Menu extends React.Component {
  render() {
    const user = this.props.user;
    return (
      <Wrapper>
        <Image img={user.picture} />
        <Name>{user.name ? user.name : config.menu.userName}</Name>

        <Links to={config.settings.page}>
          <Settings />
          <Text>{config.settings.title}</Text>
        </Links>

        <Links to={config.profile.page}>
          <Profile />
          <Text>{config.profile.title}</Text>
        </Links>

        <Logout action="/auth/logout" method="get">
          <Button>Logout</Button>
        </Logout>
      </Wrapper>
    );
  }
}
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
  display: grid;
  grid-template-rows: 40% 10% 40% 10%;
  grid-column: 1/3;
`;
const Image = styled.div`
    grid-column:1/3;
    border-radius: 30px 30px 0px 0px;
    background-color: #EEE;
    background-size: cover;
    background-position: 50% 50%;
    background-image: url('${props => props.img}');
`;

const Links = styled(Link)`
  margin: auto;
  text-decoration: none;
`;
const Text = styled.p`
  color: gray;
`;
const Name = styled.h3`
  grid-column: 1/3;
`;

const Logout = styled.form`
  grid-column: 1/3;
`;
const Button = styled.button`
  background: none;
  padding: 5px 25px;
  border: 2px solid #fa6469;
  border-radius: 20px;
  font-weight: 600;
  color: #fa6469;
`;

function mapStateToProps(state) {
  return {
    user: state.user
  };
}
export default connect(
  mapStateToProps,
  { getUser }
)(Menu);
