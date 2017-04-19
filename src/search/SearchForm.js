import React, { Component, PropTypes } from 'react';
const propTypes = {
  keyword: PropTypes.string
};
const defaultProps = {
  keyword: ''
};
class SearchForm extends Component {

    state = {
      keyword: this.props.keyword || ''
    }
    handleChange = e => {
      this.setState({ keyword: e.target.value })
      this.props.onSearch(e.target.value)
    }
    render() {
      return(
        <div className={"searchForm"}>
          <label htmlFor={"book-search"}><i className="fa fa-search" aria-hidden="true"></i></label>
          <input
            autoFocus
            type="text"
            name="keyword"
            value={this.state.keyword}
            onChange={this.handleChange}
            id={"book-search"}
            className={"form-control"}
            placeholder="Search Book"/>
        </div>
      );
    }
}

SearchForm.propTypes = propTypes;
SearchForm.defaultProps = defaultProps;
export default SearchForm;
