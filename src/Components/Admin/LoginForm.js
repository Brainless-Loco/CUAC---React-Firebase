import React from 'react';
import { fireAuth } from '../../Firebase';
import { Status } from '../../Utilities/Constants';
import { login } from '../../Utilities/FirebaseUtils';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {email: '', password: '', isProcessing: false};

        this.handleLoginButtonClick = this.handleLoginButtonClick.bind(this);
    }

    render() {
        if(this.state.isProcessing) return <p>Loading...</p>;
        return(
            <div>
                <strong>Admin Login page.</strong>
                <form>
                    <label>
                        Email:
                        <input 
                            type='email' 
                            placeholder='email' 
                            value={this.state.email}
                            onChange={(e) => this.setState({email: e.target.value})} />
                    </label><br/>
                    <label>
                        Password:
                        <input 
                            type='password' 
                            placeholder='password'
                            value={this.state.password}
                            onChange={(e) => this.setState({password: e.target.value})} />
                    </label><br/>
                    <input 
                        type='submit' 
                        value='Login'
                        onClick={this.handleLoginButtonClick} />
                </form>
            </div>
        );
    }

    handleLoginButtonClick(e) {
        e.preventDefault();
        this.setState({isProcessing: true});
        const res = Promise.resolve(login(this.state.email, this.state.password));

        res.then((obj) => {
            if(obj.status === Status.OK) {
                this.props.authCallback(fireAuth.currentUser);
                console.log("Logged in");
            } else {
                alert(obj.error.message);
            }
            this.setState({isProcessing: false});
        });
    }
}

export default LoginForm;