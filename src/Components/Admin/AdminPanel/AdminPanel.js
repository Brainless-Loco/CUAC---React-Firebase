import React from 'react';
import { Route, Switch } from 'react-router';
import { fireAuth } from '../../../Firebase';
import BlogsMenu from '../BlogsComponent/BlogsMenu';
import CreateNewBlogComponent from '../BlogsComponent/CreateNewBlogComponent';
import ViewBlogsAdmin from '../BlogsComponent/ViewBlogsAdmin';
import MembersMenu from '../MembersComponent/MembersMenu';
import ViewMembers from '../MembersComponent/ViewMembers';
import ViewPendingMembers from '../MembersComponent/ViewPendingMembers';
import AdminMenu from './AdminMenu.js';

class AdminPanel extends React.Component {
    constructor(props) {
        super(props);
        console.log(window.location.pathname);
    }

    render() {
        return (
            <div>
                <h3>Welcome {fireAuth.currentUser.uid}, do your thing here.</h3>

                <Switch>
                    <Route path='/admin/member-db' component={MembersMenu}></Route>
                    <Route path='/admin/pending-members' component={ViewPendingMembers}></Route>
                    <Route path='/admin/members' component={ViewMembers}></Route>
                    <Route path='/admin/blog-db' component={BlogsMenu}></Route>
                    <Route path='/admin/create-new-blog' component={CreateNewBlogComponent}></Route>
                    <Route path='/admin/blogs' component={ViewBlogsAdmin}></Route>
                    <Route path='/admin' component={AdminMenu}></Route>
                </Switch>

                <button 
                    type='button'
                    onClick={(e) => {
                        const task = Promise.resolve(fireAuth.signOut());
                        task.then(() => {
                                this.props.authCallback(null);
                                console.log("Logged out");
                            }
                        );
                    }}> Log out </button>


                
            </div>
        );

    }
}

export default AdminPanel;