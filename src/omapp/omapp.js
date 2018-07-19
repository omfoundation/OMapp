//import firebase from 'firebase';

import firebase from '../firebase';

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
  
db.settings(settings);



var omapp = {

    checkReg : function(user){

        let value = new Promise(resolve =>{
            //verificamos si el user esta registrado en la db
            if(user){
                let email = user.email;
                console.log('email:' + email);
        
                let userDB = db.collection("users");
                let userRef = userDB.doc(email);
    
             userRef.get().then(function(doc) {
                if (doc.exists) {
                    //Usuario existe
                    //console.log("Document data:", doc.data());
                    console.log('Usuario existe en db');
                    //return true;
                   resolve(true);
                   //return Promise.resolve(true);

                } else {
                    // doc.data() will be undefined in this case
                    //console.log("No such document!");
                    console.log('Usuario NO existe en db2');
                    //return false;
                    resolve(false);
                    //return Promise.resolve(false);

                }
            }).catch(function(error) {
                //No existe user
                console.log("Error getting document:", error);
                console.log('Usuario NO existe en db ');
                
                //return false;
                resolve(false);
                //return Promise.resolve(false);

            });
        
                //console.log('UserReq');
                //console.log(userReq);
                //return value;
                //resolve(true);
            }
        });
            
        

        return value;
        
    },

	signInWithPopup : function(component){
        auth.signInWithPopup(provider)
            .then((result) => {
                //OK
                //console.log(result);
                const user = result.user;

                component.setState({
                    user: user,
                    inDB: omapp.checkReg(user)
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
                    user: user,
                    inDB: omapp.checkReg(user)
                });

        }).catch(function(error) {
            //ERROR
            console.log(error);
        });
    },
	
	onMount : function(component){
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				component.setState({
                    user: user,
                    inDB: omapp.checkReg(user)
                });
			} 
		});	
	},

    solveValue : async function(u){
        return await omapp.checkReg(u);
    },

    getCurrentuser :  function(){
        //console.log(firebase.auth().currentUser);
        let u = firebase.auth().currentUser;
            //console.log('u');
            //console.log(u)
        let valuebool;
        
        omapp.solveValue(u).then(v=>{
            valuebool = v;
            console.log("valuebool",valuebool);
        });

        //valuebool = true;

        return {
            user: u,
            inDB: valuebool
        }

    },

    completeRegDB: function(nick, idPlan, authLevel, comp){
        let email = omapp.getCurrentuser().user.email;
        let fch = new Date();

        let docData = {
            FechaUnion: fch,
            nick: nick,
            plan: idPlan,
            authLevel: authLevel
        }

        db.collection('users').doc(email).set(docData)
            .then(function() {
                console.log("Document successfully written!");

            let us = omapp.getCurrentuser().user;

            comp.setState({
                user: us,
                inDB: omapp.checkReg(us)
            });

        }).catch(function(error) {
                console.log("Registro incompleto");
                console.log(error);
        });
    }

    
}

export default omapp;

/**
 * Libreria a utilizar para desacoplar la aplicaci�n de servicios espec�ficos
 */
 	


//function privateMethod(){ console.log("private method")}