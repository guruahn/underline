import React, { Component, PropTypes } from 'react';
import { database, firebaseAuth } from '../config/constants';
import Underline from '../underlines/Underline';
import Loading from 'react-loading-animation';

import { connect } from 'react-redux';
import * as actions from './UnderlinesActions';

const propTypes = {
  getUnderlines: PropTypes.func
};
const defaultProps = {
  getUnderlines: () => createWarning('getUnderlines'),
};

class MyUnderlines extends Component {
  constructor(props) {
    super(props);
    this.user = firebaseAuth().currentUser;
    console.log('/underlines/' + this.user.uid )
    this.userUnderlineRef = database.ref('/user-underlines/' + this.user.uid);
    this.getUnderlines = this.getUnderlines.bind(this);
  }

  getUnderlines(){
    let _this = this;
    let underlines = [];
    this.userUnderlineRef.once('value').then(function(snapshot) {
      snapshot.forEach(function(data){
        console.log("The " + data.key + " dinosaur's score is " + JSON.stringify(data.val().line));
        underlines.push({key:data.key, value:data.val().line})
      });
      _this.props.handleSetMyUnderlines(underlines)
    });
  }

  componentDidMount(){
    console.log('user', JSON.stringify(this.user))
    console.log('process.env.NODE_ENV', process.env.NODE_ENV)
    this.getUnderlines()
  }

  render() {
    const mapToComponent = (underlines) => {
      if(typeof underlines === 'undefined' || underlines.length === 0){
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
    return(
      <div className="u-maxWidth700 u-marginAuto">
        <h1>My Underlines</h1>
        <ul className={"list-group"}>{mapToComponent(this.props.underlines)}</ul>
      </div>
    );
  }
}

function createWarning(funcName){
  return () => console.warn(funcName + 'is now defined')
}

MyUnderlines.propTypes = propTypes;
MyUnderlines.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    underlines: state.myUnderlines.underlines
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSetMyUnderlines: (underlines) => { dispatch(actions.setMyUnderlines(underlines)) },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyUnderlines);
