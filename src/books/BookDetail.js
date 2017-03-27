import React, { Component, PropTypes } from 'react';
import { database, firebaseAuth } from '../config/constants';
import Book from './Book';
import Underline from '../underlines/Underline';
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
        this.bookUnderlinesRef = database.ref('/book-underlines/' + this.props.match.params.bookKey);
        this.getBook = this.getBook.bind(this);
        this.getUnderlines = this.getUnderlines.bind(this);
        this.state = {
          book: null,
          underlines: []
        }
    }

    getBook(){
      let _this = this
      console.log('start getBook!!!!')//[this.props.match.params.bookKey
      this.bookRef.once('value').then(function(snapshot) {
        //console.log(snapshot.val())
        _this.setState( { book: snapshot.val() } )
        _this.getUnderlines();
      });
    }

    getUnderlines(){
      let _this = this;
      let underlinse = []
      this.bookUnderlinesRef.once('value').then(function(snapshot) {
        console.log(snapshot.val())
        snapshot.forEach(function(data){
          console.log("The " + data.key + " dinosaur's score is " + JSON.stringify(data.val().line));
          underlinse.push({key:data.key, value:data.val().line})

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
