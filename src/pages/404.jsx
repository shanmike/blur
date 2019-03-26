import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  text-align: center;
`;
const NotFound = () => (
  <Wrapper>
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn't exist... the sadness.</p>
  </Wrapper>
);

export default NotFound;
