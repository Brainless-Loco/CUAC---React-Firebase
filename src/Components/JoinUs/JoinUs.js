import React, { useState } from 'react';
import { firebaseStorage } from '../../Firebase';
import { CollectionNames, Strings } from '../../Utilities/Constants';
import { postIntoCollection, postPendingMemberInformation } from '../../Utilities/FirebaseUtils';

const JoinUs = () => {
    // States
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [department, setDepartment] = useState('');
    const [session, setSession] = useState('');
    const [studentID, setStudentID] = useState(0);
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [gender, setGender] = useState('');
    const [transactionID, setTransactionID] = useState('');
    const [previewImageURL, setPreviewImageURL] = useState(Strings.placeholder_image_link);
    const [previewImageFile, setPreviewImageFile] = useState(null);

    // Handlers
    const handleImageUpload = (e) => {
        if(e.target.files && e.target.files[0]) {
            let img = e.target.files[0];

            setPreviewImageURL(URL.createObjectURL(img));
            setPreviewImageFile(img);
        }
    }

    const handleSubmitButton = (firstName, lastName, gender, 
        bloodGroup, address, phone, 
        department, studentID, session, 
        transactionID, imageLink) => {
        const formInfo = {
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            bloodGroup: bloodGroup,
            currentAddress: address,
            phone: phone,
            department: department,
            studentID: studentID,
            session: session,
            imageLink: imageLink,
            trxID: transactionID
        };

        if(formInfo.imageLink !== Strings.placeholder_image_link) {
            //                              Get the UNIX time of upload as a seed, get file name
            const filePath = `/uploads/user_images/${(new Date()).getTime()}_${previewImageFile.name}`;
            
            // Get reference in the storage bucket
            const fileRef = firebaseStorage.ref(filePath);

            // Create upload task/promise
            const uploadTask = fileRef.put(previewImageFile);

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
                        formInfo.imageLink = dwnUrl;
                    });

                    postIntoCollection(formInfo, CollectionNames.pending_members);
                }
            );
        } else {
            postIntoCollection(formInfo, CollectionNames.pending_members);
        }

        
        console.log(formInfo);
    }


    // Markup
    return (
        <div style={{marginTop: '96px'}}>
            {/* TODO: Implement photo upload function here.
                Upload the photo to firestore and keep a reference of it in firestore.*/}
            <form>
                <label>
                    First name:
                    <input 
                        type='text' 
                        required 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)}></input>
                </label><br></br>
                <label>
                    Last name:
                    <input 
                        type='text' 
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}></input>
                </label><br></br>
                <label>
                    Department:
                    <input 
                        type='text'
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}></input>
                </label><br></br>
                <label>
                    Session:
                    <input 
                        type='text'
                        value={session}
                        onChange={(e) => setSession(e.target.value)}></input>
                </label><br></br>
                <label>
                    Student ID:
                    <input 
                        type='number'
                        value={studentID}
                        onChange={(e) => setStudentID(e.target.value)}></input>
                </label><br></br>
                <label>
                    Phone:
                    <input
                        type='text'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}></input>
                </label><br></br>
                <label>
                    Address:
                    <input 
                        type='text'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}></input>
                </label><br></br>
                <label>
                    Blood group:
                    <input 
                        type='text'
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}></input>
                </label><br></br>
                <label>
                    Gender:
                    <input
                        type='text'
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}></input>
                </label><br></br>
                <label>
                    TrnxID:
                    <input 
                        type='text'
                        value={transactionID}
                        onChange={(e) => setTransactionID(e.target.value)}></input>
                </label><br></br>
                <label>
                    <img 
                        src={previewImageURL} 
                        height='256px' 
                        width='256px' 
                        alt='preview-selected'></img><br></br>
                    Upload image:
                    <input 
                        type='file'
                        onChange={handleImageUpload}></input>
                </label><br></br>
                <button 
                    type='button' 
                    onClick={(e) => {
                        handleSubmitButton(firstName, lastName, gender, 
                                bloodGroup, address, phone, 
                                department, studentID, session, 
                                transactionID, previewImageURL);
                        }
                    }>Submit</button>
            </form>
        </div>
    );  
};


export default JoinUs;


