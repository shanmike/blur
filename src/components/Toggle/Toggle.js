import React from "react";
import Toggle from "material-ui/Toggle";

const styles = {
  block: {
    margin: "auto"
  },
  thumbOff: {
    backgroundColor: "#ffcccc"
  },
  trackOff: {
    backgroundColor: "#ff9d9d"
  },
  thumbSwitched: {
    backgroundColor: "#FF5C00"
  },
  trackSwitched: {
    backgroundColor: "#FF5C00"
  },
  labelStyle: {
    color: "#7D7D7D"
  }
};

const ToggleExampleSimple = props => (
  <div style={styles.block}>
    <Toggle
      thumbStyle={styles.thumbOff}
      trackStyle={styles.trackOff}
      thumbSwitchedStyle={styles.thumbSwitched}
      trackSwitchedStyle={styles.trackSwitched}
      labelStyle={styles.labelStyle}
      onToggle={() => props.handleChange({ visible: !props.visible })}
      toggled={props.visible}
    />
  </div>
);

export default ToggleExampleSimple;
