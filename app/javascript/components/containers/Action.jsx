import React from 'react';
import { connect } from 'react-redux';

import { setBlankNavbar, setDocumentTitle } from '../actions/global-actions';
import MDCAutoInit from '../components/global/MDCAutoInit';

import JoinTeamPanel from '../components/panels/JoinTeamPanel';
import VolunteerPanel from '../components/panels/VolunteerPanel';
import TakeActionPanel from '../components/panels/TakeActionPanel';

class Action extends React.Component {

    componentDidMount() {
        this.props.dispatch(setDocumentTitle('Take Action'));
        this.props.dispatch(setBlankNavbar(true));
    }
    
    render() {
        return (
            <div>
                <TakeActionPanel />
                <JoinTeamPanel />
                <VolunteerPanel />

                <MDCAutoInit />
            </div>
        );
    }
}

export default connect()(Action);
