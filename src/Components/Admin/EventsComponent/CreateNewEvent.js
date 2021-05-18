import React, { createRef } from 'react';
import DatePicker from 'react-datepicker';
import { CollectionNames, toISODate, Constants, Strings } from '../../../Utilities/Constants';
import { postIntoCollection } from '../../../Utilities/FirebaseUtils';
import { convertToHTML } from 'draft-convert';
import RichTextEditor from '../../../Utilities/RichTextEditor';
import { firebaseStorage } from '../../../Firebase';

class CreateNewEvent extends React.Component {
    constructor(props) {
        super(props);
        // Date vars
        this.today = new Date();
        this.tomorrow = new Date(this.today);
        this.tomorrow.setDate(this.today.getDate() + 1);
        this.tomorrow.setHours(0,0,0,0);

        this.editorRef = React.createRef();
        this.state = {selectedDate: this.tomorrow, title: '', banner: null, bannerLink: '', editorState: {}};

        this.handleSubmitButton = async () => {
            if(!this.state.title.length) {
                alert('Event title cannot be empty.');
                return;
            }

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
                    
                    // Get rich text as html code
                    const articleMarkup = convertToHTML(active.getCurrentContent()).toString();

                    this.uploadData({
                        title: this.state.title, 
                        detailsMarkup: articleMarkup, 
                        happeningAt: this.state.selectedDate.getTime(),
                        bannerLink: Strings.placeholder_image_link
                    });
                    
                }
                
            }
        }

        this.uploadData = (data) => {
            if(this.state.banner) {
                // Upload user image to firebase storage
                const filePath = `/uploads/${CollectionNames.events}/banner_${this.state.title}_${this.today.getTime()}`;
                const fileRef = firebaseStorage.ref(filePath);

                const uploadTask = fileRef.put(this.state.banner);
                // Upon promise execution and resolution,
                // Firebase upload task, state_change observers: (on progress, on failure, on success)
                uploadTask.on('state_change',
                    // On progress callback function, params = snapshot: UploadTaskSnapshot
                    (snapshot) => {
                        // (Optional)
                        // TODO: Implement a upload progress bar here.

                        console.log('Uploaded ' + snapshot.bytesTransferred + 'bytes out of ' + snapshot.totalBytes);
                    },

                    // On failure callback, params = error: FirebaseStorageError
                    (error) => {
                        console.log(error);
                        alert(error.message);
                        window.location.reload();
                    },

                    // On success callback, No-param
                    () => {
                        uploadTask.snapshot.ref.getDownloadURL().then((dwnUrl) => {
                            console.log('Uploaded file to: ' + dwnUrl);

                            // Set image link for easier firestore reference.
                            data.bannerLink = dwnUrl;
                            
                        });
                        postIntoCollection(data, CollectionNames.events);
                    }
                );
            } else {
                // Upload with placeholder image link
                console.log(data);
                postIntoCollection(data, CollectionNames.events);
            }
        }
    }

    handleImageUploadButton = (e) => {
        if(e.target.files.length && e.target.files[0]) {
            const file = e.target.files[0];
            
            this.setState({banner: file});
        }
    }

    
    render() {
        return (
            <div>
                <p>Todo: Implement a way of creating new event.</p>
                
                <form>
                    <label>
                        Event name:
                        <input type='text'
                            value={this.state.title}
                            onChange={e => this.setState({title: e.target.value})}
                        />
                    </label><br></br>
                    <label>
                        Happening date:
                        <input type='date' 
                            value={toISODate(this.state.selectedDate)}
                            min={toISODate(this.tomorrow)}
                            onChange={(e) => this.setState({selectedDate: new Date(e.target.value)})}></input>
                    </label><br></br>
                    <label>
                        Upload banner image:
                        <input type='file' onChange={this.handleImageUploadButton}></input>
                        <br></br>
                    </label><br></br>
                </form>
                {this.state.banner && <p onClick={() => {return;}}>Found {this.state.banner.name}</p>}<br></br>
                {this.state.banner && <div><img onClick={() => {return;}} src={URL.createObjectURL(this.state.banner)} height='128px' width='128px'></img></div>}

                <p>Event details:</p>
                <RichTextEditor ref={this.editorRef} textOnly={true}></RichTextEditor>

                <br></br>
                <input type='button' value='Submit' onClick={this.handleSubmitButton}></input>
            </div>
            
        )
    }
}

export default CreateNewEvent;