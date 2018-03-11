import React, {Component} from 'react';
import Slider from 'material-ui/Slider';

export default class SliderExampleControlled extends Component {
  state = {
    Slider:0,
  };

  handleSlider = (event, value) => {
    this.setState({Slider: value});
  };
  render() {
    return (
      <div>
        <div>{`Distance in miles: ${this.state.Slider}`}</div>
        <Slider
          min={0}
          max={100}
          step={1}
          value={this.state.Slider}
          onChange={this.handleSlider}/>
      </div>
    );
  }
}