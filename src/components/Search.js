import React, { Component, PropTypes } from 'react';
import SearchForm from './SearchForm';

import { connect } from 'react-redux';

import * as actions from '../actions';
const propTypes = {

};
const defaultProps = {
};
class Search extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
              <h2>Search</h2>
              <SearchForm />
            </div>
        );
    }
}
Search.propTypes = propTypes;
Search.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    number: state.search.keyword,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleInsertKeyword: () => { dispatch(actions.insertKeyword())}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
