import firebase from '../firebase';

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();
const db = firebase.firestore();
const settings = {
    timestampsInSnapshots: true
};

db.settings(settings);

export function signInWithGooglePromise() {
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
    return new Promise(function(resolve, reject) {
        auth.signInAndRetrieveDataWithEmailAndPassword(email, password)
            .then(function(result) {
                console.log(result);
                db.collection('users').doc(result.user.email).get()
                    .then((doc) => {
                        resolve({
                            email: email,
                            nickname: doc.nickname,
                            signupMethod: doc.signupMethod,
                            registered: true,
                            profilePhotoURL: doc.profilePhotoURL
                        })
                    })
                    .catch((error) => console.log(error));
            })
            .catch(function(error) {
                console.log(error);
                reject(error);
            });
    });
}

export function signOutPromise() {
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
    return new Promise(
        function(resolve, reject) {
            user.signupDate = new Date();
            if (user.signupMethod === 'google.com') {
                auth.signInWithPopup(provider)
                    .then((result) => {
                        console.log(result);
                        var email = result.user.email;

                        user.email = result.user.email;

                        regDBPromise(user).
                        then(function() {
                            resolve(user);
                        }).
                        catch(function(error) {
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
