import React, { Component, PropTypes } from 'react';
import SearchForm from './SearchForm';
import SearchList from './SearchList';
import jsonp from 'jsonp';
import { database, firebaseAuth } from '../config/constants'

import { connect } from 'react-redux';

import * as actions from '../actions/MyBooks';
const propTypes = {
  addBook: PropTypes.func,
  handleSearch: PropTypes.func
};
const defaultProps = {
  addBook: () => createWarning('addBook'),
  handleSearch: () => createWarning('handleSearch'),
};

class Search extends Component {
  constructor(props) {
    super(props);
    this.addBook = this.addBook.bind(this);
    this.addUserBook = this.addUserBook.bind(this);
    this.user = firebaseAuth().currentUser
    //console.log(this.user)
  }



  addBook(book){
    console.log(book.isbn13)

    let updates = {};
    let _this = this;
    let bookKey;
    database.ref().child('books').orderByChild('isbn13').equalTo(book.isbn13).on('value', function(snapshot, key) {

      snapshot.forEach(function(data) {
        console.log("The " + data.key + " dinosaur's score is " + data.val());
        bookKey = data.key;
        _this.addUserBook(book, bookKey, _this);
      });
      console.log( 'snapshot.length: ' + JSON.stringify(snapshot.val()) )
      if(!snapshot.val()){
        bookKey = database.ref().child('books').push().key;
        updates['/books/' + bookKey] = book;
        database.ref().update(updates);
        _this.addUserBook(book, bookKey, _this);
      }


    });


  }

  addUserBook(book, key, _this){
    let updates = {};
    database.ref('/user-books/' + _this.user.uid + '/' + key).on('value', function(userbooksnapshot, userbookkey) {
      if(!userbooksnapshot.val()){
        updates['/user-books/' + _this.user.uid + '/' + key] = book;
        database.ref().update(updates);
        _this.props.handleSetBooks([]);
        _this.props.handleAddBook({key:key,value:book});
        console.log(JSON.stringify({key:key,value:book}))
      }
    });
  }

  handleSearch = keyword => {
    if (keyword.length !== 0) {
      jsonp(`https://apis.daum.net/search/book?apikey=f43b4510bf93765b4b6800c889be1b89&q=${keyword}&output=json`, null, (err, bookData) =>{
        if (err) {
          console.error(err.message);
        } else {
          //console.log(bookData);
          this.props.handleSetBooks(bookData.channel.item);
        }
      });
    }
  }

  componentWillMount(){


  }

  render() {

    const printSearchList = () => {
      if(this.props.searchBooks && this.props.searchBooks.length > 0){
        return <SearchList books={this.props.searchBooks} onAdd={this.addBook} />
      }
    }

    return(
      <div>
        <SearchForm onSearch={this.handleSearch} />
        {printSearchList()}
      </div>
    );
  }
}

function createWarning(funcName){
  return () => console.warn(funcName + 'is now defined')
}

Search.propTypes = propTypes;
Search.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    keyword: state.myBooks.keyword,
    searchBooks: state.myBooks.searchBooks
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleInsertKeyword: () => { dispatch(actions.insertKeyword())},
    handleAddBook: (book) => { dispatch(actions.addBook(book))},
    handleSetBooks: (books) => { dispatch(actions.searchList(books))},
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
