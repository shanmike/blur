import React from "react";
import styled from "styled-components";
import { login } from "../config";

const Container = styled.div`
  height: 100vh;
  display: grid;
  text-align: center;
  font-size: 65px;
  background: linear-gradient(359deg, #ffa654, #f6267d);
  background-size: 200% 200%;
  animation: Wave 9s ease infinite;
  @keyframes Wave {
    0% {
      background-position: 50% 0%;
    }
    50% {
      background-position: 51% 100%;
    }
    100% {
      background-position: 50% 0%;
    }
  }
`;
const Title = styled.h1`
  font-family: "Permanent Marker", cursive;
  color: white;
  grid-row: 2/3;
  margin: auto;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
const Loggers = styled.form`
  grid-row: 3/4;
  margin: auto;
`;

const LoginButton = styled.button`
  background: none;
  padding: 10px 25px;
  border: 2px solid #fff;
  border-radius: 20px;
  font-weight: 600;
  color: #fff;
`;

const Login = () => (
  <Container>
    <Title>{login.title}</Title>
    <Loggers action={process.env.REACT_APP_LOGIN_DEV} method="get">
      <LoginButton>{login.button}</LoginButton>
    </Loggers>
  </Container>
);

export default Login;
