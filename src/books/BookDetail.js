import React, { Component, PropTypes } from 'react';
import { database, firebaseAuth } from '../config/constants';
import Book from './Book';
import Underline from '../underlines/Underline';
import Loading from 'react-loading-animation';

import { connect } from 'react-redux';
import * as actions from './BooksActions';

const propTypes = {
  book: PropTypes.object,
};
const defaultProps = {
};
class BookDetail extends Component {
    constructor(props) {
        super(props);
        this.user = firebaseAuth().currentUser;
        console.log('/user-books/' + this.user.uid )
        this.bookRef = database.ref('/user-books/' + this.user.uid + '/' + this.props.match.params.bookKey);
        this.bookUnderlinesRef = database.ref('/book-underlines/' + this.props.match.params.bookKey);
        this.userBooksRef = database.ref('/user-books/' + this.user.uid + '/' + this.props.match.params.bookKey + '/underlines');
        this.getBook = this.getBook.bind(this);
        this.getUnderlines = this.getUnderlines.bind(this);
        this.state = {
          book: null,
          underlines: []
        }
    }

    getBook(){
      let _this = this
      console.log('start getBook!!!!')
      this.bookRef.once('value').then(function(snapshot, key) {
        //console.log(snapshot.val())
        _this.setState( { book: snapshot.val() } )
        _this.getUnderlines(snapshot.val(), key);
      });
    }

    getUnderlines(book, bookKey){
      let _this = this;
      let underlinse = [];
      this.userBooksRef.once('value').then(function(snapshot) {
        snapshot.forEach(function(data){
          console.log("The " + data.key + " dinosaur's score is " + JSON.stringify(data.val()));
          underlinse.push({key:data.key, value:JSON.stringify(data.val())})
        });
        _this.setState( { underlines: underlinse } )
      });
    }

    componentDidMount(){
      this.getBook()
    }

    render() {

      const mapToComponent = (underlines) => {
        if(underlines && underlines.length === 0){
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

      const printBook = () => {
        if(!this.state.book){
          return <Loading />
        }else{
          return (
            <Book
              book={this.state.book}
              />
          )
        }

      };
      return(
          <div>
            <h3>Book Detail</h3>
            {this.props.match.params.bookKey}
            {printBook()}
            <ul className={"list-group"}>{mapToComponent(this.state.underlines)}</ul>
          </div>
      );
    }
}
BookDetail.propTypes = propTypes;
BookDetail.defaultProps = defaultProps;
export default BookDetail;
