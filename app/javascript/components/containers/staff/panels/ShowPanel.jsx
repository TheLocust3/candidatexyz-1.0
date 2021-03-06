import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import Header from '../../../components/base/Header';
import Link from '../../../components/base/Link';
import { setBlankNavbar, setDocumentTitle } from '../../../actions/global-actions';
import { fetchPanel } from '../../../actions/panel-actions';
import MDCAutoInit from '../../../components/global/MDCAutoInit';

import PanelRenderer from '../../../components/staff/panels/PanelRenderer';

class ShowPanel extends React.Component {

    componentDidMount() {
        this.props.dispatch(setDocumentTitle('Panel Editor'));
        this.props.dispatch(setBlankNavbar(true));

        this.props.dispatch(fetchPanel(this.props.match.params.name));
    }

    render() {
        if (!this.props.isReady && _.isEmpty(this.props.panel)) return null;

        return (
            <div className='content content-bottom content-5'>
                <Header type='headline2'>Panel Preview</Header><br />
                
                <PanelRenderer panel={this.props.panel} />

                <MDCAutoInit />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.panels.isReady,
        panel: state.panels.panel
    };
}

export default connect(mapStateToProps)(ShowPanel);
