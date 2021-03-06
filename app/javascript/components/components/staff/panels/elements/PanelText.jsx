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
            <span id={this.props.element.uuid} className='panel-text'>
                <div style={{ ...theme, ...theme.custom }}>
                    <span dangerouslySetInnerHTML={{__html: this.props.element.text }} />
                </div>
            </span>
        );
    }
}

PanelText.propTypes = {
    parentElement: PropTypes.object,
    element: PropTypes.object,
    show: PropTypes.bool
};

export default PanelText;
