import React from 'react';
import { Link } from 'react-router-dom';
import { Editor, EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import 'draft-js/dist/Draft.css';
import RichTextEditor from '../../../Utilities/RichTextEditor';
import { CollectionNames, Constants, Strings } from '../../../Utilities/Constants';
import { postIntoCollection } from '../../../Utilities/FirebaseUtils';
import { firebaseStorage } from '../../../Firebase';

class CreateNewBlogComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {editorState: {}};
        this.editorRef = React.createRef();
        
        const images = [];
        let articleMarkup = '';
        let uploaded = 0;

        this.handleSubmitButton = async () => {
            let currentEditor = this.editorRef.current;
            let active = currentEditor.state.editorState;
            
            if(active) {
                // Get blocks of the editor
                const blocks = active.getCurrentContent().getBlocksAsArray();
                
                if(blocks.length) {
                    // Blocks found.
                    // Get title from the first block
                    let idx = -1;
                    for(let i = 0 ; i < blocks.length ; i++) {
                        if(blocks[i].getText().trim().length) {
                            idx = i;
                            break;
                        }
                    }
                    
                    if(idx < 0) {
                        alert('Invalid document! The document has no content!');
                        return;
                    }

                    const blockContent = blocks[idx].getText().trim();
                    const title = blockContent.substr(0, Math.min(blockContent.length, Constants.limit128));

                    // Upload the attachments
                    blocks.map((obj, idx) => {
                        if(obj.getType() === 'atomic' && obj.getText().trim().substr(0, 5) === 'blob:') {
                            images.push(obj.getText().trim());
                            console.log(images[images.length - 1]);
                        }
                    });
                    
                    // Get rich text as html code
                    articleMarkup = convertToHTML(active.getCurrentContent()).toString();
                    
                    if(images.length) {
                        // Upload all the attached images first
                        for(let i = 0 ; i < images.length ; i++) {
                            await this.uploadToStorage(images[i], title, i);
                        }
                    } else {
                        const now = new Date();
                        const task = Promise.resolve(
                            postIntoCollection(
                                {title: title, markup: articleMarkup, published: now.toDateString()},
                                CollectionNames.blogs)
                        );
                        
                        task.then(() => {
                            console.log("Uploaded new blog");
                        })
                        .catch((error) => {
                            console.log(error);
                            alert('The document is either empty or has invalid elemets.');
                            window.location.reload();
                        });
                    }
                    

                    
                }
                
            }
        }

        this.getFileBlob = async (url, cb) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.responseType = 'blob';
            xhr.addEventListener('load', async () => {
                await cb(xhr.response);
            });
            xhr.send();
        }

        this.uploadToStorage = async (imageURL, title, idx) => {
            //                              Get the UNIX time of upload as a seed, get file name
            const filePath = `/uploads/blogs/${title}/${title}_${idx}_${(new Date()).getTime()}`;
            
            // Get reference in the storage bucket
            const fileRef = firebaseStorage.ref(filePath);

            this.getFileBlob(imageURL, async (blob) => {
                const uploadTask = fileRef.put(blob);
                
                uploadTask.on('state_change',
                    // On progress callback function, params = snapshot: UploadTaskSnapshot
                    (snapshot) => {
                        // (Optional)
                        // TODO: Implement a upload progress bar here.

                        console.log(imageURL + ' Uploaded ' + snapshot.bytesTransferred + 'bytes out of ' + snapshot.totalBytes);
                    },

                    // On failure callback, params = error: FirebaseStorageError
                    (error) => {
                        console.log(error);
                        alert(error.message);
                    },

                    // On success callback, No-param
                    () => {
                        uploadTask.snapshot.ref.getDownloadURL().then((dwnUrl) => {
                            console.log('Uploaded file to: ' + dwnUrl);

                            // Remove the nearest 'figure' tags and its contents. Replaced it with img element
                            let s_idx = articleMarkup.indexOf('<figure>');
                            let e_idx = articleMarkup.indexOf('</figure>');

                            articleMarkup = articleMarkup.substr(0, s_idx) + 
                                            `<img src=\'${dwnUrl}\'/>` + 
                                            articleMarkup.substr(e_idx + 9);
                            console.log('Article markup', articleMarkup);
                            uploaded++;

                            if(uploaded == images.length) {
                                const now = new Date();
                                const task = Promise.resolve(
                                    postIntoCollection(
                                        {title: title, markup: articleMarkup, published: now.toDateString()},
                                        CollectionNames.blogs)
                                );
                                
                                task.then(() => {
                                    console.log("Uploaded new blog");
                                })
                                .catch((error) => {
                                    console.log(error);
                                    alert('The document is either empty or has invalid elemets.');
                                    window.location.reload();
                                });
                            }
                        });
                    }
                );
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