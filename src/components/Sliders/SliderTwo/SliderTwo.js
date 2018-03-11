import React, {Component} from 'react';
import Slider from 'material-ui/Slider';

export default class SliderExampleControlled extends Component {
  state = {
    Slider:18,
  };

  handleSlider = (event, value) => {
    this.setState({Slider: value});
  };
  render() {
    return (
      <div>
        <div>{`Age: ${this.state.Slider}`}</div>
        <Slider
          min={18}
          max={65}
          step={1}
          value={this.state.Slider}
          onChange={this.handleSlider}/>
      </div>
    );
  }
}