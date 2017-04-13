import React, { Component, PropTypes } from 'react';
import { database, firebaseAuth } from '../config/constants'
import { withRouter } from 'react-router-dom'


import { connect } from 'react-redux';
import * as actions from './UnderlinesActions';

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
class UnderlineAddForm extends Component {
    constructor(props) {
      super(props);
      this.user = firebaseAuth().currentUser;
      this.setUnderline = this.setUnderline.bind(this);
      this.addUnderline = this.addUnderline.bind(this);
      this.addUserLine = this.addUserLine.bind(this);
      this.addUserBooks = this.addUserBooks.bind(this);
    }

    setUnderline(event) {
      this.props.handleSetMyUnderlines(event.target.value);
    }

    addUnderline = () => {
      const underline = this.props.underline;
      let _this = this;
      const updates = {};
      const underlineKey = database.ref().child('underlines').push().key;
      updates['/underlines/' + underlineKey] = { line:underline };
      console.log(updates)
      database.ref().update(updates).then(function() {
        console.log('result addUnderline', JSON.stringify({key:underlineKey,value:underline}));
        _this.addUserLine(underline, underlineKey);
      }, function(error) {
          console.log("Error updating data:", error);
      });

    }

    addUserLine = (underline, underlineKey) => {
      const updates = {};
      let _this = this;
      updates['/user-underlines/' + this.user.uid + '/' + underlineKey] = { line:underline };
      database.ref().update(updates).then(function() {
        console.log('result addUserLine', JSON.stringify({key:underlineKey,value:underline}));
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
        <div>
          <withRouter>
          <div>
            <div>
              <p>
                <textarea
                id={"underlineAddForm"}
                className={"form-control on-popup-content"}
                placeholder={"Put your line"}
                onChange={this.setUnderline}>
                </textarea>
              </p>
              <p>
                <button
                type={"button"}
                className={"btn btn-primary"}
                onClick={this.addUnderline}>Insert</button>
              </p>
            </div>
          </div>
          </withRouter>
        </div>
      );
    }
}
UnderlineAddForm.propTypes = propTypes;
UnderlineAddForm.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    underline: state.underlines.underline,
    isWritingLine: state.underlines.isWritingLine,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleAddLine: (underline) => { dispatch(actions.addLine(underline))},
    handleSetMyUnderlines: (underline) => { dispatch(actions.setMyUnderlines(underline))},
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UnderlineAddForm));
