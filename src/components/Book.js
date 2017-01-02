import React, { Component, PropTypes } from 'react';
const propTypes = {
};
const defaultProps = {
};
class Book extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>Book</div>
        );
    }
}
Book.propTypes = propTypes;
Book.defaultProps = defaultProps;
export default Book;
