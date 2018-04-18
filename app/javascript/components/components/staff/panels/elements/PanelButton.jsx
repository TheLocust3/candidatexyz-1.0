import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { uuid } from '../../../../../helpers';
import Button from '../../../base/Button';

class PanelButton extends React.Component {

    static elementStructure(index) {
        return { index: index, uuid: `button-${uuid()}`, type: 'button', text: 'Button' };
    }

    render() {
        return (
            <div id={this.props.element.uuid} className='middle-center'>
                <Button onClick={(event) => event.preventDefault()}>
                    {this.props.element.text}
                </Button>
            </div>
        );
    }
}

PanelButton.propTypes = {
    parentElement: PropTypes.object,
    element: PropTypes.object
};

export default PanelButton;