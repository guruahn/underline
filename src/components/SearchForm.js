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
    }
    render() {
        return(
            <div>
              <h3>BookSearch</h3>
              <input
                type="text"
                name="keyword"
                value={this.state.keyword}
                onChange={this.handleChange} />
            </div>
        );
    }
}

SearchForm.propTypes = propTypes;
SearchForm.defaultProps = defaultProps;
export default SearchForm;
