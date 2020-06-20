import firebase from "firebase";
import "firebase/auth";

// firebase init goes here
const config = {
    apiKey: "AIzaSyD3CvnkmDkF1WofANYZDQ3UFh4LDIZuvZI",
    authDomain: "game-gear.firebaseapp.com",
    databaseURL: "https://game-gear.firebaseio.com",
    projectId: "game-gear",
    storageBucket: "game-gear.appspot.com",
    messagingSenderId: "419738457527",
    appId: "1:419738457527:web:4458c139bb3013dbd58432",
    measurementId: "G-032V7H09QP",
};
firebase.initializeApp(config);

const auth = firebase.auth();
const currentUser = auth.currentUser;

export { auth, currentUser };