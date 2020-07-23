import * as firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyAT497Lp4gXphN6shx5AzgzM3Vv4IfHFnk",
  authDomain: "password-management-310e6.firebaseapp.com",
  databaseURL: "https://password-management-310e6.firebaseio.com",
  projectId: "password-management-310e6",
  storageBucket: "password-management-310e6.appspot.com",
  messagingSenderId: "32949939535",
  appId: "1:32949939535:web:6fd0cb8b7661ede942a93a"
};
// Initialize Firebase
var fireDB = firebase.initializeApp(firebaseConfig);

export default fireDB.database().ref();