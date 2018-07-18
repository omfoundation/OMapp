import firebase from 'firebase';

//inicializamos configuracion de firebase con datos de omapp-2018
firebase.initializeApp({
    apiKey: "AIzaSyCjRFxUdAwEzztLBYZdl_fsm5xqAiOYesg",
    authDomain: "omapp-2018.firebaseapp.com",
    databaseURL: "https://omapp-2018.firebaseio.com",
    projectId: "omapp-2018",
    storageBucket: "omapp-2018.appspot.com",
    messagingSenderId: "208376306849"
});

export default firebase;