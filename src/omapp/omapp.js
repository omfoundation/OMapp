import firebase from '../firebase';
import { resolve } from '../../node_modules/url';

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
  
db.settings(settings);


var omapp = {
    defaultPhotoURL : 'http://sitelcity.com/wp-content/uploads/2015/04/default-user-image-300x300.png',
    
    dataUser: {
        user: null,
        inDB: null,
        style: null,
        nick: null,
        email: null,
        photoURL: null
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
                    console.log('omapp.checkReg - Usuario existe en db');

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
                omapp.dataUser.user = result.user;
                component.setState({loginStatus: "AUTHENTICATED", loading: false});
                omapp.setLogStyle('g');
                console.log('function: signInWithGoogle - state: ', component.state);
            }).catch(function(error) {
                console.log(error);
        });
    },
    
    signInWithEmail : function(em,pass,component){

        auth.signInAndRetrieveDataWithEmailAndPassword(em,pass)
        .then(function(u){

            console.log("LogInEmail", u);
            omapp.dataUser.user = u.user;

            let sta = component.state;
            omapp.dataUser.email = em;
            omapp.dataUser.style = 'email';
                
            sta.user = omapp.dataUser.user;
            sta.inDB = omapp.dataUser.inDB;
            sta.loading = false;
            
            if(sta.inDB) {
                sta.loginStatus = "REGISTERED";
            }
            else{
                sta.loginStatus = "NOT_AUTHENTICATED";
            }
            
            sta.loginStatus = "REGISTERED";

            component.setState(sta);

            console.log(component.state);

        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
            component.setState({loading:false, loginStatus: "NOT_AUTHENTICATED", error:{code: 0, message: "Usuario no encontrado en la BD"}});
            

            console.log(component.state);


        });
    },

    signOut : function(component){
        auth.signOut()
            .then(() => {
                omapp.dataUser = {
                    user: null,
                    inDB: null
                };

                let sta = component.state;
                sta.user = null;
                sta.inDB = null;
                sta.loginStatus = "NOT_AUTHENTICATED";

                component.setState(sta);

        }).catch(function(error) {
            console.log(error);
        });
    },

    signOutPromise : function(){
        return new Promise(function(resolve, reject){
            auth.signOut()
            .then(() => {
                omapp.dataUser = {
                    user: null,
                    inDB: null
                };
                
                resolve();

            }).catch(function(error) {
                console.log(error);
                reject(error);
            });
        })
    },
	
	onMount : function(component){
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				component.setState({
                    user: user,
                    inDB: omapp.getUser(user)
                });
			} 
		});	
	},

    getCurrentuser :  function(){
        //console.log(firebase.auth().currentUser);
        return firebase.auth().currentUser;

    },

    RegDB(email,doc,nick){
        //REGISTRAMOS EN NUESTRA BD



        db.collection('users').doc(email).set(doc)
            .then(function() {
                console.log("Document successfully written!");
                omapp.dataUser.inDB = true;
                omapp.dataUser.nick = nick;
                omapp.dataUser.email = email;
        }).catch(function(error) {
                console.log("Registro incompleto");
                console.log(error);
                throw error;
        });
    },

    RegDBPromise(email,doc,nick){
        
        //REGISTRAMOS EN NUESTRA BD
        return new Promise(function (resolve, reject) {
            db.collection('users').doc(email).set(doc)
                .then(function() {
                    omapp.dataUser.inDB = true;
                    omapp.dataUser.nick = nick;
                    omapp.dataUser.email = email;
                    resolve(omapp.dataUser);
            }).catch(function(error) {
                    console.log(error);
                    reject(error);
            });
        })
    },

    completeRegDBPromise: function(email,password,nickname,idPlan, authLevel){
        
        //email, pass, nick, idPlan, authLevel

        return new Promise(
            function(resolve, reject){
                let fch = new Date();
    
                let docData = {
                    type: omapp.dataUser.style,
                    FechaUnion: fch,
                    nick: nickname,
                    plan: idPlan,
                    authLevel: authLevel
                }
        
                if(omapp.dataUser.style == 'g'){
                    //Registro mediante google
                    email = omapp.dataUser.user.email;
                    omapp.RegDBPromise(email, docData, nickname).
                    then(function(){
                        resolve(omapp.dataUser);
                    }).
                    catch(function(error){
                        console.error(error)
                        reject(error);
                    });  
                }else{
                    //Registro por email
                    //REGISTRAMOS CON FIREBASE
                    auth.createUserAndRetrieveDataWithEmailAndPassword(email, password).
                        then(function(u){
                            omapp.dataUser.user = u;
                        }).then(function(){
                            omapp.RegDBPromise(email, docData, nickname)
                            .then(
                                function(dataUser){
                                    console.log(dataUser);
                                    resolve(dataUser);
                                }
                            )
                            .catch(function(error){
                                console.log(error);
                                reject(error);
                            });
                        })
                        .catch(function(error) {
                            // Handle Errors here.
                            reject(error);
                            console.log(error);
                        });
                }
            }
        );

    },

    completeRegDB: function(email, pass, nick, idPlan, authLevel){
        
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

            omapp.RegDB(email, docData, nick);
        }else{
            //Registro por email
            //REGISTRAMOS CON FIREBASE
            auth.createUserAndRetrieveDataWithEmailAndPassword(email, pass).
                then(function(u){
                    console.log('Logrado', u);
                    omapp.dataUser.user = u;
                    omapp.RegDB(email, docData, nick);
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