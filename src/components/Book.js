import React, { Component, PropTypes } from 'react';
const propTypes = {
};
const defaultProps = {
};
class Book extends Component {
    constructor(props) {
        super(props);
    }
    stringToHtml(str) {
      str = str.replace(/&lt;/g, "<")
      str = str.replace(/&gt;/g, ">")
      return str.replace(/<\/?[^>]+(>|$)/g, "");
    }
    render() {
        return(
            <div>{this.stringToHtml(this.props.book.title)}</div>
        );
    }
}
Book.propTypes = propTypes;
Book.defaultProps = defaultProps;
export default Book;
