import React, {Component} from 'react';
import Slider from 'material-ui/Slider';


export default class SliderExampleControlled extends Component {
  render(props) {
    return (
      <div>
        <div>{`Age: ${this.props.age_max}`}</div>
        <Slider
          min={18}
          max={65}
          step={1}
          value={this.props.age_max}
          onChange={(event,value)=>this.props.handleSlider({age_max:value})}/>
      </div>
    );
  }
}