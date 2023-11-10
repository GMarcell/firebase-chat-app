// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from 'firebase/firestore'
import {GoogleAuthProvider, getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtYu7qaIEcCeCXsAf4yUEwxKO4PNz_Qlk",
  authDomain: "chat-app-ba874.firebaseapp.com",
  projectId: "chat-app-ba874",
  storageBucket: "chat-app-ba874.appspot.com",
  messagingSenderId: "267769288401",
  appId: "1:267769288401:web:ed3823feb06ed04f8d17f0",
  measurementId: "G-E7TNXDEZEB"
};

// Initialize Firebase


const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)
const provider = new GoogleAuthProvider()
const analytics = getAnalytics(app);

export {db, auth, storage, provider}