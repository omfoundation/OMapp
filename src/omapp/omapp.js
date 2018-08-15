import firebase from '../firebase';

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();
const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

var omapp = { 
	signInWithGooglePromise : function(){
        return new Promise(function(resolve, reject){
            auth.signInWithPopup(provider)
            .then((result) => {
                console.log(result);
                var email = result.user.email;
                var doc = firebase.firestore.collection('users').doc(email).get();
                resolve(doc);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            })
            .catch(function(error) {
                console.log(error);
                reject(error);
            });
        });
    },
    signInWithEmailPromise : function(email,password){
        return Promise(function(resolve, reject){
            auth.signInAndRetrieveDataWithEmailAndPassword(email,password)
            .then(function(result){
                console.log(result);
                resolve(result);
            })
            .catch(function(error) {
                console.log(error);
                reject(error);
            });
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
    RegDBPromise(user){
        return new Promise(function (resolve, reject) {
            db.collection('users').doc(user.email).set(user)
            .then(function(data) {
                console.log('data -> ');
                console.log(data);
                resolve(user);
            }).catch(function(error) {
                console.log(error);
                reject(error);
            });
        })
    },
    completeRegDBPromise: function(user,password){
        
        //email, pass, nick, idPlan, authLevel

        return new Promise(
            function(resolve, reject){
                let fch = new Date();
    
                //let docData = {
                //    type: omapp.dataUser.style,
                //    FechaUnion: fch,
                //    nick: nickname,
                //    plan: idPlan,
                //    authLevel: authLevel
                //}
        
                if(user.signupMethod === 'google.com'){

                    auth.signInWithPopup(provider)
                    .then((result) => {
                        console.log(result);
                        var email = result.user.email;

                            user.email = result.user.email;

                            omapp.RegDBPromise(user).
                            then(function(){
                                resolve(user);
                            }).
                            catch(function(error){
                                console.error(error)
                                reject(error);
                            });  
                    })
                    .catch(function(error) {
                        console.log(error);
                        reject(error);
                    });
                }else{
                    //Registro por email
                    //REGISTRAMOS CON FIREBASE
                    auth.createUserAndRetrieveDataWithEmailAndPassword(user.email, password)
                    .then(function(u){
                        console.log("User registered in google");
                        })
                        .then(function(){
                            omapp.RegDBPromise(user)
                            .then(
                                function(data){
                                    console.log(data);
                                    resolve(user);
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