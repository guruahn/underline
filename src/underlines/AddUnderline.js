import React, { Component, PropTypes } from 'react';
import UnderlineAddForm from './UnderlineAddForm';

const propTypes = {
};
const defaultProps = {
};
class AddUnderline extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
              <UnderlineAddForm />
            </div>
        );
    }
}
AddUnderline.propTypes = propTypes;
AddUnderline.defaultProps = defaultProps;
export default AddUnderline;
