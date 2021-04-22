import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

// configure firebase app
const firebaseConfig = {
    apiKey: "AIzaSyBmM-7xHJ8P-6WfU2VnIqExuun9O8LIU4M",
    authDomain: "cuacangular.firebaseapp.com",
    databaseURL: "https://cuacangular-default-rtdb.firebaseio.com",
    projectId: "cuacangular",
    storageBucket: "cuacangular.appspot.com",
    messagingSenderId: "993072225759",
    appId: "1:993072225759:web:18d89f6f8edcaebda1786a",
    measurementId: "G-0ST3J0MNCZ"
};

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

// Export firestore
export const firestore = firebase.firestore();
export const firebaseStorage = firebase.storage();