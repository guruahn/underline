import React, { Component, PropTypes } from 'react';
import Book from './Book';

const propTypes = {
};
const defaultProps = {
  onAdd: () => createWarning('onAdd'),
};
class SearchList extends Component {
    constructor(props) {
        super(props);
    }
    render() {

      const mapToComponent = (books) => {
          return books.map((book, i) => {
              return (
                <div key={i}>
                  <Book
                    book={book}
                    />
                  <button onClick={() => this.props.onAdd(book)}>+</button>
                </div>
              )
          });
      };
      if(this.props.books.length > 0){
        return(
            <div className={"container navbar-fixed-top well-lg-mt-70"}>
              <div className={"well well-lg"}>
                <h3>SearchList</h3>
                <div className={"list"}>{mapToComponent(this.props.books)}</div>
              </div>
            </div>
        );
      }else{
        return <div className={"well well-lg navbar-fixed-top col-lg-10 col-sm-12 well-lg-mt-50 hide"}>결과가 없습니다.</div>;
      }

    }
}

function createWarning(funcName){
  return () => console.warn(funcName + 'is now defined')
}

SearchList.propTypes = propTypes;
SearchList.defaultProps = defaultProps;
export default SearchList;
