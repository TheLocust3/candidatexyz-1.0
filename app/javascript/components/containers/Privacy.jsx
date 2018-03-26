import React from 'react';
import { connect } from 'react-redux';

import { setBlankNavbar } from '../actions/global-actions';
import MDCAutoInit from '../components/global/MDCAutoInit';
import TextContent from '../containers/content/TextContent';
import JoinTeamPanel from '../components/common/JoinTeamPanel';

class Privacy extends React.Component {

    componentDidMount() {
        this.props.dispatch(setBlankNavbar(true));
    }

    componentWillUnmount() {
        this.props.dispatch(setBlankNavbar(false));
    }

    render() {
        return (
            <div className='content privacy-blurb'>
                <div className='mdc-typography--display3'><b><TextContent identifier='privacyHeader' /></b></div><br />

                <TextContent identifier='privacyPolicy' />
                
                <MDCAutoInit />
            </div>
        );
    }
}

export default connect()(Privacy);
