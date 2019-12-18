import firebase from 'firebase'
import '@firebase/firestore';
// import makefire from 'makefire'

const firebaseConfig = {
}  // apiKey, authDomain, etc. (see above)

firebase.initializeApp(firebaseConfig);

// export const { useDocument } = makefire(firebaseConfig)

const db = firebase.firestore()

export default db