import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Menu } from "../images/menu.svg";
import { ReactComponent as Messages } from "../images/messages.svg";

const Wrapper = styled.div`
  background: linear-gradient(90deg, #ffa654 0%, #f6267d 100%);
  display: grid;
  grid-template-columns: 20% 60% 20%;
  min-height: 56px;
  box-shadow: 0 1px 8px 0 rgba(0, 17, 25, 0.27);
`;
const Links = styled(Link)`
  height: 35px;
  margin: auto;
`;
const HomeButton = styled(Links)`
  height: 100%;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
  color: #ffffff;
  text-decoration: none;
  font-family: "Permanent Marker";
  font-size: 40px;
`;

const Navbar = () => (
  <Wrapper>
    <Links to="/menu">
      <Menu />
    </Links>
    <HomeButton to="/home">B</HomeButton>
    <Links to="/matches">
      <Messages />
    </Links>
  </Wrapper>
);

export default Navbar;
