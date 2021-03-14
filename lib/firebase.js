import firebase from 'firebase/app'; 
import 'firebase/auth'; 
import 'firebase/database';  
import 'firebase/firestore'; 
import 'firebase/analytics';

const clientCredentials = {
    apiKey: "AIzaSyAidKEz9DskFNGp9XjfkMbZTYdnBIbpN0c",
    authDomain: "fir-application-fe50f.firebaseapp.com",
    databaseURL: "https://fir-application-fe50f-default-rtdb.firebaseio.com",
    projectId: "fir-application-fe50f",
    storageBucket: "fir-application-fe50f.appspot.com",
    messagingSenderId: "197490376477",
    appId: "1:197490376477:web:44392f4abf6052c6c32bf4",
    measurementId: "G-X60BN2F0XN"
}

if(firebase.apps.length === 0) {
    firebase.initializeApp(clientCredentials); 
    firebase.auth();
    firebase.database(); 
}

export default firebase; 