import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { CardMedia } from '@material-ui/core';
import { firebaseStorage } from '../../../Firebase';

const AddInventoryItem = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [previewImageUrl, setPreviewImageUrl] = useState('https://cdn.mos.cms.futurecdn.net/g8PyY6xAhcndpQLLSkdPf-1200-80.jpg');
    const [itemName, setItemName] = useState('');
    const [details, setDetails] = useState('');
    const [imageUrl, setImageUrl] = useState('https://cdn.mos.cms.futurecdn.net/g8PyY6xAhcndpQLLSkdPf-1200-80.jpg');
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleOpenDialog = () => {
        setIsOpen(true);
    }

    const handleCloseDialog = () => {
        setIsOpen(false);
        setPreviewImage(null);      // Free up RAM a bit
        setItemName('');
        setDetails('');
        setPreviewImageUrl('https://cdn.mos.cms.futurecdn.net/g8PyY6xAhcndpQLLSkdPf-1200-80.jpg');
    }

    const handleFileChange = (e) => {
        const files = e.target.files;

        if(files.length && files[0]) {
            setPreviewImage(files[0]);
            setPreviewImageUrl(URL.createObjectURL(files[0]));
        }
    }

    const handleUpload = () => {

        if(!previewImage) {
            handleCloseDialog();
            alert('Please select an image of the item.')
        }

        setIsUploading(true);

        // Upload the image first
        const filePath = `/uploads/items/${new Date().getTime()}_${previewImage.name}`;
        
        // Get reference in the storage bucket
        const fileRef = firebaseStorage.ref(filePath);

        // Create upload task/promise
        const uploadTask = fileRef.put(previewImage);

        // Upon promise execution and resolution,
        // Firebase upload task, state_change observers: (on progress, on failure, on success)
        uploadTask.on('state_change',
            // On progress callback function, params = snapshot: UploadTaskSnapshot
            (snapshot) => {
                setUploadProgress(snapshot.bytesTransferred / snapshot.totalBytes * 100);
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
                    setImageUrl(dwnUrl);
                    setIsUploading(false);
                });

                const requestOptions = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                    body: JSON.stringify({
                        itemName,
                        imageUrl,
                        details
                    })
                }

                // Make a request to the api now
                fetch('http://localhost:9000/post-item', requestOptions)
                    .then((res) => {
                        console.log(res);
                        if(res.ok) {
                            alert('Successfully uploaded to the database.');
                        }
                    })
                    .catch((err) => console.log(err));
            }
        );
    }

    return (
        <div>
            <Button varient='outlined' onClick={handleOpenDialog}>
                Add new Item
            </Button>
            <Dialog open={isOpen} onClose={handleCloseDialog}>
                <DialogTitle>Item Information Form</DialogTitle>
                {isUploading && 
                    <DialogContentText>
                        Uploading file {previewImage.name}<br></br>
                        {uploadProgress}% complete.
                    </DialogContentText>
                }
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        label='Item name'
                        type='text'
                        value={itemName}
                        onChange={e => setItemName(e.target.value)}
                        fullWidth />
                    <TextField
                        margin='dense'
                        label='Item description'
                        type='text'
                        value={details}
                        onChange={e => setDetails(e.target.value)}
                        fullWidth />
                    <Card>
                        <div style={{maxHeight: '75%', maxWidth: '75%'}}>
                            <img src={previewImageUrl} 
                            style={{alignContent: 'center', maxHeight: '80%', maxWidth: '80%'}}></img>
                        </div>
                        
                        <CardContent>
                            <div>
                                <input type='file' onChange={handleFileChange}/>
                            </div>
                        </CardContent>
                    </Card>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary" disabled={isUploading}>
                        Cancel
                    </Button>
                    <Button onClick={handleUpload} color="primary" autoFocus disabled={isUploading}>
                        Upload
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddInventoryItem;