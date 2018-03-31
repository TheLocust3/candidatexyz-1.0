import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { history } from '../../../constants';
import PostApi from '../../../api/post-api';

class PostForm extends React.Component {
    
    constructor(props) {
        super(props);

        if (_.isEmpty(this.props.post)) {
            this.state = { post: { title: '', url: '', body: '', image: '' }, errors: [] };
        } else {
            this.state = { post: this.props.post, errors: [] };
        }
    }

    handleChange(event) {
        let post = this.state.post;
        post[event.target.name] = event.target.value;

        this.setState({
            post: post
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        if (_.isEmpty(this.props.post)) {
            PostApi.create(this.props.postType, this.state.post.url, this.state.post.title, this.state.post.body, this.state.post.image).then(() => {
                history.push('/home');
            }).catch((response) => {
                this.setState({
                    errors: response.responseJSON.errors
                });
            });
        } else {
            PostApi.update(this.state.post.post_type, this.state.post.url, this.state.post.title, this.state.post.body, this.state.post.image).then(() => {
                history.push('/home');
            }).catch((response) => {
                this.setState({
                    errors: response.responseJSON.errors
                });
            });
        }
    }

    onDeleteClick() {
        PostApi.destroy(this.state.post.post_type, this.state.post.url).then(() => {
            history.push('/home');
        });
    }

    renderDeleteButton() {
        if (_.isEmpty(this.props.post)) return;

        return (
            <button className='mdc-button mdc-button--raised button' style={{ float: 'right', marginRight: '3%' }} onClick={this.onDeleteClick.bind(this)}>Delete</button>
        )
    }

    renderErrors() {
        if (_.isEmpty(this.state.errors)) return;

        return (
            <div className='mdc-typography--caption'>
                {_.map(this.state.errors, (errorMessage, errorName) => {
                    return (
                        <div key={errorName}>
                            {_.capitalize(errorName)} {_.join(errorMessage, ', ')}
                        </div>
                    )
                })}
            </div>
        )
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)} className='issues'>
                {this.renderErrors()}
                
                <div className='mdc-text-field' data-mdc-auto-init='MDCTextField' style={{ width: '100%' }} onChange={this.handleChange.bind(this)}>
                    <input type='text' id='title' name='title' className='mdc-text-field__input' defaultValue={this.state.post.title} />
                    <label className='mdc-text-field__label' htmlFor='title'>Title</label>
                    <div className='mdc-line-ripple'></div>
                </div><br /><br />

                <div className='mdc-text-field' data-mdc-auto-init='MDCTextField' style={{ width: '100%' }} onChange={this.handleChange.bind(this)}>
                    <input type='text' id='url' name='url' className='mdc-text-field__input' defaultValue={this.state.post.url} />
                    <label className='mdc-text-field__label' htmlFor='url'>URL</label>
                    <div className='mdc-line-ripple'></div>
                </div><br />

                <div className='mdc-text-field' data-mdc-auto-init='MDCTextField' style={{ width: '100%' }} onChange={this.handleChange.bind(this)}>
                    <input type='text' id='image' name='image' className='mdc-text-field__input' defaultValue={this.state.post.image} />
                    <label className='mdc-text-field__label' htmlFor='image'>Image URL</label>
                    <div className='mdc-line-ripple'></div>
                </div><br />

                <div className='mdc-text-field mdc-text-field--textarea' data-mdc-auto-init='MDCTextField' style={{ width: '100%' }}>
                    <textarea type='text' id='body' name='body' className='mdc-text-field__input' defaultValue={this.state.post.body} rows={40} onChange={this.handleChange.bind(this)} />
                    <label className='mdc-text-field__label' htmlFor='body'>Body</label>
                    <div className='mdc-line-ripple'></div>
                </div>

                <button className='mdc-button mdc-button--raised button' style={{ float: 'right' }}>Save</button>
                {this.renderDeleteButton()}
            </form>
        );
    }
}

PostForm.propTypes = {
    post: PropTypes.object,
    postType: PropTypes.string
};

export default PostForm;