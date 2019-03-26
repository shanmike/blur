import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import { getUser } from "../redux";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 70px auto 55px;
`;
const Header = styled.div`
  display: flex;
  border-radius: 30px 30px 0px 0px;
  box-shadow: 0 1px 10px 0 rgba(0, 17, 25, 0.27);
  z-index: 1;
  text-align: center;
`;
const MatchedUser = styled.div`
    margin:10px 25px;
    height:50px;
    width:50px;
    border:2px solid #FA6469;
    border-radius:50%;
    background-color: #EEE;
    background-size: cover;
    background-position: 50% 50%;
    background-image:url('${props => props.img}');
`;
const UserPicture = styled.div`    
    background-size: cover;
    background-position: 50% 50%;
    background-image:url('${props => props.img}');
`;
const Message = styled.div`
  background-color: #fafafa;
`;
const Text = styled.div`
  margin-top: 25px;
`;
const MessageText = styled.div`
  margin: 10px 10px;
  border-radius: 30px;
  padding: 5px;
  border: 1px solid black;
`;
const Form = styled.form`
  box-shadow: 0 1px 10px 0 rgba(0, 17, 25, 0.27);
  background-color: #fff;
  border-radius: 30px;
  margin: auto;
`;
const Input = styled.input``;

class Messages extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      message: "",
      roomsMatch: []
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.updateMessages = this.updateMessages.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
  }

  async componentWillMount() {
    await axios
      .get("/getMatches")
      .then(res => this.setState({ roomsMatch: res.data }));
    this.props.getUser();
    this.socket = io("/");
    this.socket.on("Received Message", this.updateMessages);
    this.socket.on("Room joined", this.updateMessages);
    this.joinRoom();
  }

  sendMessage() {
    this.socket.emit("Message Sent", {
      match_id: this.state.roomsMatch[0].match_id,
      message: this.state.message,
      user_id: this.props.user.user_id,
      message_time: new Date().getTime()
    });
  }
  updateMessages(messages) {
    this.setState({
      messages: messages,
      message: ""
    });
  }

  joinRoom(room_num) {
    this.socket.emit("Join room", {
      match_id: this.state.roomsMatch[0].match_id
    });
  }
  componentWillUnmount() {
    this.socket.disconnect();
  }
  render() {
    const messages = this.state.messages.map((e, i) => {
      return (
        <>
          <UserPicture
            img={
              e.user_id === this.props.user.user_id
                ? this.props.user.picture
                : this.state.roomsMatch[0].picture
            }
          />
          <MessageText>{e.message}</MessageText>
        </>
      );
    });
    console.log(this.state.roomsMatch[0]);
    return (
      <Wrapper>
        <Header>
          <MatchedUser
            img={
              this.state.roomsMatch[0] ? this.state.roomsMatch[0].picture : ""
            }
          />
          <Text>
            {this.state.roomsMatch[0] ? this.state.roomsMatch[0].name : ""}
          </Text>
        </Header>
        <Message>{messages}</Message>
        <Form>
          <Input
            type="text"
            value={this.state.message}
            onChange={e => this.setState({ message: e.target.value })}
          />
          <Input type="submit" value="Send" onClick={this.sendMessage} />
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
)(Messages);
