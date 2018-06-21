import React from 'react';
import PropTypes from 'prop-types';
import { AuthApi } from 'candidatexyz-common-js';

import Button from '../base/Button';
import TextField from '../base/TextField';
import { history } from '../../../constants';

import FormWrapper from '../forms/FormWrapper';

export default class ResetPasswordForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { password: '', passwordConfirmation: '', errors: {} };
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        AuthApi.resetPassword(this.state.password, this.state.passwordConfirmation).then( response => {
            history.push(this.props.redirectUrl);
        }).catch( response => {
            this.setState({
                errors: { error: response.data.errors }
            });
        });
    }

    render() {
        return (
            <FormWrapper handleSubmit={(event) => this.handleSubmit(event)} errors={this.state.errors}>
                <TextField type='password' label='Password' name='password' onChange={(event) => this.handleChange(event)} style={{ width: '100%' }} /><br /><br />

                <TextField type='password' label='Confirm Password' name='passwordConfirmation' onChange={(event) => this.handleChange(event)} style={{ width: '100%' }} /><br />

                <Button>Reset Password</Button><br />
            </FormWrapper>
        );
    }
}

ResetPasswordForm.propTypes = {
    redirectUrl: PropTypes.string.isRequired,
};