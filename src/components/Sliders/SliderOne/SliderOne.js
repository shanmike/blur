import React, {Component} from 'react';
import Slider from 'material-ui/Slider';

export default class SliderExampleControlled extends Component {
  render(props) {
    return (
      <div className="slider-container">
        <div className="slider-text">{`Distance in miles: ${this.props.distance_range}`}</div>
        <Slider className="the-slider"
          min={0}
          max={100}
          step={1}
          value={this.props.distance_range}
          onChange={(event, value)=>this.props.handleSlider({distance_range:value})}/>
      </div>
    );
  }
}