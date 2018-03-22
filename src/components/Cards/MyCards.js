import React from 'react';
import MotionStack from 'react-motion-stack';
import Buttons from '../Buttons/Buttons';
import axios from 'axios';
import './MyCards.css';


const data = Array.from({ length: 10 }, (_, i) => ({
  id: new Date().getTime() + i,
  element: (
    <div>
      <h2>User information goes here</h2>
      <h3>{`User Count: ${i+1}`}</h3>
    </div>
  ) 
}));

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
    return (
      <div className="demo-wrapper">
        <MotionStack
          data={data}
          onSwipeEnd={this.onSwipeEnd}
          render={props => props.element}
          renderButtons={this.renderButtons}/>
      </div>
    );
  }
}