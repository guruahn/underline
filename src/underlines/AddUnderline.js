import React, { Component, PropTypes } from 'react';
import { database, firebaseAuth, datetimeFormat } from '../config/constants'
import { withRouter } from 'react-router-dom'
import moment from 'moment';

import { connect } from 'react-redux';
import * as actions from './UnderlinesActions';

import './style/AddUnderline.css'

const propTypes = {
  underline: PropTypes.string,
  isWritingLine: PropTypes.bool,
  isSearching: PropTypes.bool,
  redirectToBookDetail: PropTypes.string
};
const defaultProps = {
  underline: '',
  isWritingLine: false,
  isSearching: false,
  redirectToBookDetail: ''
};
class addUnderline extends Component {
    constructor(props) {
      super(props);
      this.setUnderline = this.setUnderline.bind(this);
      this.addUnderline = this.addUnderline.bind(this);
    }

    setUnderline(event) {
      this.props.handleSetUnderlines(event.target.value);
    }

    addUnderline() {
      let _this = this;
      const updates = {};
      const underlineKey = database.ref().child('underlines').push().key;
      updates['/underlines/' + underlineKey] = { line:this.props.underline, updateDatetime: moment().format(datetimeFormat) };
      console.log(updates)
      database.ref().update(updates).then(function() {
        console.log('result addUnderline', JSON.stringify({key:underlineKey,value:_this.props.underline}));
        _this.props.history.push('/search/' + underlineKey);
      }, function(error) {
          console.log("Error updating data:", error);
      });

    }

    componentDidMount(){

    }
    shouldComponentUpdate(nextProps, nextState){
     return (JSON.stringify(nextProps) !== JSON.stringify(this.props));
    }

    componentWillUnmount () {
      window.removeEventListener('onClick', this.addUnderline, false);
    }

    render() {

      return(
        <div className="addUnderline">
          <withRouter>
          <div className="u-maxWidth700 u-marginAuto">
            <div className="grid grid-pad">
              <p className="col-10-12">
                <textarea
                id={"underlineAddForm"}
                className={"form-control on-popup-content"}
                placeholder={"Put your underline"}
                onChange={this.setUnderline}
                rows="10">
                </textarea>
              </p>
              <p className="col-2-12">
                <button
                type={"button"}
                className={"u-pullRight button__normal"}
                onClick={this.addUnderline}>Insert</button>
              </p>
            </div>
          </div>
          </withRouter>
        </div>
      );
    }
}
addUnderline.propTypes = propTypes;
addUnderline.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    underline: state.underlines.underline,
    isWritingLine: state.underlines.isWritingLine,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleAddLine: (underline) => { dispatch(actions.addLine(underline))},
    handleSetUnderlines: (underline) => { dispatch(actions.setUnderline(underline))},
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(addUnderline));
