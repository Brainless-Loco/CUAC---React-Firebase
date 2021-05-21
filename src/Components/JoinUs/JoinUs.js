import React, { useState } from 'react';
import './JoinUs.css';
import $ from 'jquery';
import { firebaseStorage } from '../../Firebase';
import { CollectionNames, Strings } from '../../Utilities/Constants';
import { postIntoCollection, postPendingMemberInformation } from '../../Utilities/FirebaseUtils';
import { Helmet } from 'react-helmet';

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

    $('.header').addClass("bg-color-1");
    $('.header .logo').addClass("bg-color-1");

    // Markup
    return (
        <div className="join-us-page">
            {/* TODO: Implement photo upload function here.
                Upload the photo to firestore and keep a reference of it in firestore.*/}
            <Helmet>
                <title>Join CUAC | CUAC</title>
            </Helmet>
            <h1 className="display-4 mt-0 font-weight-bold text-color1 text-center py-2">Join CUAC Today</h1>
            <div className="join-us-banner">
                <img src="Image/logo.png" className="mx-auto col-11 col-md-9 col-lg-7 col-xl-6" alt="" srcset="" />
            </div>
            <p className="why-join-us text-left mx-2 px-2">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit dolorum labore rerum, quo doloribus quis consequatur facere eveniet veritatis quisquam voluptas quam est ad ullam ipsum quidem fugit harum alias minima enim? Itaque minima esse deleniti excepturi earum optio molestias? Corporis eius quaerat aperiam iusto nostrum, recusandae sapiente maiores id.
                <br />
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia nostrum corrupti ipsum nisi nihil, ex ad accusantium laboriosam quidem soluta culpa incidunt eligendi beatae ducimus labore esse obcaecati odio? Nostrum ut fugit reprehenderit animi facere similique odit optio consequatur eligendi dicta harum aut perferendis ex, nam sint. Blanditiis, beatae accusamus praesentium, ducimus nam soluta iste nostrum odio ratione est sapiente, hic doloribus. Sed saepe iure corrupti modi nobis velit ducimus praesentium perspiciatis error enim dolorem, maxime fuga, impedit eaque sit omnis qui delectus nostrum! Nihil repellat neque mollitia eum debitis, reprehenderit quo nesciunt recusandae distinctio sed facilis quas sunt fugiat.
            </p>
            <form  uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
                <label className="col-md-8 col-lg-7 col-xl-6 py-2 my-2">
                    <input 
                        type='text' 
                        required 
                        value={firstName} placeholder="First Name"
                        onChange={(e) => setFirstName(e.target.value)}></input>
                </label>
                <label className="col-md-8 col-lg-7 col-xl-6 py-2 my-2">
                    <input 
                        type='text' 
                        required
                        value={lastName} placeholder="Last Name"
                        onChange={(e) => setLastName(e.target.value)}></input>
                </label>
                <label className="col-md-8 col-lg-7 col-xl-6 py-2 my-2">
                    <input
                        type='text'
                        value={gender} placeholder="Gender"
                        onChange={(e) => setGender(e.target.value)}></input>
                </label>
                <label className="col-md-8 col-lg-7 col-xl-6 py-2 my-2">
                    <input 
                        type='text'
                        value={department} placeholder="Department"
                        onChange={(e) => setDepartment(e.target.value)}></input>
                </label>
                <label className="col-md-8 col-lg-7 col-xl-6 py-2 my-2">
                    <input 
                        type='text'
                        value={session} placeholder="Session"
                        onChange={(e) => setSession(e.target.value)}></input>
                </label>
                <label className="col-md-8 col-lg-7 col-xl-6 py-2 my-2">
                    <input 
                        type='number'
                        value={studentID} placeholder="Student ID"
                        onChange={(e) => setStudentID(e.target.value)}></input>
                </label>
                <label className="col-md-8 col-lg-7 col-xl-6 py-2 my-2">
                    <input
                        type='text'
                        value={phone}  placeholder="Contact No."
                        onChange={(e) => setPhone(e.target.value)}></input>
                </label>
                <label className="col-md-8 col-lg-7 col-xl-6 py-2 my-2">
                    <input 
                        type='text'
                        value={bloodGroup} placeholder="Blood Group"
                        onChange={(e) => setBloodGroup(e.target.value)}></input>
                </label>
                <label className="col-md-8 col-lg-7 col-xl-6 py-2 my-2">
                    <textarea
                        type='text'
                        value={address}  placeholder="Address"
                        onChange={(e) => setAddress(e.target.value)}></textarea>
                </label>
                <label className="col-md-8 col-lg-7 col-xl-6 py-2 my-2">
                    <input 
                        type='text'
                        value={transactionID} placeholder="TrnxID"
                        onChange={(e) => setTransactionID(e.target.value)}></input>
                </label>
                <div className="col-md-8 mx-auto col-lg-7 col-xl-6 py-2 my-2">
                    <div className="profile-img mx-auto">
                        <img 
                            src={previewImageURL}
                            alt='preview-selected'></img>
                        <input 
                        type='file' accept=".jpg, .jpeg, .png, .PNG, .JPG, .JPEG"
                        onChange={handleImageUpload} placeholder="Upload"></input>
                        
                    </div>
                    <p className="text-color1 h6 my-0">Click on Image to upload or change</p>
                </div>
                <button 
                    type='button' 
                    className="join-us-button"
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


