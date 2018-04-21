import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../base/Button';
import ButtonSidebar from './ButtonSidebar';
import FabSidebar from './FabSidebar';
import CheckboxSidebar from './CheckboxSidebar';
import TextFieldSidebar from './TextFieldSidebar';
import TextAreaSidebar from './TextAreaSidebar';
import SelectSidebar from './SelectSidebar';
import ImageSidebar from './ImageSidebar';
import TextSidebar from './TextSidebar';
import CustomStyler from '../../../global/CustomStyler';

class CellSidebar extends React.Component {

    handleThemeChange(value, attribute) {
        let elements = this.props.elements;
        let element = this.props.selectedElements[0];

        element.theme = _.isEmpty(element.theme) ? {} : element.theme;
        element.theme[attribute] = value;

        elements[element.index] = element;

        this.props.updateInnerElements(elements);
    }

    onDeleteClick(event) {
        event.preventDefault();

        let elements = this.props.elements;

        elements.splice(this.props.selectedElements[0].index, 1);
        elements = elements.map((element, index) => {
            element.index = index;
            return element;
        });

        this.props.updateInnerElements(elements);
    }

    updateInnerElements(innerElements) {
        let elements = this.props.elements;
        let element = this.props.selectedElements[0];
        
        elements[element.index].elements = innerElements;

        this.props.updateInnerElements(elements);
    }

    renderInnerSidebar() {
        let element = this.props.selectedElements[1];
        if (_.isEmpty(element)) return;

        if (element.type == 'button') {
            return (
                <div>
                    <div className='mdc-typography--title' style={{ textAlign: 'center' }}>{_.capitalize(element.type)} Options</div>

                    <ButtonSidebar elements={this.props.selectedElements[0].elements} element={element} updateInnerElements={(elements) => this.updateInnerElements(elements)} />
                </div>
            )
        } else if (element.type == 'fab') {
            return (
                <div>
                    <div className='mdc-typography--title' style={{ textAlign: 'center' }}>{_.capitalize(element.type)} Options</div>

                    <FabSidebar elements={this.props.selectedElements[0].elements} element={element} updateInnerElements={(elements) => this.updateInnerElements(elements)} />
                </div>
            )
        } else if (element.type == 'checkbox') {
            return (
                <div>
                    <div className='mdc-typography--title' style={{ textAlign: 'center' }}>{_.capitalize(element.type)} Options</div>

                    <CheckboxSidebar elements={this.props.selectedElements[0].elements} element={element} updateInnerElements={(elements) => this.updateInnerElements(elements)} />
                </div>
            )
        } else if (element.type == 'textField') {
            return (
                <div>
                    <div className='mdc-typography--title' style={{ textAlign: 'center' }}>{_.capitalize(element.type)} Options</div>

                    <TextFieldSidebar elements={this.props.selectedElements[0].elements} element={element} updateInnerElements={(elements) => this.updateInnerElements(elements)} />
                </div>
            )
        } else if (element.type == 'textArea') {
            return (
                <div>
                    <div className='mdc-typography--title' style={{ textAlign: 'center' }}>{_.capitalize(element.type)} Options</div>

                    <TextAreaSidebar elements={this.props.selectedElements[0].elements} element={element} updateInnerElements={(elements) => this.updateInnerElements(elements)} />
                </div>
            )
        } else if (element.type == 'select') {
            return (
                <div>
                    <div className='mdc-typography--title' style={{ textAlign: 'center' }}>{_.capitalize(element.type)} Options</div>

                    <SelectSidebar elements={this.props.selectedElements[0].elements} element={element} updateInnerElements={(elements) => this.updateInnerElements(elements)} />
                </div>
            )
        } else if (element.type == 'image') {
            return (
                <div>
                    <div className='mdc-typography--title' style={{ textAlign: 'center' }}>{_.capitalize(element.type)} Options</div>

                    <ImageSidebar elements={this.props.selectedElements[0].elements} element={element} updateInnerElements={(elements) => this.updateInnerElements(elements)} />
                </div>
            )
        } else if (element.type == 'text') {
            return (
                <div>
                    <div className='mdc-typography--title' style={{ textAlign: 'center' }}>{_.capitalize(element.type)} Options</div>

                    <TextSidebar elements={this.props.selectedElements[0].elements} element={element} updateInnerElements={(elements) => this.updateInnerElements(elements)} />
                </div>
            )
        }
    }
    

    render() {
        let element = this.props.selectedElements[0];
        let theme = _.isEmpty(element.theme) ? {} : element.theme;

        return (
            <div>
                {this.renderInnerSidebar()}
                
                <div className='mdc-typography--title' style={{ textAlign: 'center' }}>{_.capitalize(element.type)} Options</div>

                <center><Button className='red-button' condensed={true} onClick={this.onDeleteClick.bind(this)}>Trash</Button></center><br />

                <div className='mdc-typography--body1'>
                    <b>ID:</b> <code>{element.uuid}</code>
                </div>

                <CustomStyler small={true} custom={theme.custom} onChange={(custom) => { this.handleThemeChange(custom, 'custom') }} />
            </div>
        );
    }
}

CellSidebar.propTypes = {
    selectedElements: PropTypes.array,
    elements: PropTypes.array,
    updateInnerElements: PropTypes.func
};

export default CellSidebar;
