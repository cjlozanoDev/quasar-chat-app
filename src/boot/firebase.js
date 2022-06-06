import { boot } from "quasar/wrappers";

import firebase from "firebase/compat/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4m5Qz648UwhOqJwH-8oAgX8rTgLIHpDo",
  authDomain: "quasar-chat-app-firebase.firebaseapp.com",
  projectId: "quasar-chat-app-firebase",
  storageBucket: "quasar-chat-app-firebase.appspot.com",
  messagingSenderId: "240175729754",
  appId: "1:240175729754:web:f7b16e05092e0f44b19c63",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.db;
const auth = firebase.auth;
//const marcaTiempo = firebase.firestore.FieldValue.serverTimestamp();

export { db, auth };

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  // something to do
});
