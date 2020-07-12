import * as firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {

};


const Firebase = firebase.initializeApp(firebaseConfig);
const dataBase = Firebase.database().ref("data");
export default dataBase;
