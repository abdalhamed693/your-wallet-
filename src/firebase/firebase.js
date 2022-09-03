import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBAVbFzY_sTHrvL_SM-3qHcTtPu78ipSew",
    authDomain: "your-money-7e9b6.firebaseapp.com",
    projectId: "your-money-7e9b6",
    storageBucket: "your-money-7e9b6.appspot.com",
    messagingSenderId: "994333967449",
    appId: "1:994333967449:web:5f0f5874305f647ba09d48"
  };

  firebase.initializeApp(firebaseConfig)

  const projectFireStore = firebase.firestore()
  const projectAuth = firebase.auth()
  const timeStamp = firebase.firestore.Timestamp
  export{projectFireStore , projectAuth , timeStamp}