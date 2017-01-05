import React, { Component, PropTypes } from 'react';
import SearchForm from './SearchForm';
import SearchList from './SearchList';
import jsonp from 'jsonp';

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
  state = {
    books: ""
  }
  handleSearch = keyword => {
    if (keyword.length !== 0) {
      //this.props.addTodo(text)
      jsonp(`https://apis.daum.net/search/book?apikey=f43b4510bf93765b4b6800c889be1b89&q=${keyword}&output=json`, null, (err, data) =>{
        if (err) {
          console.error(err.message);
        } else {
          console.log(data);
          this.setState({ books: data })
        }
      });
    }
  }

  render() {

    return(
      <div>
        <h2>Search</h2>
        <SearchForm onSearch={this.handleSearch} />
        <SearchList books={this.state.books} />
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
