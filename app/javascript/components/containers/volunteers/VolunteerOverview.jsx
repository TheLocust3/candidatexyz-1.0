import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';

import { history } from '../../../constants';
import { setBlankNavbar, setDocumentTitle } from '../../actions/global-actions';
import { fetchAllVolunteersBy } from '../../actions/volunteer-actions';
import MDCAutoInit from '../../components/global/MDCAutoInit';
import VolunteerApi from '../../../api/volunteer-api';

import VolunteerTable from '../../components/volunteers/VolunteerTable';
import Pager from '../../components/global/Pager';

const VOLUNTEERS_PER_PAGE = 50;

class VolunteerOverview extends React.Component {

    constructor(props) {
        super(props);

        this.state = { numberOfPages: 0, page: 0 };
    }

    componentDidMount() {
        this.props.dispatch(setDocumentTitle('Volunteer Overview'));
        this.props.dispatch(setBlankNavbar(true));

        VolunteerApi.getNumberOfPages(VOLUNTEERS_PER_PAGE).then((response) => {
            this.setState({
                numberOfPages: Number(response)
            });
        });

        this.setPage(this.props.location);
        history.listen((location) => {
            this.setPage(location);
        });
    }

    setPage(location) {
        let parsed = queryString.parse(location.search);
        let page = _.isEmpty(parsed.page) ? 0 : Number(parsed.page);
        this.setState({
            page: page
        });

        this.props.dispatch(fetchAllVolunteersBy(page, VOLUNTEERS_PER_PAGE));
    }

    render() {
        return (
            <div className='volunteer-table'>
                <div className='mdc-typography--display2'><b>Volunteer Overview</b></div><br />

                <VolunteerTable volunteers={this.props.volunteers} /><br />

                <Pager numberOfPages={this.state.numberOfPages} page={this.state.page} url='/staff/volunteers' />
                
                <MDCAutoInit />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        volunteers: state.volunteers.volunteers,
    };
}

export default connect(mapStateToProps)(VolunteerOverview);
