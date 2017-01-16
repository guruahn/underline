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
      if(this.props.books){
        return(
            <div>
              <h3>SearchList</h3>
              <div className={"list"}>{mapToComponent(this.props.books.channel.item)}</div>
            </div>
        );
      }else{
        return <div>결과가 없습니다.</div>;
      }

    }
}

function createWarning(funcName){
  return () => console.warn(funcName + 'is now defined')
}

SearchList.propTypes = propTypes;
SearchList.defaultProps = defaultProps;
export default SearchList;
