//import firebase from 'firebase';

import firebase from '../firebase';

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

var omapp = {

	signInWithPopup : function(component){
        auth.signInWithPopup(provider)
            .then((result) => {
                //OK
                //console.log(result);
                const user = result.user;
                component.setState({
                    user: user
                });
            }).catch(function(error) {
                //Error 
                console.log(error);
        });
    },
    
    signOut : function(component){
        auth.signOut()
            .then(() => {
                //OK
                const user = null;
                component.setState({ 
                    user: user
                });
        }).catch(function(error) {
            //ERROR
            console.log(error);
        });
    },
	
	onMount : function(component){
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				component.setState({ user: user });
			} 
		});	
	},

    getCurrentuser : function(){
        return firebase.auth().currentUser;
    }
    
}

export default omapp;

/**
 * Libreria a utilizar para desacoplar la aplicaci�n de servicios espec�ficos
 */
 	


//function privateMethod(){ console.log("private method")}