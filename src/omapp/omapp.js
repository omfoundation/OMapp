import firebase from '../firebase';

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
  
db.settings(settings);


var omapp = {
    defaulPhoto : 'http://sitelcity.com/wp-content/uploads/2015/04/default-user-image-300x300.png',
    
    dataUser: {
        user: null,
        inDB: null,
        style: null,
        nick: null,
        email: null
    },

    isLogIn: function(){

        if((omapp.dataUser.inDB) && (omapp.dataUser.user != null) && (omapp.dataUser.inDB != null)){
            //Si esta logIN
            return true;
        }else{
            return false;
        }
    },

    setLogStyle : function(style){
        this.dataUser.style = style;
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
                    omapp.dataUser.nick = doc.data().nick;
                    omapp.dataUser.email = email;

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

	signInWithGoogle : function(component){
        auth.signInWithPopup(provider)
            .then((result) => {
                //OK
                //console.log(result);
                //const user = result.user;
                omapp.dataUser.user = result.user;

                let sta = component.state;
                sta.user = omapp.dataUser.user;

                omapp.setLogStyle('g');
                component.setState(sta);

                //component.setState(omapp.dataUser);
 

            }).catch(function(error) {
                //Error 
                console.log(error);
        });
    },
    
    signInWitgEmail : function(em,pass,component){

        auth.signInAndRetrieveDataWithEmailAndPassword(em,pass)
        .then(function(u){

            console.log("LogInEmail", u);
            omapp.dataUser.user = u.user;

            let sta = component.state;
            omapp.dataUser.email = em;
            omapp.dataUser.style = 'email';
                
            sta.user = omapp.dataUser.user;
            sta.inDB = omapp.dataUser.inDB;
            
            component.setState(sta);

        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode, errorMessage);
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

    RegDB(email,doc,nick, comp){
        //REGISTRAMOS EN NUESTRA BD
        db.collection('users').doc(email).set(doc)
            .then(function() {
                console.log("Document successfully written!");
                //alert("Registrado!");

                omapp.dataUser.inDB = true;

                let sta = comp.state;

                omapp.dataUser.nick = nick;
                omapp.dataUser.email = email;
                
                sta.user = omapp.dataUser.user;
                sta.inDB = omapp.dataUser.inDB;
                sta.reRender = !sta.reRender;

                comp.setState(sta);

        }).catch(function(error) {
                console.log("Registro incompleto");
                console.log(error);
        });
    },

    completeRegDB: function(email,pass,nick, idPlan, authLevel, comp){
        
        let fch = new Date();
        
        let docData = {
            type: omapp.dataUser.style,
            FechaUnion: fch,
            nick: nick,
            plan: idPlan,
            authLevel: authLevel
        }

        if(omapp.dataUser.style == 'g'){
            //Registro mediante google
            email = omapp.dataUser.user.email;

            omapp.RegDB(email,docData,nick,comp);
        }else{
            //Registro por email
            //omapp.dataUser.user = email;

            //REGISTRAMOS CON FIREBASE
            auth.createUserAndRetrieveDataWithEmailAndPassword(email,pass).
            then(function(u){
                console.log('Logrado', u);
                omapp.dataUser.user = u;

                omapp.RegDB(email,docData,nick,comp);
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
              });
        }

        
    }

    
}

export default omapp;

/**
 * Libreria a utilizar para desacoplar la aplicaci�n de servicios espec�ficos
 */
 	


//function privateMethod(){ console.log("private method")}