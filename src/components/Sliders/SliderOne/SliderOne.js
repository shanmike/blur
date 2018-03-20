import React, {Component} from 'react';
import Slider from 'material-ui/Slider';
import axios from 'axios';

export default class SliderExampleControlled extends Component {
  constructor(){
    super()
    this.state = {
      distance_range:0,
    }
    this.handleSlider = this.handleSlider.bind(this)
  }

  handleSlider = (event, value) => {
      console.log(this.state.distance_range)
      this.setState({
        distance_range: value
      },()=>{
        axios.put('/updateUser',this.state)
    })
  }

  render() {
    
    return (
      <div>
        <div>{`Distance in miles: ${this.state.distance_range}`}</div>
        <Slider
          min={0}
          max={100}
          step={1}
          value={this.state.distance_range}
          onChange={this.handleSlider}/>
      </div>
    );
  }
}