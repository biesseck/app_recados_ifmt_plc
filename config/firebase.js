import firebase from 'firebase/app';
import 'firebase/auth';
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: "AIzaSyDYIesmw4FstEKJzwIHmMcY-tKGiLe-qcw",
  authDomain: "teste-app-recados-ifmt.firebaseapp.com",
  databaseURL: "https://teste-app-recados-ifmt-default-rtdb.firebaseio.com",
  projectId: "teste-app-recados-ifmt",
  storageBucket: "teste-app-recados-ifmt.appspot.com",
  messagingSenderId: "512511721451",
  appId: "1:512511721451:web:5ec7ca36fde597f1ec63ae"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

export { firebase, auth, app };