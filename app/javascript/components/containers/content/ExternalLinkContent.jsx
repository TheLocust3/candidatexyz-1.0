import _ from 'lodash';
import $ from 'jquery';
import React from 'react';
import PropTypes from 'prop-types';

import ContentApi from '../../../api/content-api';

class ExternalLinkContent extends React.Component {

    constructor(props) {
        super(props);

        this.state = { content: { content: { url: '' } } };
    }

    componentWillMount() {
        ContentApi.get(this.props.identifier).then((response) => {
            this.setState({
                content: response
            });
        });
    }

    render() {
        let { identifier, dispatch, children, ...props } = this.props;
        let content = this.state.content;

        return (
            <a href={content.content.url} {...props}>
                {children}
            </a>
        );
    }
}

ExternalLinkContent.propTypes = {
    identifier: PropTypes.string.isRequired,
    children: PropTypes.element
};

export default ExternalLinkContent;
