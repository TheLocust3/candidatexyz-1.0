import _ from 'lodash';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { DEVELOPMENT } from '../features';

import Panels from '../components/containers/staff/panels/Panels';
import PanelEditor from '../components/containers/staff/panels/PanelEditor';
import ShowPanel from '../components/containers/staff/panels/ShowPanel';
import Pages from '../components/containers/staff/pages/Pages';
import PageEditor from '../components/containers/staff/pages/PageEditor';
import ShowPage from '../components/containers/staff/pages/ShowPage';

class StaffDevelopmentRoutes extends React.Component {

    render() {
        if (_.isEmpty(this.props.user) || !DEVELOPMENT) return null;

        return (
            <Switch>
                <Route exact path='/panels' component={Panels} />
                <Route exact path='/panels/new' component={PanelEditor} />
                <Route exact path='/panels/:name' component={PanelEditor} />
                <Route exact path='/panels/:name/show' component={ShowPanel} />

                <Route exact path='/pages' component={Pages} />
                <Route exact path='/pages/new' component={PageEditor} />
                <Route exact path='/pages/:url' component={PageEditor} />
                <Route exact path='/pages/:url/show' component={ShowPage} />
            </Switch>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.staff.currentUser
    };
}

export default connect(mapStateToProps)(StaffDevelopmentRoutes);
