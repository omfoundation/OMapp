//import firebase from 'firebase';

import firebase from '../firebase';

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

var omapp = {

	signInWithPopup : function(state){
        auth.signInWithPopup(provider)
            .then((result) => {
                //OK
                //console.log(result);
                const user = result.user;
                this.setState({
                    user: user
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