import React, { Component, PropTypes } from 'react';
import UnderlineAddForm from './UnderlineAddForm';
const propTypes = {
};
const defaultProps = {
};
class MyUnderlines extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div><UnderlineAddForm /></div>
        );
    }
}
MyUnderlines.propTypes = propTypes;
MyUnderlines.defaultProps = defaultProps;
export default MyUnderlines;
