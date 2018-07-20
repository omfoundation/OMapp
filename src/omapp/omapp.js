import firebase from '../firebase';

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
  
db.settings(settings);



var omapp = {
    
    dataUser: {
        user: null,
        inDB: null
    },

    isLogIn: function(){

        if((omapp.dataUser.user != null) && (omapp.dataUser.inDB != null)){
            //Si esta logIN
            return true;
        }else{
            return false;
        }
    },

    checkReg : function(comp) {
        let user = omapp.dataUser.user;

            //verificamos si el user esta registrado en la db
            if(user){
                let email = user.email;
                console.log('email:' + email);
        
                let userDB = db.collection("users");
                let userRef = userDB.doc(email);
    
             userRef.get().then(function(doc) {
                if (doc.exists) {
                    //Usuario existe
                    console.log("Document data:", doc.data());
                    console.log('Usuario existe en db');
                    omapp.dataUser.inDB = true;

                    let sta = comp.state;
                    sta.loader = false;

                    comp.setState(sta);
                
                } else {
                    // doc.data() will be undefined in this case
                    //console.log("No such document!");
                    console.log('Usuario NO existe en db2');
                    omapp.dataUser.inDB = false;

                    let sta = comp.state;
                    sta.loader = false;

                    comp.setState(sta);

                }
            }).catch(function(error) {
                //No existe user
                console.log("Error getting document:", error);
                console.log('Usuario NO existe en db ');
                
                omapp.dataUser.inDB = false;


            });
                
            }

    },

	signInWithPopup : function(component){
        auth.signInWithPopup(provider)
            .then((result) => {
                //OK
                //console.log(result);
                //const user = result.user;
                omapp.dataUser.user = result.user;

                let sta = component.state;
                sta.user = omapp.dataUser.user;

                component.setState(sta);

                //component.setState(omapp.dataUser);
 

            }).catch(function(error) {
                //Error 
                console.log(error);
        });
    },
    
    signOut : function(component){
        auth.signOut()
            .then(() => {
                //OK

                omapp.dataUser = {
                    user: null,
                    inDB: null
                };

                let sta = component.state;
                sta.user = null;
                sta.inDB = null;

                component.setState(sta);

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

    getCurrentuser :  function(){
        //console.log(firebase.auth().currentUser);
        return firebase.auth().currentUser;

    },

    completeRegDB: function(nick, idPlan, authLevel, comp){
        let email = omapp.dataUser.user.email;
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
                //alert("Registrado!");

                omapp.dataUser.inDB = true;

                let sta = comp.state;

                sta.user = omapp.dataUser.user;
                sta.inDB = omapp.dataUser.inDB;
                sta.reRender = !sta.reRender;

                comp.setState(sta);

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