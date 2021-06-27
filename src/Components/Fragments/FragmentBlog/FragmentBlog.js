import React from 'react';
import { Link } from 'react-router-dom';

class FragmentBlog extends React.Component {
    constructor(props) {
        super(props);
        this.data = this.props.data;
    }

    render() {
        return (
            <div ref={this.props.nodeRef}>
                <p>Title: {this.data.title}</p>
                <p>Published: {this.data.published}</p>
            </div>
        );
    }
}

export default FragmentBlog;