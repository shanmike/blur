import React from 'react';
import MotionStack from 'react-motion-stack';
import Buttons from '../Buttons/Buttons'
import './MyCards.css';

const data = Array.from({ length: 10 }, (_, i) => ({
    id: new Date().getTime() + i,
    element: (
      <img
        className="motion-image"
        draggable={false}
        src={`https://source.unsplash.com/random/${i + 1}`} width={345} height = {400}
        alt ='user profile'
      />
    )
  }));

export default class MyCards extends React.Component {
  onSwipeEnd = ({ data }) => {
    console.log('data', data);
  };
  
  renderButtons(props) {
    return (
      <Buttons buttonProps={props}/>
    )
  }
  
  render() {
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