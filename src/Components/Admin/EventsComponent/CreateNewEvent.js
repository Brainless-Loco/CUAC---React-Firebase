import React, { createRef } from 'react';
import { CollectionNames, toISODate, Constants, Strings, StoragePaths } from '../../../Utilities/Constants';
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
        this.state = {selectedStartDate: this.tomorrow, selectedEndDate: this.tomorrow, title: '', banner: null, bannerLink: '', editorState: {}, cost: 0};

        this.setEditorReference = (ref) => {
            this.editorRef = ref;
        }

        this.handleSubmitButton = async () => {
            if(!this.state.title.length) {
                alert('Event title cannot be empty!');
                return;
            }

            const editor = this.editorRef.current;
            editor.selection.setCursorLocation(0);              // Reset the selection cursor
            const firstElem = editor.selection.getNode();       // Get first element from the html representation

            if(!firstElem) {
                alert('The document is empty!');
                return;
            }

            this.uploadData(
                {
                    title: this.state.title, 
                    detailsMarkup: editor.getContent(), 
                    happeningAt: this.state.selectedStartDate.getTime(), 
                    startDate: this.state.selectedStartDate.toDateString(),
                    endDate: this.state.selectedEndDate.toDateString(),
                    cost: this.state.cost,
                    bannerLink: Strings.placeholder_image_link
                }
            );
        }

        this.uploadData = (data) => {
            if(this.state.banner) {
                // Upload user image to firebase storage
                const filePath = StoragePaths.events + `banner_${this.state.title}_${this.today.getTime()}_${this.state.banner.name}`;
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
                        Start date:
                        <input type='date' 
                            value={toISODate(this.state.selectedStartDate)}
                            min={toISODate(this.tomorrow)}
                            onChange={(e) => {
                                this.setState({selectedStartDate: new Date(e.target.value)});
                                
                                if(this.state.selectedStartDate.getTime() > this.state.selectedEndDate.getTime())
                                    this.setState({selectedEndDate: this.state.selectedStartDate});
                            }}></input>
                    </label><br></br>
                    <label>
                        End date:
                        <input type='date' 
                            value={toISODate(
                                this.state.selectedEndDate.getTime() > this.state.selectedStartDate.getTime() ? 
                                this.state.selectedEndDate : this.state.selectedStartDate)}
                            min={toISODate(this.state.selectedStartDate)}
                            onChange={(e) => this.setState({selectedEndDate: new Date(e.target.value)})}></input>
                    </label><br></br>
                    <label>
                        Budget (per attendee):
                        <input type='number'
                            value={this.state.cost}
                            min={0}
                            onChange={(e) => this.setState({cost: e.target.value})}/>
                    </label><br></br>
                    <label>
                        Upload banner image:
                        <input type='file' onChange={this.handleImageUploadButton}></input>
                        <br></br>
                    </label><br></br>
                </form>
                {this.state.banner && <div><img onClick={() => {return;}} src={URL.createObjectURL(this.state.banner)} height='128px' width='128px'></img></div>}

                <p>Event details:</p>
                <RichTextEditor onEditorInit={this.setEditorReference}></RichTextEditor>

                <br></br>
                <input type='button' value='Submit' onClick={this.handleSubmitButton}></input>
            </div>
            
        )
    }
}

export default CreateNewEvent;