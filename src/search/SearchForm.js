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
        <div className={"col-sm-12"}>
          <div className={"form-group"}>
            <label htmlFor={"book-search"}>Book search</label>
            <input
              type="text"
              name="keyword"
              value={this.state.keyword}
              onChange={this.handleChange}
              id={"book-search"}
              className={"form-control"}
              placeholder="Book title here"/>
          </div>
        </div>
      );
    }
}

SearchForm.propTypes = propTypes;
SearchForm.defaultProps = defaultProps;
export default SearchForm;
