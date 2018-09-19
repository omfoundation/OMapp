import firebase from 'firebase'

firebase.initializeApp({
    apiKey: "AIzaSyCjRFxUdAwEzztLBYZdl_fsm5xqAiOYesg",
    authDomain: "omapp-2018.firebaseapp.com",
    databaseURL: "https://omapp-2018.firebaseio.com",
    projectId: "omapp-2018",
    storageBucket: "omapp-2018.appspot.com",
    messagingSenderId: "208376306849"
});

let provider = new firebase.auth.GoogleAuthProvider();
let auth = firebase.auth();
let db = firebase.firestore();
let settings = {
    timestampsInSnapshots: true
};

db.settings(settings);

export {provider, auth, db}