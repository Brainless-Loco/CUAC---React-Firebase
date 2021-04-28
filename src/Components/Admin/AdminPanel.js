import React from 'react';
import { Route, Switch } from 'react-router';
import { fireAuth } from '../../Firebase';
import AdminMenu, { MemberDbMenu, MembersList, PendingMembers } from './AdminMenu';

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
                    <Route path='/admin/member-db' component={MemberDbMenu}></Route>
                    <Route path='/admin/pending-members' component={PendingMembers}></Route>
                    <Route path='/admin/members' component={MembersList}></Route>
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