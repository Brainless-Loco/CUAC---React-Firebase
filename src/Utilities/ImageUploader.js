import { firebaseStorage } from "../Firebase";
import { StoragePaths } from "./Constants";

const ImageUploader = async (blobInfo, success, failure, progress) => {
    const file = blobInfo.blob();                           // Get file from the stream
    const filePath = StoragePaths.blogs + (new Date()).getTime() + '_' + file.name; // Specify a unique file path to upload 
    const fileRef = firebaseStorage.ref(filePath);          // Get reference to the file path from firebase storage
    
    // Upload the file
    const uploadTask = fileRef.put(file);
    uploadTask.on('state_change',
        // On progress callback function, params = snapshot: UploadTaskSnapshot
        (snapshot) => {
            // (Optional)
            // TODO: Implement a upload progress bar here.
            progress(snapshot.bytesTransferred / snapshot.totalBytes * 100);
            console.log(file.name + ' Uploaded ' + snapshot.bytesTransferred + 'bytes out of ' + snapshot.totalBytes);
        },

        // On failure callback, params = error: FirebaseStorageError
        (error) => {
            console.log(error);
            failure(error.message);
        },
        
        // On success callback
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then((dwnUrl) => {
                console.log('Uploaded to storage at', dwnUrl);
                success(dwnUrl);
            }).catch((error) => {
                failure(error.message);
            })
        }
    );
}

export default ImageUploader;