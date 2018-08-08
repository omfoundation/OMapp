import firebase from '../firebase';
import { resolve } from '../../node_modules/url';

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
  
db.settings(settings);


var omapp = {

    dataUser: {
        user: null,
        inDB: null,
        style: null,
        nick: null,
        email: null,
        photoURL: null,
        defaultPhotoURL : 'http://sitelcity.com/wp-content/uploads/2015/04/default-user-image-300x300.png'
    },

    setLogStyle : function(style){
        this.dataUser.style = style;
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
    }
}

export default omapp;

/**
 * Libreria a utilizar para desacoplar la aplicaci�n de servicios espec�ficos
 */
 	


//function privateMethod(){ console.log("private method")}