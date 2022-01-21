import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import firebaseConfig from "./firebase-config";
import { initializeApp } from "firebase/app";
const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth();
const createUser = (email, password) => {
  let returnVal = {};
  let isCreated = false;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      returnVal = userCredential;
      isCreated = true;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      returnVal = errorMessage;
      isCreated = false;
    });
  return isCreated;
};
const signInUser = (email, password) => {
  signInWithEmailAndPassword(auth, email, password);
  let loggedInUser = {}
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      user.displayName = "Huzaifa";
      loggedInUser = user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      loggedInUser = error;
    });
  return loggedInUser;
};
export { createUser, signInUser, firebaseApp };
