import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { database } from '../config/constants';
import Underline from '../underlines/Underline';
import Loading from 'react-loading-animation';

import { connect } from 'react-redux';
import * as actions from './UnderlinesActions';


class MyUnderlines extends Component {
  constructor(props) {
    super(props);
    this.getUnderlines = this.getUnderlines.bind(this);
  }

  getUnderlines(){
    let _this = this;
    let underlines = [];
    database.ref('/user-underlines/' + this.props.user.uid).once('value').then(function(snapshot) {
      snapshot.forEach(function(data){
        console.log("underlines", JSON.stringify({key:data.key, value:data.val()}));
        underlines.push({key:data.key, value:data.val()})
      });
      _this.props.handleSetMyUnderlines(underlines);
      _this.props.handleSetLoading(false);
    });
  }

  componentDidMount(){
    this.getUnderlines()
  }

  render() {
    const mapToComponent = (underlines) => {
      if(typeof underlines === 'undefined' || underlines.length === 0){
        return <div>Empty undelines. </div>
      }else{

        return underlines.map((underline, i) => {
          //console.log('underline', underline)
          return (
            <li className={"list-group__item"} key={underline.key} data-name="item">
              <Underline
                underline={underline.value}
                />
            </li>
          )
        });
      }
    };
    if (this.props.loading) {
      return <div className="u-marginTop10em"><Loading type='balls' color='#F0AD4E' /></div>
    }
    return(
      <div className="u-maxWidth700 u-marginAuto">
        <h1>My Underlines</h1>
        <ul className={"list-group"}>{mapToComponent(this.props.underlines)}</ul>
      </div>
    );
  }
}


MyUnderlines.propTypes = {
  underlines: PropTypes.array,
  loading: PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    underlines: state.myUnderlines.underlines,
    loading: state.myUnderlines.loading,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSetMyUnderlines: (underlines) => { dispatch(actions.setMyUnderlines(underlines)) },
    handleSetLoading: (state) => { dispatch(actions.setLoading(state)) },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyUnderlines);
export { MyUnderlines as PureMyUnderlines};
