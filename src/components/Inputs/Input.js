import { Component } from 'react';
import './Input.css';

class Input extends Component {
  render() {
    return (
      <input
        onChange={e => {
          this.props.onChange(e.target.value);
        }}
        className="Default-input"
        placeholder={this.props.placeholder}
      />
    );
  }
}

export default Input;
