import React, { Component, PropTypes } from 'react';
const propTypes = {
  onAdd: PropTypes.func,
};
const defaultProps = {
  onAdd: PropTypes.func,
};
class Add extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div><button onClick={this.props.onPlus}>+</button></div>
        );
    }
}

function createWarning(funcName){
  return () => console.warn(funcName + 'is now defined')
}

Add.propTypes = propTypes;
Add.defaultProps = defaultProps;
export default Add;
