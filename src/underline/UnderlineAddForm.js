import React, { Component, PropTypes } from 'react';
const propTypes = {
  line: PropTypes.string,
  isfocused: PropTypes.bool
};
const defaultProps = {
  line: '',
  isfocused: false
};
class UnderlineAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          line: this.props.line || '',
          isfocused: false
        }
    }

    handleFocus = e => {
      let isfocused = !this.state.isfocused;
      this.setState({ isfocused: isfocused })
    }

    render() {
      let formStyle = {
        height: '100px'
      };
      if(this.state.isfocused){
        formStyle.height = '200px';
      }
      return(
          <div>
            <div className={'panel panel-default u-no-boder'}>
              <textarea id={"underlineAddForm"} className={"form-control"} style={formStyle} placeholder={"Put your line"} onFocus={this.handleFocus} onBlur={this.handleFocus}></textarea>
              <button type={"button"} className={"btn btn-primary"}>Primary</button>
            </div>
          </div>
      );
    }
}
UnderlineAddForm.propTypes = propTypes;
UnderlineAddForm.defaultProps = defaultProps;
export default UnderlineAddForm;
