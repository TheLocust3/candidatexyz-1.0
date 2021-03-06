import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import { setBlankNavbar } from '../../actions/global-actions';
import MDCAutoInit from '../../components/global/MDCAutoInit';
import Header from '../../components/base/Header';

import ShowPost from '../posts/ShowPost'

class ShowIssue extends React.Component {

    componentDidMount() {
        this.props.dispatch(setBlankNavbar(true));
    }

    render() {
        return (
            <div>
                <div className='content content-15 news'>
                    <Header type='headline4'><b>News</b></Header>

                    <ShowPost postType='news' url={this.props.match.params.url} renderAsNews={true} />
                </div>

                <MDCAutoInit />
            </div>
        );
    }
}

export default connect()(ShowIssue);
