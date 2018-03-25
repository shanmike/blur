import React from 'react';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import {getUser} from '../../redux/User/user';
import Navbar from '../Navbar/Navbar'
import './Message.css';

class Message extends React.Component{
    constructor(){
        super()
        this.state={
            messages:[],
            message:''
        }
        this.sendMessage = this.sendMessage.bind(this)
        this.updateMessages = this.updateMessages.bind(this)
        this.joinRoom = this.joinRoom.bind(this)
        
    }

    async componentDidMount(){
        await this.props.getUser();
              this.socket = io('/')
              this.socket.on('Received Message', this.updateMessages)
              this.socket.on('Room joined', this.joinSuccess)
              this.joinRoom()
    }

    sendMessage(){
        this.socket.emit('Message Sent',{
              match_id: 1 
            , message:this.state.message
            , user_id: this.props.user.user_id
            , message_time: new Date().getTime()
        })
    }
    updateMessages(messages){
        this.setState({
              messages: messages
            , message:''
        })
    }
    joinSuccess(roomID){
        console.log("Room ID", roomID)
    }
    joinRoom(){
        this.socket.emit("Join room",{
            match_id: 1
        })
    }
    render(){
        console.log(this.state, 'this is the state')
        
        const messages = this.state.messages.map((e,i)=>{
            const styles = e.user === this.props.user.user_id ? {alignSelf: "flex-end", backgroundColor: "#2d96fb", color: "white"} : {alignSelf: "flex-start", backgroundColor: "#e5e6ea", borderRadius:"10px"}
             return (<div key={i} className="message-text" style={styles}><img className="message-text-user-image" src={this.props.user.picture} alt=""/> {e.message}</div>)
        })
        return(
            <div className="message-container">
            <Navbar />
            <div></div>
                <div className="message-child">
                    <div></div>
                    <div className="message-white-container">
                        <div className="messages"> 
                            {messages}
                        </div>
                        <div className="message-input-container">
                            <input className="message-input" value={this.state.message} onChange={e=>this.setState({message:e.target.value})}/> 
                            <button className="send-message" onClick={this.sendMessage}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state){
    return{
          user: state.user
    }
}
export default connect(mapStateToProps, {getUser})(Message);