import React, { Component, PropTypes } from 'react';
import { database, firebaseAuth } from '../config/constants'
import Search from '../search/Search'


import { connect } from 'react-redux';
import * as actions from './UnderlinesActions';

import '../css/module_popup.css';

const propTypes = {
  underline: PropTypes.string,
  isWritingLine: PropTypes.bool,
  isSearching: PropTypes.bool
};
const defaultProps = {
  underline: '',
  isWritingLine: false,
  isSearching: false
};
class UnderlineAddForm extends Component {
    constructor(props) {
      super(props);
      this.user = firebaseAuth().currentUser;
      this.onWriting = this.onWriting.bind(this);
      this.setUnderline = this.setUnderline.bind(this);
      this.addUnderline = this.addUnderline.bind(this);
    }

    onWriting(){
      if(!this.props.isWritingLine){
        this.props.handleToggleIsWritingLine();
      }
    }

    setUnderline(event) {
      this.props.handleSetMyUnderlines(event.target.value);
    }

    addUnderline = e => {

      const underline = this.props.underline;
      console.log('addUnderline!!!', underline)
      const updates = {};
      const underlineKey = database.ref().child('underlines').push().key;
      updates['/underlines/' + underlineKey] = underline;
      console.log(updates)
      database.ref().update(updates);
      // this.addUserLine(underline, underlineKey, this.props.selectedBook);
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
      let popupContentStyle = {};
      let formWrapClass = 'panel panel-default u-no-border';
      let popupBg = null;
      //console.log('this.props.isWritingLine!!', this.props.isWritingLine)
      if(this.props.isWritingLine){
        formStyle.height = '200px';
        formStyle.width = '100%';
        formWrapClass = 'panel panel-default u-no-border on-popup-wrap';
        popupBg = <div className={"modal-backdrop fade in"} onClick={this.props.handleToggleIsWritingLine}></div>;
      }else{
        formStyle.height = '100px';
        formWrapClass = 'panel panel-default u-no-border';
      }

      let search = null;
      if(this.props.isSearching){
        search = <Search isWritingLine={this.props.isWritingLine} addUnderline={this.addUnderline} />;
        popupContentStyle.display = 'none';
      }else{
        popupContentStyle = {};
      }
      return(
        <div>
          <div
            className={formWrapClass}>
            <div className={"on-popup-content"} style={popupContentStyle}>
              <p>
                <textarea
                id={"underlineAddForm"}
                className={"form-control on-popup-content"}
                style={formStyle}
                placeholder={"Put your line"}
                onFocus={this.onWriting}
                onChange={this.setUnderline}>
                </textarea>
              </p>
              <p>
                <button
                type={"button"}
                className={"btn btn-primary"}
                onClick={this.props.handleToggleIsSearching}>Insert</button>
              </p>


            </div>
            <div className={"row"}>
              <div className={'panel panel-default u-no-border'} >
                {search}
              </div>
            </div>
          </div>

          {popupBg}
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
    isSearching: state.underlines.isSearching
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleAddLine: (underline) => { dispatch(actions.addLine(underline))},
    handleSetMyUnderlines: (underline) => { dispatch(actions.setMyUnderlines(underline))},
    handleToggleIsWritingLine: () => { dispatch(actions.toggleIsWritingLine())},
    handleToggleIsSearching: () => { dispatch(actions.toggleIsSearching())}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UnderlineAddForm);
