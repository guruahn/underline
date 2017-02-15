import React, { Component, PropTypes } from 'react';
const propTypes = {
};
const defaultProps = {
};
class MyBooks extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>MyBooks</div>
        );
    }
}
MyBooks.propTypes = propTypes;
MyBooks.defaultProps = defaultProps;
export default MyBooks;
