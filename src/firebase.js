import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCPkYE-TlLiN5FLjEZZkOsN0mxSTlxLMr4",
  authDomain: "myproject-894d5.firebaseapp.com",
  projectId: "myproject-894d5",
  storageBucket: "myproject-894d5.appspot.com",
  messagingSenderId: "274321168946",
  appId: "1:274321168946:web:a907afd1f023817a78fa2b"
};

firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();

  const storageRef = firebase.storage();

  const auth = firebase.auth();

  const product = db.collection('Product');

  const cart = db.collection('Cart');

  export {db, storageRef, auth, product, cart};