import React from 'react';
import { Link } from 'react-router-dom';

class EventsMenu extends React.Component {
    render() {
        return (
            <div>
                <Link to='/admin/'>Back</Link><br></br>
                <Link to='/admin/'>Dashboard</Link><br></br>
                <p>Events database menu</p>

                <ul>
                    <li>
                        <Link to='/admin/create-new-event'>Create new event</Link>
                    </li>
                    <li>
                        <Link to='/admin/events'>View all events</Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default EventsMenu;