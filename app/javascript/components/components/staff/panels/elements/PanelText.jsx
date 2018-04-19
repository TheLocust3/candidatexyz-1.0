import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { uuid } from '../../../../../helpers';

class PanelText extends React.Component {

    static elementStructure(index) {
        return { index: index, uuid: `text-${uuid()}`, type: 'text', text: 'Text', theme: {} };
    }

    render() {
        let theme = _.isEmpty(this.props.element.theme) ? {} : this.props.element.theme;

        return (
            <div id={this.props.element.uuid} className='middle-center' style={{ ...theme, ...theme.custom }}>
                {this.props.element.text}
            </div>
        );
    }
}

PanelText.propTypes = {
    parentElement: PropTypes.object,
    element: PropTypes.object
};

export default PanelText;