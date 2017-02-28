import React, { Component, PropTypes } from 'react';
import { database, firebaseAuth } from '../config/constants'
import Book from './Book';
import PreloaderIcon, {ICON_TYPE} from 'react-preloader-icon';

import { connect } from 'react-redux';
import * as actions from '../actions/MyBooks';

const propTypes = {
};
const defaultProps = {
};
class MyBooks extends Component {
  constructor(props) {
    super(props);
    this.user = firebaseAuth().currentUser;
    this.mybooksRef = database.ref('/user-books/' + this.user.uid);
    this.listnerAddedBook = this.listnerAddedBook.bind(this);
  }

  getInitMyBooks(){
    let _this = this
    console.log('start getInitMyBooks!!!!')
    this.mybooksRef.once('value').then(function(snapshot) {
      let myBooks = []
      snapshot.forEach(function(data){
        console.log("The " + data.key + " dinosaur's score is " + JSON.stringify(data.val()));
        myBooks.push({key:data.key, value:data.val()})
      });
      _this.props.handleSetMyBooks(myBooks);
    });
  }

  listnerAddedBook(){
    //listner added my books
    this.mybooksRef.on('child_added', function(data) {
      this.props.handleAddBook(data.key, data.val());
      //addCommentElement(postElement, data.key, data.val().text, data.val().author);
    });
  }


  // TODO 검색후 책 추가 시 MyBooks에 반영
  // TODO MyBooks 책 삭제 기능 추가

  componentDidMount(){
    this.getInitMyBooks()
  }
  render() {

    const mapToComponent = (books) => {
      if(books.length == 0){
        return <PreloaderIcon type={ICON_TYPE.OVAL} size={32} strokeWidth={3} strokeColor="#F0AD4E" duration={800} />
      }
      return books.map((book, i) => {
        return (
            <li className={"list-group-item"} key={book.key}>
              <Book
                book={book.value}
                />
            </li>

        )
      });
    };

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
MyBooks.propTypes = propTypes;
MyBooks.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    books: state.myBooks.books
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleAddBook: (book) => { dispatch(actions.addBook(book))},
    handleSetMyBooks: (books) => { dispatch(actions.setMyBooks(books))}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyBooks);
