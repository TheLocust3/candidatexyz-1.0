import _ from 'lodash';
import $ from 'jquery';
import React from 'react';
import PropTypes from 'prop-types';
import { BlockPicker } from 'react-color';

import ColorPicker from '../../global/ColorPicker';
import Checkbox from '../../base/Checkbox';

class CheckboxThemeForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { checkbox: _.isEmpty(this.props.theme.styling.checkbox) ? { backgroundColor: this.props.colors[0], borderColor: this.props.colors[0] } : this.props.theme.styling.checkbox };
    }

    handleColorChange(color, style) {
        let checkbox = { ...this.state.checkbox, [style]: color.hex };
        this.setState({
            checkbox: checkbox
        });

        this.props.updateTheme(checkbox);
    }

    render() {
        return (
            <div>
                <Checkbox label='Sample Checkbox' onChange={() => {}} themeOverride={this.props.theme} /><br />

                <ColorPicker label='Pick Color' color={this.state.checkbox.backgroundColor} colors={this.props.colors} onChange={(color) => this.handleColorChange(color, 'backgroundColor')}  />

                <ColorPicker label='Pick Border Color' color={this.state.checkbox.borderColor} colors={this.props.colors} onChange={(color) => this.handleColorChange(color, 'borderColor')}  />
            </div>
        );
    }
}

CheckboxThemeForm.propTypes = {
    theme: PropTypes.object,
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    updateTheme: PropTypes.func.isRequired
};

export default CheckboxThemeForm;
