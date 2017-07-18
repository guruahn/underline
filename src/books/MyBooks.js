import React, { Component } from 'react';
import { database } from '../config/constants';
import Book from '../books/Book';
import { Link } from 'react-router-dom'
import Loading from 'react-loading-animation';

import { connect } from 'react-redux';
import * as actions from './BooksActions';

class MyBooks extends Component {
  constructor(props) {
    super(props);
    this.mybooksRef = database.ref('/user-books/' + this.props.user.uid);
    this.onRemove = this.onRemove.bind(this);
  }

  getInitMyBooks(){
    let _this = this
    console.log('start getInitMyBooks!!!!')
    this.mybooksRef.once('value').then(function(snapshot) {
      let myBooks = []
      snapshot.forEach(function(data){
        //console.log("The " + data.key + " dinosaur's score is " + JSON.stringify(data.val()));
        myBooks.push({key:data.key, value:data.val()})
      });
      //console.log(myBooks)
      _this.props.handleSetMyBooks(myBooks);
    });
  }

  onRemove(book){
    let updates = {};
    let _this = this;
    this.props.handleOnIng(book);
    updates['/user-books/' + this.props.user.uid + '/' + book.key] = null;

    //update book and then
    database.ref().update(updates).then(function() {
      _this.props.handleRemoveBook(book);
    });

  }

  componentDidMount(){
    this.getInitMyBooks()
  }

  render() {
    //console.log('mybooks props', this.props)
    const mapToComponent = (books) => {
      if(typeof books === 'undefined' || books.length === 0){
        return <Loading />
      }else{
        return books.map((book, i) => {
          return (
              <li className={"list-group-item"} key={book.key}>
                <Link to={`${this.props.match.url}/${book.key}`}>
                  <Book
                    book={book.value}
                    />
                </Link>
                <i
                  onClick={() => this.onRemove(book)}
                  className={book.ing === true ? 'fa fa-circle-o-notch fa-spin fa-fw' : 'fa fa-minus-square-o'}
                  aria-hidden={"true"}
                  role={"button"}></i>
              </li>
          )
        });
      }

    };
    //console.log(this.props.books)
    return(
        <div className="u-maxWidth700 u-marginAuto">
          <div>
            <h1>My Books</h1>
            <ul className={"list-group"}>{mapToComponent(this.props.books)}</ul>
          </div>

        </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    books: state.books.books
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSetMyBooks: (books) => { dispatch(actions.setMyBooks(books)) },
    handleRemoveBook: (book) => { dispatch(actions.removeBook(book)) },
    handleOnIng: (book) => { dispatch(actions.onIng(book)) }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyBooks);
export { MyBooks as PureMyBooks};
