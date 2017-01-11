import React, { Component, PropTypes } from 'react';
import Book from './Book';
import Add from './Add';

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
                <div>
                  <Book
                    book={book}
                    key={i}
                    />
                  <Add
                    onAdd={this.props.handleIncrement}
                    />
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
