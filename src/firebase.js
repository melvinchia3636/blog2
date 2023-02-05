// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCEFB3exs4UEOrNAL10LVX0QzgvWzEg78o",
  authDomain: "blog-a44d5.firebaseapp.com",
  projectId: "blog-a44d5",
  storageBucket: "blog-a44d5.appspot.com",
  messagingSenderId: "900885578888",
  appId: "1:900885578888:web:97327be1d9669b5f058b3d",
  measurementId: "G-4ZDYD0W7TN",
};

firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
export const auth = firebase.auth();
