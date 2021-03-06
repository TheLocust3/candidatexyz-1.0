import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { history } from '../../../constants';
import Header from '../../components/base/Header';
import Link from '../../components/base/Link';
import { StaffActions } from 'candidatexyz-common-js';
import { setBlankNavbar, setDocumentTitle } from '../../actions/global-actions';
import { fetchPostType } from '../../actions/post-actions';
import MDCAutoInit from '../../components/global/MDCAutoInit';

import ShowPost from '../posts/ShowPost';
import TextContent from '../content/TextContent';
import NewsThumbnail from './NewsThumbnail';
import NewsPreview from './NewsPreview';

class News extends React.Component {

    componentWillMount() {
        this.props.dispatch(StaffActions.fetchCurrentUser());
    }

    componentDidMount() {
        this.props.dispatch(setDocumentTitle('News'));
        this.props.dispatch(setBlankNavbar(true));
        this.props.dispatch(fetchPostType('news'));
    }
    
    renderNewsList() {
        let posts = _.reverse(_.sortBy(this.props.posts, [(post) => { return post.createdAt }]));

        return (
            <div>
                {posts.map((post, index) => {
                    return (
                        <div key={index}>
                            <NewsPreview key={index} post={post} /><br />
                        </div>
                    );
                })}
            </div>
        );
    }

    renderAddNews() {
        if (!this.props.isUserReady || _.isEmpty(this.props.user)) return;

        return (
            <Link className='link' to={`/staff/posts/news/new`}>Add News</Link>
        );
    }

    render() {
        return (
            <div>
                <div className='content content-15'>
                    <Header type='headline2'><TextContent identifier='newsHeader' /></Header>
                    {this.renderAddNews()}<br /><br />

                    {this.renderNewsList()}
                </div>

                <MDCAutoInit />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts.postsOfType,
        isUserReady: state.staff.isCurrentUserReady,
        user: state.staff.currentUser,
    };
}

export default connect(mapStateToProps)(News);
