import * as firebase from 'firebase';
import { configDB } from '../AppConfig';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: configDB.apiKey,
  authDomain: configDB.authDomain,
  databaseURL: configDB.databaseURL,
  projectId: configDB.projectId,
  storageBucket: configDB.storageBucket,
  messagingSenderId: configDB.messagingSenderId,
  appId: configDB.appId,
  measurementId: configDB.measurementId,
};

const Firebase = firebase.initializeApp(firebaseConfig);
const dataBase = Firebase.database().ref('data');
export default dataBase;
