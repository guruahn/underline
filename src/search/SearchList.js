import React, { Component } from 'react';
import Book from '../books/Book';

class SearchList extends Component {

    render() {
      
      const mapToComponent = (books) => {
          return books.map((book, i) => {
              return (
                <div key={i}>
                  <Book
                    book={book}
                    />
                  <button
                    onClick={() => this.props.onAdd(book)}
                    type={"button"}
                    className="btn btn-default"
                    aria-label={"Left Align"}>
                    <span
                      className={"glyphicon glyphicon-plus" }
                      aria-hidden={"true"}></span>
                  </button>
                </div>
              )
          });
      };
      if(this.props.books){
        return(
            <div className={"col-sm-12"}>
              <div className={"well-lg"}>
                <h4>Search Result</h4>
                <div className={"list"}>{mapToComponent(this.props.books)}</div>
              </div>
            </div>
        );
      }else{
        return <div className={"well well-lg navbar-fixed-top col-lg-10 col-sm-12 well-lg-mt-50 hide"}>결과가 없습니다.</div>;
      }

    }
}

export default SearchList;
