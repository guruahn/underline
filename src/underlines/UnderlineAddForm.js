import React, { Component, PropTypes } from 'react';
import { database, firebaseAuth } from '../config/constants'
import Search from '../search/Search'
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
      this.onWriting = this.onWriting.bind(this);
      this.setUnderline = this.setUnderline.bind(this);
      this.addUnderline = this.addUnderline.bind(this);
      this.addBookLine = this.addBookLine.bind(this);
      this.addUserLine = this.addUserLine.bind(this);
      this.addUserBooks = this.addUserBooks.bind(this);
    }

    onWriting(){
      if(!this.props.isWritingLine){
        this.props.handleToggleIsWritingLine();
      }
    }

    setUnderline(event) {
      this.props.handleSetMyUnderlines(event.target.value);
    }

    addUnderline = (book, bookKey) => {
      console.log('addUnderline!!!', underline)
      const underline = this.props.underline;
      let _this = this;
      const updates = {};
      const underlineKey = database.ref().child('underlines').push().key;
      updates['/underlines/' + underlineKey] = { line:underline, book:book };
      console.log(updates)
      database.ref().update(updates).then(function() {
        console.log('result addUnderline', JSON.stringify({key:underlineKey,value:underline}));
        _this.addUserLine(underline, underlineKey, book, bookKey);
      }, function(error) {
          console.log("Error updating data:", error);
      });
    }

    addUserLine = (underline, underlineKey, book, bookKey) => {
      const updates = {};
      let _this = this;
      updates['/user-underlines/' + this.user.uid + '/' + underlineKey] = { line:underline, book:book, bookKey:bookKey };
      database.ref().update(updates).then(function() {
        console.log('result addUserLine', JSON.stringify({key:underlineKey,value:underline}));
        _this.addBookLine(underline, underlineKey, book, bookKey);
      }, function(error) {
          console.log("Error updating data:", error);
      });
    }

    addBookLine = (underline, underlineKey, book, bookKey) => {
      const updates = {};
      let _this = this;
      updates['/book-underlines/' + bookKey + '/' + underlineKey] = { line:underline, book:book, uid: this.user.uid };
      database.ref().update(updates).then(function() {
        console.log('result addBookLine', JSON.stringify({key:underlineKey,value:underline}));
        _this.addUserBooks(underline, underlineKey, bookKey);
      }, function(error) {
          console.log("Error updating data:", error);
      });
    }

    addUserBooks = (underline, underlineKey, bookKey) => {
      const updates = {};
      updates['/user-books/' + this.user.uid + '/' + bookKey + '/underlines/' + underlineKey] = underline;
      database.ref().update(updates);
      console.log('result addUserBooks', JSON.stringify({key:underlineKey,value:underline}));
      this.props.history.push('/myBooks/' + bookKey)
    }

    componentDidMount(){
      if( this.props.isSearching ){
          this.props.handleToggleIsSearching();
      }
    }
    shouldComponentUpdate(nextProps, nextState){
     return (JSON.stringify(nextProps) != JSON.stringify(this.props));
    }

    render() {
      let formWrapClass = null;
      let search = null;
      if(this.props.isSearching){
        search = <Search isWritingLine={this.props.isWritingLine} onAddUnderline={this.addUnderline} />;
        formWrapClass = 'u-display-none';
      }else{
        formWrapClass = '';
        search = null;
      }

      return(
        <div>
          <withRouter>
          <div>
            <div className={formWrapClass}>
              <p>
                <textarea
                id={"underlineAddForm"}
                className={"form-control on-popup-content"}
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
    isSearching: state.underlines.isSearching,
    redirectToBookDetail: state.underlines.redirectToBookDetail
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UnderlineAddForm));
