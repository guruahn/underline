import React, { Component, PropTypes } from 'react';
import { database, firebaseAuth } from '../config/constants';
import Book from './Book';
import Underline from '../underlines/Underline';
import Loading from 'react-loading-animation';

import { connect } from 'react-redux';
import * as actions from './BooksActions';

const propTypes = {
  getBook: PropTypes.func
};
const defaultProps = {
  getBook: () => createWarning('getBook'),
};
class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.getBook = this.getBook.bind(this);
    this.getUnderlines = this.getUnderlines.bind(this);
  }

  getBook(){
    let _this = this
    let bookRef = database.ref('/user-books/' + this.props.user.uid + '/' + this.props.match.params.bookKey);
    //console.log('start getBook!!!!')
    bookRef.once('value').then(function(snapshot, key) {
      //console.log(snapshot.val())
      _this.props.handleSetBook(snapshot.val())
      _this.getUnderlines(snapshot.val(), key);
    });
  }

  getUnderlines(book, bookKey){
    let _this = this;
    let userBooksRef = database.ref('/user-books/' + this.props.user.uid + '/' + this.props.match.params.bookKey + '/underlines');
    let underlines = [];
    userBooksRef.once('value').then(function(snapshot) {
      snapshot.forEach(function(data){
        //console.log("The " + data.key + " dinosaur's score is " + JSON.stringify(data.val().line));
        underlines.push({key:data.key, value:data.val()})
      });
      _this.props.handleSetUnderlinesOfBook(underlines)
    });
  }

  componentDidMount(){
    console.log('bookDetail props', this.props)
    this.getBook()
  }

  render() {

    const mapToComponent = (underlines) => {
      if(typeof underlines === 'undefined' || underlines.length === 0){
        return <Loading />
      }else{
        return underlines.map((underline, i) => {
          return (
              <li className={"list-group-item"} key={underline.key}>
                <Underline
                  underline={underline.value}
                  />
              </li>
          )
        });
      }
    };

    const printBook = (book) => {
      //console.log('book', book)
      if(typeof book === 'undefined'){
        return <Loading />
      }else{
        return <Book
          book={book}
          />
      }

    };
    return(
        <div className="BookDetail u-maxWidth700 u-marginAuto">
          <h1>{printBook(this.props.bookDetail)}</h1>
          <h2>Underlines</h2>
          <ul className={"list-group"}>{mapToComponent(this.props.underlinesOfBook)}</ul>
        </div>
    );
  }
}

function createWarning(funcName){
  return () => console.warn(funcName + 'is now defined')
}

BookDetail.propTypes = propTypes;
BookDetail.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    bookDetail: state.bookDetail.bookDetail,
    underlinesOfBook: state.bookDetail.underlinesOfBook
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSetBook: (book) => { dispatch(actions.setBook(book)) },
    handleSetUnderlinesOfBook: (underlines) => { dispatch(actions.setUnderlinesOfBook(underlines)) },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookDetail);
