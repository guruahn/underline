import React, { Component, PropTypes } from 'react';
import { database, firebaseAuth } from '../config/constants'
import Book from './Book';

const propTypes = {
};
const defaultProps = {
};
class MyBooks extends Component {
  constructor(props) {
      super(props);
      this.user = firebaseAuth().currentUser
      this.state = {
        myBooks: []
      }
  }

  getInitMyBooks(){
    let _this = this
    database.ref('/user-books/' + this.user.uid).once('value').then(function(snapshot) {
      let myBooks = []
      snapshot.forEach(function(data){
        //console.log("The " + data.key + " dinosaur's score is " + JSON.stringify(data.val()));
        myBooks.push({key:data.key, value:data.val()})
      });
      _this.setState({myBooks : myBooks});
    });
  }


  // TODO 검색후 책 추가 시 MyBooks에 반영
  // TODO MyBooks 책 삭제 기능 추가

  componentDidMount(){

    this.getInitMyBooks()
  }
  render() {

    const mapToComponent = (books) => {
      return books.map((book, i) => {
        return (
          <div key={book.key}>
            <Book
              book={book.value}
              />
          </div>
        )
      });
    };

    return(
        <div>
          <div className={"list"}>{mapToComponent(this.state.myBooks)}</div>
        </div>
    );
  }
}
MyBooks.propTypes = propTypes;
MyBooks.defaultProps = defaultProps;
export default MyBooks;
