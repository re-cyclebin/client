import firebase from 'firebase'
import '@firebase/firestore';

const firebaseConfig = { 
}  // apiKey, authDomain, etc. (see above)

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()

export default db