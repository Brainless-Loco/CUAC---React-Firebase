import React from 'react';
import { fireAuth } from '../../Firebase';
import AdminPanel from './AdminPanel/AdminPanel.js';
import LoginForm from './AdminPanel/LoginForm.js';


class Admin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {currentUser: null, isPeding: true};
    }

    componentDidMount() {
        fireAuth.onAuthStateChanged((user) => {
            this.setState({currentUser: user, isPeding: false});
        })
    }

    componentDidUpdate() {
        // Code
    }

    render() {
        console.log(this.state.isPeding);
        if(this.state.isPeding) return <p>Loading...</p>;

        if(!this.state.currentUser) {
            return (
                <LoginForm authCallback={this.getCurrentUser} />
            );
        }

        return (
            <AdminPanel authCallback={this.getCurrentUser} />
        );
        
        
    }

    getCurrentUser = (user) => {
        this.setState({currentUser: user});
    }
}

export default Admin;