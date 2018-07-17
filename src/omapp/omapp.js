//import firebase from 'firebase';

import firebase from 'firebase';
import auth from 'firebase';
import provider from 'firebase';

//inicializamos configuracion de firebase con datos de omapp-2018
firebase.initializeApp({
    apiKey: "AIzaSyCjRFxUdAwEzztLBYZdl_fsm5xqAiOYesg",
    authDomain: "omapp-2018.firebaseapp.com",
    databaseURL: "https://omapp-2018.firebaseio.com",
    projectId: "omapp-2018",
    storageBucket: "omapp-2018.appspot.com",
    messagingSenderId: "208376306849"
});

var omapp = {

	signInWithPopup : function(state){
		firebase.auth().signInWithPopup(provider)
			.then((result) => {
				//OK
				//console.log(result);
				alert('then');
				state.setState({
					//user: user
				});
			}).catch(function(error) {
				//Error 
				console.log(error);
		});
	},
	
	onMount : function(state){
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				state.setState({ user: user });
			} 
		});	
	}


};

export default omapp;

/**
 * Libreria a utilizar para desacoplar la aplicaci�n de servicios espec�ficos
 */
 	


//function privateMethod(){ console.log("private method")}