import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import MDCAutoInit from '../../../global/MDCAutoInit';
import DeleteElementButton from './DeleteElementButton';
import ButtonStyler from '../../element-stylers/ButtonStyler';
import TextField from '../../../base/TextField';

class ButtonSidebar extends React.Component {

    constructor(props) {
        super(props);

        if (_.isEmpty(this.props.element.theme)) {
            let element = this.props.element;
            element.theme = {};

            this.updateElement(element);
        }
    }

    updateElement(element) {
        let elements = this.props.elements;
        elements[element.index] = element;

        this.props.updateInnerElements(elements);
    }

    updateTheme(theme) {
        let element = this.props.element;
        element.theme = theme;

        this.updateElement(element);
    }

    handleChange(event) {
        let element = this.props.element;
        element[event.target.name] = event.target.value;

        this.updateElement(element);
    }

    render() {
        let element = this.props.element;

        return (
            <div>
                <DeleteElementButton elements={this.props.elements} element={element} updateElements={this.props.updateInnerElements} />
                <br />

                <span className='mdc-typography--body1'>
                    <b>ID:</b> <code>{element.uuid}</code>
                </span><br />

                <TextField dense={true} label='Text' name='text' onChange={(event) => this.handleChange(event)} defaultValue={this.props.element.text} /><br />

                <TextField dense={true} label='URL' name='actionData' onChange={(event) => this.handleChange(event)} defaultValue={this.props.element.actionData} />
                <br /><br />

                <ButtonStyler theme={element.theme} updateTheme={(theme) => this.updateTheme(theme)} />
                
                <MDCAutoInit />
            </div>
        );
    }
}

ButtonSidebar.propTypes = {
    elements: PropTypes.array,
    element: PropTypes.object,
    updateInnerElements: PropTypes.func
};

export default ButtonSidebar;
