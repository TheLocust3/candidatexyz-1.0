import React from 'react';

import Button from '../../base/Button';
import TextField from '../../base/TextField';
import { history } from '../../../../constants';
import { home } from '../../../../features';
import ContactApi from '../../../../api/contact-api';

import FormWrapper from '../../forms/FormWrapper';

export default class JoinUsForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { firstName: '', lastName: '', zipCode: '', errors: {} };
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        ContactApi.create(this.state.email, '', this.state.firstName).then(() => {
            history.push(home);
        }).catch((response) => {
            this.setState({
                errors: response.responseJSON.errors
            });
        });
    }

    render() {
        return (
            <FormWrapper handleSubmit={(event) => this.handleSubmit(event)} errors={this.state.errors}>
                <TextField label='First Name' name='firstName' onChange={(event) => this.handleChange(event)} style={{ width: '47.5%', marginRight: '5%' }} />
                <TextField label='Last Name' name='lastName' onChange={(event) => this.handleChange(event)} style={{ width: '47.5%' }} /><br /><br />

                <TextField type='email' label='Email' name='email' onChange={(event) => this.handleChange(event)} required={true} style={{ width: '100%' }} /><br /><br />

                <Button className='sign-up-form-button'>Sign Up</Button>
            </FormWrapper>
        );
    }
}
