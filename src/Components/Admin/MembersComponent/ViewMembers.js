import React from 'react';
import { Link } from 'react-router-dom';

class ViewMembers extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Link to='/admin/member-db'>Back</Link><br></br>
                <Link to='/admin/'>Dashboard</Link><br></br>
                <h3>TODO:</h3>
                <ol>
                    <li><strong>Fetch data from firestore.</strong></li>
                    <li><strong>Implement pagination.</strong></li>
                    <li><strong>Mutate database accordingly.</strong></li>
                </ol>
            </div>
        );
    }
}

export default ViewMembers;