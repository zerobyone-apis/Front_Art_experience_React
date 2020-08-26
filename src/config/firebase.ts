import firebase from 'firebase';

// ? Cr?d?nt?a?s Firebase  */
// ? We need to put this on Enveroments Vars. . .   */
const firebaseConfig = {
  apiKey: 'AIzaSyDq6HLkJIZKrZMvPxNNflEdVEU8Jw2fF0I',
  authDomain: 'art-experience-rtdb.firebaseapp.com',
  databaseURL: 'https://art-experience-rtdb.firebaseio.com',
  projectId: 'art-experience-rtdb',
  storageBucket: 'art-experience-rtdb.appspot.com',
  messagingSenderId: '663891517697',
  appId: '1:663891517697:web:4860098b787b435b83fb00',
  measurementId: 'G-01HGECL94X',
};

// ? Inicialize firebase app  */
const firebaseApp = firebase.initializeApp(firebaseConfig);

// ? Inicialize database  */
const db = firebaseApp.firestore();
// ? Inicialize Authentication Instance  */
const auth = firebaseApp.auth();

// ? Inicialize Provider of Google To Single Sign ON  */
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
