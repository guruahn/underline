import React, { Component } from 'react';
import './style/Book.css';

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
            <div className="Book">{this.stringToHtml(this.props.book.title)}</div>
        );
    }
}

export default Book;
