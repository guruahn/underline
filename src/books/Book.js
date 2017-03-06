import React, { Component, PropTypes } from 'react';
const propTypes = {
  stringToHtml: PropTypes.func
};
const defaultProps = {
  stringToHtml: () => createWarning('onAdd'),
};

class Book extends Component {

    stringToHtml(str) {
      if(str){
        str = str.replace(/&lt;/g, "<")
        str = str.replace(/&gt;/g, ">")
        return str.replace(/<\/?[^>]+(>|$)/g, "");
      }
    }
    render() {
        return(
            <div>{this.stringToHtml(this.props.book.title)}</div>
        );
    }
}

function createWarning(funcName){
  return () => console.warn(funcName + 'is now defined')
}

Book.propTypes = propTypes;
Book.defaultProps = defaultProps;

export default Book;
