import React, { Component, PropTypes } from 'react';
import { database, firebaseAuth } from '../config/constants';
import Book from './Book';
import Loading from 'react-loading-animation';

const propTypes = {
};
const defaultProps = {
};
class BookDetail extends Component {
    constructor(props) {
        super(props);
        this.user = firebaseAuth().currentUser;
        console.log('/user-books/' + this.user.uid )
        this.bookRef = database.ref('/user-books/' + this.user.uid + '/' + this.props.match.params.bookKey);
        this.getBook = this.getBook.bind(this);
        this.state = {
          book: null
        }
    }

    getBook(){
      let _this = this
      console.log('start getBook!!!!')//[this.props.match.params.bookKey
      this.bookRef.once('value').then(function(snapshot) {
        console.log(snapshot.val())
        _this.setState( { book: snapshot.val() } )
      });
    }

    componentDidMount(){
      this.getBook()
    }

    render() {
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
          </div>
      );
    }
}
BookDetail.propTypes = propTypes;
BookDetail.defaultProps = defaultProps;
export default BookDetail;
