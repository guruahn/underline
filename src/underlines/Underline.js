import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

class Underline extends Component {

  render() {
    const printBookInfo = () => {
      //console.log('book', this.props.underline )
      if(this.props.underline.book && this.props.underline.bookKey){
        let to = "/mybooks/" + this.props.underline.bookKey;
        return <Link to={to} data-name={"book-link"} className={"list-group__link"}>{'《' + this.props.underline.book.title + '》'}</Link>;
      }
    }
    return(
        <div className="Underline">
          {this.props.underline.line}
          {printBookInfo()}
          <span data-name={"fromNow"}>{moment(this.props.underline.updateDatetime).fromNow()}</span>
        </div>
    );
  }
}
export default Underline;
