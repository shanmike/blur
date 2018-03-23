import React from 'react';
import MotionStack from 'react-motion-stack';
import Buttons from '../Buttons/Buttons';
import axios from 'axios';
import './MyCards.css';
import Progress from '../Progress/Progress'


export default class MyCards extends React.Component {
  constructor(){
    super()
    this.state={
      usersList:[]
    }
  }
  onSwipeEnd = ({ data }) => {
    // console.log('data', data);
  };
  
  renderButtons(props) {
    return (
      <Buttons buttonProps={props}/>
    )
  }

  componentDidMount(){
    axios.get('/getLocalUsers').then(res=>{
      // console.log('Get users list',res.data)
      this.setState({
        usersList:res.data
      })
    })
  }
  
  render() {
    console.log('USERS-LIST',this.state.usersList)
    const data = Array.from(this.state.usersList, (user, i) => ({
      id: user.user_id,
      element: (
        <div className="user-list-container">
          <div>
            <div className="user-list-image-container">
              <img src={user.picture} className="user-list-image" alt=""/>
            </div>
            <div className="user-list-name">{user.name}</div>
          </div>
          <div className="user-list-info-container">
            <div className="user-list-hobbies">{user.hobbies}</div>
            <div className="user-list-hobbies">{user.inspirations}</div>
            <div className="user-list-hobbies">{user.coffeetea}</div>
            <div className="user-list-hobbies">{user.favfood}</div>
            <div className="user-list-hobbies">{user.travelbeen}</div>
            <div className="user-list-hobbies">{user.travelto}</div>
            <div className="user-list-hobbies">{user.bestdone}</div>
            <div className="user-list-hobbies">{user.worstdone}</div>
            <div className="user-list-hobbies">{user.work}</div>
            <div className="user-list-hobbies">{user.school}</div>
            <div className="user-list-hobbies">{user.goodat}</div>
            <div className="user-list-hobbies">{user.suckat}</div>
            <div className="user-list-hobbies">{user.songs}</div>
          </div>
        </div>
      ) 
    }));
    
    return (

      <div className="demo-wrapper">
        {
          this.state.usersList.length ?
          <MotionStack
          data={data}
          onSwipeEnd={this.onSwipeEnd}
          render={props => props.element}
          renderButtons={this.renderButtons}/>
          : <Progress />
        }
      </div>
    );
  }
}