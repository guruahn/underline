import React, { Component, PropTypes } from 'react';
import { database, firebaseAuth } from '../config/constants'
import Book from './Book';
import PreloaderIcon, {ICON_TYPE} from 'react-preloader-icon';

import { connect } from 'react-redux';
import * as actions from '../actions/MyBooks';

const propTypes = {
  getInitMyBooks: PropTypes.func,
  onRemove: PropTypes.func
};
const defaultProps = {
  getInitMyBooks: () => createWarning('getInitMyBooks'),
  onRemove: () => createWarning('onRemove'),
};

class MyBooks extends Component {
  constructor(props) {
    super(props);
    this.user = firebaseAuth().currentUser;
    console.log(this.user)
    this.mybooksRef = database.ref('/user-books/' + this.user.uid);
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
    updates['/user-books/' + this.user.uid + '/' + book.key] = null;

    //update book and then
    database.ref().update(updates).then(function() {
      _this.props.handleRemoveBook(book);
    });

  }

  componentDidMount(){
    this.getInitMyBooks()
  }

  render() {

    const mapToComponent = (books) => {
      if(books && books.length === 0){
        return <PreloaderIcon type={ICON_TYPE.OVAL} size={32} strokeWidth={3} strokeColor="#F0AD4E" duration={800} />
      }else{
        return books.map((book, i) => {
          return (
              <li className={"list-group-item"} key={book.key}>
                <Book
                  book={book.value}
                  />
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
        <div>
          <div className={"panel panel-default"}>
            <div className={"panel-heading"}>My Library</div>
            <div className={"panel-body"}>
              <p>Manage your library simply</p>
            </div>

            <ul className={"list-group"}>{mapToComponent(this.props.books)}</ul>
          </div>

        </div>
    );
  }
}

function createWarning(funcName){
  return () => console.warn(funcName + 'is now defined')
}

MyBooks.propTypes = propTypes;
MyBooks.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    books: state.myBooks.books
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleAddBook: (book) => { dispatch(actions.addBook(book)) },
    handleSetMyBooks: (books) => { dispatch(actions.setMyBooks(books)) },
    handleRemoveBook: (book) => { dispatch(actions.removeBook(book)) },
    handleOnIng: (book) => { dispatch(actions.onIng(book)) }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyBooks);
