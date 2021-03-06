import _ from 'lodash'
import React from 'react';
import PropTypes from 'prop-types';

import Header from '../base/Header';

export default class FormWrapper extends React.Component {

    handleSubmit(event) {
        event.preventDefault();

        this.props.handleSubmit(event);
    }

    renderErrors() {
        if (_.isEmpty(this.props.errors)) return;

        return (
            <Header type='caption'>
                {_.map(this.props.errors, (errorMessage, errorName) => {
                    return (
                        <div key={errorName}>
                            {_.capitalize(errorName)}: {_.capitalize(_.join(errorMessage, ', '))}
                        </div>
                    )
                })}
            </Header>
        )
    }

    render() {
        let { handleSubmit, errors, children, ...props } = this.props;

        return (
            <form onSubmit={this.handleSubmit.bind(this)} {...props}>
                {this.renderErrors()}

                {children}
            </form>
        );
    }
}

FormWrapper.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    errors: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.string
    ]).isRequired,
};
