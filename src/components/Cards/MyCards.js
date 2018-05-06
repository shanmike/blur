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
    // console.log('USERS-LIST',this.state.usersList)
    const data = Array.from(this.state.usersList, (user, i) => ({
      id: user.user_id,
      element: (
        <div className="user-list-container">
            <div className="user-list-image-container">
              <img src={user.picture} className="user-list-image" alt=""/>
              <div className="user-list-name">{user.name}</div>
            </div>
          <div className="user-list-info-container">
            <div className="user-list-information">
              <div className="user-list-title">Distance in miles: {user.distance_from_user.toFixed(2)}</div>
              <div className="user-list-title">{user.hobbies?`Hobbies:`:null}</div>
              <div className="user-list-description">{user.hobbies}</div>
            </div>
            <div className="user-list-information">
              <div className="user-list-title">{user.inspirations?`Inspirations:`:null}</div>
              <div className="user-list-description">{user.inspirations}</div>
            </div>
            <div className="user-list-information">
              <div className="user-list-title">{user.coffeetea?`Coffee or Tea:`:null}</div>
              <div className="user-list-description">{user.coffeetea}</div>
            </div>
            <div className="user-list-information">
              <div className="user-list-title">{user.favfood?`What do you like to eat:`:null}</div>
              <div className="user-list-description">{user.favfood}</div>
            </div>
            <div className="user-list-information">
              <div className="user-list-title">{user.travelbeen?`Where have you been:`:null}</div>
              <div className="user-list-description">{user.travelbeen}</div>
            </div>
            <div className="user-list-information">
              <div className="user-list-title">{user.travelto?`Where do you want to go:`:null}</div>
              <div className="user-list-description">{user.travelto}</div>
            </div>
            <div className="user-list-information">
              <div className="user-list-title">{user.bestdone?`Best thing you've done:`:null}</div>
              <div className="user-list-description">{user.bestdone}</div>
            </div>
            <div className="user-list-information">
              <div className="user-list-title">{user.worstdone?`Worst thing you've done:`:null}</div>
              <div className="user-list-description">{user.worstdone}</div>
            </div>
            <div className="user-list-information">
              <div className="user-list-title">{user.work?`What do you do for work:`:null}</div>
              <div className="user-list-description">{user.work}</div>
            </div>
            <div className="user-list-information">
              <div className="user-list-title">{user.school?`What did you study in school:`:null}</div>
              <div className="user-list-description">{user.school}</div>
            </div>
            <div className="user-list-information">
              <div className="user-list-title">{user.goodat?`What are you good at:`:null}</div>
              <div className="user-list-description">{user.goodat}</div>
            </div>
            <div className="user-list-information">
              <div className="user-list-title">{user.suckat?`What do you suck at:`:null}</div>
              <div className="user-list-description">{user.suckat}</div>
            </div>
            <div className="user-list-information">
              <div className="user-list-title">{user.songs?`Favorite bands:`:null}</div>
              <div className="user-list-description">{user.songs}</div>
            </div>
          </div>
        </div>
      ) 
    }));
    
    // console.log("userlist_length",this.state.usersList.length)
    // console.log("DATA-SASA", data)
    return (
      <div className="list-child">
      {
          this.state.usersList.length ?
          <MotionStack
          data={data}
          onSwipeEnd={this.onSwipeEnd}
          render={props => props.element}
          renderButtons={this.renderButtons}/>
          : <Progress/>
        }
      </div>
    );
  }
}