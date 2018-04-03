import _ from 'lodash';
import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCurrentUser } from '../components/actions/staff-actions';

import EditRawContent from '../components/containers/EditRawContent';
import EditPost from '../components/containers/posts/EditPost';
import CreatePost from '../components/containers/posts/CreatePost';
import EditCurrentUserContainer from '../components/containers/users/EditCurrentUserContainer';
import StaffManagement from '../components/containers/users/StaffManagement';
import MasterEditUserForm from '../components/containers/users/EditUser';
import Mail from '../components/containers/staff/Mail';
import InviteStaff from '../components/containers/staff/InviteStaff';

class StaffRoutes extends React.Component {

    componentWillMount() {
        this.props.dispatch(fetchCurrentUser());
    }

    render() {
        if (_.isEmpty(this.props.user)) return null;

        return (
            <div>
                <Route exact path='/edit-content' component={EditRawContent} />
                <Route exact path='/edit-user' component={EditCurrentUserContainer} />
                <Route exact path='/staff-management' component={StaffManagement} />
                <Route exact path='/staff-management/:id/edit' component={MasterEditUserForm} />
                <Route exact path='/staff/mail' component={Mail} />
                <Route exact path='/staff/invite' component={InviteStaff} />

                <Route exact path='/posts/:postType/:url/edit' component={EditPost} />
                <Route exact path='/posts/:postType/new' component={CreatePost} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.staff.currentUser
    };
}

export default connect(mapStateToProps)(StaffRoutes);