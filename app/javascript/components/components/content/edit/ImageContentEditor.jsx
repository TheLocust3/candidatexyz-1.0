import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { MDCTextField } from '@material/textfield';

import ContentApi from '../../../../api/content-api';
import { setEditOverlayOpen } from '../../../actions/content-actions';

class ImageContentEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = { content: props.content };
    }

    componentDidMount() {
        let textField = new MDCTextField(document.querySelector('#image-content'));
        textField.value = this.props.content.content.image;
    }

    componentDidUpdate() {
        let textField = new MDCTextField(document.querySelector('#image-content'));
        textField.value = this.props.content.content.image;
    }

    handleContentChange(event) {
        let content = this.state.content;
        content.content.image = event.target.value;

        this.setState({
            content: content
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        ContentApi.update(this.props.content.identifier, this.state.content.content).then(() => {
            location.reload();
        });

        this.props.dispatch(setEditOverlayOpen(false));
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div id='image-content' className='mdc-text-field' data-mdc-auto-init='MDCTextField'>
                    <input type='text' id='image-content' className='mdc-text-field__input' onChange={this.handleContentChange.bind(this)} size={40} />
                    <label className='mdc-text-field__label' htmlFor='image-content'>Image Url</label>
                    <div className='mdc-line-ripple'></div>
                </div>

                <button className='mdc-button mdc-button--raised edit-content-button button'>Save</button>
            </form>
        );
    }
}

ImageContentEditor.propTypes = {
    content: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default ImageContentEditor;