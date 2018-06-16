import React from 'react';
import { connect } from 'react-redux';

import { setBlankNavbar, setDocumentTitle } from '../../actions/global-actions';
import Header from '../../components/base/Header';
import ContentApi from '../../../api/content-api';
import MDCAutoInit from '../../components/global/MDCAutoInit';
import RawContentInlineEditor from '../../components/content/edit/RawContentInlineEditor';

class EditRawContent extends React.Component {

    constructor(props) {
        super(props);

        this.state = { isReady: false, partyCalendarUrl: {}, websiteTitle: {} };
    }

    componentWillMount() {
        ContentApi.get('partyCalendarUrl').then((partyCalendarUrl) => {
            ContentApi.get('websiteTitle').then((websiteTitle) => {
                this.setState({
                    isReady: true,
                    partyCalendarUrl: partyCalendarUrl,
                    websiteTitle: websiteTitle
                });
            });
        });
    }

    componentDidMount() {
        this.props.dispatch(setDocumentTitle('Edit Content'));
        this.props.dispatch(setBlankNavbar(true));
    }

    render() {
        if (!this.state.isReady) return null;

        return (
            <div className='content edit-raw-content'>
                <Header type='headline2'>Edit Other Content</Header><br />

                <RawContentInlineEditor content={this.state.partyCalendarUrl} />

                <RawContentInlineEditor content={this.state.websiteTitle} />

                <MDCAutoInit />
            </div>
        );
    }
}

export default connect()(EditRawContent);