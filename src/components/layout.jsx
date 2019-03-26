import React from "react";
import Routes from "../routes/routes";
import Navbar from "./navbar";
import styled from "styled-components";
import Login from "../pages/login";

const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 60px;
  @media only screen and (min-width: 767px) {
    grid-template-rows: auto;
    grid-template-columns: 350px auto;
  }
`;
const Main = styled.div`
  background-color: #fff;
  border-radius: 30px;
  margin: 5%;
  box-shadow: 0 1px 8px 0 rgba(0, 17, 25, 0.27);
`;
const Layout = () =>
  document.location.hash === "#/" ? (
    <Login />
  ) : (
    <Container>
      <Navbar />
      <Main> {Routes} </Main>
    </Container>
  );
export default Layout;
