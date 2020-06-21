import * as firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUoXs_av_hLW6P-4aFN5FqYVzN2kL9x9o",
  authDomain: "haloapp-17e72.firebaseapp.com",
  databaseURL: "https://haloapp-17e72.firebaseio.com",
  projectId: "haloapp-17e72",
  storageBucket: "haloapp-17e72.appspot.com",
  messagingSenderId: "498965289284",
  appId: "1:498965289284:web:e2ce4655f005065d935f11",
  measurementId: "G-GT8TT0CTT2"
};

const Firebase = firebase.initializeApp(firebaseConfig);
const dataBase = Firebase.database().ref("data");
export default dataBase;
