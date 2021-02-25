import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDCdc36445tnoyAwyA9luHUPybK1S2uDRI",
    authDomain: "veterinaria-8da12.firebaseapp.com",
    projectId: "veterinaria-8da12",
    storageBucket: "veterinaria-8da12.appspot.com",
    messagingSenderId: "898397223848",
    appId: "1:898397223848:web:e3dd784f1ffd401568bb9d"
  }

  export const firebaseApp = firebase.initializeApp(firebaseConfig)