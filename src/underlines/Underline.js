import React, { Component, PropTypes } from 'react';
const propTypes = {
};
const defaultProps = {
};
class Underline extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>{this.props.underline}</div>
        );
    }
}
Underline.propTypes = propTypes;
Underline.defaultProps = defaultProps;
export default Underline;
