import React from 'react';
import { Link } from 'react-router-dom';

class MembersMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Link to='/admin/'>Back</Link><br></br>
                <Link to='/admin/'>Dashboard</Link><br></br>
                <p>Member database menu</p>
                <ul>
                    <li>
                        <Link to='/admin/pending-members'>Pending members</Link>
                    </li>
                    <li>
                        <Link to='/admin/members'>View all members</Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default MembersMenu;