import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import { setBlankNavbar, setDocumentTitle } from '../../actions/global-actions';
import { fetchVolunteer } from '../../actions/volunteer-actions';
import MDCAutoInit from '../../components/global/MDCAutoInit';
import VolunterApi from '../../../api/volunteer-api';
import { history } from '../../../constants';

import ShowVolunteer from '../../components/volunteers/ShowVolunteer';

class Volunteer extends React.Component {

    componentDidMount() {
        this.props.dispatch(setDocumentTitle('Volunteer Overview'));
        this.props.dispatch(setBlankNavbar(true));
        this.props.dispatch(fetchVolunteer(this.props.match.params.id));
    }

    onDeleteClick() {
        VolunterApi.destroy(this.props.match.params.id).then(() => {
            history.push('/staff/volunteers');
        });
    }

    render() {
        if (_.isEmpty(this.props.volunteer)) return null;

        return (
            <div className='content-15 staff-form'>
                <div className='mdc-typography--display2'><b>Volunteer</b></div><br />
                <a href='#' className='link' onClick={this.onDeleteClick.bind(this)}>Delete</a><br /><br />

                <ShowVolunteer volunteer={this.props.volunteer} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        volunteer: state.volunteers.volunteer
    };
}

export default connect(mapStateToProps)(Volunteer);
