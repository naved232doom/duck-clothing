import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAlMHPB4xAhNdvYczrWjqo-wZs-SKn319Y",
    authDomain: "crwn-clothing-f9389.firebaseapp.com",
    projectId: "crwn-clothing-f9389",
    storageBucket: "crwn-clothing-f9389.appspot.com",
    messagingSenderId: "150375712957",
    appId: "1:150375712957:web:493d1f5d7302424d774fd4",
    measurementId: "G-B0KBMPYDBV"
  };

  export const createUserProfileDocument= 
  async (userAuth, additionalData)=>{
    if(!userAuth) return ;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const {displayName, email} = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }
      catch (error){
        console.log('error creating user ',error.message);
      }
    }
    return userRef;
  }
  firebase.initializeApp(config);

  export const auth =firebase.auth();
  export const firestore= firebase.firestore();

  const provider= new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle=()=> auth.signInWithPopup(provider);

  export default firebase;