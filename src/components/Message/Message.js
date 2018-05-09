import React from 'react';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import {getUser} from '../../redux/User/user';
import NavBack from '../NavBack/NavBack'
import './Message.css';
import axios from 'axios'

class Message extends React.Component{
    constructor(){
        super()
        this.state={
              messages:[]
            , message:''
            , roomsMatch:[]
        }
        this.sendMessage = this.sendMessage.bind(this)
        this.updateMessages = this.updateMessages.bind(this)
        this.joinRoom = this.joinRoom.bind(this)
        
    }

    async componentDidMount(){
       await  axios.get('/getMatches').then(res=>{
                    this.setState({
                    roomsMatch:res.data
                 })
             })
              this.props.getUser();
              this.socket = io('/')
              this.socket.on('Received Message', this.updateMessages)
              this.socket.on('Room joined', this.updateMessages)
              this.joinRoom()
    }

    sendMessage(){
        this.socket.emit('Message Sent',{
              match_id: this.state.roomsMatch[0].match_id
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

    }
    joinRoom(room_num){
        this.socket.emit("Join room",{
            match_id: this.state.roomsMatch[0].match_id
        })
    }
    componentWillUnmount(){
        this.socket.disconnect()
    }
    render(){
        const messages = this.state.messages.map((e,i)=>{
            const styles = e.user_id === this.props.user.user_id ? {display:"flex",alignSelf: "flex-end", backgroundColor: "#2d96fb", color: "white", borderRadius:"10px",alignItems:"center", boxSizing:"border-box", padding:"3px"} : {display:"flex", alignSelf: "flex-start", backgroundColor: "#e5e6ea", borderRadius:"10px", alignItems:"center", boxSizing:"border-box", padding:"3px"}
             return (<div key={i} className="message-text" style={styles}><img className="message-text-user-image" src={e.user_id === this.props.user.user_id? this.props.user.picture: this.state.roomsMatch[0].picture} alt=""/> {e.message}</div>)
        })
        const match = this.state.roomsMatch.map((e,i)=>{
            return (
                <div key={i}>
                    <img className="message-image" src={this.state.roomsMatch[0].picture} alt=""/>
                </div>
            )
        })
        return(
            <div className="message-container">
            <NavBack />
                <div className="message-child">
                    <div className="message-white-container">
                        <div className="messages"> 
                            {match}
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