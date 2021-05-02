import React from 'react';
import { Link } from 'react-router-dom';

class ViewBlogs extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Link to='/admin/blog-db'>Back</Link><br></br>
                <Link to='/admin/'>Dashboard</Link><br></br>
                All the blogs are to be rendered here.
            </div>
        );
    }
}

export default ViewBlogs;