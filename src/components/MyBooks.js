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

            <ul className={"list-group"}>{mapToComponent(this.state.myBooks)}</ul>
          </div>

        </div>
    );
  }
}
MyBooks.propTypes = propTypes;
MyBooks.defaultProps = defaultProps;
export default MyBooks;
