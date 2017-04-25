import React, { Component } from 'react';

class Underline extends Component {

    render() {
        return(
            <div>{this.props.underline}</div>
        );
    }
}
Underline.propTypes = {};
Underline.defaultProps = {};
export default Underline;
