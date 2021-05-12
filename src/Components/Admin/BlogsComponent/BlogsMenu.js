import React from 'react';
import { Link } from 'react-router-dom';

class BlogsMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Link to='/admin/'>Back</Link><br></br>
                <Link to='/admin/'>Dashboard</Link><br></br>

                <p>Blogs menu</p>
                <ul>
                    <li>
                        <Link to='/admin/create-new-blog'>Create new blog post</Link>
                    </li>
                    <li>
                        <Link to='/admin/blogs'>View all blogs</Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default BlogsMenu;