import React, { Component, PropTypes } from 'react';
import { database, firebaseAuth } from '../config/constants'
import Search from '../search/Search'

import { connect } from 'react-redux';
import * as actions from './UnderlinesActions';

const propTypes = {
  underline: PropTypes.string,
  isWritingLine: PropTypes.bool
};
const defaultProps = {
  underline: '',
  isWritingLine: false
};
class UnderlineAddForm extends Component {
    constructor(props) {
      super(props);
      this.user = firebaseAuth().currentUser;
      this.setUnderline = this.setUnderline.bind(this);
      this.addUnderline = this.addUnderline.bind(this);
    }

    setUnderline(event) {
      this.props.handleSetMyUnderlines(event.target.value);
    }

    addUnderline = e => {

      const underline = this.props.underline;
      const updates = [];

      console.log( underline )
      const underlineKey = database.ref().child('underlines').push().key;
      updates['/underlines/' + underlineKey] = underline;
      database.ref().update(updates);
      this.addUserLine(underline, underlineKey, this.props.selectedBook);
    }

    addUserLine = (underline, underlineKey, bookKey) => {
      const updates = [];
      let _this = this;
      database.ref('/user-underlines/' + this.user.uid + '/' + underlineKey).on('value', function(userunderlinesnapshot, userunderlinekey) {
        if(!userunderlinesnapshot.val()){
          updates['/user-underlines/' + _this.user.uid + '/' + underlineKey] = underline;
          database.ref().update(updates);
          _this.props.handleSetUnderline("");
          _this.props.handleAddUnderline({key:underlineKey,value:underline});
          console.log(JSON.stringify({key:underlineKey,value:underline}))
        }
      });
    }


    render() {
      let formStyle = {};
      console.log('this.props.isWritingLine!!', this.props.isWritingLine)
      if(this.props.isWritingLine){
        formStyle.height = '200px';
      }else{
        formStyle.height = '100px';
      }
      return(
        <div>
          <div className={'panel panel-default u-no-border'}>
            <textarea
              id={"underlineAddForm"}
              className={"form-control"}
              style={formStyle}
              placeholder={"Put your line"}
              onFocus={this.props.handleToggleIsWritingLine}
              onBlur={this.props.handleToggleIsWritingLine}
              onChange={this.setUnderline}>

            </textarea>
            <button
              type={"button"}
              className={"btn btn-primary"}
              onClick={this.addLine}>Primary</button>
          </div>
          <div className={'panel panel-default u-no-border'} >
            <Search />
          </div>
        </div>
      );
    }
}
UnderlineAddForm.propTypes = propTypes;
UnderlineAddForm.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    underline: state.underlines.underline,
    isWritingLine: state.underlines.isWritingLine
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleAddLine: (underline) => { dispatch(actions.addLine(underline))},
    handleSetMyUnderlines: (underline) => { dispatch(actions.setMyUnderlines(underline))},
    handleToggleIsWritingLine: () => { dispatch(actions.toggleIsWritingLine())},
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UnderlineAddForm);