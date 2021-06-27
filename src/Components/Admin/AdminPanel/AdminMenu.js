import React from 'react';
import { Link } from 'react-router-dom';

class AdminMenu extends React.Component {
    render() {
        return (
            <div>
                <p>Menu</p>
                <ul>
                    <li>
                        <Link to='/admin/member-db'>Member database</Link>
                    </li>
                    <li>
                        <Link to='/admin/event-db'>Event database</Link>
                    </li>
                    <li>
                        <Link to='#'>Photo database</Link>
                    </li>
                    <li>
                        <Link to='/admin/blog-db'>Blog database</Link>
                    </li>
                    <li>
                        <Link to='/admin/inventory'>Inventory</Link>
                    </li>
                </ul>
            </div>
        );
    }
}



export default AdminMenu;