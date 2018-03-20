import React from 'react';
import TextField from 'material-ui/TextField';
import {grey500} from 'material-ui/styles/colors';

const styles = {
  errorStyle: {
    color: grey500,
  },
  underlineStyle: {
    borderColor: grey500,
  },
  floatingLabelStyle: {
    color: grey500,
  },
  floatingLabelFocusStyle: {
    color: grey500,
  },
};

const TextFieldExampleCustomize = (props) => (
  <div>
  {console.log(props.val)}
    <TextField
      floatingLabelText={props.name}
      floatingLabelStyle={styles.floatingLabelStyle}
      floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
      underlineFocusStyle={styles.underlineStyle}
      onChange = {(e)=>{props.handleChange(e.target.value, props.keyValue)}}
      // defaultValue={`${props.val}`}
    />
  </div>
);

export default TextFieldExampleCustomize;