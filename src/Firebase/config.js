import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyB4loZHSQYuwCPk35cn_YBx8ls_nfqiQ0k",
  authDomain: "um6p-course-16976.firebaseapp.com",
  projectId: "um6p-course-16976",
  storageBucket: "um6p-course-16976.appspot.com",
  messagingSenderId: "1010071718174",
  appId: "1:1010071718174:web:e69f0bf51a160cc5b2a10f"
};


firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
const projectFirestore = firebase.firestore()

const signInGoogle = async () => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await firebase.auth().signInWithPopup(provider);
   
    console.log('User signed in successfully:', result.user);
    
  } catch (error) {
    console.error('Error signing in with Google:', error);
  }
};

export {auth,projectFirestore,signInGoogle}