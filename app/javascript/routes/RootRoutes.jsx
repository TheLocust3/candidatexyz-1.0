import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { CampaignActions, AnalyticEntryApi } from 'candidatexyz-common-js';

import { CANDIDATE_WEBSITE, PARTY_WEBSITE } from '../features';
import { CAMPAIGN_NAME } from '../constants';
import { candidateRoutes } from './CandidateRoutes';
import { partyRoutes } from './PartyRoutes';

import Privacy from '../components/containers/Privacy';
import News from '../components/containers/news/News';
import ShowNews from '../components/containers/news/ShowNews';
import NotFound from '../components/components/NotFound';

class RootRoutes extends React.Component {

    constructor(props) {
        super(props);

        this.state = { pageView: false };
    }

    componentWillMount() {
        this.props.dispatch(CampaignActions.fetchCampaignByName(CAMPAIGN_NAME));
    }

    componentWillReceiveProps(nextProps) {
        if (_.isEmpty(nextProps.campaign)) return;

        if (!this.state.pageView) {
            AnalyticEntryApi.pageView();

            this.setState({
                pageView: true
            });
        }
        
    }

    renderCandidateRoutes() {
        if (!CANDIDATE_WEBSITE) return;

        return candidateRoutes();
    }

    renderPartyRoutes() {
        if (!PARTY_WEBSITE) return;

        return partyRoutes();
    }

    render() {
        if (_.isEmpty(this.props.campaign)) return null;
        
        return (
            <Switch>
                <Route exact path='/privacy' component={Privacy} />

                <Route exact path='/news' component={News} />
                <Route exact path='/news/:url' component={ShowNews} />

                {this.renderCandidateRoutes()}
                {this.renderPartyRoutes()}

                <Route path='/404' component={NotFound} />
                <Redirect from='*' to='/404' />
            </Switch>
        );
    }
}

function mapStateToProps(state) {
    return {
        campaign: state.campaigns.campaign
    };
}

export default connect(mapStateToProps)(RootRoutes);
