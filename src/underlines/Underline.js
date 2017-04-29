import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { datetimeFormat } from '../config/constants'

class Underline extends Component {

  render() {
    const printBookInfo = () => {
      console.log('book', this.props.underline )
      if(this.props.underline.book && this.props.underline.bookKey){
        let to = "/mybooks/" + this.props.underline.bookKey;
        return <Link to={to} className="">{'《' + this.props.underline.book.title + '》'}</Link>;
      }
    }
    return(
        <div className="Underline">
          {this.props.underline.line}
          {printBookInfo()}
          <span>{moment(this.props.underline.updateDatetime).fromNow()}</span>
        </div>
    );
  }
}
Underline.propTypes = {};
Underline.defaultProps = {};
export default Underline;
