import React from 'react';
import { Link } from 'react-router-dom';
import 'draft-js/dist/Draft.css';
import { CollectionNames } from '../../../Utilities/Constants';
import { postIntoCollection } from '../../../Utilities/FirebaseUtils';
import RichTextEditor from '../../../Utilities/RichTextEditor';

class CreateNewBlogComponent extends React.Component {
    constructor(props) {
        super(props);
        
        this.editorRef = React.createRef();

        this.setEditorReference = (ref) => {
            this.editorRef = ref;
        }

        this.handleSubmitButton = async () => {
            const editor = this.editorRef.current;
            editor.selection.setCursorLocation(0);              // Reset the selection cursor
            const firstElem = editor.selection.getNode();       // Get first element from the html representation

            if(!firstElem) {
                alert('The document is empty!');
                return;
            }

            const title = firstElem.textContent;

            if(!title || !title.length) {
                alert('The document has no valid title!');
                return;
            }
            
            editor.uploadImages().then(() => {
                /* Post into firestore */
                const now = new Date();
                /*postIntoCollection(
                    {title: title, markup: editor.getContent(), 
                        published: now.toDateString(), createdAt: now.getTime()}, 
                    CollectionNames.blogs);*/

                // Post into mongo db collection using custom api
                const markup = editor.getContent();
                fetch(`http://localhost:9000/post-blog`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({title: title, body: markup})
                })
                .then((res) => console.log(res))
                .catch((err) => console.log(err.message));
            });
        }
    }

    render() {
        return (
            <div>
                <Link to='/admin/blog-db'>Back</Link><br></br>
                <Link to='/admin/'>Dashboard</Link><br></br>
                Create new blog post!
                <div>
                    <RichTextEditor onEditorInit={this.setEditorReference}></RichTextEditor>
                    <button
                        type='button'
                        onClick={this.handleSubmitButton}>Publish</button><br></br>
                </div>
            </div>
        );
    }
}

export default CreateNewBlogComponent;