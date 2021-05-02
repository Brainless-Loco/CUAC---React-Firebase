import React from 'react';
import { Link } from 'react-router-dom';
import { Editor, EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import 'draft-js/dist/Draft.css';
import RichTextEditor from '../../../Utilities/RichTextEditor';

class CreateNewBlogComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {editorState: {}};
        this.editorRef = React.createRef();
        this.handleSubmitButton = () => {
            let currentEditor = this.editorRef.current;

            console.log(convertToHTML(currentEditor.state.editorState.getCurrentContent()));
        }
    }

    render() {
        return (
            <div>
                <Link to='/admin/blog-db'>Back</Link><br></br>
                <Link to='/admin/'>Dashboard</Link><br></br>
                Create new blog post!
                <div>
                    <RichTextEditor ref={this.editorRef}></RichTextEditor>
                    <button
                        type='button'
                        onClick={this.handleSubmitButton}>Publish</button><br></br>
                </div>
            </div>
        );
    }
}

export default CreateNewBlogComponent;