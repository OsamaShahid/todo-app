import * as React from 'react';
import TextField from '@mui/material/TextField';

class Input extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onChange(e?.target?.value);
    }

    render() {
        const { text } = this.props;
      return (
        <TextField id="new-todo" onChange={(e) => this.handleChange(e)} size="small" label="What needs to be done?" variant="outlined" value={text} />
      );
    }
  }


export default Input;
