import React from "react";
import Helper from "../../utils/helpers";

const getButtonTitle = (input) => {
    if (input) return input;
    Helper.sys.info(`Hmm, you are missing a title on a button.`);
    return 'Untitled :)';
}

const getClassName = (input) => {
    if (input) return input;
    return 'Default-Anchor-Button';
}

class AnchorButton extends React.Component {

  render() {
    return <button onClick={this.props.onClick} className={getClassName(this.props.theme)}>{getButtonTitle(this.props.name)}</button>;
  }
}

export default AnchorButton;
