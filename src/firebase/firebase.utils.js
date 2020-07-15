import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBqiwJKIlI9cWYakJoeROMqg_xA8a06AEE",
  authDomain: "crwn-db-1a06d.firebaseapp.com",
  databaseURL: "https://crwn-db-1a06d.firebaseio.com",
  projectId: "crwn-db-1a06d",
  storageBucket: "crwn-db-1a06d.appspot.com",
  messagingSenderId: "499836234726",
  appId: "1:499836234726:web:2ebfe38a72877056158427",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
