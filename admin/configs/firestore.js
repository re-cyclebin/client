import firebase from 'firebase'
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBqxLUV07osFai9jhvVJJ9Gkv-2-5RCFbc",
  authDomain: "boostle.firebaseapp.com",
  databaseURL: "https://boostle.firebaseio.com",
  projectId: "boostle",
  storageBucket: "boostle.appspot.com",
  messagingSenderId: "971743131627",
  appId: "1:971743131627:web:5cf9bdb2c30256fd3b4bae"
}  // apiKey, authDomain, etc. (see above)

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()

export default db