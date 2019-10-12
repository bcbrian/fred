// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBLnW_IOQi86qUsiG3hvXugktWs5Yb7dPw",
  authDomain: "hacktwitchtuesday.firebaseapp.com",
  databaseURL: "https://hacktwitchtuesday.firebaseio.com",
  projectId: "hacktwitchtuesday",
  storageBucket: "hacktwitchtuesday.appspot.com",
  messagingSenderId: "301843289848",
  appId: "1:301843289848:web:3b6ceadb0fe28575"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export { firebase };
