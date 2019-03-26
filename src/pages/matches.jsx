import React from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: grid;
`;
const Title = styled.div`
  padding: 9px 17px;
  font-size: 1em;
  font-weight: 400;
  color: #f9576d;
`;
const Search = styled.div``;
const NewMatches = styled.div``;
const CurrentMessages = styled.div``;

const Preview = styled(Link)`
  height: 100%;
  display: flex;
  padding: 9px 17px;
  text-decoration: none;
`;
const User = styled.div`
    height:50px;
    width:50px;
    background-color: #EEE;
    border-radius:50%;
    background-size: cover;
    background-position: 50% 50%;
    background-image: url('${props => props.img}');
`;
const Name = styled.div`
  color: #7d7d7d;
  margin: auto;
`;
export default class Matches extends React.Component {
  constructor() {
    super();
    this.state = {
      search: "",
      userMatches: []
    };
  }

  componentWillMount() {
    axios.get("/getMatches").then(res => {
      this.setState({
        userMatches: res.data
      });
      console.log(this.state.userMatches);
    });
  }
  handleChange(value, key) {
    this.setState({
      [key]: value
    });
  }
  render() {
    const matches = this.state.userMatches.map((e, i) => {
      return (
        <Preview to="/messages">
          <User img={e.picture} />
          <Name>{e.name}</Name>
        </Preview>
      );
    });
    return (
      <Wrapper>
        <Title>Search Matches</Title>
        <Search />
        <Title>New Matches</Title>
        <NewMatches />
        <Title>Messages</Title>
        <CurrentMessages>{matches}</CurrentMessages>
      </Wrapper>
    );
  }
}
