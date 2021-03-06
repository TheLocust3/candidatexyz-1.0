import _ from 'lodash';
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../constants';
import { fetchGlobalTheme } from '../components/actions/theme-actions';
import { fetchWebsiteTitle } from '../components/actions/global-actions';

import MDCAutoInit from '../components/components/global/MDCAutoInit';
import FontLoader from '../components/components/global/FontLoader';
import RootNavbar from '../components/containers/common/RootNavbar';
import RootFooter from '../components/containers/common/RootFooter';
import AdminOverlay from '../components/containers/common/AdminOverlay';

import StaffRoutes from '../routes/StaffRoutes';
import RootRoutes from '../routes/RootRoutes';

// Always start navigation at the top of the page
const ScrollToTop = () => {
    window.scrollTo(0, 0);

    return null;
};

class Routes extends React.Component {

    componentWillMount() {
        this.props.dispatch(fetchGlobalTheme());
        this.props.dispatch(fetchWebsiteTitle());
    }

    render() {
        if (_.isEmpty(this.props.globalTheme)) return null;

        return (
            <Router history={history}>
                <div>
                    <Route component={ScrollToTop} />
                    <FontLoader />

                    <RootNavbar />
                    <AdminOverlay />

                    <Switch>
                        <Route path='/staff' component={StaffRoutes} />
                        <Route path='/' component={RootRoutes} />
                    </Switch>

                    <RootFooter />

                    <MDCAutoInit />
                </div>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    return {
        globalTheme: state.themes.globalTheme
    };
}

export default connect(mapStateToProps)(Routes);
