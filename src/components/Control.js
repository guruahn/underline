import React, { Component, PropTypes } from 'react';
const propTypes = {
  onPlus: PropTypes.func,
  onSubtract: PropTypes.func,
  onRandomizeColor: PropTypes.func
};

function createWarning(funcName){
  return () => console.warn(funcName + 'is now defined')
}
const defaultProps = {
  onPlus: () => createWarning('onPlus'),
  onSubtract: () => createWarning('onSubtract'),
  onRandomizeColor: () => createWarning('onRandomizeColor')
};
class Control extends Component {

    render() {
        return(
            <div>
              <button onClick={this.props.onPlus}>+</button>
              <button onClick={this.props.onSubtract}>-</button>
              <button onClick={this.props.onRandomizeColor}>Randomize Color</button>
            </div>
        );
    }
}
Control.propTypes = propTypes;
Control.defaultProps = defaultProps;
export default Control;
