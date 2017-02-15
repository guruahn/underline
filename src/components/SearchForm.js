import React, { Component, PropTypes } from 'react';
const propTypes = {
  keyword: PropTypes.string
};
const defaultProps = {
  keyword: ''
};
class SearchForm extends Component {
    constructor(props) {
        super(props);
    }
    state = {
      keyword: this.props.keyword || ''
    }
    handleChange = e => {
      this.setState({ keyword: e.target.value })
      this.props.onSearch(e.target.value)
    }
    render() {

      return(
        <div className={"navbar-form navbar-left"}>
          <div className={"form-group"}>
            <input
              type="text"
              name="keyword"
              value={this.state.keyword}
              onChange={this.handleChange}
              className={"form-control"}
              placeholder="Search"/>
          </div>
        </div>
      );
    }
}

SearchForm.propTypes = propTypes;
SearchForm.defaultProps = defaultProps;
export default SearchForm;
