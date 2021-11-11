import { Component } from 'react';
import './Button.css';

class Button extends Component {
  render() {
    return (
      <button className={`Default-button ${this.props.current ? 'current' : ''}`} onClick={this.props.onClick}>
        {this.props.text}
      </button>
    );
  }
}

export default Button;
