import React, {Component} from 'react';
import Slider from 'material-ui/Slider';
import axios from 'axios';

export default class SliderExampleControlled extends Component {
  constructor(){
    super()
    this.state = {
      age_min:18,
      age_max:18
    };
  }

  handleSlider = (event, value) => {
    console.log(this.state.age_max)
      this.setState({
        age_max: value
      },()=>{
        axios.put('/updateUser',this.state)
    })
  }
  render() {
    return (
      <div>
        <div>{`Age: ${this.state.age_max}`}</div>
        <Slider
          min={18}
          max={65}
          step={1}
          value={this.state.age_max}
          onChange={this.handleSlider}/>
      </div>
    );
  }
}