import firebase from 'firebase'

function firebaseInit() {

    //inicializamos configuracion de firebase con datos de omapp-2018
    firebase.initializeApp({
        apiKey: "AIzaSyCjRFxUdAwEzztLBYZdl_fsm5xqAiOYesg",
        authDomain: "omapp-2018.firebaseapp.com",
        databaseURL: "https://omapp-2018.firebaseio.com",
        projectId: "omapp-2018",
        storageBucket: "omapp-2018.appspot.com",
        messagingSenderId: "208376306849"
    });

    const provider = new firebase.auth.GoogleAuthProvider();
    const auth = firebase.auth();
    const db = firebase.firestore();
    const settings = {
        timestampsInSnapshots: true
    };
    db.settings(settings);

    return {provider: provider, auth: auth, db: db};
}

export function signInWithGooglePromise() {

    var firebaseInitResponse = firebaseInit();

    var provider = firebaseInitResponse.provider;
    var auth = firebaseInitResponse.auth;
    var db = firebaseInitResponse.db;

    return new Promise(function(resolve, reject) {
        auth.signInWithPopup(provider)
        .then((result) => {
            db.collection('users').doc(result.user.email).get()
                .then((doc) => {
                    resolve({
                        email: result.user.email,
                        username: doc.username,
                        signupMethod: doc.signupMethod,
                        registered: true,
                        profilePhotoURL: doc.profilePhotoURL
                    })
                });
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    });
}

export function signInWithEmailPromise(email, password) {

    var firebaseInitResponse = firebaseInit();

    var provider = firebaseInitResponse.provider;
    var auth = firebaseInitResponse.auth;
    var db = firebaseInitResponse.db;

    return new Promise(function(resolve, reject) {
        auth.signInAndRetrieveDataWithEmailAndPassword(email, password)
        .then(result => {
            console.log(result);
            db.collection('users').doc(result.user.email).get()
            .then((doc) => {
                if(doc.exists){
                    resolve(
                        {
                            success: true,
                            user: 
                            {
                                email: email,
                                nickname: doc.nickname,
                                signupMethod: doc.signupMethod,
                                registered: true,
                                profilePhotoURL: doc.profilePhotoURL
                            }
                        }
                    )
                }
                else{
                    resolve({success:false, user:null})
                }

            })
            .catch(error => 
                {
                    reject(error);
                    console.log(error);
                }
            );
        })
        .catch(error => 
            {
                if(
                    error.code === 'auth/invalid-email'  ||
                    error.code === 'auth/user-disabled'  ||
                    error.code === 'auth/user-not-found' ||
                    error.code === 'auth/wrong-password'
                ){
                    resolve({success:false, user:null})
                }
                else{
                    reject(error)
                }
                console.log(error);
            }
        );
    });
}

export function signOutPromise() {

    var firebaseInitResponse = firebaseInit();
    
    var auth = firebaseInitResponse.auth;
   
    return new Promise(function(resolve, reject) {
        auth.signOut()
        .then(() => {
            resolve();
        }).catch(function(error) {
            console.log(error);
            reject(error);
        });
    });
}

export function completeRegDBPromise(user, password) {

    var firebaseInitResponse = firebaseInit();

    var provider = firebaseInitResponse.provider;
    var auth = firebaseInitResponse.auth;

    return new Promise(
        function(resolve, reject) {
            user.signupDate = new Date();
            if (user.signupMethod === 'google.com') {
                auth.signInWithPopup(provider)
                .then((result) => {
                    console.log(result);
                
                    user.email = result.user.email;

                    regDBPromise(user)
                    .then(function() {
                        resolve(user);
                    })
                    .catch(function(error) {
                        console.error(error)
                        reject(error);
                    });
                })
                .catch(function(error) {
                    console.log(error);
                    reject(error);
                });
            } else {
                auth.createUserAndRetrieveDataWithEmailAndPassword(user.email, password)
                .then(function() {
                    regDBPromise(user)
                    .then(
                        function(data) {
                            console.log(data);
                            resolve(user);
                        }
                    )
                    .catch(function(error) {
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

function regDBPromise(user) {

    var firebaseInitResponse = firebaseInit();

    var db = firebaseInitResponse.db;

    return new Promise(function(resolve, reject) {
        db.collection('users').doc(user.email).set(user)
        .then(function(data) {
            resolve(user);
        }).catch(function(error) {
            console.log(error);
            reject(error);
        });
    });
}

export function log(){
    return 'verdadera funcion';
}
